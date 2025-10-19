import { useState } from 'react';
import { useRouter } from 'next/router';

const categories = [
	{ 
		id: 1, 
		name: 'Кава', 
		icon: '☕', 
		gradient: 'linear-gradient(135deg, #6F4E37 0%, #3E2723 100%)',
		products: [
			{ id: 1, name: 'Арабіка преміум Ефіопія', price: 420, unit: 'кг', description: 'Елітна арабіка з нотками цитрусових та квітів', image: '☕', inStock: true, popular: true },
			{ id: 2, name: 'Робуста В\'єтнам', price: 320, unit: 'кг', description: 'Міцна робуста для еспресо-сумішей', image: '☕', inStock: true },
			{ id: 3, name: 'Арабіка Колумбія', price: 450, unit: 'кг', description: 'М\'який смак з карамельними нотками', image: '☕', inStock: true, popular: true },
			{ id: 4, name: 'Бленд "Sunleaf Espresso"', price: 380, unit: 'кг', description: 'Ідеальний баланс для еспресо', image: '☕', inStock: true }
		]
	},
	{ 
		id: 2, 
		name: 'Чай', 
		icon: '🍵', 
		gradient: 'linear-gradient(135deg, #689F38 0%, #558B2F 100%)',
		products: [
			{ id: 5, name: 'Зелений чай Сенча', price: 180, unit: 'кг', description: 'Японський зелений чай преміум класу', image: '🍵', inStock: true, popular: true },
			{ id: 6, name: 'Чорний чай Асам', price: 150, unit: 'кг', description: 'Індійський чай з насиченим смаком', image: '🍵', inStock: true },
			{ id: 7, name: 'Травяний збір "Альпійський"', price: 220, unit: 'кг', description: 'Натуральні трави з Карпат', image: '🍵', inStock: true },
			{ id: 8, name: 'Білий чай преміум', price: 320, unit: 'кг', description: 'Елітний білий чай з ніжним смаком', image: '🍵', inStock: true, popular: true }
		]
	},
	{ 
		id: 3, 
		name: 'Солодощі', 
		icon: '🍫', 
		gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
		products: [
			{ id: 9, name: 'Шоколад бельгійський 70%', price: 280, unit: 'кг', description: 'Темний шоколад преміум якості', image: '🍫', inStock: true, popular: true },
			{ id: 10, name: 'Цукерки асорті', price: 190, unit: 'кг', description: 'Різноманітні цукерки для кав\'ярень', image: '🍬', inStock: true },
			{ id: 11, name: 'Печиво італійське', price: 160, unit: 'кг', description: 'Хрустке печиво до кави', image: '🍪', inStock: true },
			{ id: 12, name: 'Маршмелоу преміум', price: 140, unit: 'кг', description: 'Ніжні маршмелоу для какао', image: '🍡', inStock: true }
		]
	}
];

