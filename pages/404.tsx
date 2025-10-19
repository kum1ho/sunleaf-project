import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Сторінка не знайдена | Sunleaf</title>
        <meta name="description" content="Сторінка не знайдена. Поверніться на головну сторінку Sunleaf." />
      </Head>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{
            fontSize: '120px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px'
          }}>
            404
          </div>

          <h1 style={{
            fontSize: '32px',
            color: '#333',
            marginBottom: '16px'
          }}>
            Сторінка не знайдена
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            На жаль, сторінка яку ви шукаєте не існує або була переміщена.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              transition: 'transform 0.3s ease'
            }}>
              🏠 На головну
            </Link>

            <Link href="/product" style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#0057B7',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              transition: 'transform 0.3s ease'
            }}>
              ☕ Каталог
            </Link>
          </div>

          <div style={{
            marginTop: '40px',
            padding: '20px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#0057B7', marginBottom: '12px' }}>Потрібна допомога?</h3>
            <p style={{ color: '#666', marginBottom: '16px' }}>Зв'яжіться з нами:</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="tel:+380671234567" style={{ color: '#0057B7', textDecoration: 'none' }}>
                📞 +380 67 123-45-67
              </a>
              <a href="mailto:info@sunleaf.ua" style={{ color: '#0057B7', textDecoration: 'none' }}>
                📧 info@sunleaf.ua
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
