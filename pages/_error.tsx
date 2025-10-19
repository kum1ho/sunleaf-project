import Head from 'next/head';
import Link from 'next/link';

function Error({ statusCode, hasGetInitialPropsRun, err }) {
  return (
    <>
      <Head>
        <title>{statusCode} - Помилка | Sunleaf</title>
        <meta name="description" content="Виникла помилка. Спробуйте пізніше або зверніться до служби підтримки." />
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
            fontSize: '80px',
            marginBottom: '20px'
          }}>
            {statusCode === 404 ? '🤔' : '😵'}
          </div>

          <h1 style={{
            fontSize: '32px',
            color: '#333',
            marginBottom: '16px'
          }}>
            {statusCode === 404 ? 'Сторінка не знайдена' : 'Виникла помилка'}
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            {statusCode === 404 
              ? 'Сторінка яку ви шукаєте не існує.'
              : 'Щось пішло не так. Спробуйте оновити сторінку.'
            }
          </p>

          <Link href="/" style={{
            display: 'inline-block',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            fontWeight: '600'
          }}>
            🏠 Повернутися на головну
          </Link>

          {statusCode !== 404 && (
            <div style={{
              marginTop: '32px',
              padding: '16px',
              background: '#fff3cd',
              borderRadius: '8px',
              color: '#856404',
              fontSize: '14px'
            }}>
              💡 Якщо проблема повторюється, зверніться до служби підтримки: info@sunleaf.ua
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
