const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sqlData, tableType } = req.body;

    if (!sqlData || !tableType) {
      return res.status(400).json({ error: 'SQL дані та тип таблиці обов\'язкові' });
    }

    console.log('[DB Import] Processing SQL for table type:', tableType);

    let result = {};

    switch (tableType) {
      case 'customers':
        result = importCustomers(sqlData);
        break;
      case 'orders':
        result = importOrders(sqlData);
        break;
      case 'products':
        result = importProducts(sqlData);
        break;
      default:
        return res.status(400).json({ error: 'Невідомий тип таблиці' });
    }

    // Зберігаємо дані у відповідний файл
    const outputPath = path.join(process.cwd(), 'lib', `imported-${tableType}.js`);
    const fileContent = `// Auto-imported ${tableType} from database at ${new Date().toISOString()}
export const IMPORTED_${tableType.toUpperCase()} = ${JSON.stringify(result.data, null, 2)};

export function getImported${tableType.charAt(0).toUpperCase() + tableType.slice(1)}() {
  return IMPORTED_${tableType.toUpperCase()};
}
`;

    fs.writeFileSync(outputPath, fileContent, 'utf8');

    return res.status(200).json({
      success: true,
      count: result.count,
      type: tableType,
      message: `Успішно імпортовано ${result.count} записів типу ${tableType}`
    });

  } catch (error) {
    console.error('[DB Import] Error:', error);
    return res.status(500).json({ 
      error: 'Помилка імпорту БД', 
      details: error.message 
    });
  }
}

function importCustomers(sqlData) {
  // Парсинг INSERT statements для клієнтів
  const customers = [];
  const lines = sqlData.split('\n');
  
  for (const line of lines) {
    if (line.trim().startsWith('INSERT INTO') && line.includes('customers')) {
      // Простий парсинг SQL INSERT
      const matches = line.match(/VALUES\s*\((.*?)\)/g);
      if (matches) {
        matches.forEach(match => {
          const values = match.replace('VALUES (', '').replace(')', '').split(',').map(v => v.trim().replace(/['"]/g, ''));
          if (values.length >= 4) {
            customers.push({
              id: customers.length + 1,
              name: values[1] || 'Клієнт',
              contact: values[2] || 'Контакт',
              phone: values[3] || '+380 XX XXX XX XX',
              email: values[4] || 'email@example.com',
              type: values[5] || 'Кав\'ярня',
              orders: parseInt(values[6]) || 0,
              total: parseFloat(values[7]) || 0
            });
          }
        });
      }
    }
  }
  
  return { data: customers, count: customers.length };
}

function importOrders(sqlData) {
  const orders = [];
  const lines = sqlData.split('\n');
  
  for (const line of lines) {
    if (line.trim().startsWith('INSERT INTO') && line.includes('orders')) {
      const matches = line.match(/VALUES\s*\((.*?)\)/g);
      if (matches) {
        matches.forEach(match => {
          const values = match.replace('VALUES (', '').replace(')', '').split(',').map(v => v.trim().replace(/['"]/g, ''));
          if (values.length >= 5) {
            orders.push({
              id: orders.length + 1,
              orderId: values[1] || `#${Date.now()}`,
              client: values[2] || 'Клієнт',
              items: values[3] || 'Товари',
              amount: parseFloat(values[4]) || 0,
              status: values[5] || 'Нове',
              date: values[6] || new Date().toISOString().split('T')[0]
            });
          }
        });
      }
    }
  }
  
  return { data: orders, count: orders.length };
}

function importProducts(sqlData) {
  const products = [];
  const lines = sqlData.split('\n');
  
  for (const line of lines) {
    if (line.trim().startsWith('INSERT INTO') && line.includes('products')) {
      const matches = line.match(/VALUES\s*\((.*?)\)/g);
      if (matches) {
        matches.forEach(match => {
          const values = match.replace('VALUES (', '').replace(')', '').split(',').map(v => v.trim().replace(/['"]/g, ''));
          if (values.length >= 4) {
            products.push({
              id: products.length + 1,
              name: values[1] || 'Товар',
              category: values[2] || 'Кава',
              price: parseFloat(values[3]) || 0,
              stock: parseFloat(values[4]) || 0,
              description: values[5] || '',
              image: values[6] || '☕',
              status: values[7] || 'В наявності'
            });
          }
        });
      }
    }
  }
  
  return { data: products, count: products.length };
}
