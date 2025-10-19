const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(process.cwd(), 'sunleaf.db'), (err) => {
  if (err) {
    console.error('SQLite connection error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

async function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({ rows, rowCount: rows.length });
      }
    });
  });
}

module.exports = { query };
