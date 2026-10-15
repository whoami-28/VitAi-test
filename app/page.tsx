import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Catalog from '@/components/sections/Catalog';
import Subscription from '@/components/sections/Subscription';
import Philosophy from '@/components/sections/Philosophy';
import Logistics from '@/components/sections/Logistics';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-sand-50 selection:bg-terracotta selection:text-white">
      {/* Шапка сайта */}
      <Header />

      {/* Основной контент */}
      <main className="flex-1">
        {/* Главный экран */}
        <Hero />

        {/* Каталог свежего зерна */}
        <Catalog />

        {/* Блок регулярной подписки */}
        <Subscription />

        {/* Философия: Почему только 5 кг & История основателей */}
        <Philosophy />

        {/* Доставка, самовывоз и интерактивная форма заявки */}
        <Logistics />
      </main>

      {/* Подвал с контактами и реквизитами */}
      <Footer />
    </div>
  );
}
