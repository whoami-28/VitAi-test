'use client';

import React from 'react';
import { Package, Truck, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Subscription() {
  const handleSelectSubscription = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('kvarta:select-product', {
          detail: {
            title: 'Регулярная подписка на кофе (2 пачки по 250 г)',
            price: 54,
            orderType: 'subscription',
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
    <section id="subscription" className="py-12 md:py-16 bg-sand-50 border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white border border-sand-200 p-8 sm:p-10 lg:p-12 shadow-sm overflow-hidden">
          
          {/* Декоративная фоновая текстура */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sand-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Левая часть: Оффер и преимущества */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta">
                <Sparkles className="w-3.5 h-3.5" />
                <span>РЕГУЛЯРНАЯ СВЕЖЕСТЬ ЗЕРНА</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-coffee-950 leading-tight">
                Кофе по подписке — <span className="text-terracotta font-bold">54 BYN / мес</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sand-100 border border-sand-200 flex items-center justify-center flex-shrink-0 text-coffee-800">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-coffee-900 mb-1">
                      2 пачки по 250 г
                    </h3>
                    <p className="text-xs text-coffee-600 leading-relaxed">
                      Свежей обжарки каждый месяц (разные сорта или ваш постоянный фаворит).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sand-100 border border-sand-200 flex items-center justify-center flex-shrink-0 text-coffee-800">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-coffee-900 mb-1">
                      Бесплатная доставка
                    </h3>
                    <p className="text-xs text-coffee-600 leading-relaxed">
                      Курьером по Минску в первую пятницу месяца прямо в руки без задержек.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sand-100 border border-sand-200 flex items-center justify-center flex-shrink-0 text-coffee-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-coffee-900 mb-1">
                      Тестовые микролоты
                    </h3>
                    <p className="text-xs text-coffee-600 leading-relaxed">
                      Эксклюзивный доступ к редким сортам и экспериментам ферментации.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая часть: CTA кнопка и гарантия */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3 pt-4 lg:pt-0 lg:border-l lg:border-sand-200 lg:pl-8">
              <button
                type="button"
                onClick={handleSelectSubscription}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs sm:text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <span>Оформить подписку</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 text-xs text-coffee-500">
                <ShieldCheck className="w-4 h-4 text-olive" />
                <span>Без привязки карты — оплата курьеру</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
