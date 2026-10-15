import React from 'react';
import Image from 'next/image';
import { Flame, Truck, Award } from 'lucide-react';

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-16 md:py-24 bg-sand-50 border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta mb-2">
            <span>● ЧЕСТНАЯ ФИЛОСОФИЯ</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-coffee-950">
            Почему мы жарим только по 5 кг
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Левая колонка: Фото основателей и цитата */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-sand-200 shadow-md aspect-[4/3]">
              <Image
                src="/images/founders.jpg"
                alt="Основатели обжарки Кварта — Аня и Дмитрий"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="bg-white rounded-xl p-6 border border-sand-200 shadow-sm relative">
              <span className="font-serif text-4xl text-terracotta/40 leading-none absolute top-4 left-4">“</span>
              <p className="font-serif italic text-coffee-800 text-sm sm:text-base leading-relaxed pl-6">
                Мы бывшие бариста, которые устали от кофе, месяцами лежащего на полках супермаркетов. В 2019 году мы привезли в Минск ростер на 5 кг, чтобы жарить кофе только под живой спрос.
              </p>
              <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-coffee-900">— Аня и Дима</span>
                <span className="text-coffee-500">Основатели обжарки «Кварта»</span>
              </div>
            </div>
          </div>

          {/* Правая колонка: 3 шага процесса */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Шаг 1 */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-sand-200 shadow-sm flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-sand-100 border border-sand-200 flex items-center justify-center flex-shrink-0 font-serif font-bold text-coffee-900 text-lg">
                01
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-coffee-950">
                    ЧЕТВЕРГ = ДЕНЬ ПЕЧИ
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                    <Flame className="w-3 h-3 text-terracotta" />
                    Обжарка
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-coffee-700 leading-relaxed">
                  Жарим маленькими партиями по 5 кг строго под количество оформленных за неделю заявок. Никаких складов с пересушенным зерном.
                </p>
              </div>
            </div>

            {/* Шаг 2 */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-sand-200 shadow-sm flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-sand-100 border border-sand-200 flex items-center justify-center flex-shrink-0 font-serif font-bold text-coffee-900 text-lg">
                02
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-coffee-950">
                    ПЯТНИЦА = ДОСТАВКА В РУКИ
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                    <Truck className="w-3 h-3 text-olive" />
                    Логистика
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-coffee-700 leading-relaxed">
                  Бережно упаковываем зерно в крафтовые пакеты с клапаном дегазации и развозим по всему Минску с 17:00 до 21:00 (от 50 BYN бесплатно).
                </p>
              </div>
            </div>

            {/* Шаг 3 */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-sand-200 shadow-sm flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-sand-100 border border-sand-200 flex items-center justify-center flex-shrink-0 font-serif font-bold text-coffee-900 text-lg">
                03
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-coffee-950">
                    1–3 ДЕНЬ = ПИК ВКУСА
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-900 border border-rose-200">
                    <Award className="w-3 h-3 text-terracotta" />
                    В чашке
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-coffee-700 leading-relaxed">
                  Вы завариваете кофе именно тогда, когда дегазация зерна завершена и букет вкуса раскрывается на 100%: сладость, ягодная кислотность и чистый баланс.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
