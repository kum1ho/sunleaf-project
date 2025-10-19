const jwt = require('jsonwebtoken');
const { parse } = require('csv-parse/sync');
const JWT_SECRET = 'sunleaf_secret_key_2024';
const fs = require('fs');
const path = require('path');

function getToken(req) {
  const h = req.headers.authorization;
  if (h?.startsWith('Bearer ')) return h.slice(7);
  const cookie = req.headers.cookie || '';
  const m = cookie.match(/sunleaf_token=([^;]+)/);
  return m ? m[1] : null;
}

// Парсинг 1C CSV/XML
function parse1C(fileContent, format = 'csv') {
  if (format === 'csv') {
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ';',
      encoding: 'utf8',
    });
    
    return records.map((r, i) => ({
      id: i + 1000,
      slug: transliterate(r.Название || r.Name || `product-${i}`),
      name: r.Название || r.Name || 'Без назви',
      category: mapCategory(r.Категория || r.Category),
      categoryName: getCategoryName(r.Категория || r.Category),
      description: r.Описание || r.Description || '',
      price: parseFloat(r.Цена || r.Price || 0),
      image: r.Изображение || r.Image || '/images/placeholder.jpg',
      country: r.Страна || r.Country || 'Україна',
      features: (r.Особенности || r.Features || '').split('|').filter(Boolean),
      specs: parseSpecs(r.Характеристики || r.Specs || ''),
    }));
  }
  
  // Тут можна додати XML парсинг
  return [];
}

// Транслітерація для slug
function transliterate(text) {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ye',
    'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k', 'л': 'l',
    'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '', 'ю': 'yu', 'я': 'ya',
    ' ': '-', "'": '', '"': '', ',': '', '.': '', '!': '', '?': '', ':': '', ';': '', '(': '', ')': ''
  };
  
  return text.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// Мапінг категорій
function mapCategory(cat) {
  const lowerCat = (cat || '').toLowerCase();
  if (lowerCat.includes('кава') || lowerCat.includes('coffee')) return 'coffee';
  if (lowerCat.includes('чай') || lowerCat.includes('tea')) return 'tea';
  if (lowerCat.includes('солод') || lowerCat.includes('sweet') || lowerCat.includes('шоколад')) return 'sweets';
  return 'coffee';
}

function getCategoryName(cat) {
  const mapped = mapCategory(cat);
  return mapped === 'coffee' ? 'Кава' : mapped === 'tea' ? 'Чай' : 'Солодощі';
}

// Парсинг характеристик з формату "key:value|key:value"
function parseSpecs(specsStr) {
  return (specsStr || '').split('|').filter(Boolean).map(pair => {
    const [label, value] = pair.split(':');
    return { label: label?.trim() || '', value: value?.trim() || '' };
  });
}

// Парсинг переваг
function parseFeatures(featuresStr) {
  if (!featuresStr) return [];
  return featuresStr.split('|').filter(Boolean).map(f => f.trim());
}

// Обробка CSV
function parseCSV(csvData) {
  const lines = csvData.trim().split('\n');
  const products = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(';');
    if (values.length < 4) continue; // Пропускаємо некоректні рядки

    const name = values[0]?.trim();
    const category = values[1]?.trim();
    const price = parseFloat(values[2]) || 0;
    const description = values[3]?.trim() || '';
    const country = values[4]?.trim() || 'Україна';
    const specs = values[5]?.trim() || '';
    const features = values[6]?.trim() || '';

    if (!name || !category || !price) continue;

    const product = {
      id: Date.now() + i,
      slug: transliterate(name),
      name,
      category: mapCategory(category),
      categoryName: getCategoryName(category),
      description,
      price,
      image: `/images/${transliterate(name)}.jpg`,
      country,
      features: parseFeatures(features),
      specs: parseSpecs(specs),
      stock: 100,
      unit: 'кг',
      status: 'В наявності',
      sku: `IMPORT-${Date.now()}-${i}`,
      supplier: 'Імпорт 1C'
    };

    products.push(product);
  }

  return products;
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { csvData } = req.body || {};

    if (!csvData || !csvData.trim()) {
      return res.status(400).json({ error: 'CSV дані обов\'язкові' });
    }

    const lines = csvData.trim().split('\n');
    
    if (lines.length < 2) {
      return res.status(400).json({ error: 'CSV має містити хоча б один рядок даних' });
    }

    // Використовуємо розширену функцію parseCSV
    const products = parseCSV(csvData);

    if (products.length === 0) {
      return res.status(400).json({ error: 'Не знайдено валідних товарів у CSV' });
    }

    return res.status(200).json({
      success: true,
      count: products.length,
      products: products,
      message: `Успішно оброблено ${products.length} товарів`
    });

  } catch (error) {
    console.error('[Import 1C] Error:', error);
    return res.status(500).json({ 
      error: 'Помилка обробки CSV даних',
      details: error.message 
    });
  }
}
