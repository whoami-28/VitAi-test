import { LeadRecord } from '@/types/lead';

function escapeMarkdown(text: string): string {
  // Экранирование спецсимволов для Telegram MarkdownV2
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

export async function sendTelegramNotification(lead: LeadRecord): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // В режиме разработки или если токен не настроен — тихо логируем
    console.info('[Telegram] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены. Оповещение пропущено.');
    return false;
  }

  const orderTypeLabels: Record<string, string> = {
    'subscription': 'Регулярная подписка (54 BYN/мес)',
    'one-time': 'Разовый заказ зерна',
    'question': 'Вопрос / Консультация',
  };

  const formattedOrderType = orderTypeLabels[lead.orderType] || lead.orderType;

  const lines = [
    `☕ *Новая заявка: Обжарка «Кварта»*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Имя:* ${escapeMarkdown(lead.name)}`,
    `📞 *Телефон:* \`${escapeMarkdown(lead.phone)}\``,
    `📦 *Тип заказа:* ${escapeMarkdown(formattedOrderType)}`,
    lead.comment ? `💬 *Пожелания / Помол:* ${escapeMarkdown(lead.comment)}` : null,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📊 *Источник (UTM):* ${lead.utmSource ? escapeMarkdown(lead.utmSource) : 'Прямой заход'}`,
    lead.utmMedium ? `📢 *Канал:* ${escapeMarkdown(lead.utmMedium)}` : null,
    lead.utmCampaign ? `🎯 *Кампания:* ${escapeMarkdown(lead.utmCampaign)}` : null,
    lead.utmContent ? `📝 *Объявление:* ${escapeMarkdown(lead.utmContent)}` : null,
    lead.referer ? `🔗 *Реферер:* ${escapeMarkdown(lead.referer)}` : null,
    `🕒 *Минское время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Minsk' })}`,
  ].filter(Boolean);

  const messageText = lines.join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'MarkdownV2',
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[Telegram] Ошибка Telegram Bot API:', errText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Telegram] Сетевая ошибка при отправке в Telegram:', error);
    return false;
  }
}
