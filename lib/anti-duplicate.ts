interface SubmissionRecord {
  timestamp: number;
  ip?: string;
}

// In-memory хранилище для отслеживания повторных заявок
// В рамках жизненного цикла инстанса Node.js/Serverless
const submissionCache = new Map<string, SubmissionRecord>();

// 10 минут = 600,000 мс (согласно ТЗ)
const DUPLICATE_COOLDOWN_MS = 10 * 60 * 1000;

/**
 * Проверяет, была ли отправлена заявка с данного номера телефона в течение последних 10 минут.
 * Возвращает { isDuplicate: true, remainingMinutes } если номер уже отправлялся.
 */
export function checkAndRegisterSubmission(
  cleanPhone: string,
  ip?: string
): { isDuplicate: boolean; remainingMinutes?: number } {
  const now = Date.now();

  // Регулярная очистка устаревших записей для предотвращения утечки памяти
  for (const [phone, record] of submissionCache.entries()) {
    if (now - record.timestamp > DUPLICATE_COOLDOWN_MS) {
      submissionCache.delete(phone);
    }
  }

  const existingRecord = submissionCache.get(cleanPhone);

  if (existingRecord) {
    const elapsed = now - existingRecord.timestamp;
    if (elapsed < DUPLICATE_COOLDOWN_MS) {
      const remainingMinutes = Math.ceil((DUPLICATE_COOLDOWN_MS - elapsed) / 60000);
      return {
        isDuplicate: true,
        remainingMinutes: remainingMinutes || 1,
      };
    }
  }

  // Фиксируем новую заявку
  submissionCache.set(cleanPhone, {
    timestamp: now,
    ip,
  });

  return { isDuplicate: false };
}

/**
 * Хелпер для сброса кэша в тестах
 */
export function resetDuplicateCache(): void {
  submissionCache.clear();
}
