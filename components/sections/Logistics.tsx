import React from 'react';
import { MapPin, Truck, Coffee, Clock } from 'lucide-react';
import OrderForm from './OrderForm';

export default function Logistics() {
  return (
    <section id="logistics" className="py-16 md:py-24 bg-sand-100/50 border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Левая колонка: Описание самовывоза и доставки */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta mb-2">
                <span>● КАК ПОЛУЧИТЬ ЗЕРНО</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-coffee-950 leading-tight">
                Самовывоз или курьер до двери
              </h2>
              <p className="mt-3 text-sm sm:text-base text-coffee-700 leading-relaxed">
                Мы любим живые знакомства, поэтому всегда рады пообщаться вживую в нашей мастерской или передать свежий заказ через курьера без лишней суеты.
              </p>
            </div>

            {/* Карточка 1: Самовывоз */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-sand-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sand-100 text-terracotta flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-coffee-950">
                    Самовывоз из мастерской
                  </h3>
                  <p className="text-xs text-coffee-500">
                    Минск, ул. Короля, 9
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-coffee-700 leading-relaxed pl-13">
                Тихий двор за кирпичной аркой, отдельный вход с деревянной дверью. Внутри — аромат свежей обжарки и мерный гул ростера.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 border-t border-sand-200 text-xs text-coffee-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-coffee-500" />
                  <span>Пн–Пт: 08:00 – 20:00</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-coffee-500" />
                  <span>Сб–Вс: 10:00 – 18:00</span>
                </div>
              </div>

              <div className="bg-sand-50 rounded-xl p-3 border border-sand-200 text-xs text-coffee-800 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-terracotta flex-shrink-0" />
                <span className="font-medium">Всегда угостим чашкой свежего фильтра при самовывозе!</span>
              </div>
            </div>

            {/* Карточка 2: Доставка */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-sand-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sand-100 text-terracotta flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-coffee-950">
                    Доставка по Минску
                  </h3>
                  <p className="text-xs text-coffee-500">
                    Каждую пятницу с 17:00 до 21:00
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-coffee-700 pl-13">
                <p>
                  • <strong>Бесплатно</strong> при заказе от 50 BYN или для подписчиков.
                </p>
                <p>
                  • При заказе до 50 BYN — доставка по Минску 6 BYN.
                </p>
                <p>
                  • <strong>По Беларуси:</strong> отправка Европочтой или СДЭК за 2–3 рабочих дня.
                </p>
              </div>
            </div>

          </div>

          {/* Правая колонка: Форма заказа */}
          <div className="lg:col-span-6">
            <OrderForm />
          </div>

        </div>
      </div>
    </section>
  );
}
