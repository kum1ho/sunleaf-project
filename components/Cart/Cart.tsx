import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
	unit: string;
}

export default function Cart() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [items, setItems] = useState<CartItem[]>([]);
	const [showCheckout, setShowCheckout] = useState(false);
	const [orderForm, setOrderForm] = useState({
		name: '',
		phone: '',
		email: '',
		address: '',
		comment: ''
	});

	// Load cart on mount
	useEffect(() => {
		loadCart();
		
		const handleCartUpdate = () => loadCart();
		const handleStorageUpdate = () => loadCart();
		
		window.addEventListener('cartUpdated', handleCartUpdate);
		window.addEventListener('storage', handleStorageUpdate);
		
		return () => {
			window.removeEventListener('cartUpdated', handleCartUpdate);
			window.removeEventListener('storage', handleStorageUpdate);
		};
	}, []);

	const loadCart = () => {
		try {
			const savedCart = localStorage.getItem('cart');
			if (savedCart) {
				const parsed = JSON.parse(savedCart);
				setItems(Array.isArray(parsed) ? parsed : []);
			}
		} catch (e) {
			console.error('Error loading cart:', e);
			setItems([]);
		}
	};

	// Save cart whenever it changes
	useEffect(() => {
		if (items.length >= 0) {
			try {
				localStorage.setItem('cart', JSON.stringify(items));
				window.dispatchEvent(new Event('cartUpdated'));
			} catch (e) {
				console.error('Error saving cart:', e);
			}
		}
	}, [items]);

	// Expose open function globally
	useEffect(() => {
		(window as any).openCart = () => setIsOpen(true);
		return () => {
			delete (window as any).openCart;
		};
	}, []);

	const updateQuantity = (id: number, delta: number) => {
		setItems(prevItems =>
			prevItems.map(item =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity + delta) }
					: item
			)
		);
	};

	const removeItem = (id: number) => {
		setItems(prevItems => prevItems.filter(item => item.id !== id));
	};

	const clearCart = () => {
		if (confirm('Очистити кошик?')) {
			setItems([]);
			localStorage.removeItem('cart');
		}
	};

	const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const handleCheckout = (e: React.FormEvent) => {
		e.preventDefault();
		
		const orderData = {
			items,
			total,
			customer: orderForm,
			orderNumber: Math.floor(100000 + Math.random() * 900000),
			date: new Date().toLocaleString('uk-UA')
		};

		console.log('Order submitted:', orderData);
		alert(`✅ Замовлення #${orderData.orderNumber} успішно оформлено!\n\nСума: ${total.toLocaleString()}₴\n\nНаш менеджер зв'яжеться з вами протягом 15 хвилин.\nДякуємо за покупку! 🎉`);

		setItems([]);
		localStorage.removeItem('cart');
		setShowCheckout(false);
		setIsOpen(false);
		setOrderForm({ name: '', phone: '', email: '', address: '', comment: '' });
	};

	if (!isOpen) return null;

	return (
		<>
			<div style={{
				position: 'fixed',
				inset: 0,
				background: 'rgba(0,0,0,0.7)',
				backdropFilter: 'blur(8px)',
				zIndex: 10000,
				animation: 'fadeIn 0.3s ease'
			}} onClick={() => { setIsOpen(false); setShowCheckout(false); }} />

			<div style={{
				position: 'fixed',
				top: 0,
				right: 0,
				bottom: 0,
				width: 'min(500px, 100vw)',
				background: 'white',
				boxShadow: '-8px 0 32px rgba(0,0,0,0.2)',
				display: 'flex',
				flexDirection: 'column',
				animation: 'slideInRight 0.3s ease',
				zIndex: 10001
			}} onClick={(e) => e.stopPropagation()}>
				
				{/* Header */}
				<div style={{
					padding: 'clamp(20px, 4vw, 24px)',
					borderBottom: '1px solid #e0e0e0',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					color: 'white'
				}}>
					<div>
						<h2 style={{ margin: '0 0 4px', fontSize: 'clamp(22px, 4vw, 26px)', fontWeight: '900' }}>
							🛒 Кошик
						</h2>
						<p style={{ margin: 0, fontSize: 'clamp(13px, 2vw, 14px)', opacity: 0.9 }}>
							{items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товари' : 'товарів'}
						</p>
					</div>
					<button onClick={() => { setIsOpen(false); setShowCheckout(false); }} style={{
						width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
						border: 'none', color: 'white', fontSize: '22px', cursor: 'pointer',
						display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
						e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
						e.currentTarget.style.transform = 'rotate(0) scale(1)';
					}}
					>✕</button>
				</div>

				{!showCheckout ? (
					<>
						<div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(16px, 3vw, 20px)' }}>
							{items.length === 0 ? (
								<div style={{ textAlign: 'center', padding: 'clamp(50px, 10vw, 80px) 20px', color: '#666' }}>
									<div style={{ fontSize: 'clamp(70px, 15vw, 100px)', marginBottom: '24px', opacity: 0.4 }}>🛒</div>
									<h3 style={{ margin: '0 0 12px', fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: '800', color: '#1a1a1a' }}>
										Кошик порожній
									</h3>
									<p style={{ margin: '0 0 24px', fontSize: 'clamp(15px, 3vw, 16px)', lineHeight: 1.6 }}>
										Додайте товари з каталогу
									</p>
									<button onClick={() => { setIsOpen(false); router.push('/#catalog'); }} style={{
										padding: '14px 28px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
										color: 'white', border: 'none', borderRadius: '14px', fontSize: '16px',
										fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s ease',
										boxShadow: '0 8px 24px rgba(102,126,234,0.3)'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'translateY(-2px)';
										e.currentTarget.style.boxShadow = '0 12px 32px rgba(102,126,234,0.4)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'translateY(0)';
										e.currentTarget.style.boxShadow = '0 8px 24px rgba(102,126,234,0.3)';
									}}
									>📦 До каталогу</button>
								</div>
							) : (
								<div style={{ display: 'grid', gap: '16px' }}>
									{items.map(item => (
										<div key={item.id} style={{
											background: '#f8f9fa', borderRadius: '16px', padding: 'clamp(14px, 3vw, 16px)',
											display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '16px',
											alignItems: 'center', transition: 'all 0.3s ease', border: '2px solid transparent'
										}}
										onMouseEnter={(e) => e.currentTarget.style.borderColor = '#667eea'}
										onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
										>
											<div style={{
												width: 'clamp(70px, 15vw, 80px)', height: 'clamp(70px, 15vw, 80px)',
												borderRadius: '14px', background: 'linear-gradient(135deg, #6F4E37 0%, #3E2723 100%)',
												display: 'flex', alignItems: 'center', justifyContent: 'center',
												fontSize: 'clamp(32px, 7vw, 40px)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
											}}>{item.image}</div>

											<div>
												<h4 style={{
													margin: '0 0 6px', fontSize: 'clamp(15px, 3vw, 17px)',
													fontWeight: '800', color: '#1a1a1a', lineHeight: 1.3
												}}>{item.name}</h4>
												<div style={{
													fontSize: 'clamp(18px, 3.5vw, 20px)', fontWeight: '900',
													color: '#28a745', marginBottom: '12px'
												}}>{item.price} ₴/{item.unit}</div>

												<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
													<button onClick={() => updateQuantity(item.id, -1)} style={{
														width: '36px', height: '36px', borderRadius: '10px', background: 'white',
														border: '2px solid #e0e0e0', color: '#1a1a1a', fontSize: '18px',
														fontWeight: '800', cursor: 'pointer', display: 'flex',
														alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'
													}}
													onMouseEnter={(e) => {
														e.currentTarget.style.borderColor = '#667eea';
														e.currentTarget.style.color = '#667eea';
														e.currentTarget.style.transform = 'scale(1.1)';
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.borderColor = '#e0e0e0';
														e.currentTarget.style.color = '#1a1a1a';
														e.currentTarget.style.transform = 'scale(1)';
													}}
													>−</button>
													<span style={{
														minWidth: '40px', textAlign: 'center',
														fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: '800'
													}}>{item.quantity}</span>
													<button onClick={() => updateQuantity(item.id, 1)} style={{
														width: '36px', height: '36px', borderRadius: '10px', background: 'white',
														border: '2px solid #e0e0e0', color: '#1a1a1a', fontSize: '18px',
														fontWeight: '800', cursor: 'pointer', display: 'flex',
														alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'
													}}
													onMouseEnter={(e) => {
														e.currentTarget.style.borderColor = '#667eea';
														e.currentTarget.style.color = '#667eea';
														e.currentTarget.style.transform = 'scale(1.1)';
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.borderColor = '#e0e0e0';
														e.currentTarget.style.color = '#1a1a1a';
														e.currentTarget.style.transform = 'scale(1)';
													}}
													>+</button>
												</div>
											</div>

											<button onClick={() => removeItem(item.id)} style={{
												width: '40px', height: '40px', borderRadius: '50%', background: '#fee',
												border: 'none', color: '#dc3545', fontSize: '20px', cursor: 'pointer',
												display: 'flex', alignItems: 'center', justifyContent: 'center',
												transition: 'all 0.3s ease', alignSelf: 'flex-start'
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.background = '#dc3545';
												e.currentTarget.style.color = 'white';
												e.currentTarget.style.transform = 'scale(1.15) rotate(10deg)';
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.background = '#fee';
												e.currentTarget.style.color = '#dc3545';
												e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
											}}
											>🗑</button>
										</div>
									))}
								</div>
							)}
						</div>

						{items.length > 0 && (
							<div style={{
								padding: 'clamp(20px, 4vw, 24px)',
								borderTop: '1px solid #e0e0e0',
								background: 'white'
							}}>
								<div style={{
									display: 'flex', justifyContent: 'space-between', alignItems: 'center',
									marginBottom: '20px', padding: '20px',
									background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
									borderRadius: '16px'
								}}>
									<span style={{ fontSize: 'clamp(18px, 3.5vw, 20px)', fontWeight: '800', color: '#666' }}>
										Разом:
									</span>
									<span style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: '900', color: '#28a745' }}>
										{total.toLocaleString()} ₴
									</span>
								</div>

								<button onClick={() => setShowCheckout(true)} style={{
									width: '100%', padding: 'clamp(16px, 3vw, 18px)',
									background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
									color: 'white', border: 'none', borderRadius: '14px',
									fontSize: 'clamp(17px, 3.5vw, 19px)', fontWeight: '800', cursor: 'pointer',
									transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
									boxShadow: '0 8px 24px rgba(40,167,69,0.3)', display: 'flex',
									alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'translateY(-3px)';
									e.currentTarget.style.boxShadow = '0 12px 32px rgba(40,167,69,0.4)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'translateY(0)';
									e.currentTarget.style.boxShadow = '0 8px 24px rgba(40,167,69,0.3)';
								}}
								>
									<span style={{ fontSize: 'clamp(22px, 4vw, 24px)' }}>✓</span>
									Оформити замовлення
								</button>

								<button onClick={clearCart} style={{
									width: '100%', padding: '12px', background: 'white', color: '#dc3545',
									border: '2px solid #dc3545', borderRadius: '12px',
									fontSize: 'clamp(14px, 2.5vw, 15px)', fontWeight: '700',
									cursor: 'pointer', transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = '#dc3545';
									e.currentTarget.style.color = 'white';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'white';
									e.currentTarget.style.color = '#dc3545';
								}}
								>🗑 Очистити кошик</button>
							</div>
						)}
					</>
				) : (
					<div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(20px, 4vw, 32px)' }}>
						<button onClick={() => setShowCheckout(false)} style={{
							display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px',
							padding: '10px 16px', background: '#f8f9fa', border: 'none',
							borderRadius: '10px', color: '#667eea', fontSize: '15px', fontWeight: '700',
							cursor: 'pointer', transition: 'all 0.3s ease'
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = '#667eea';
							e.currentTarget.style.color = 'white';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = '#f8f9fa';
							e.currentTarget.style.color = '#667eea';
						}}
						>← Назад до кошика</button>

						<h3 style={{
							margin: '0 0 24px', fontSize: 'clamp(22px, 4vw, 26px)',
							fontWeight: '900', color: '#1a1a1a'
						}}>📝 Оформлення замовлення</h3>

						<form onSubmit={handleCheckout} style={{ display: 'grid', gap: '20px' }}>
							<div>
								<label style={{
									display: 'block', marginBottom: '8px',
									fontSize: 'clamp(14px, 2.5vw, 15px)', fontWeight: '700', color: '#1a1a1a'
								}}>Ім'я *</label>
								<input type="text" required value={orderForm.name}
									onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
									placeholder="Введіть ваше ім'я" style={{
										width: '100%', padding: 'clamp(12px, 2vw, 16px)',
										border: '2px solid #e0e0e0', borderRadius: '12px',
										fontSize: 'clamp(15px, 3vw, 16px)', outline: 'none',
										transition: 'all 0.3s ease'
									}}
									onFocus={(e) => {
										e.currentTarget.style.borderColor = '#667eea';
										e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
									}}
									onBlur={(e) => {
										e.currentTarget.style.borderColor = '#e0e0e0';
										e.currentTarget.style.boxShadow = 'none';
									}}
								/>
							</div>

							<div>
								<label style={{
									display: 'block', marginBottom: '8px',
									fontSize: 'clamp(14px, 2.5vw, 15px)', fontWeight: '700', color: '#1a1a1a'
								}}>Телефон *</label>
								<input type="tel" required value={orderForm.phone}
									onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
									placeholder="+380 XX XXX XX XX" style={{
										width: '100%', padding: 'clamp(12px, 2vw, 16px)',
										border: '2px solid #e0e0e0', borderRadius: '12px',
										fontSize: 'clamp(15px, 3vw, 16px)', outline: 'none',
										transition: 'all 0.3s ease'
									}}
									onFocus={(e) => {
										e.currentTarget.style.borderColor = '#667eea';
										e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
									}}
									onBlur={(e) => {
										e.currentTarget.style.borderColor = '#e0e0e0';
										e.currentTarget.style.boxShadow = 'none';
									}}
								/>
							</div>

							<div>
								<label style={{
									display: 'block', marginBottom: '8px',
									fontSize: 'clamp(14px, 2.5vw, 15px)', fontWeight: '700', color: '#1a1a1a'
								}}>Email</label>
								<input type="email" value={orderForm.email}
									onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
									placeholder="your@email.com" style={{
										width: '100%', padding: 'clamp(12px, 2vw, 16px)',
										border: '2px solid #e0e0e0', borderRadius: '12px',
										fontSize: 'clamp(15px, 3vw, 16px)', outline: 'none',
										transition: 'all 0.3s ease'
									}}
									onFocus={(e) => {
										e.currentTarget.style.borderColor = '#667eea';
										e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
									}}
									onBlur={(e) => {
										e.currentTarget.style.borderColor = '#e0e0e0';
										e.currentTarget.style.boxShadow = 'none';
									}}
								/>
							</div>

							<div>
								<label style={{
									display: 'block', marginBottom: '8px',
									fontSize: 'clamp(14px, 2.5vw, 15px)', fontWeight: '700', color: '#1a1a1a'
								}}>Адреса доставки *</label>
								<input type="text" required value={orderForm.address}
									onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
									placeholder="Місто, вулиця, будинок" style={{
										width: '100%', padding: 'clamp(12px, 2vw, 16px)',
										border: '2px solid #e0e0e0', borderRadius: '12px',
										fontSize: 'clamp(15px, 3vw, 16px)', outline: 'none',
										transition: 'all 0.3s ease'
									}}
									onFocus={(e) => {
										e.currentTarget.style.borderColor = '#667eea';
										e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
									}}
									onBlur={(e) => {
										e.currentTarget.style.borderColor = '#e0e0e0';
										e.currentTarget.style.boxShadow = 'none';
									}}
								/>
							</div>

							<div>
								<label style={{
									display: 'block', marginBottom: '8px',
									fontSize: 'clamp(14px, 2.5vw, 15px)', fontWeight: '700', color: '#1a1a1a'
								}}>Коментар до замовлення</label>
								<textarea value={orderForm.comment}
									onChange={(e) => setOrderForm({...orderForm, comment: e.target.value})}
									placeholder="Додаткова інформація..." rows={4} style={{
										width: '100%', padding: 'clamp(12px, 2vw, 16px)',
										border: '2px solid #e0e0e0', borderRadius: '12px',
										fontSize: 'clamp(15px, 3vw, 16px)', outline: 'none',
										resize: 'vertical', fontFamily: 'inherit', transition: 'all 0.3s ease'
									}}
									onFocus={(e) => {
										e.currentTarget.style.borderColor = '#667eea';
										e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
									}}
									onBlur={(e) => {
										e.currentTarget.style.borderColor = '#e0e0e0';
										e.currentTarget.style.boxShadow = 'none';
									}}
								/>
							</div>

							<div style={{
								padding: '20px', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
								borderRadius: '16px', border: '2px solid #e0e0e0'
							}}>
								<h4 style={{
									margin: '0 0 16px', fontSize: 'clamp(16px, 3vw, 18px)',
									fontWeight: '800', color: '#1a1a1a'
								}}>📦 Ваше замовлення</h4>
								<div style={{ display: 'grid', gap: '12px', marginBottom: '16px' }}>
									{items.map(item => (
										<div key={item.id} style={{
											display: 'flex', justifyContent: 'space-between',
											fontSize: 'clamp(14px, 2.5vw, 15px)', color: '#666'
										}}>
											<span>{item.name} × {item.quantity}</span>
											<span style={{ fontWeight: '700', color: '#28a745' }}>
												{(item.price * item.quantity).toLocaleString()} ₴
											</span>
										</div>
									))}
								</div>
								<div style={{
									paddingTop: '16px', borderTop: '2px solid #e0e0e0',
									display: 'flex', justifyContent: 'space-between', alignItems: 'center'
								}}>
									<span style={{
										fontSize: 'clamp(18px, 3.5vw, 20px)',
										fontWeight: '800', color: '#1a1a1a'
									}}>Всього:</span>
									<span style={{
										fontSize: 'clamp(26px, 5vw, 32px)',
										fontWeight: '900', color: '#28a745'
									}}>{total.toLocaleString()} ₴</span>
								</div>
							</div>

							<button type="submit" style={{
								width: '100%', padding: 'clamp(16px, 3vw, 18px)',
								background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
								color: 'white', border: 'none', borderRadius: '14px',
								fontSize: 'clamp(17px, 3.5vw, 19px)', fontWeight: '800',
								cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
								boxShadow: '0 8px 24px rgba(40,167,69,0.3)', display: 'flex',
								alignItems: 'center', justifyContent: 'center', gap: '10px'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-3px)';
								e.currentTarget.style.boxShadow = '0 12px 32px rgba(40,167,69,0.4)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = '0 8px 24px rgba(40,167,69,0.3)';
							}}
							>
								<span style={{ fontSize: 'clamp(22px, 4vw, 24px)' }}>✓</span>
								Підтвердити замовлення
							</button>
						</form>
					</div>
				)}
			</div>

			<style jsx global>{`
				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}

				@keyframes slideInRight {
					from { opacity: 0; transform: translateX(100%); }
					to { opacity: 1; transform: translateX(0); }
				}
			`}</style>
		</>
	);
}