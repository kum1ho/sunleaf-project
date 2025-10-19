import type { NextApiRequest, NextApiResponse } from 'next';

const PRODUCTS = [
  {
    id: 1,
    slug: 'arabica-premium',
    name: 'Арабіка преміум',
    category: 'coffee',
    price: 320,
    image: '/images/coffee-arabica.jpg',
    description: 'Елітна арабіка з високогір\'я Ефіопії',
    inStock: true,
    weight: '1кг',
    origin: 'Ефіопія',
    roast: 'Середнє'
  },
  {
    id: 2,
    slug: 'robusta-vietnam',
    name: 'Робуста В\'єтнам',
    category: 'coffee',
    price: 280,
    image: '/images/coffee-robusta.jpg',
    description: 'Насичена робуста для еспресо',
    inStock: true,
    weight: '1кг',
    origin: 'В\'єтнам',
    roast: 'Темне'
  },
  {
    id: 3,
    slug: 'ceylon-pekoe',
    name: 'Чай Цейлон PEKOE',
    category: 'tea',
    price: 240,
    image: '/images/tea-ceylon.jpg',
    description: 'Класичний чорний чай з Цейлону',
    inStock: true,
    weight: '500г',
    origin: 'Шрі-Ланка',
    type: 'Чорний'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { category } = req.query;
    
    let filteredProducts = PRODUCTS;
    
    if (category && category !== 'all') {
      filteredProducts = PRODUCTS.filter(product => product.category === category);
    }
    
    return res.status(200).json({
      success: true,
      products: filteredProducts,
      total: filteredProducts.length
    });
  }
  
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