export default function Catalog() {
	const router = useRouter();
	const [activeCategory, setActiveCategory] = useState(categories[0]);

	const addToCart = (product: any, e: React.MouseEvent) => {
		e.stopPropagation();
		
		try {
			const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
			const existingItem = existingCart.find((item: any) => item.id === product.id);

			let updatedCart;
			if (existingItem) {
				updatedCart = existingCart.map((item: any) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				updatedCart = [...existingCart, { ...product, quantity: 1 }];
			}

			localStorage.setItem('cart', JSON.stringify(updatedCart));
			window.dispatchEvent(new Event('cartUpdated'));
			
			// Показуємо сповіщення
			const notification = document.createElement('div');
			notification.innerHTML = `
				<div style="
					position: fixed;
					top: 100px;
					right: 24px;
					background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
					color: white;
					padding: 20px 28px;
					borderRadius: 16px;
					boxShadow: 0 12px 40px rgba(40,167,69,0.4);
					zIndex: 100000;
					fontWeight: 700;
					fontSize: 16px;
					display: flex;
					alignItems: center;
					gap: 12px;
					animation: slideInRight 0.3s ease;
				">
					<span style="font-size: 28px;">✓</span>
					<div>
						<div style="font-size: 15px; margin-bottom: 4px;">${product.name}</div>
						<div style="font-size: 13px; opacity: 0.9;">додано до кошика!</div>
					</div>
				</div>
			`;
			document.body.appendChild(notification);
			setTimeout(() => notification.remove(), 3000);
		} catch (error) {
			console.error('Error adding to cart:', error);
			alert('Помилка додавання до кошика. Спробуйте ще раз.');
		}
	};

	return (
		<section id="catalog" style={{
			padding: 'clamp(80px, 12vw, 120px) clamp(20px, 4vw, 40px)',
			background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
			position: 'relative',
			overflow: 'hidden'
		}}>
			{/* Background decorations */}
			<div style={{
				position: 'absolute',
				top: '10%',
				right: '-5%',
				width: '400px',
				height: '400px',
				background: 'radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)',
				borderRadius: '50%',
				filter: 'blur(60px)',
				pointerEvents: 'none'
			}} />

			<div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
				{/* Header */}
				<div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 80px)', padding: '0 20px' }}>
					<div style={{
						display: 'inline-block',
						padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 24px)',
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						borderRadius: '50px',
						color: 'white',
						fontWeight: '700',
						fontSize: 'clamp(12px, 2vw, 14px)',
						marginBottom: 'clamp(20px, 4vw, 28px)',
						boxShadow: '0 8px 24px rgba(102,126,234,0.3)',
						letterSpacing: '1px'
					}}>
						💎 ПРЕМІУМ ЯКІСТЬ
					</div>
					<h2 style={{
						fontSize: 'clamp(36px, 8vw, 56px)',
						fontWeight: '900',
						margin: '0 0 clamp(16px, 3vw, 24px) 0',
						background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						letterSpacing: '-2px',
						lineHeight: 1.2
					}}>
						Наш Каталог
					</h2>
					<p style={{
						fontSize: 'clamp(16px, 3vw, 20px)',
						color: '#666',
						maxWidth: '600px',
						margin: '0 auto',
						lineHeight: 1.6
					}}>
						Обирайте з широкого асортименту преміум продукції для вашого бізнесу
					</p>
				</div>

				{/* Category Tabs */}
				<div style={{
					display: 'flex',
					gap: 'clamp(12px, 3vw, 20px)',
					justifyContent: 'center',
					marginBottom: 'clamp(40px, 7vw, 60px)',
					flexWrap: 'wrap',
					padding: '0 20px'
				}}>
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => setActiveCategory(category)}
							style={{
								padding: 'clamp(16px, 3vw, 20px) clamp(28px, 5vw, 40px)',
								background: activeCategory.id === category.id ? category.gradient : 'white',
								color: activeCategory.id === category.id ? 'white' : '#1a1a1a',
								border: activeCategory.id === category.id ? 'none' : '3px solid #e0e0e0',
								borderRadius: '18px',
								fontSize: 'clamp(15px, 3vw, 18px)',
								fontWeight: '800',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								gap: 'clamp(8px, 2vw, 12px)',
								transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
								boxShadow: activeCategory.id === category.id ? '0 12px 32px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.08)',
								transform: activeCategory.id === category.id ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
								minWidth: 'fit-content'
							}}
							onMouseEnter={(e) => {
								if (activeCategory.id !== category.id) {
									e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
									e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
								}
							}}
							onMouseLeave={(e) => {
								if (activeCategory.id !== category.id) {
									e.currentTarget.style.transform = 'translateY(0) scale(1)';
									e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
								}
							}}
						>
							<span style={{ fontSize: 'clamp(22px, 4vw, 28px)' }}>{category.icon}</span>
							{category.name}
						</button>
					))}
				</div>

				{/* Products Grid */}
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
					gap: 'clamp(24px, 4vw, 32px)',
					padding: '0 clamp(12px, 2vw, 20px)'
				}}>
					{activeCategory.products.map((product) => (
						<div
							key={product.id}
							style={{
								background: 'white',
								borderRadius: '24px',
								overflow: 'hidden',
								boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
								transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
								position: 'relative',
								border: '1px solid rgba(0,0,0,0.06)',
								display: 'flex',
								flexDirection: 'column',
								height: '100%'
							}}
							className="card-hover"
						>
							{/* Popular Badge */}
							{product.popular && (
								<div style={{
									position: 'absolute',
									top: '16px',
									right: '16px',
									background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
									padding: '8px 16px',
									borderRadius: '50px',
									fontSize: 'clamp(11px, 2vw, 13px)',
									fontWeight: '800',
									color: '#1a1a1a',
									boxShadow: '0 4px 16px rgba(255,215,0,0.4)',
									zIndex: 2,
									display: 'flex',
									alignItems: 'center',
									gap: '6px'
								}}>
									⭐ ХІТ
								</div>
							)}

							{/* Product Image */}
							<div style={{
								height: 'clamp(200px, 30vw, 240px)',
								background: activeCategory.gradient,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 'clamp(70px, 15vw, 100px)',
								position: 'relative',
								overflow: 'hidden'
							}}>
								<div style={{
									position: 'absolute',
									inset: 0,
									background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)'
								}} />
								<span style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' }}>
									{product.image}
								</span>
							</div>

							{/* Product Info */}
							<div style={{ 
								padding: 'clamp(20px, 4vw, 28px)', 
								flex: 1, 
								display: 'flex', 
								flexDirection: 'column',
								gap: 'clamp(12px, 2vw, 16px)'
							}}>
								<h3 style={{
									fontSize: 'clamp(18px, 3.5vw, 22px)',
									fontWeight: '800',
									margin: 0,
									color: '#1a1a1a',
									lineHeight: 1.3
								}}>
									{product.name}
								</h3>
								
								<p style={{
									fontSize: 'clamp(14px, 2.5vw, 15px)',
									color: '#666',
									lineHeight: 1.6,
									margin: 0,
									minHeight: 'clamp(44px, 8vw, 48px)'
								}}>
									{product.description}
								</p>

								{/* Price and Stock - фіксований розмір */}
								<div style={{
									padding: 'clamp(16px, 3vw, 18px)',
									background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
									borderRadius: '14px',
									display: 'grid',
									gridTemplateColumns: '1fr auto',
									gap: '12px',
									alignItems: 'center',
									marginTop: 'auto'
								}}>
									<div>
										<div style={{ fontSize: 'clamp(11px, 2vw, 12px)', color: '#666', marginBottom: '4px', fontWeight: '600' }}>
											Ціна за {product.unit}
										</div>
										<div style={{ fontSize: 'clamp(24px, 5vw, 30px)', fontWeight: '900', color: '#28a745', lineHeight: 1 }}>
											{product.price} ₴
										</div>
									</div>
									<div style={{
										padding: '8px 12px',
										background: product.inStock ? 'rgba(40,167,69,0.15)' : 'rgba(220,53,69,0.15)',
										color: product.inStock ? '#28a745' : '#dc3545',
										borderRadius: '10px',
										fontSize: 'clamp(11px, 2vw, 13px)',
										fontWeight: '700',
										display: 'flex',
										alignItems: 'center',
										gap: '4px',
										whiteSpace: 'nowrap'
									}}>
										<span>{product.inStock ? '✓' : '✕'}</span>
										{product.inStock ? 'Є' : 'Немає'}
									</div>
								</div>

								{/* Action Buttons - фіксований розмір */}
								<div style={{ 
									display: 'grid', 
									gridTemplateColumns: '1fr 1fr', 
									gap: '10px'
								}}>
									<button
										onClick={(e) => addToCart(product, e)}
										disabled={!product.inStock}
										style={{
											padding: 'clamp(12px, 2.5vw, 14px) clamp(8px, 2vw, 12px)',
											background: product.inStock 
												? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
												: '#e0e0e0',
											color: product.inStock ? 'white' : '#999',
											border: 'none',
											borderRadius: '12px',
											fontSize: 'clamp(13px, 2.5vw, 14px)',
											fontWeight: '800',
											cursor: product.inStock ? 'pointer' : 'not-allowed',
											transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
											boxShadow: product.inStock ? '0 4px 16px rgba(40,167,69,0.3)' : 'none',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '6px',
											whiteSpace: 'nowrap',
											overflow: 'hidden'
										}}
										onMouseEnter={(e) => {
											if (product.inStock) {
												e.currentTarget.style.transform = 'translateY(-2px)';
												e.currentTarget.style.boxShadow = '0 6px 20px rgba(40,167,69,0.4)';
											}
										}}
										onMouseLeave={(e) => {
											if (product.inStock) {
												e.currentTarget.style.transform = 'translateY(0)';
												e.currentTarget.style.boxShadow = '0 4px 16px rgba(40,167,69,0.3)';
											}
										}}
									>
										<span style={{ fontSize: 'clamp(16px, 3vw, 18px)' }}>🛒</span>
										<span style={{ 
											display: 'inline-block',
											overflow: 'hidden',
											textOverflow: 'ellipsis'
										}}>Купити</span>
									</button>

									<a
										href={`/products/${product.id}`}
										style={{
											padding: 'clamp(12px, 2.5vw, 14px) clamp(8px, 2vw, 12px)',
											background: 'white',
											color: '#667eea',
											border: '3px solid #667eea',
											borderRadius: '12px',
											fontSize: 'clamp(13px, 2.5vw, 14px)',
											fontWeight: '800',
											cursor: 'pointer',
											transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											textDecoration: 'none',
											whiteSpace: 'nowrap',
											overflow: 'hidden'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = '#667eea';
											e.currentTarget.style.color = 'white';
											e.currentTarget.style.transform = 'translateY(-2px)';
											e.currentTarget.style.boxShadow = '0 6px 20px rgba(102,126,234,0.3)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = 'white';
											e.currentTarget.style.color = '#667eea';
											e.currentTarget.style.transform = 'translateY(0)';
											e.currentTarget.style.boxShadow = 'none';
										}}
									>
										Детальніше
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<style jsx>{`
				@keyframes slideInRight {
					from {
						opacity: 0;
						transform: translateX(100px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				@media (max-width: 480px) {
					.card-hover {
						transform: none !important;
					}
				}
			`}</style>
		</section>
	);
}
