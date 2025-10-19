const PRODUCTS = {
  // ========== КАВА ==========
  'arabica-premium': {
    id: 1,
    slug: 'arabica-premium',
    name: 'Арабіка преміум',
    category: 'coffee',
    categoryName: 'Кава',
    description: 'Висококласна арабіка з плантацій Ефіопії, Бразилії та Колумбії. Середнє обсмажування, збалансований смак з нотками шоколаду та карамелі.',
    price: 320,
    image: '/images/arabica.jpg',
    country: 'Ефіопія, Бразилія, Колумбія',
    features: [
      'Свіжообсмажена (макс. 2 тижні після обсмаження)',
      'Вирощена на висоті 1200-1800м над рівнем моря',
      'Екологічна упаковка з клапаном для свіжості',
      'Сертифікати якості ISO, Rainforest Alliance',
      '100% натуральна без добавок',
    ],
    specs: [
      { label: 'Сорт', value: 'Арабіка 100%' },
      { label: 'Обсмаження', value: 'Середнє (City Roast)' },
      { label: 'Кислотність', value: 'Помірна' },
      { label: 'Смакові ноти', value: 'Шоколад, карамель, горіх' },
      { label: 'Термін зберігання', value: '12 місяців' },
      { label: 'Мінімальне замовлення', value: '5 кг' },
    ],
  },
  'robusta': {
    id: 2,
    slug: 'robusta',
    name: 'Робуста',
    category: 'coffee',
    categoryName: 'Кава',
    description: 'Насичена робуста з В\'єтнаму та Індії. Ідеально підходить для еспресо-сумішей, надає густу крему та бадьорість.',
    price: 280,
    image: '/images/robusta.jpg',
    country: 'В\'єтнам, Індія',
    features: [
      'Високий вміст кофеїну (в 2 рази більше за арабіку)',
      'Ідеальна для еспресо та блендів',
      'Стійкий насичений аромат',
      'Вигідна ціна для бізнесу',
      'Довге післясмак',
    ],
    specs: [
      { label: 'Сорт', value: 'Робуста 100%' },
      { label: 'Обсмаження', value: 'Темне (Full City)' },
      { label: 'Кислотність', value: 'Низька' },
      { label: 'Смакові ноти', value: 'Гірке какао, горіх, спеції' },
      { label: 'Термін зберігання', value: '12 місяців' },
      { label: 'Мінімальне замовлення', value: '5 кг' },
    ],
  },
  'espresso-blend': {
    id: 3,
    slug: 'espresso-blend',
    name: 'Суміші для еспресо',
    category: 'coffee',
    categoryName: 'Кава',
    description: 'Збалансована суміш арабіки та робусти (70/30) для ідеального еспресо. Густа крема, насичений смак, стабільний результат.',
    price: 350,
    image: '/images/espresso-blend.jpg',
    country: 'Бленд міжнародний',
    features: [
      'Оптимальна суміш 70% арабіка + 30% робуста',
      'Ідеальна для кав\'ярень та ресторанів',
      'Стабільна крема та смак',
      'Підходить для всіх типів кавомашин',
      'Розроблено професійними каптестерами',
    ],
    specs: [
      { label: 'Сорт', value: '70% Арабіка, 30% Робуста' },
      { label: 'Обсмаження', value: 'Середньо-темне' },
      { label: 'Кислотність', value: 'Збалансована' },
      { label: 'Смакові ноти', value: 'Шоколад, карамель, горіх' },
      { label: 'Термін зберігання', value: '12 місяців' },
      { label: 'Мінімальне замовлення', value: '5 кг' },
    ],
  },
  'capsules': {
    id: 4,
    slug: 'capsules',
    name: 'Капсули для кавомашин',
    category: 'coffee',
    categoryName: 'Кава',
    description: 'Преміум капсули сумісні з Nespresso, Dolce Gusto. Свіжообсмажена кава в герметичній упаковці.',
    price: 45,
    image: '/images/capsules.jpg',
    country: 'Італія, Швейцарія',
    features: [
      'Сумісність: Nespresso, Dolce Gusto, Lavazza',
      'Алюмінієва упаковка для свіжості',
      'Різні смаки: еспресо, лунго, капучино',
      'Зручність та швидкість приготування',
      'Ідеально для офісів та готелів',
    ],
    specs: [
      { label: 'Упаковка', value: '10 капсул' },
      { label: 'Сумісність', value: 'Nespresso, Dolce Gusto' },
      { label: 'Обсмаження', value: 'Різне (залежно від смаку)' },
      { label: 'Термін зберігання', value: '18 місяців' },
      { label: 'Мінімальне замовлення', value: '10 упаковок' },
    ],
  },

  // ========== ЧАЙ ==========
  'black-tea': {
    id: 5,
    slug: 'black-tea',
    name: 'Чорний чай',
    category: 'tea',
    categoryName: 'Чай',
    description: 'Класичний чорний чай з Цейлону, Ассаму та Дарджилінгу. Насичений смак, яскравий аромат.',
    price: 180,
    image: '/images/black-tea.jpg',
    country: 'Цейлон, Ассам, Дарджилінг',
    features: [
      'Класичні сорти світового рівня',
      'Великий лист для максимального смаку',
      'Ідеально для чайних церемоній',
      'Багатий на антиоксиданти',
      'Підходить для гарячого та холодного заварювання',
    ],
    specs: [
      { label: 'Тип', value: 'Чорний чай' },
      { label: 'Регіон', value: 'Цейлон, Індія' },
      { label: 'Ферментація', value: 'Повна' },
      { label: 'Смак', value: 'Насичений, терпкий' },
      { label: 'Термін зберігання', value: '24 місяці' },
      { label: 'Мінімальне замовлення', value: '5 кг' },
    ],
  },
  'green-tea': {
    id: 6,
    slug: 'green-tea',
    name: 'Зелений чай',
    category: 'tea',
    categoryName: 'Чай',
    description: 'Зелений чай преміум класу з Японії та Китаю. Свіжий, тонізуючий, корисний.',
    price: 220,
    image: '/images/green-tea.jpg',
    country: 'Японія, Китай',
    features: [
      'Багатий на антиоксиданти та вітаміни',
      'Допомагає схуднути та покращити обмін речовин',
      'Тонізує та бадьорить',
      'М\'який свіжий смак',
      'Можна заварювати 2-3 рази',
    ],
    specs: [
      { label: 'Тип', value: 'Зелений чай' },
      { label: 'Регіон', value: 'Японія, Китай' },
      { label: 'Ферментація', value: 'Мінімальна' },
      { label: 'Смак', value: 'Свіжий, трав\'янистий' },
      { label: 'Термін зберігання', value: '18 місяців' },
      { label: 'Мінімальне замовлення', value: '5 кг' },
    ],
  },

  // ========== СОЛОДОЩІ ==========
  'premium-chocolate': {
    id: 7,
    slug: 'premium-chocolate',
    name: 'Шоколад преміум',
    category: 'sweets',
    categoryName: 'Солодощі',
    description: 'Бельгійський та швейцарський шоколад найвищої якості. Ідеально для кав\'ярень.',
    price: 450,
    image: '/images/premium-chocolate.jpg',
    country: 'Бельгія, Швейцарія',
    features: [
      'Натуральні інгредієнти без пальмової олії',
      'Високий вміст какао (55-75%)',
      'Ідеально поєднується з кавою',
      'Різні види: молочний, темний, білий',
      'Преміум упаковка',
    ],
    specs: [
      { label: 'Тип', value: 'Шоколад преміум' },
      { label: 'Вміст какао', value: '55-75%' },
      { label: 'Країна', value: 'Бельгія, Швейцарія' },
      { label: 'Термін зберігання', value: '12 місяців' },
      { label: 'Мінімальне замовлення', value: '5 кг' },
    ],
  },
};

function getAllProducts() {
  return Object.values(PRODUCTS);
}

function getProductBySlug(slug) {
  return PRODUCTS[slug] || null;
}

function getProductsByCategory(category) {
  console.log('[Products Data] Getting category:', category);
  const filtered = Object.values(PRODUCTS).filter(p => p.category === category);
  console.log('[Products Data] Found products:', filtered.length);
  return filtered;
}

module.exports = { PRODUCTS, getAllProducts, getProductBySlug, getProductsByCategory };
