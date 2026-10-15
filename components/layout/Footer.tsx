import React from 'react';
import { Coffee, MapPin, Phone, Mail, Send, Calendar } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sand-100 border-t border-sand-200 text-coffee-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-sand-200">
          
          {/* Колонка 1: Бренд и манифест */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sand-200 flex items-center justify-center text-coffee-900">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-2xl uppercase tracking-wider text-coffee-950">
                Кварта
              </span>
            </div>

            <p className="text-xs text-coffee-700 leading-relaxed">
              Мастерская свежего кофе и исторический крафт. Минск. Чистый вкус спешелти зерна первой свежей обжарки с 2019 года.
            </p>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-olive bg-olive-light px-3 py-1 rounded-full border border-olive/20">
              <span>★ Храним традицию чистоты вкуса</span>
            </div>
          </div>

          {/* Колонка 2: Мастерская и цех */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-coffee-500">
              Мастерская и цех
            </h4>
            <div className="space-y-2 text-xs text-coffee-700">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                <span>г. Минск, ул. Короля, 9<br />(вход со двора через зеленую арку)</span>
              </p>
              <div className="pt-2 text-coffee-600 space-y-1">
                <p>Пн–Пт: 08:00 – 20:00</p>
                <p>Сб–Вс: 10:00 – 18:00</p>
              </div>
            </div>
          </div>

          {/* Колонка 3: Связь и заказы */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-coffee-500">
              Связь и заказы
            </h4>
            <div className="space-y-2.5 text-xs text-coffee-700">
              <a
                href="tel:+375291234567"
                className="flex items-center gap-2 hover:text-terracotta transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-terracotta" />
                <span className="font-mono">+375 (29) 123-45-67</span>
              </a>
              <a
                href="mailto:hello@kvarta.coffee"
                className="flex items-center gap-2 hover:text-terracotta transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-terracotta" />
                <span>hello@kvarta.coffee</span>
              </a>
              <a
                href="https://t.me/kvarta_minsk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-terracotta transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-terracotta" />
                <span>@kvarta_minsk</span>
              </a>
            </div>
          </div>

          {/* Колонка 4: Дни выдачи */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-coffee-500">
              Дни выдачи
            </h4>
            <div className="bg-white rounded-xl p-4 border border-sand-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-coffee-950 font-serif font-bold text-base">
                <Calendar className="w-4 h-4 text-terracotta" />
                <span>Четверг & Пятница</span>
              </div>
              <p className="text-[11px] text-coffee-600 leading-normal">
                Каждую среду закрываем прием заявок на текущий обжарочный день в 23:00.
              </p>
            </div>
          </div>

        </div>

        {/* Нижняя полоса копирайта */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-coffee-500 gap-4">
          <p>© 2024–2026 Обжарка кофе «Кварта». Все права защищены.</p>
          <p className="flex items-center gap-2">
            <span>Сделано в Минске</span>
            <span>·</span>
            <span>Артизанская обжарка кофе</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
