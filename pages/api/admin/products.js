import { query } from '../../../lib/database';
import { verifyToken } from '../../../lib/auth';

function auth(req) {
  const h = req.headers.authorization;
  const token = h?.startsWith('Bearer ') ? h.slice(7) : null;
  return token && verifyToken(token);
}

export default async function handler(req, res) {
  const user = auth(req);
  if (!user) return res.status(401).json({ error: 'Не авторизовано' });

  try {
    if (req.method === 'GET') {
      const { rows } = await query(`SELECT * FROM products ORDER BY created_at DESC LIMIT 200`);
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { name, slug, category_id, price, description, image_url, country_of_origin, stock_quantity, min_order_quantity } = req.body || {};
      if (!name || !slug || !category_id || !price) return res.status(400).json({ error: 'Необхідні поля відсутні' });
      const { rows } = await query(
        `INSERT INTO products (name, slug, category_id, price, description, image_url, country_of_origin, stock_quantity, min_order_quantity)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
        [name, slug, category_id, price, description || null, image_url || null, country_of_origin || null, stock_quantity || 0, min_order_quantity || 5]
      );
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, ...data } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id обовʼязковий' });

      const fields = Object.keys(data);
      if (!fields.length) return res.status(400).json({ error: 'Немає полів для оновлення' });

      const sets = fields.map((k, i) => `${k} = $${i + 1}`).join(', ');
      const params = fields.map((k) => data[k]);
      params.push(id);

      const { rows } = await query(`UPDATE products SET ${sets}, updated_at = NOW() WHERE id = $${params.length} RETURNING *`, params);
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'id обовʼязковий' });
      await query(`DELETE FROM products WHERE id = $1`, [id]);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (e) {
    return res.status(500).json({ error: 'Помилка сервера' });
  }
}
