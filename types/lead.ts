export type OrderType = 'subscription' | 'one-time' | 'question';

export interface LeadSubmission {
  name: string;
  phone: string;
  orderType: OrderType;
  comment?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referer?: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  orderType: OrderType;
  comment?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referer?: string;
  createdAt: string;
  ip?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  isDuplicate?: boolean;
  errors?: Record<string, unknown>;
}
