'use client';

import React from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

export interface CoffeeItem {
  id: string;
  name: string;
  lotCode: string;
  badge: string;
  badgeColor: string;
  dotColor: string;
  notes: string[];
  weight: string;
  roastDate: string;
  price: number;
}

export const CATALOG_ITEMS: CoffeeItem[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Эфиопия Иргачеффе',
    lotCode: 'ЛОТ #ET-04',
    badge: 'СВЕТЛАЯ / ФИЛЬТР',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    dotColor: 'bg-amber-400',
    notes: ['Цветочный', 'Бергамот', 'Спелый лайм'],
    weight: '250 г',
    roastDate: 'Свежий четверг',
    price: 32,
  },
  {
    id: 'colombia-huila',
    name: 'Колумбия Уила',
    lotCode: 'ЛОТ #CO-12',
    badge: 'СРЕДНЯЯ / УНИВЕРСАЛ',
    badgeColor: 'bg-rose-50 text-rose-900 border-rose-200',
    dotColor: 'bg-rose-500',
    notes: ['Карамель', 'Красное яблоко', 'Молочный шоколад'],
    weight: '250 г',
    roastDate: 'Свежий четверг',
    price: 29,
  },
  {
    id: 'brazil-cerrado',
    name: 'Бразилия Серрадо',
    lotCode: 'ЛОТ #BR-08',
    badge: 'ПЛОТНАЯ / ЭСПРЕССО',
    badgeColor: 'bg-amber-950/10 text-coffee-950 border-amber-900/20',
    dotColor: 'bg-coffee-800',
    notes: ['Жареный фундук', 'Тёмный шоколад', 'Тростниковый сахар'],
    weight: '250 г',
    roastDate: 'Свежий четверг',
    price: 26,
  },
  {
    id: 'drip-pack-assorted',
    name: 'Дрип-пакеты, ассорти',
    lotCode: 'БОКС #DP-10',
    badge: 'УДОБНЫЙ ФОРМАТ',
    badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    dotColor: 'bg-emerald-500',
    notes: ['Яркий фильтр-кофе без кофеварки', '10 пакетов', 'В чашку дома и в офисе'],
    weight: '10 штук',
    roastDate: 'Свежий помол с азотом',
    price: 18,
  },
];

export default function Catalog() {
  const handleSelectProduct = (item: CoffeeItem) => {
    // Диспатчим событие для формы заказа
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('kvarta:select-product', {
          detail: {
            title: item.name,
            price: item.price,
            orderType: 'one-time',
          },
        })
      );

      const target = document.getElementById('order-form');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="catalog" className="py-16 md:py-24 border-b border-sand-200 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок секции */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>СВЕЖИЙ РОСТЕР</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-coffee-950">
              Свежая обжарка этой недели
            </h2>
            <p className="mt-2 text-sm sm:text-base text-coffee-700">
              Заказ принимаем до среды 23:00. Обжариваем в четверг утром.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-sand-100 border border-sand-200 px-4 py-2 rounded-full text-xs font-medium text-coffee-800 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
            <span>Ближайший бокс: <strong>Уже в эту пятницу</strong></span>
          </div>
        </div>

        {/* Сетка из 4 карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATALOG_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl border border-sand-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-sand-300 transition-all duration-200"
            >
              <div>
                {/* Бейдж и Лот */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${item.badgeColor}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                    {item.badge}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-coffee-500">
                    {item.lotCode}
                  </span>
                </div>

                {/* Название кофе */}
                <h3 className="font-serif text-2xl font-bold text-coffee-950 mb-3 group-hover:text-terracotta transition-colors">
                  {item.name}
                </h3>

                {/* Дескрипторы вкуса */}
                <div className="bg-sand-50/80 rounded-lg p-3 border border-sand-200/60 mb-5">
                  <span className="text-[10px] uppercase font-bold text-coffee-500 tracking-wider block mb-1">
                    Дескрипторы вкуса:
                  </span>
                  <p className="text-xs text-coffee-800 leading-relaxed">
                    {item.notes.join(' · ')}
                  </p>
                </div>

                {/* Характеристики */}
                <div className="space-y-1.5 text-xs text-coffee-500 pb-5 border-b border-sand-200">
                  <div className="flex justify-between">
                    <span>Вес:</span>
                    <span className="font-medium text-coffee-800">{item.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Обжарка:</span>
                    <span className="font-medium text-coffee-800">{item.roastDate}</span>
                  </div>
                </div>
              </div>

              {/* Цена и Кнопка */}
              <div className="pt-5 flex items-center justify-between gap-3">
                <div className="font-serif font-bold text-2xl text-coffee-950">
                  {item.price} <span className="text-sm font-sans font-normal text-coffee-700">BYN</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectProduct(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-sand-100 hover:bg-terracotta hover:text-white text-coffee-900 px-4 py-2.5 rounded-lg border border-sand-200 transition-colors duration-150"
                >
                  <span>Выбрать</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Баннер под сеткой каталога */}
        <div className="mt-8 text-center bg-sand-100/60 rounded-xl p-4 border border-sand-200 text-xs text-coffee-700 flex flex-col sm:flex-row items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-terracotta" />
          <span>
            Хотите помолоть под гейзер, турку или эспрессо? Укажите это при подтверждении заявки — помолем прямо перед отправкой.
          </span>
        </div>

      </div>
    </section>
  );
}
