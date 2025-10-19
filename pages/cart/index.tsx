import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/Header/Header';

export default function CartPage() {
	const [cart, setCart] = useState<any[]>([]);
	const [customerData, setCustomerData] = useState({
		name: '',
		phone: '',
		email: '',
		company: '',
		address: '',
		notes: ''
	});
	const [orderSent, setOrderSent] = useState(false);

	useEffect(() => {
		loadCart();
	}, []);

	function loadCart() {
		try {
			const cartData = JSON.parse(localStorage.getItem('sunleaf_cart') || '[]');
			setCart(cartData);
		} catch {
			setCart([]);
		}
	}

	function updateQuantity(slug: string, newQuantity: number) {
		const updatedCart = cart.map(item => 
			item.slug === slug ? { ...item, quantity: Math.max(1, newQuantity) } : item
		);
		setCart(updatedCart);
		localStorage.setItem('sunleaf_cart', JSON.stringify(updatedCart));
		window.dispatchEvent(new Event('cartUpdated'));
	}

	function removeItem(slug: string) {
		const updatedCart = cart.filter(item => item.slug !== slug);
		setCart(updatedCart);
		localStorage.setItem('sunleaf_cart', JSON.stringify(updatedCart));
		window.dispatchEvent(new Event('cartUpdated'));
	}

	function clearCart() {
		if (confirm('Очистити всю корзину?')) {
			setCart([]);
			localStorage.setItem('sunleaf_cart', '[]');
			window.dispatchEvent(new Event('cartUpdated'));
		}
	}

	async function handleSubmitOrder(e: React.FormEvent) {
		e.preventDefault();
		
		if (cart.length === 0) {
			alert('Корзина порожня!');
			return;
		}

		const orderData = {
			customer: customerData,
			items: cart,
			total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
			date: new Date().toISOString()
		};

		console.log('[Order] Sending:', orderData);

		try {
			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(orderData)
			});

			if (response.ok) {
				setOrderSent(true);
				clearCart();
				setTimeout(() => {
					window.location.href = '/';
				}, 3000);
			} else {
				throw new Error('Order failed');
			}
		} catch (error) {
			console.error('[Order] Error:', error);
			alert('Помилка відправки замовлення. Спробуйте ще раз або зателефонуйте: +380 67 123-45-67');
		}
	}

	const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

	if (orderSent) {
		return (
			<>
				<Head>
					<title>Замовлення прийнято | Sunleaf</title>
				</Head>
				<Header />
				<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: 20 }}>
					<div style={{ textAlign: 'center', maxWidth: 500 }}>
						<div style={{ fontSize: 80, marginBottom: 20 }}>✅</div>
						<h1 style={{ color: '#28a745', marginBottom: 16 }}>Замовлення прийнято!</h1>
						<p style={{ fontSize: 18, color: '#666', marginBottom: 24 }}>
							Дякуємо за ваше замовлення! Наш менеджер зв'яжеться з вами найближчим часом.
						</p>
						<a href="/" style={{ display: 'inline-block', padding: '14px 28px', background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)', color: '#fff', textDecoration: 'none', borderRadius: 10, fontWeight: 700 }}>
							На головну
						</a>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>Корзина | Sunleaf</title>
				<meta name="description" content="Оформлення замовлення Sunleaf" />
			</Head>

			<Header />

			<div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', paddingTop: 100, paddingBottom: 60 }}>
				<div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
					<h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', color: '#0057B7', marginBottom: 40, textAlign: 'center' }}>
						🛒 Ваша корзина
					</h1>

					{cart.length === 0 ? (
						<div style={{ textAlign: 'center', padding: 60, background: '#fff', borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
							<div style={{ fontSize: 80, marginBottom: 20 }}>🛒</div>
							<h2 style={{ color: '#333', marginBottom: 16 }}>Корзина порожня</h2>
							<p style={{ color: '#666', marginBottom: 32 }}>Додайте товари з каталогу</p>
							<a href="/#catalog" style={{ display: 'inline-block', padding: '14px 28px', background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)', color: '#fff', textDecoration: 'none', borderRadius: 10, fontWeight: 700 }}>
								До каталогу
							</a>
						</div>
					) : (
						<div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'flex-start' }}>
							{/* Cart Items */}
							<div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
									<h2 style={{ color: '#333', margin: 0 }}>Товари ({cart.length})</h2>
									<button onClick={clearCart} style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 0, borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
										Очистити
									</button>
								</div>

								<div style={{ display: 'grid', gap: 16 }}>
									{cart.map((item) => (
										<div key={item.slug} style={{ display: 'flex', gap: 16, padding: 16, background: '#f8f9fa', borderRadius: 12, alignItems: 'center' }}>
											<div style={{ fontSize: 40, flexShrink: 0 }}>{item.image}</div>
											<div style={{ flex: 1 }}>
												<strong style={{ display: 'block', color: '#333', marginBottom: 4 }}>{item.name}</strong>
												<span style={{ color: '#666', fontSize: 14 }}>{item.price} грн/{item.unit}</span>
											</div>
											<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
												<button onClick={() => updateQuantity(item.slug, item.quantity - 1)} style={{ width: 32, height: 32, border: '1px solid #ddd', background: '#fff', borderRadius: 6, cursor: 'pointer', fontWeight: 700 }}>−</button>
												<span style={{ minWidth: 40, textAlign: 'center', fontWeight: 700 }}>{item.quantity}</span>
												<button onClick={() => updateQuantity(item.slug, item.quantity + 1)} style={{ width: 32, height: 32, border: '1px solid #ddd', background: '#fff', borderRadius: 6, cursor: 'pointer', fontWeight: 700 }}>+</button>
											</div>
											<div style={{ textAlign: 'right', minWidth: 100 }}>
												<strong style={{ display: 'block', color: '#0057B7', fontSize: 18 }}>
													{(item.price * item.quantity).toLocaleString()} грн
												</strong>
											</div>
											<button onClick={() => removeItem(item.slug)} style={{ width: 32, height: 32, background: '#dc3545', color: '#fff', border: 0, borderRadius: 6, cursor: 'pointer', fontSize: 16 }}>
												✕
											</button>
										</div>
									))}
								</div>
							</div>

							{/* Order Form */}
							<div style={{ position: 'sticky', top: 100 }}>
								<div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginBottom: 20 }}>
									<h3 style={{ color: '#333', marginBottom: 16 }}>Разом</h3>
									<div style={{ fontSize: 36, fontWeight: 800, color: '#0057B7', marginBottom: 8 }}>
										{total.toLocaleString()} грн
									</div>
									<div style={{ fontSize: 14, color: '#666' }}>
										Мінімальне замовлення: 2000 грн
									</div>
								</div>

								<form onSubmit={handleSubmitOrder} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
									<h3 style={{ color: '#333', marginBottom: 20 }}>Контактні дані</h3>
									
									<div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
										<input type="text" placeholder="Ім'я *" required value={customerData.name} onChange={(e) => setCustomerData({...customerData, name: e.target.value})} style={{ padding: 12, border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 15 }} />
										<input type="tel" placeholder="Телефон *" required value={customerData.phone} onChange={(e) => setCustomerData({...customerData, phone: e.target.value})} style={{ padding: 12, border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 15 }} />
										<input type="email" placeholder="Email" value={customerData.email} onChange={(e) => setCustomerData({...customerData, email: e.target.value})} style={{ padding: 12, border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 15 }} />
										<input type="text" placeholder="Компанія" value={customerData.company} onChange={(e) => setCustomerData({...customerData, company: e.target.value})} style={{ padding: 12, border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 15 }} />
										<textarea placeholder="Адреса доставки" value={customerData.address} onChange={(e) => setCustomerData({...customerData, address: e.target.value})} rows={2} style={{ padding: 12, border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 15, resize: 'vertical' }} />
										<textarea placeholder="Коментар до замовлення" value={customerData.notes} onChange={(e) => setCustomerData({...customerData, notes: e.target.value})} rows={2} style={{ padding: 12, border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 15, resize: 'vertical' }} />
									</div>

									<button type="submit" style={{ width: '100%', padding: 16, background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)', color: '#fff', border: 0, borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 4px 12px rgba(76,175,80,0.4)' }}>
										📦 Оформити замовлення
									</button>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>

			<style jsx>{`
				@media (max-width: 768px) {
					div[style*="gridTemplateColumns: '2fr 1fr'"] {
						grid-template-columns: 1fr !important;
					}
				}
			`}</style>
		</>
	);
}
