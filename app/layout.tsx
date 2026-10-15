import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontSerif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kvarta-coffee.vercel.app"),
  title: "Обжарка кофе «Кварта» | Минск — Свежесть на 1–3 день",
  description: "Маленькая ремесленная мастерская в Минске. Обжариваем партиями по 5 кг каждый четверг и развозим по пятницам. Без складов и залежалого зерна.",
  keywords: ["кофе минск", "свежая обжарка", "крафтовый кофе", "спешелти кофе", "подписка на кофе", "обжарка кварта"],
  openGraph: {
    title: "Обжарка кофе «Кварта» — Кофе на 1–3 день после обжарки",
    description: "Жарим маленькими партиями по 5 кг каждый четверг и развозим по Минску в пятницу. Без складов, пафоса и залежалого зерна.",
    locale: "ru_BY",
    type: "website",
    siteName: "Обжарка кофе «Кварта»",
  },
  twitter: {
    card: "summary_large_image",
    title: "Обжарка кофе «Кварта» | Минск",
    description: "Свежеобжаренное зерно прямо из ростера на 1–3 день. Доставка по Минску.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CoffeeRoastery",
    name: "Обжарка кофе «Кварта»",
    description: "Ремесленная обжарка спешелти кофе партиями по 5 кг в Минске.",
    telephone: "+375291234567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Короля, 9",
      addressLocality: "Минск",
      addressCountry: "BY",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    priceRange: "18-54 BYN",
  };

  return (
    <html lang="ru" className={`${fontSerif.variable} ${fontSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-sand-50 text-coffee-900 font-sans antialiased min-h-screen flex flex-col selection:bg-terracotta selection:text-white">
        {children}
      </body>
    </html>
  );
}
