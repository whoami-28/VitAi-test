import { ImageResponse } from 'next/og';

export const alt = 'Обжарка кофе «Кварта» в Минске';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#FAF8F5',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          border: '16px solid #F5EFE6',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '24px',
              backgroundColor: '#C14E28',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            ☕
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '2px', color: '#1F1A17' }}>
              КВАРТА
            </span>
            <span style={{ fontSize: '14px', letterSpacing: '3px', color: '#7A6B61', textTransform: 'uppercase' }}>
              Минск · Обжарка с 2019 года
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F8ECE8',
              color: '#C14E28',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '16px',
              fontWeight: 600,
              width: 'auto',
            }}
          >
            Свежая обжарка каждый четверг
          </div>
          <h1
            style={{
              fontSize: '56px',
              lineHeight: 1.15,
              fontWeight: 700,
              color: '#1F1A17',
              margin: 0,
              maxWidth: '900px',
            }}
          >
            Кофе, который приезжает к вам на 1–3 день после обжарки.
          </h1>
          <p style={{ fontSize: '22px', color: '#4A3E36', margin: 0, maxWidth: '800px' }}>
            Жарим партиями по 5 кг строго под живой спрос. Без складов и лежалого зерна.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '2px solid #E8DFD1',
            paddingTop: '24px',
            fontSize: '16px',
            color: '#7A6B61',
          }}
        >
          <span>г. Минск, ул. Короля, 9</span>
          <span>Самовывоз и курьер по пятницам</span>
          <span style={{ color: '#C14E28', fontWeight: 600 }}>kvarta.coffee</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
