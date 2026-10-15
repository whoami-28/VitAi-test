'use client';

import React, { useState } from 'react';
import { Coffee, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Верхняя строка статуса производства */}
      <div className="bg-sand-100 border-b border-sand-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-olive"></span>
            </span>
            <span className="font-medium text-coffee-800 tracking-wide text-[11px] sm:text-xs">
              СВЕЖАЯ ОБЖАРКА КАЖДЫЙ ЧЕТВЕРГ · ДОСТАВКА В ПЯТНИЦУ
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-coffee-500 text-[11px]">
            <span>Минск, ул. Короля, 9</span>
            <span>·</span>
            <a href="tel:+375291234567" className="hover:text-coffee-900 transition-colors">
              +375 (29) 123-45-67
            </a>
          </div>
        </div>
      </div>

      {/* Основная шапка */}
      <header className="sticky top-0 z-40 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Логотип */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-sand-200/80 flex items-center justify-center text-coffee-900 group-hover:bg-terracotta group-hover:text-white transition-colors duration-200">
              <Coffee className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl tracking-wider text-coffee-950 uppercase leading-none">
                Кварта
              </span>
              <span className="text-[10px] uppercase tracking-widest text-coffee-500 font-semibold mt-1">
                Минск · С 2019 года
              </span>
            </div>
          </a>

          {/* Навигация для десктопа */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide text-coffee-700">
            <a href="#catalog" className="hover:text-terracotta transition-colors">
              Каталог зерна
            </a>
            <a href="#subscription" className="hover:text-terracotta transition-colors">
              Подписка
            </a>
            <a href="#philosophy" className="hover:text-terracotta transition-colors">
              О мастерской
            </a>
            <a href="#logistics" className="hover:text-terracotta transition-colors">
              Доставка и самовывоз
            </a>
          </nav>

          {/* Правая часть: CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#order-form"
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-full transition-all duration-200 shadow-sm hover:shadow"
            >
              <span>Оставить заявку</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Кнопка мобильного меню */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-coffee-800 hover:text-terracotta focus:outline-none"
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Выпадающее меню для мобильных */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-sand-50 border-b border-sand-200 px-4 pt-3 pb-6 space-y-4">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-coffee-800 py-2 border-b border-sand-200"
            >
              Каталог зерна
            </a>
            <a
              href="#subscription"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-coffee-800 py-2 border-b border-sand-200"
            >
              Кофе по подписке (54 BYN)
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-coffee-800 py-2 border-b border-sand-200"
            >
              Почему только по 5 кг
            </a>
            <a
              href="#logistics"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-coffee-800 py-2 border-b border-sand-200"
            >
              Доставка и самовывоз
            </a>
            <a
              href="#order-form"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block bg-terracotta text-white text-sm font-semibold uppercase tracking-wider py-3 rounded-full"
            >
              Оставить заявку
            </a>
          </div>
        )}
      </header>
    </>
  );
}
