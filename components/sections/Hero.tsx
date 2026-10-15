import React from 'react';
import Image from 'next/image';
import { Sparkles, Truck, ArrowDown, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Левая колонка: Текстовый оффер */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Крафтовый бейдж */}
            <div className="inline-flex items-center gap-2 bg-sand-100 border border-sand-200 text-coffee-800 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>МИНСК · ОБЖАРИВАЕМ С 2019 ГОДА</span>
            </div>

            {/* Главный заголовок с антиквенным шрифтом */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-coffee-950 leading-[1.12]">
              Кофе, который приезжает к вам на 1–3 день после обжарки.
            </h1>

            {/* Описание УТП */}
            <p className="text-lg sm:text-xl text-coffee-700 max-w-xl font-normal leading-relaxed">
              Жарим маленькими партиями по 5 кг каждый четверг и развозим по Минску в пятницу. Без складов, пафоса и залежалого зерна.
            </p>

            {/* CTA Кнопки */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs sm:text-sm font-semibold uppercase tracking-wider px-7 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg text-center"
              >
                <span>Выбрать зерно в сезон</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#subscription"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-sand-100 text-coffee-900 border border-sand-300 hover:border-coffee-500 text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-4 rounded-full transition-all duration-200 text-center"
              >
                <span>Подписка — 54 BYN / мес</span>
              </a>
            </div>

            {/* Микро-подпись с иконкой */}
            <div className="pt-3 flex items-center gap-2.5 text-xs text-coffee-500">
              <Truck className="w-4 h-4 text-terracotta flex-shrink-0" />
              <span>Бесплатная доставка по Минску при заказе от 50 BYN или по подписке</span>
            </div>

            {/* Факты в одну строку */}
            <div className="pt-6 border-t border-sand-200 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-coffee-900">5 кг</p>
                <p className="text-[11px] sm:text-xs text-coffee-500 uppercase tracking-wider mt-0.5">Размер партии</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-coffee-900">1–3 дня</p>
                <p className="text-[11px] sm:text-xs text-coffee-500 uppercase tracking-wider mt-0.5">Свежесть в чашке</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-coffee-900">100%</p>
                <p className="text-[11px] sm:text-xs text-coffee-500 uppercase tracking-wider mt-0.5">Спешелти зерно</p>
              </div>
            </div>

          </div>

          {/* Правая колонка: Репортажное фото и стикер партии */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Рамка изображения с эффектом винтажной фотокарточки */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[5/4]">
                <Image
                  src="/images/hero-hands.jpg"
                  alt="Свежеобжаренное зерно в руках бариста обжарки Кварта"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />

                {/* Вшитый бейдж "ЧЕТВЕРГ = ОБЖАРКА" */}
                <div className="absolute top-4 right-4 bg-terracotta text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
                  Четверг = Обжарка
                </div>
              </div>

              {/* Плавающий крафтовый стикер партии */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-sand-50/95 backdrop-blur-md border border-sand-200 rounded-xl p-4 shadow-xl max-w-[210px]">
                <div className="text-[10px] font-bold tracking-widest text-coffee-500 uppercase pb-1.5 mb-2 border-b border-sand-200 flex items-center justify-between">
                  <span>КВАРТА · ПАРТИЯ</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-olive" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-coffee-700">
                    <span className="text-coffee-500">Партия:</span>
                    <span className="font-semibold text-coffee-900">5 кг</span>
                  </div>
                  <div className="flex justify-between text-coffee-700">
                    <span className="text-coffee-500">Обжарка:</span>
                    <span className="font-semibold text-coffee-900">Четверг</span>
                  </div>
                  <div className="flex justify-between text-coffee-700">
                    <span className="text-coffee-500">Доставка:</span>
                    <span className="font-semibold text-coffee-900">Пятница</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
