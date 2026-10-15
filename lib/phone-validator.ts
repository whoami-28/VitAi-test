export interface PhoneValidationResult {
  isValid: boolean;
  cleanPhone: string;
  formattedPhone?: string;
  error?: string;
}

const VALID_OPERATOR_CODES = ['25', '29', '33', '44'];

/**
 * Валидация и нормализация белорусского номера телефона.
 * Принимает форматы: +375291234567, 80291234567, 375291234567, +375 (29) 123-45-67 и т.д.
 */
export function validateBelarussianPhone(rawPhone: string): PhoneValidationResult {
  if (!rawPhone || !rawPhone.trim()) {
    return {
      isValid: false,
      cleanPhone: '',
      error: 'Пожалуйста, укажите номер телефона',
    };
  }

  // Очищаем от любых символов кроме цифр
  let digits = rawPhone.replace(/\D/g, '');

  // Если номер начинается с 80 (внутрибелорусский префикс Белтелеком), заменяем на 375
  if (digits.startsWith('80') && digits.length === 11) {
    digits = '375' + digits.slice(2);
  }

  // Если ввели без кода страны, но 9 цифр (например, 291234567)
  if (digits.length === 9 && VALID_OPERATOR_CODES.includes(digits.slice(0, 2))) {
    digits = '375' + digits;
  }

  // Проверяем, что номер начинается с 375 и содержит ровно 12 цифр
  if (!digits.startsWith('375') || digits.length !== 12) {
    return {
      isValid: false,
      cleanPhone: digits ? `+${digits}` : '',
      error: 'Номер должен содержать 12 цифр: +375 (XX) XXX-XX-XX',
    };
  }

  const operatorCode = digits.slice(3, 5);
  if (!VALID_OPERATOR_CODES.includes(operatorCode)) {
    return {
      isValid: false,
      cleanPhone: `+${digits}`,
      error: `Неверный код оператора (${operatorCode}). Допустимы: 25, 29, 33, 44`,
    };
  }

  const cleanPhone = `+${digits}`;
  const formattedPhone = formatBelarussianPhone(cleanPhone);

  return {
    isValid: true,
    cleanPhone,
    formattedPhone,
  };
}

/**
 * Красивое форматирование номера для отображения и live-маски ввода:
 * +375 (29) 123-45-67
 */
export function formatBelarussianPhone(input: string): string {
  const digits = input.replace(/\D/g, '');

  let normalized = digits;
  if (normalized.startsWith('80')) {
    normalized = '375' + normalized.slice(2);
  } else if (!normalized.startsWith('375')) {
    normalized = '375' + normalized;
  }

  // Ограничиваем 12 цифрами
  const trimmed = normalized.slice(0, 12);

  let formatted = '+375';
  if (trimmed.length > 3) {
    formatted += ' (' + trimmed.slice(3, 5);
  }
  if (trimmed.length >= 5) {
    formatted += ') ';
  }
  if (trimmed.length > 5) {
    formatted += trimmed.slice(5, 8);
  }
  if (trimmed.length >= 8) {
    formatted += '-' + trimmed.slice(8, 10);
  }
  if (trimmed.length >= 10) {
    formatted += '-' + trimmed.slice(10, 12);
  }

  return formatted;
}
