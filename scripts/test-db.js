const { Client } = require('pg');
const path = require('path');
const fs = require('fs');

// Читаємо .env.local вручну
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  });
  console.log('✅ Loaded .env.local');
} else {
  console.error('❌ .env.local not found!');
  process.exit(1);
}

async function testConnection() {
  console.log('\nTesting database connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@') || 'NOT SET'); // Hide password
  
  if (!process.env.DATABASE_URL) {
    console.error('\n❌ DATABASE_URL is not defined in .env.local');
    console.error('\nExpected format:');
    console.error('DATABASE_URL="postgresql://username:password@localhost:5432/database_name"');
    console.error('\nExample:');
    console.error('DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sunleaf_db"');
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('\n🔄 Connecting to PostgreSQL...');
    await client.connect();
    console.log('✅ Successfully connected to PostgreSQL!\n');
    
    const result = await client.query('SELECT current_database(), current_user, version()');
    console.log('📊 Connection details:');
    console.log('   Database:', result.rows[0].current_database);
    console.log('   User:', result.rows[0].current_user);
    console.log('   Version:', result.rows[0].version.split(',')[0]);
    console.log('\n✅ Database connection test passed!\n');
    
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    console.error('\n🔧 Troubleshooting steps:');
    console.error('   1. Check if PostgreSQL is running:');
    console.error('      Windows: services.msc → PostgreSQL → Start');
    console.error('      Mac: brew services start postgresql');
    console.error('      Linux: sudo systemctl start postgresql');
    console.error('   2. Verify DATABASE_URL in .env.local');
    console.error('   3. Check username/password are correct');
    console.error('   4. Ensure database exists:');
    console.error('      psql -U postgres');
    console.error('      CREATE DATABASE sunleaf_db;');
    console.error('      \\q');
    console.error('\n💡 Common DATABASE_URL formats:');
    console.error('   postgresql://postgres:password@localhost:5432/sunleaf_db');
    console.error('   postgresql://user:password@localhost:5432/database_name\n');
    process.exit(1);
  }
}

testConnection();
