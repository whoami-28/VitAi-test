import fs from 'fs';
import path from 'path';
import { LeadRecord } from '@/types/lead';

/**
 * Определение безопасного каталога для сохранения данных:
 * На Vercel серверные функции имеют файловую систему read-only, кроме папки /tmp.
 * Локально в разработке сохраняем в <projectRoot>/data/leads.json
 */
function getStoragePath(): string {
  const isVercel = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  const targetDir = isVercel ? '/tmp' : path.join(process.cwd(), 'data');

  if (!fs.existsSync(targetDir)) {
    try {
      fs.mkdirSync(targetDir, { recursive: true });
    } catch (e) {
      console.warn('Не удалось создать директорию хранилища, используем /tmp:', e);
      return path.join('/tmp', 'leads.json');
    }
  }

  return path.join(targetDir, 'leads.json');
}

/**
 * Сохранение новой заявки в файл JSON
 */
export async function saveLead(lead: LeadRecord): Promise<boolean> {
  try {
    const filePath = getStoragePath();
    let leads: LeadRecord[] = [];

    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        leads = JSON.parse(content);
      } catch (e) {
        console.warn('Ошибка чтения файла заявок, создаем новый список:', e);
        leads = [];
      }
    }

    leads.push(lead);
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Ошибка записи лида в хранилище:', error);
    return false;
  }
}

/**
 * Получение всех сохраненных заявок (для отладки и проверки)
 */
export async function getLeads(): Promise<LeadRecord[]> {
  try {
    const filePath = getStoragePath();
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Ошибка чтения заявок из хранилища:', error);
    return [];
  }
}
