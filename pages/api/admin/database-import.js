const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, dataType, format = 'csv' } = req.body;

    if (!data || !dataType) {
      return res.status(400).json({ error: 'Дані та тип обов\'язкові' });
    }

    console.log(`[Database Import] Processing ${format} data for ${dataType}`);
    
    let processedData = [];
    
    // Обробка різних форматів
    switch (format) {
      case 'csv':
        processedData = processCSV(data, dataType);
        break;
      case 'json':
        processedData = processJSON(data, dataType);
        break;
      case 'sql':
        processedData = processSQL(data, dataType);
        break;
      default:
        return res.status(400).json({ error: 'Непідтримуваний формат' });
    }

    // Збереження результату
    const outputPath = path.join(process.cwd(), 'data', `imported-${dataType}-${Date.now()}.json`);
    
    // Створюємо папку data якщо не існує
    const dataDir = path.dirname(outputPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      dataType,
      format,
      totalRecords: processedData.length,
      data: processedData
    }, null, 2));

    console.log(`[Database Import] Saved ${processedData.length} records to ${outputPath}`);

    return res.status(200).json({
      success: true,
      count: processedData.length,
      dataType,
      filePath: outputPath,
      preview: processedData.slice(0, 5),
      message: `Успішно імпортовано ${processedData.length} записів типу ${dataType}`
    });

  } catch (error) {
    console.error('[Database Import] Error:', error);
    return res.status(500).json({ 
      error: 'Помилка імпорту', 
      details: error.message 
    });
  }
}

function processCSV(csvData, dataType) {
  const lines = csvData.trim().split('\n');
  if (lines.length < 2) throw new Error('CSV має містити заголовки та дані');
  
  const headers = lines[0].split(';').map(h => h.trim());
  const records = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(';').map(v => v.trim().replace(/['"]/g, ''));
    if (values.length === headers.length) {
      const record = {};
      headers.forEach((header, idx) => {
        record[header] = values[idx];
      });
      records.push(transformRecord(record, dataType));
    }
  }
  
  return records;
}

function processJSON(jsonData, dataType) {
  const parsed = JSON.parse(jsonData);
  const records = Array.isArray(parsed) ? parsed : [parsed];
  return records.map(record => transformRecord(record, dataType));
}

function processSQL(sqlData, dataType) {
  const insertRegex = /INSERT\s+INTO\s+\w+\s*\([^)]+\)\s*VALUES\s*\(([^)]+)\)/gi;
  const records = [];
  let match;
  
  while ((match = insertRegex.exec(sqlData)) !== null) {
    const values = match[1].split(',').map(v => v.trim().replace(/['"]/g, ''));
    // Тут потрібно знати структуру таблиці для правильного мапінгу
    records.push(transformRecord({ values }, dataType));
  }
  
  return records;
}

function transformRecord(record, dataType) {
  const baseRecord = {
    id: Date.now() + Math.random(),
    createdAt: new Date().toISOString(),
    importedAt: new Date().toISOString()
  };

  switch (dataType) {
    case 'customers':
      return {
        ...baseRecord,
        name: record.name || record.Назва || 'Без назви',
        contact: record.contact || record.Контакт || '',
        phone: record.phone || record.Телефон || '',
        email: record.email || record.Email || '',
        type: record.type || record.Тип || 'Кав\'ярня',
        address: record.address || record.Адреса || '',
        orders: parseInt(record.orders || record.Замовлень) || 0,
        total: parseFloat(record.total || record.Сума) || 0,
        notes: record.notes || record.Примітки || ''
      };

    case 'products':
      return {
        ...baseRecord,
        name: record.name || record.Назва || 'Без назви',
        category: record.category || record.Категорія || 'Кава',
        price: parseFloat(record.price || record.Ціна) || 0,
        cost: parseFloat(record.cost || record.Собівартість) || 0,
        stock: parseFloat(record.stock || record.Залишок) || 0,
        unit: record.unit || record.Одиниця || 'кг',
        sku: record.sku || record.SKU || `SKU-${Date.now()}`,
        supplier: record.supplier || record.Постачальник || '',
        description: record.description || record.Опис || ''
      };

    case 'orders':
      return {
        ...baseRecord,
        orderId: record.orderId || record.Номер || `#${Date.now()}`,
        client: record.client || record.Клієнт || 'Без назви',
        contact: record.contact || record.Контакт || '',
        phone: record.phone || record.Телефон || '',
        amount: parseFloat(record.amount || record.Сума) || 0,
        status: record.status || record.Статус || 'Нове',
        date: record.date || record.Дата || new Date().toISOString().split('T')[0],
        notes: record.notes || record.Примітки || ''
      };

    case 'suppliers':
      return {
        ...baseRecord,
        name: record.name || record.Назва || 'Без назви',
        contact: record.contact || record.Контакт || '',
        phone: record.phone || record.Телефон || '',
        email: record.email || record.Email || '',
        country: record.country || record.Країна || 'Україна',
        rating: parseFloat(record.rating || record.Рейтинг) || 5,
        terms: record.terms || record.Умови || ''
      };

    default:
      return { ...baseRecord, ...record };
  }
}
