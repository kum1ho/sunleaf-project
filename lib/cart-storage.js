export function getCart() {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem('sunleaf_cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sunleaf_cart', JSON.stringify(cart));
  // Dispatch event для синхронізації між компонентами
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'));
  }
}

export function addToCart(item, quantity = 1) {
  const cart = getCart();
  const existingIndex = cart.findIndex(i => i.slug === item.slug);
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  
  saveCart(cart);
}

export function updateQuantity(slug, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.slug === slug);
  
  if (item) {
    item.quantity = Math.max(0, quantity);
    saveCart(cart.filter(i => i.quantity > 0));
  }
}

export function removeFromCart(slug) {
  const cart = getCart().filter(i => i.slug !== slug);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
