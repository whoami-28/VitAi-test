import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validateBelarussianPhone } from '@/lib/phone-validator';
import { checkAndRegisterSubmission } from '@/lib/anti-duplicate';
import { saveLead } from '@/lib/storage';
import { sendTelegramNotification } from '@/lib/telegram';
import { ApiResponse, LeadRecord } from '@/types/lead';

// Валидационная Zod-схема для входящего запроса
const leadRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(50, 'Слишком длинное имя'),
  phone: z
    .string()
    .trim()
    .min(7, 'Номер слишком короткий'),
  orderType: z.enum(['subscription', 'one-time', 'question']),
  comment: z.string().trim().max(1000, 'Комментарий не может превышать 1000 символов').optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  referer: z.string().optional(),
});

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Некорректный формат данных (ожидается JSON)',
        },
        { status: 400 }
      );
    }

    // 1. Zod валидация структуры
    const parseResult = leadRequestSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues?.[0]?.message || 'Ошибка в заполнении формы';
      return NextResponse.json(
        {
          success: false,
          message: firstError,
          errors: { issues: parseResult.error.issues },
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 2. Строгая проверка белорусского номера телефона
    const phoneValidation = validateBelarussianPhone(data.phone);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: phoneValidation.error || 'Номер должен быть в формате операторов Беларуси (+375 ...)',
        },
        { status: 422 }
      );
    }

    const cleanPhone = phoneValidation.cleanPhone;

    // 3. Защита от дублей в течение 10 минут (включая повторные клики)
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined;
    const duplicateCheck = checkAndRegisterSubmission(cleanPhone, clientIp);

    if (duplicateCheck.isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          isDuplicate: true,
          message: `Заявка с этого номера уже принята! Мы перезвоним вам в ближайшее время (повторная отправка будет доступна через ${duplicateCheck.remainingMinutes} мин).`,
        },
        { status: 429 }
      );
    }

    // 4. Формирование записи лида
    const leadRecord: LeadRecord = {
      id: crypto.randomUUID(),
      name: data.name,
      phone: cleanPhone,
      orderType: data.orderType,
      comment: data.comment || undefined,
      utmSource: data.utm_source || undefined,
      utmMedium: data.utm_medium || undefined,
      utmCampaign: data.utm_campaign || undefined,
      utmContent: data.utm_content || undefined,
      utmTerm: data.utm_term || undefined,
      referer: data.referer || undefined,
      createdAt: new Date().toISOString(),
      ip: clientIp,
    };

    // 5. Сохранение в файл/хранилище
    const isSaved = await saveLead(leadRecord);
    if (!isSaved) {
      console.warn('Не удалось записать в локальный файл, но продолжаем отправку в Telegram');
    }

    // 6. Уведомление в Telegram (асинхронно, с защитой от сбоев)
    sendTelegramNotification(leadRecord).catch((tgError) => {
      console.error('Ошибка фоновой отправки в Telegram:', tgError);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Спасибо! Ваша заявка успешно принята. Мы свяжемся с вами в течение 15 минут.',
        data: { id: leadRecord.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Непредвиденная ошибка в POST /api/lead:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Не удалось отправить заявку. Пожалуйста, напишите нам в Telegram @kvarta_minsk или позвоните +375 (29) 123-45-67.',
      },
      { status: 500 }
    );
  }
}
