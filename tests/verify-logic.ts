import { validateBelarussianPhone, formatBelarussianPhone } from '../lib/phone-validator';
import { checkAndRegisterSubmission, resetDuplicateCache } from '../lib/anti-duplicate';
import { saveLead, getLeads } from '../lib/storage';

async function runTests() {
  console.log('--- 1. Тестирование валидации номеров РБ ---');
  
  const validTestNumbers = [
    '+375291234567',
    '+375 (29) 123-45-67',
    '80291234567',
    '375336543210',
    '447654321', // 9 цифр с кодом А1
    '+375259998877',
  ];

  for (const num of validTestNumbers) {
    const res = validateBelarussianPhone(num);
    if (!res.isValid) {
      throw new Error(`Ожидался валидный номер: ${num}, получена ошибка: ${res.error}`);
    }
    console.log(`✓ Валидный: ${num} -> ${res.cleanPhone} (${res.formattedPhone})`);
  }

  const invalidTestNumbers = [
    '+79991234567', // РФ
    '+375121234567', // Несуществующий код оператора 12
    '+3752912345', // Слишком короткий
    'abcdef',
    '',
  ];

  for (const num of invalidTestNumbers) {
    const res = validateBelarussianPhone(num);
    if (res.isValid) {
      throw new Error(`Ожидался невалидный номер: ${num}, но валидация прошла`);
    }
    console.log(`✓ Корректно отклонён невалидный номер: "${num}" -> ${res.error}`);
  }

  console.log('\n--- 2. Тестирование форматирования маски ввода ---');
  const formatted = formatBelarussianPhone('375291234567');
  console.log(`✓ 375291234567 -> ${formatted}`);
  if (formatted !== '+375 (29) 123-45-67') {
    throw new Error(`Неверный формат маски: ${formatted}`);
  }

  console.log('\n--- 3. Тестирование защиты от дублей (10 минут) ---');
  resetDuplicateCache();

  const testPhone = '+375291112233';
  const firstSubmission = checkAndRegisterSubmission(testPhone, '127.0.0.1');
  if (firstSubmission.isDuplicate) {
    throw new Error('Первая отправка не должна считаться дублем!');
  }
  console.log('✓ Первая отправка успешно зарегистрирована');

  const secondSubmission = checkAndRegisterSubmission(testPhone, '127.0.0.1');
  if (!secondSubmission.isDuplicate) {
    throw new Error('Повторная отправка того же номера должна блокироваться!');
  }
  console.log(`✓ Повторная отправка заблокирована (осталось ${secondSubmission.remainingMinutes} мин)`);

  const anotherPhoneSubmission = checkAndRegisterSubmission('+375445556677', '127.0.0.1');
  if (anotherPhoneSubmission.isDuplicate) {
    throw new Error('Отправка другого номера не должна блокироваться!');
  }
  console.log('✓ Отправка другого номера успешно разрешена');

  console.log('\n--- 4. Тестирование адаптера хранилища (saveLead / getLeads) ---');
  const testLead = {
    id: 'test-uuid-123',
    name: 'Тестовый Клиент',
    phone: testPhone,
    orderType: 'subscription' as const,
    comment: 'Тестовый комментарий для проверки',
    utmSource: 'yandex',
    utmCampaign: 'test_campaign',
    createdAt: new Date().toISOString(),
  };

  const saved = await saveLead(testLead);
  if (!saved) {
    throw new Error('Не удалось сохранить лид');
  }
  console.log('✓ Лид успешно сохранен в локальное хранилище');

  const allLeads = await getLeads();
  const found = allLeads.find((l) => l.id === testLead.id);
  if (!found) {
    throw new Error('Сохраненный лид не найден при чтении');
  }
  console.log(`✓ Лид успешно прочитан из хранилища (Всего заявок: ${allLeads.length})`);

  console.log('\n🎉 ВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО!');
}

runTests().catch((err) => {
  console.error('Ошибка в тестах:', err);
  process.exit(1);
});
