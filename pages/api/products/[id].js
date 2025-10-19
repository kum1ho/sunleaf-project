const { getProductBySlug, getProductsByCategory } = require('../../../lib/products-data');

module.exports = async function handler(req, res) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  const product = getProductBySlug(id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Схожі товари з тієї ж категорії
  const related = getProductsByCategory(product.category)
    .filter(p => p.slug !== id)
    .slice(0, 3);

  return res.status(200).json({ product, related });
};
