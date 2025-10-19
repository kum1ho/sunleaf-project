import { useState, useEffect } from 'react';

// Inline функції замість імпорту
function getCart() {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem('sunleaf_cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sunleaf_cart', JSON.stringify(cart));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'));
  }
}

function updateQuantity(slug, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.slug === slug);
  
  if (item) {
    item.quantity = Math.max(0, quantity);
    saveCart(cart.filter(i => i.quantity > 0));
  }
}

function removeFromCart(slug) {
  const cart = getCart().filter(i => i.slug !== slug);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [orderForm, setOrderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setCart(getCart());
    
    const handleUpdate = () => setCart(getCart());
    if (typeof window !== 'undefined') {
      window.addEventListener('cartUpdated', handleUpdate);
      return () => window.removeEventListener('cartUpdated', handleUpdate);
    }
  }, []);

  const total = getCartTotal();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const fd = new FormData(e.currentTarget);
    const orderData = {
      name: String(fd.get('name') || ''),
      phone: String(fd.get('phone') || ''),
      email: String(fd.get('email') || ''),
      company: String(fd.get('company') || ''),
      cart,
      total,
      message: `Замовлення:\n${cart.map(item => `${item.name} x ${item.quantity} ${item.unit} = ${(item.price * item.quantity).toLocaleString()} грн`).join('\n')}\n\nВсього: ${total.toLocaleString()} грн`,
    };

    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      
      if (r.ok) {
        setSuccess(true);
        clearCart();
        setCart([]);
        setTimeout(() => {
          setOrderForm(false);
          setSuccess(false);
          setOpen(false);
        }, 3000);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center', zIndex: 1100, padding: 20 }}>
          <div className="scale-in" style={{ width: '100%', maxWidth: 600, background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 25px 80px rgba(0,0,0,0.4)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)', color: '#fff', padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', display: 'grid', placeItems: 'center', fontSize: 24 }}>🛒</div>
                <div>
                  <strong style={{ fontSize: 18, display: 'block' }}>Корзина</strong>
                  <span style={{ fontSize: 12, opacity: 0.9 }}>{count} товарів на {total.toLocaleString()} грн</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'transparent', color: '#fff', border: 0, fontSize: 28, cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', transition: 'all 0.3s ease' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>×</button>
            </div>

            {!orderForm ? (
              <>
                {/* Cart Items */}
                <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
                      <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
                      <p>Корзина порожня</p>
                      <button onClick={() => setOpen(false)} style={{ marginTop: 20, background: '#0057B7', color: '#fff', border: 0, padding: '12px 24px', borderRadius: 12, cursor: 'pointer' }}>До каталогу</button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: 16 }}>
                      {cart.map((item) => (
                        <div key={item.slug} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 16, padding: 16, background: '#f8f9fa', borderRadius: 12 }}>
                          <div style={{ width: 80, height: 80, borderRadius: 10, backgroundImage: `url('${item.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                          <div>
                            <strong style={{ display: 'block', color: '#0057B7', marginBottom: 4 }}>{item.name}</strong>
                            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>{item.price} грн / {item.unit}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <button onClick={() => updateQuantity(item.slug, item.quantity - 1)} style={{ width: 32, height: 32, border: '2px solid #0057B7', background: '#fff', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>−</button>
                              <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.slug, parseInt(e.target.value) || 0)} style={{ width: 60, padding: 6, textAlign: 'center', border: '2px solid #e5e7eb', borderRadius: 8, fontWeight: 700 }} />
                              <button onClick={() => updateQuantity(item.slug, item.quantity + 1)} style={{ width: 32, height: 32, border: '2px solid #0057B7', background: '#fff', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>+</button>
                              <span style={{ marginLeft: 'auto', fontSize: 14, color: '#666' }}>{item.unit}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                            <div style={{ fontWeight: 800, fontSize: 18, color: '#0057B7' }}>{(item.price * item.quantity).toLocaleString()} грн</div>
                            <button onClick={() => removeFromCart(item.slug)} style={{ background: 'transparent', border: 0, color: '#f44336', cursor: 'pointer', fontSize: 20 }}>🗑️</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div style={{ padding: 20, borderTop: '2px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 20, fontWeight: 800 }}>
                      <span>Всього:</span>
                      <span style={{ color: '#0057B7' }}>{total.toLocaleString()} грн</span>
                    </div>
                    <button onClick={() => setOrderForm(true)} style={{ width: '100%', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#0057B7', border: 0, padding: 16, borderRadius: 12, fontWeight: 800, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <span>📋</span> Оформити замовлення
                    </button>
                  </div>
                )}
              </>
            ) : success ? (
              <div style={{ padding: 60, textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: '#4CAF50', marginBottom: 12 }}>Дякуємо за замовлення!</h3>
                <p style={{ color: '#666' }}>Менеджер зв'яжеться з вами найближчим часом</p>
              </div>
            ) : (
              <div style={{ padding: 24, overflowY: 'auto' }}>
                <h3 style={{ color: '#0057B7', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span>📋</span> Оформлення замовлення
                </h3>
                <form onSubmit={handleOrder}>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Ім'я *</label>
                    <input name="name" required style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 10 }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Телефон *</label>
                    <input name="phone" type="tel" required style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 10 }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Email *</label>
                    <input name="email" type="email" required style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 10 }} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Компанія</label>
                    <input name="company" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 10 }} />
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" onClick={() => setOrderForm(false)} style={{ flex: 1, padding: 12, border: '2px solid #e5e7eb', borderRadius: 10, background: '#fff', cursor: 'pointer' }}>Назад</button>
                    <button disabled={loading} type="submit" style={{ flex: 2, background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#0057B7', border: 0, padding: 12, borderRadius: 10, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
                      {loading ? '⏳ Надсилання...' : '📤 Підтвердити'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="pulse-glow bounce-on-hover"
        style={{
          position: 'fixed',
          right: 'clamp(10px, 2vw, 20px)',
          top: 'clamp(80px, 15vh, 120px)',
          background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
          color: '#fff',
          border: 0,
          borderRadius: '50%',
          width: 64,
          height: 64,
          boxShadow: '0 12px 40px rgba(76,175,80,0.5)',
          display: 'grid',
          placeItems: 'center',
          zIndex: 998,
          fontSize: 28,
          cursor: 'pointer',
        }}
      >
        🛒
        {count > 0 && (
          <div style={{ position: 'absolute', top: -4, right: -4, width: 28, height: 28, borderRadius: '50%', background: '#f44336', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 800, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            {count}
          </div>
        )}
      </button>
    </>
  );
}