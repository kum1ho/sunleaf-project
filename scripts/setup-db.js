const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  console.log('🔗 Підключено до БД');

  try {
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        is_active BOOLEAN DEFAULT true
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category_id INTEGER REFERENCES categories(id),
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        stock_quantity INTEGER DEFAULT 0,
        min_order_quantity INTEGER DEFAULT 5,
        image_url VARCHAR(500),
        country_of_origin VARCHAR(100),
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255),
        email VARCHAR(100),
        phone VARCHAR(20),
        business_type VARCHAR(50),
        address TEXT,
        city VARCHAR(100),
        discount_rate DECIMAL(5,2) DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        client_id INTEGER REFERENCES clients(id),
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        delivery_address TEXT,
        delivery_city VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        total_price DECIMAL(10,2) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id),
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        is_approved BOOLEAN DEFAULT false,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_requests (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        email VARCHAR(100),
        phone VARCHAR(20),
        business_type VARCHAR(50),
        message TEXT,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      INSERT INTO categories (name, slug, description) VALUES
      ('Кава', 'coffee', 'Преміум кава з усього світу'),
      ('Чай', 'tea', 'Елітний чай різних сортів'),
      ('Солодощі', 'sweets', 'Якісні солодощі для вашого бізнесу')
      ON CONFLICT (slug) DO NOTHING;
    `);

    await client.query(`
      INSERT INTO products (name, slug, category_id, price, description) VALUES
      ('Арабіка Бразилія', 'arabica-brazil', 1, 320, 'Преміум арабіка з Бразилії'),
      ('Чай Цейлон', 'ceylon-tea', 2, 180, 'Класичний чорний чай з Цейлону'),
      ('Шоколад преміум', 'premium-chocolate', 3, 450, 'Якісний бельгійський шоколад')
      ON CONFLICT (slug) DO NOTHING;
    `);

    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin12345!';
    const email = process.env.ADMIN_EMAIL || 'admin@sunleaf.ua';

    console.log('Creating admin with username:', username);

    const hashed = await bcrypt.hash(password, 12);
    console.log('Password hashed successfully');

    // Перевірка, чи адмін вже існує
    const existingAdmin = await client.query('SELECT id FROM admins WHERE username = $1', [username]);
    if (existingAdmin.rows.length > 0) {
      console.log('⚠️ Admin already exists, updating password...');
      await client.query('UPDATE admins SET password_hash = $1 WHERE username = $2', [hashed, username]);
      console.log('✅ Admin password updated');
    } else {
      await client.query(
        `INSERT INTO admins (username, password_hash, email) VALUES ($1,$2,$3)`,
        [username, hashed, email]
      );
      console.log('✅ Admin created');
    }

    // Тест перевірки пароля
    const testHash = await bcrypt.compare(password, hashed);
    console.log('Password verification test:', testHash ? '✅ OK' : '❌ FAILED');

    console.log('\n📝 Login credentials:');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('URL: http://localhost:3000/admin\n');

    console.log('✅ База даних налаштована');
  } catch (e) {
    console.error('❌ Помилка налаштування:', e);
  } finally {
    await client.end();
  }
}

run();
