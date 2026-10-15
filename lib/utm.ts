export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referer?: string;
}

const STORAGE_KEY = 'kvarta_utm_attribution';

/**
 * Извлекает UTM-метки из текущего URL и реферер, сохраняя их в sessionStorage.
 * Если меток нет в URL, пытается восстановить из сессии (для случаев серфинга по сайту).
 */
export function getAttributionData(): UtmData {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const hasUtmInUrl = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].some(
      (key) => urlParams.has(key)
    );

    if (hasUtmInUrl) {
      const data: UtmData = {
        utm_source: urlParams.get('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || undefined,
        utm_content: urlParams.get('utm_content') || undefined,
        utm_term: urlParams.get('utm_term') || undefined,
        referer: document.referrer || undefined,
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }

    // Проверяем сохраненную сессию
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }

    // Если меток нет вовсе, фиксируем хотя бы referrer
    if (document.referrer) {
      return { referer: document.referrer };
    }
  } catch (e) {
    console.warn('Не удалось получить UTM атрибуцию:', e);
  }

  return {};
}
