'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, RefreshCw, MessageSquare, PhoneCall } from 'lucide-react';
import { formatBelarussianPhone, validateBelarussianPhone } from '@/lib/phone-validator';
import { getAttributionData, UtmData } from '@/lib/utm';
import { OrderType } from '@/types/lead';

export default function OrderForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+375');
  const [orderType, setOrderType] = useState<OrderType>('one-time');
  const [comment, setComment] = useState('');
  const [utmData, setUtmData] = useState<UtmData>({});

  // Состояния формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Захват UTM-меток при загрузке
  useEffect(() => {
    setUtmData(getAttributionData());

    // Слушатель выбора товара из каталога или подписки
    const handleSelectProduct = (e: Event) => {
      const customEvent = e as CustomEvent<{ title: string; price?: number; orderType?: OrderType }>;
      if (customEvent.detail) {
        if (customEvent.detail.orderType) {
          setOrderType(customEvent.detail.orderType);
        }
        if (customEvent.detail.title) {
          setComment((prev) => {
            const prefix = prev ? `${prev}\n` : '';
            return `${prefix}Выбранный лот: ${customEvent.detail.title}`;
          });
        }
      }
    };

    window.addEventListener('kvarta:select-product', handleSelectProduct);
    return () => {
      window.removeEventListener('kvarta:select-product', handleSelectProduct);
    };
  }, []);

  // Live валидация телефона
  const phoneValidation = validateBelarussianPhone(phone);
  const showPhoneError = phoneTouched && phone.length > 4 && !phoneValidation.isValid;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatBelarussianPhone(rawValue);
    setPhone(formatted);
    if (!phoneTouched) {
      setPhoneTouched(true);
    }
  };

  const handleAddChip = (chipText: string) => {
    setComment((prev) => {
      if (prev.includes(chipText)) return prev;
      return prev ? `${prev}, ${chipText}` : chipText;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsDuplicate(false);
    setPhoneTouched(true);

    if (!name.trim()) {
      setErrorMessage('Пожалуйста, укажите ваше имя');
      return;
    }

    if (!phoneValidation.isValid) {
      setErrorMessage(phoneValidation.error || 'Проверьте правильность белорусского номера телефона');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        phone: phoneValidation.cleanPhone,
        orderType,
        comment: comment.trim() || undefined,
        utm_source: utmData.utm_source,
        utm_medium: utmData.utm_medium,
        utm_campaign: utmData.utm_campaign,
        utm_content: utmData.utm_content,
        utm_term: utmData.utm_term,
        referer: utmData.referer,
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 429 || data.isDuplicate) {
        setIsDuplicate(true);
        setErrorMessage(data.message || 'Заявка с этого номера уже отправлена недавно.');
        return;
      }

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || 'Произошла ошибка при отправке заявки.');
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('Ошибка отправки формы:', err);
      setErrorMessage(
        'Не удалось связаться с сервером. Пожалуйста, напишите нам в Telegram @kvarta_minsk или позвоните по телефону.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setPhone('+375');
    setComment('');
    setIsSuccess(false);
    setErrorMessage(null);
    setIsDuplicate(false);
    setPhoneTouched(false);
  };

  return (
    <div id="order-form" className="bg-white rounded-2xl border border-sand-200 shadow-xl p-6 sm:p-8">
      
      {/* Заголовок формы */}
      <div className="mb-6 pb-4 border-b border-sand-200">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-coffee-950">
          Оставьте заявку — перезвоним
        </h3>
        <p className="text-xs sm:text-sm text-coffee-600 mt-1">
          Без корзин и онлайн-оплат. Согласуем детали за 5 минут.
        </p>
      </div>

      {isSuccess ? (
        // Экран успеха
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-olive rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-2xl font-bold text-coffee-950">
            Заявка успешно принята!
          </h4>
          <p className="text-sm text-coffee-700 max-w-sm mx-auto leading-relaxed">
            Спасибо, <strong>{name}</strong>! Аня или Дмитрий свяжутся с вами по номеру{' '}
            <span className="font-mono font-medium text-coffee-900">{phone}</span> в ближайшее время для подтверждения свежей обжарки.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={handleResetForm}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Отправить ещё одну заявку</span>
            </button>
          </div>
        </div>
      ) : (
        // Форма ввода
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Предупреждение о дубле (HTTP 429) */}
          {isDuplicate && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">{errorMessage}</p>
                <p className="text-[11px] text-amber-800">
                  Менеджер уже видит ваш номер. Если нужно срочно изменить заказ — напишите нам в{' '}
                  <a href="https://t.me/kvarta_minsk" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                    Telegram
                  </a>.
                </p>
              </div>
            </div>
          )}

          {/* Сообщение об ошибке */}
          {!isDuplicate && errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">{errorMessage}</p>
                <div className="flex items-center gap-3 pt-1 text-[11px]">
                  <a href="https://t.me/kvarta_minsk" className="underline inline-flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Написать в Telegram
                  </a>
                  <a href="tel:+375291234567" className="underline inline-flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> Позвонить нам
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Тип заказа (Сегментированный переключатель) */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-coffee-700 mb-2">
              Тип заказа
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('subscription')}
                className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition-all border text-center ${
                  orderType === 'subscription'
                    ? 'bg-terracotta text-white border-terracotta shadow-sm'
                    : 'bg-sand-100 text-coffee-800 border-sand-200 hover:bg-sand-200'
                }`}
              >
                Подписка 54 BYN
              </button>
              <button
                type="button"
                onClick={() => setOrderType('one-time')}
                className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition-all border text-center ${
                  orderType === 'one-time'
                    ? 'bg-terracotta text-white border-terracotta shadow-sm'
                    : 'bg-sand-100 text-coffee-800 border-sand-200 hover:bg-sand-200'
                }`}
              >
                Разовый заказ
              </button>
              <button
                type="button"
                onClick={() => setOrderType('question')}
                className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition-all border text-center ${
                  orderType === 'question'
                    ? 'bg-terracotta text-white border-terracotta shadow-sm'
                    : 'bg-sand-100 text-coffee-800 border-sand-200 hover:bg-sand-200'
                }`}
              >
                Задать вопрос
              </button>
            </div>
          </div>

          {/* Имя и Телефон в 2 колонки на десктопе */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-name" className="block text-[11px] font-bold uppercase tracking-wider text-coffee-700 mb-1.5">
                Как вас зовут <span className="text-terracotta">*</span>
              </label>
              <input
                id="lead-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Константин"
                className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta text-sm text-coffee-950 placeholder-coffee-300 bg-sand-50/50"
              />
            </div>

            <div>
              <label htmlFor="lead-phone" className="block text-[11px] font-bold uppercase tracking-wider text-coffee-700 mb-1.5">
                Телефон (Беларусь) <span className="text-terracotta">*</span>
              </label>
              <input
                id="lead-phone"
                type="tel"
                required
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => setPhoneTouched(true)}
                placeholder="+375 (29) 000-00-00"
                className={`w-full px-4 py-3 rounded-xl border font-mono text-sm focus:outline-none focus:ring-2 transition-colors ${
                  showPhoneError
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30 text-rose-950'
                    : 'border-sand-200 focus:ring-terracotta/40 focus:border-terracotta bg-sand-50/50 text-coffee-950'
                }`}
              />
              <span className={`block text-[10px] mt-1 ${showPhoneError ? 'text-rose-600 font-medium' : 'text-coffee-500'}`}>
                {showPhoneError ? phoneValidation.error : 'Операторы РБ: 25, 29, 33, 44'}
              </span>
            </div>
          </div>

          {/* Пожелания к сорту и помол */}
          <div>
            <label htmlFor="lead-comment" className="block text-[11px] font-bold uppercase tracking-wider text-coffee-700 mb-1.5">
              Пожелания к сорту и помол
            </label>
            <textarea
              id="lead-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Например: Колумбия Уила 2 пачки, помол под воронку V60"
              className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta text-sm text-coffee-950 placeholder-coffee-300 bg-sand-50/50 resize-none"
            />

            {/* Интерактивные чипсы для быстрого клика */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <button
                type="button"
                onClick={() => handleAddChip('В зерне')}
                className="text-[11px] bg-sand-100 hover:bg-sand-200 text-coffee-700 px-2.5 py-1 rounded-md border border-sand-200 transition-colors"
              >
                + В зерне
              </button>
              <button
                type="button"
                onClick={() => handleAddChip('Помол под фильтр')}
                className="text-[11px] bg-sand-100 hover:bg-sand-200 text-coffee-700 px-2.5 py-1 rounded-md border border-sand-200 transition-colors"
              >
                + Помол под фильтр
              </button>
              <button
                type="button"
                onClick={() => handleAddChip('Ответьте в Telegram')}
                className="text-[11px] bg-sand-100 hover:bg-sand-200 text-coffee-700 px-2.5 py-1 rounded-md border border-sand-200 transition-colors"
              >
                + Ответьте в Telegram
              </button>
              <button
                type="button"
                onClick={() => handleAddChip('Позвонить после 18:00')}
                className="text-[11px] bg-sand-100 hover:bg-sand-200 text-coffee-700 px-2.5 py-1 rounded-md border border-sand-200 transition-colors"
              >
                + Позвонить после 18:00
              </button>
            </div>
          </div>

          {/* Кнопка отправки */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs sm:text-sm font-semibold uppercase tracking-wider py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Отправляем заявку...</span>
                </>
              ) : (
                <>
                  <span>Отправить заявку</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Дисклеймер конфиденциальности */}
          <p className="text-[10px] text-coffee-500 text-center leading-normal">
            Нажимая кнопку, вы подтверждаете заявку без предоплаты. Менеджер свяжется удобным для вас способом.
          </p>

        </form>
      )}

    </div>
  );
}
