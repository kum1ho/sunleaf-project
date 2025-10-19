import { useState, useEffect } from 'react';
import { addToCart as addToCartStorage } from '../../lib/cart-storage';

type Tab = 'coffee' | 'tea' | 'sweets';
type Product = { slug: string; name: string; description: string; price: number; image: string };

export default function Catalog() {
	const [tab, setTab] = useState<Tab>('coffee');
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [quickAddModal, setQuickAddModal] = useState<any>(null);
	const [quickQuantity, setQuickQuantity] = useState(5);

	useEffect(() => {
		setLoading(true);
		// Завантажуємо товари з API
		fetch(`/api/products?category=${tab}`)
			.then(r => {
				if (!r.ok) throw new Error('API error');
				return r.json();
			})
			.then(data => {
				console.log('[Catalog] Loaded products:', data.length);
				setProducts(data);
			})
			.catch((error) => {
				console.error('[Catalog] Error loading products:', error);
				// Fallback для демо
				setProducts(getFallbackProducts(tab));
			})
			.finally(() => setLoading(false));
	}, [tab]);

	// Fallback товари для демо (якщо API не працює)
	const getFallbackProducts = (category: Tab): Product[] => {
		const fallback: Record<Tab, Product[]> = {
			coffee: [
				{ slug: 'arabica-premium', name: 'Арабіка преміум', description: 'Ефіопія, Бразилія, Колумбія', price: 320, image: '/images/arabica.jpg' },
				{ slug: 'robusta', name: 'Робуста', description: 'В\'єтнам, Індія', price: 280, image: '/images/robusta.jpg' },
				{ slug: 'espresso-blend', name: 'Суміші для еспресо', description: 'Баланс для кав\'ярень', price: 350, image: '/images/espresso-blend.jpg' },
				{ slug: 'capsules', name: 'Капсули для кавомашин', description: 'Сумісність з популярними системами', price: 45, image: '/images/capsules.jpg' },
			],
			tea: [
				{ slug: 'black-tea', name: 'Чорний чай', description: 'Цейлон, Ассам, Дарджилінг', price: 180, image: '/images/black-tea.jpg' },
				{ slug: 'green-tea', name: 'Зелений чай', description: 'Японія, Китай', price: 220, image: '/images/green-tea.jpg' },
				{ slug: 'herbal-tea', name: 'Трав\'яні та фруктові', description: 'Натуральні суміші', price: 250, image: '/images/herbal-tea.jpg' },
				{ slug: 'premium-tea', name: 'Преміум сорти', description: 'Пуер, Улун, Білий чай', price: 400, image: '/images/premium-tea.jpg' },
			],
			sweets: [
				{ slug: 'premium-chocolate', name: 'Шоколад преміум', description: 'Європейські виробники', price: 450, image: '/images/premium-chocolate.jpg' },
				{ slug: 'handmade-candy', name: 'Цукерки ручної роботи', description: 'Унікальні рецепти', price: 380, image: '/images/handmade-candy.jpg' },
				{ slug: 'syrups', name: 'Сиропи для кавових напоїв', description: 'Понад 50 смаків', price: 120, image: '/images/syrups.jpg' },
				{ slug: 'sugar-free', name: 'Солодощі без цукру', description: 'Здорові альтернативи', price: 520, image: '/images/sugar-free.jpg' },
			],
		};
		return fallback[category] || [];
	};

	const TabBtn = ({ id, label, icon }: { id: Tab; label: string; icon: string }) => (
		<button
			onClick={() => setTab(id)}
			style={{
				padding: 'clamp(10px, 2vw, 12px) clamp(16px, 3vw, 24px)',
				border: 0,
				borderBottom: tab === id ? '4px solid #FFD700' : '4px solid transparent',
				background: tab === id ? 'linear-gradient(135deg, rgba(0,87,183,0.08) 0%, rgba(255,215,0,0.08) 100%)' : 'transparent',
				cursor: 'pointer',
				color: tab === id ? '#0057B7' : '#555',
				fontWeight: tab === id ? 700 : 500,
				fontSize: 'clamp(14px, 2vw, 16px)',
				transition: 'all 0.3s ease',
				borderRadius: '8px 8px 0 0',
				flex: 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 8,
			}}
		>
			<span style={{ fontSize: '1.3em' }}>{icon}</span> {label}
		</button>
	);

	// Функції корзини inline
	function getCart() {
		if (typeof window === 'undefined') return [];
		try {
			const cart = localStorage.getItem('sunleaf_cart');
			return cart ? JSON.parse(cart) : [];
		} catch {
			return [];
		}
	}

	function saveCart(cart: any[]) {
		if (typeof window === 'undefined') return;
		localStorage.setItem('sunleaf_cart', JSON.stringify(cart));
		window.dispatchEvent(new Event('cartUpdated'));
	}

	function addToCart(item: any, quantity = 1) {
		const cart = getCart();
		const existingIndex = cart.findIndex((i: any) => i.slug === item.slug);
		
		if (existingIndex >= 0) {
			cart[existingIndex].quantity += quantity;
		} else {
			cart.push({ ...item, quantity });
		}
		
		saveCart(cart);
		console.log('[Cart] Added:', item.name, 'x', quantity);
	}

	const handleQuickAdd = () => {
		if (quickAddModal) {
			addToCart(quickAddModal, quickQuantity);
			alert(`✅ Додано ${quickQuantity} кг ${quickAddModal.name} до корзини!`);
			setQuickAddModal(null);
			setQuickQuantity(5);
		}
	};

	const Card = ({ img, title, sub, price, slug }: { img: string; title: string; sub: string; price: number; slug: string }) => (
		<div className="card-hover" style={{ borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(0,87,183,0.08)' }}>
			<div style={{ height: 220, backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
				<div style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#0057B7', padding: '8px 14px', borderRadius: 10, fontWeight: 700, fontSize: 14, boxShadow: '0 4px 12px rgba(255,165,0,0.4)', display: 'flex', alignItems: 'center', gap: 6 }}>
					<span>⭐</span> NEW
				</div>
			</div>
			<div style={{ padding: 24 }}>
				<strong style={{ display: 'block', color: '#0057B7', fontSize: 19, marginBottom: 10 }}>{title}</strong>
				<p style={{ margin: '0 0 16px', color: '#666', fontSize: 15, lineHeight: 1.5 }}>{sub}</p>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
					<span style={{ fontWeight: 800, fontSize: 21, background: 'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>від {price} грн</span>
				</div>
				<div style={{ display: 'grid', gap: 8 }}>
					<button 
						onClick={() => setQuickAddModal({ slug, name: title, price, image: img, unit: 'кг' })}
						style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)', color: '#fff', border: 0, padding: '10px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
					>
						<span>🛒</span> В корзину
					</button>
					<a href={`/product/${slug}`} style={{ background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)', color: '#fff', border: 0, padding: '10px', borderRadius: 10, fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none' }}>
						<span>🔍</span> Деталі
					</a>
				</div>
			</div>
		</div>
	);

	return (
		<section id="catalog" style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 40px)', background: '#fff' }}>
			<div style={{ maxWidth: 1200, margin: '0 auto' }}>
				<h2 className="section-title">Наша продукція</h2>
				<div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 50, flexWrap: 'wrap' }}>
					<TabBtn id="coffee" label="Кава" icon="☕" />
					<TabBtn id="tea" label="Чай" icon="🍵" />
					<TabBtn id="sweets" label="Солодощі" icon="🍫" />
				</div>

				{loading ? (
					<div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
						<div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
						<p>Завантаження товарів...</p>
					</div>
				) : products.length === 0 ? (
					<div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
						<div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
						<p>Товарів не знайдено</p>
					</div>
				) : (
					<div style={{ display: 'grid', gap: 'clamp(24px, 4vw, 40px)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%, 280px),1fr))' }}>
						{products.map((p) => (
							<Card 
								key={p.slug}
								img={p.image}
								title={p.name}
								sub={p.description.substring(0, 60) + '...'}
								price={p.price}
								slug={p.slug}
							/>
						))}
					</div>
				)}

				{/* Quick Add Modal */}
				{quickAddModal && (
					<div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 1200, padding: 20 }}>
						<div className="scale-in" style={{ background: '#fff', padding: 32, borderRadius: 16, width: '100%', maxWidth: 400 }}>
							<h3 style={{ color: '#0057B7', marginBottom: 16 }}>{quickAddModal.name}</h3>
							<p style={{ color: '#666', marginBottom: 16 }}>{quickAddModal.price} грн/кг</p>
							
							<div style={{ marginBottom: 20 }}>
								<label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Кількість (кг):</label>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<button onClick={() => setQuickQuantity(Math.max(1, quickQuantity - 1))} style={{ width: 40, height: 40, border: '2px solid #0057B7', background: '#fff', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>−</button>
									<input type="number" value={quickQuantity} onChange={(e) => setQuickQuantity(Math.max(1, parseInt(e.target.value) || 1))} style={{ flex: 1, padding: 10, textAlign: 'center', border: '2px solid #e5e7eb', borderRadius: 8, fontWeight: 700 }} />
									<button onClick={() => setQuickQuantity(quickQuantity + 1)} style={{ width: 40, height: 40, border: '2px solid #0057B7', background: '#fff', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>+</button>
								</div>
							</div>

							<div style={{ display: 'flex', gap: 10 }}>
								<button onClick={() => setQuickAddModal(null)} style={{ flex: 1, padding: 12, border: '2px solid #e5e7eb', borderRadius: 10, background: '#fff', cursor: 'pointer' }}>Скасувати</button>
								<button onClick={handleQuickAdd} style={{ flex: 2, background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)', color: '#fff', border: 0, padding: 12, borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>
									Додати ({quickQuantity} кг)
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
