export type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string; // кг, уп, л
};

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem('sunleaf_cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sunleaf_cart', JSON.stringify(cart));
  // Dispatch event для синхронізації між компонентами
  window.dispatchEvent(new Event('cartUpdated'));
}

export function addToCart(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
  const cart = getCart();
  const existingIndex = cart.findIndex(i => i.slug === item.slug);
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  
  saveCart(cart);
}

export function updateQuantity(slug: string, quantity: number): void {
  const cart = getCart();
  const item = cart.find(i => i.slug === slug);
  
  if (item) {
    item.quantity = Math.max(0, quantity);
    saveCart(cart.filter(i => i.quantity > 0));
  }
}

export function removeFromCart(slug: string): void {
  const cart = getCart().filter(i => i.slug !== slug);
  saveCart(cart);
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
