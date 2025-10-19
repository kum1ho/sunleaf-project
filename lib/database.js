const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in .env.local');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
});

// Тест підключення
pool.on('connect', () => {
  console.log('[DB] Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('[DB] Unexpected error on idle client', err);
});

async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    if (process.env.NODE_ENV !== 'production') {
      const duration = Date.now() - start;
      console.log('[DB] Query executed', { duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('[DB] Query error:', error);
    throw error;
  }
}

module.exports = { pool, query };
