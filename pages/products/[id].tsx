import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const products = [
	{ id: 1, name: 'Арабіка преміум Ефіопія', price: 420, unit: 'кг', category: 'Кава', description: 'Елітна арабіка з нотками цитрусових та квітів', image: '☕', inStock: true, origin: 'Ефіопія', roast: 'Середнє', processing: 'Мита', altitude: '1800-2200м', features: ['Ноти цитрусів', 'Квіткові відтінки', 'Висока кислотність', 'Середня тілесність'] },
	{ id: 2, name: 'Робуста В\'єтнам', price: 320, unit: 'кг', category: 'Кава', description: 'Міцна робуста для еспресо-сумішей', image: '☕', inStock: true, origin: 'В\'єтнам', roast: 'Темне', processing: 'Натуральна', altitude: '500-700м', features: ['Високий вміст кофеїну', 'Горіхові ноти', 'Густа крема', 'Ідеально для еспресо'] },
	{ id: 3, name: 'Арабіка Колумбія', price: 450, unit: 'кг', category: 'Кава', description: 'М\'який смак з карамельними нотками', image: '☕', inStock: true, origin: 'Колумбія', roast: 'Середнє', processing: 'Мита', altitude: '1400-1800м', features: ['Карамельний смак', 'Шоколадні ноти', 'Збалансована кислотність', 'М\'яке післясмак'] },
	{ id: 4, name: 'Бленд "Sunleaf Espresso"', price: 380, unit: 'кг', category: 'Кава', description: 'Ідеальний баланс для еспресо', image: '☕', inStock: true, origin: 'Бленд', roast: 'Середнє-темне', processing: 'Змішана', altitude: 'Mix', features: ['Ідеально збалансований', 'Стабільна якість', 'Багатий смак', 'Густа крема'] },
	{ id: 5, name: 'Зелений чай Сенча', price: 180, unit: 'кг', category: 'Чай', description: 'Японський зелений чай преміум класу', image: '🍵', inStock: true, origin: 'Японія', harvest: 'Перший збір', processing: 'Пропарений', features: ['Свіжий смак', 'Багатий антиоксидантами', 'Тонізуючий ефект', 'Трав\'янисті ноти'] },
	{ id: 6, name: 'Чорний чай Асам', price: 150, unit: 'кг', category: 'Чай', description: 'Індійський чай з насиченим смаком', image: '🍵', inStock: true, origin: 'Індія', harvest: 'Літній', processing: 'Повна ферментація', features: ['Міцний настій', 'Солодовий смак', 'Високий вміст теїну', 'Ідеально з молоком'] },
	{ id: 7, name: 'Травяний збір "Альпійський"', price: 220, unit: 'кг', category: 'Чай', description: 'Натуральні трави з Карпат', image: '🍵', inStock: true, origin: 'Україна', harvest: 'Ручний збір', processing: 'Сушка', features: ['100% натуральний', 'Без кофеїну', 'Заспокійливий ефект', 'Багатий склад'] },
	{ id: 8, name: 'Білий чай преміум', price: 320, unit: 'кг', category: 'Чай', description: 'Елітний білий чай з ніжним смаком', image: '🍵', inStock: true, origin: 'Китай', harvest: 'Весняний', processing: 'Мінімальна', features: ['Делікатний смак', 'Максимум антиоксидантів', 'Солодкі ноти', 'Рідкісний сорт'] },
	{ id: 9, name: 'Шоколад бельгійський 70%', price: 280, unit: 'кг', category: 'Солодощі', description: 'Темний шоколад преміум якості', image: '🍫', inStock: true, origin: 'Бельгія', cocoa: '70%', features: ['Преміум какао', 'Насичений смак', 'Без домішок', 'Ідеально до кави'] },
	{ id: 10, name: 'Цукерки асорті', price: 190, unit: 'кг', category: 'Солодощі', description: 'Різноманітні цукерки для кав\'ярень', image: '🍬', inStock: true, origin: 'Італія', types: 'Асорті', features: ['12 видів', 'Індивідуальна упаковка', 'Різні смаки', 'Довгий термін зберігання'] },
	{ id: 11, name: 'Печиво італійське', price: 160, unit: 'кг', category: 'Солодощі', description: 'Хрустке печиво до кави', image: '🍪', inStock: true, origin: 'Італія', type: 'Biscotti', features: ['Традиційний рецепт', 'Хрустка текстура', 'З мигдалем', 'Ідеально до еспресо'] },
	{ id: 12, name: 'Маршмелоу преміум', price: 140, unit: 'кг', category: 'Солодощі', description: 'Ніжні маршмелоу для какао', image: '🍡', inStock: true, origin: 'США', type: 'Класичні', features: ['М\'яка текстура', 'Натуральні барвники', 'Різні кольори', 'Для напоїв'] }
];

export default function ProductPage() {
	const router = useRouter();
	const { id } = router.query;
	const [quantity, setQuantity] = useState(1);
	const [addedToCart, setAddedToCart] = useState(false);

	const product = products.find(p => p.id === Number(id));

	if (!product) {
		return (
			<div style={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '20px'
			}}>
				<div style={{ textAlign: 'center' }}>
					<div style={{ fontSize: 'clamp(60px, 12vw, 80px)', marginBottom: '24px' }}>🔍</div>
					<h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: '900', marginBottom: '16px' }}>
						Товар не знайдено
					</h2>
					<button
						onClick={() => router.push('/')}
						style={{
							padding: '14px 32px',
							background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
							color: 'white',
							border: 'none',
							borderRadius: '14px',
							fontSize: '16px',
							fontWeight: '700',
							cursor: 'pointer',
							transition: 'all 0.3s ease'
						}}
					>
						← Повернутись на головну
					</button>
				</div>
			</div>
		);
	}

	const handleAddToCart = () => {
		const cart = JSON.parse(localStorage.getItem('cart') || '[]');
		const existingItem = cart.find((item: any) => item.id === product.id);

		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			cart.push({ ...product, quantity });
		}

		localStorage.setItem('cart', JSON.stringify(cart));
		setAddedToCart(true);
		setTimeout(() => setAddedToCart(false), 3000);
	};

	return (
		<>
			<Head>
				<title>{product.name} | Sunleaf</title>
				<meta name="description" content={product.description} />
			</Head>

			<Header />

			<main style={{
				padding: 'clamp(100px, 15vw, 140px) clamp(20px, 4vw, 40px) clamp(60px, 10vw, 100px)',
				background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
				minHeight: '100vh'
			}}>
				<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
					{/* Breadcrumbs */}
					<div style={{
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
						marginBottom: 'clamp(32px, 6vw, 48px)',
						fontSize: 'clamp(14px, 2.5vw, 15px)',
						color: '#666',
						flexWrap: 'wrap'
					}}>
						<a href="/" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
							🏠 Головна
						</a>
						<span>→</span>
						<a href="/#catalog" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
							📦 Каталог
						</a>
						<span>→</span>
						<span style={{ fontWeight: '700', color: '#1a1a1a' }}>{product.name}</span>
					</div>

					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
						gap: 'clamp(40px, 8vw, 60px)',
						marginBottom: 'clamp(60px, 10vw, 80px)'
					}}>
						{/* Product Image */}
						<div style={{
							background: 'white',
							borderRadius: '32px',
							padding: 'clamp(40px, 8vw, 60px)',
							boxShadow: '0 12px 48px rgba(0,0,0,0.08)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
							overflow: 'hidden',
							minHeight: 'clamp(350px, 50vw, 500px)'
						}}>
							<div style={{
								position: 'absolute',
								inset: 0,
								background: product.category === 'Кава' 
									? 'linear-gradient(135deg, #6F4E37 0%, #3E2723 100%)'
									: product.category === 'Чай'
									? 'linear-gradient(135deg, #689F38 0%, #558B2F 100%)'
									: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
								opacity: 0.1
							}} />
							<div style={{
								fontSize: 'clamp(120px, 25vw, 200px)',
								position: 'relative',
								zIndex: 1,
								filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))'
							}}>
								{product.image}
							</div>
							{product.inStock && (
								<div style={{
									position: 'absolute',
									top: '24px',
									right: '24px',
									padding: '12px 24px',
									background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
									color: 'white',
									borderRadius: '50px',
									fontSize: 'clamp(13px, 2vw, 15px)',
									fontWeight: '800',
									boxShadow: '0 8px 24px rgba(40,167,69,0.3)',
									display: 'flex',
									alignItems: 'center',
									gap: '8px'
								}}>
									✓ В наявності
								</div>
							)}
						</div>

						{/* Product Info */}
						<div>
							<div style={{
								display: 'inline-block',
								padding: '8px 16px',
								background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
								color: 'white',
								borderRadius: '50px',
								fontSize: 'clamp(12px, 2vw, 14px)',
								fontWeight: '700',
								marginBottom: '20px',
								letterSpacing: '0.5px'
							}}>
								{product.category}
							</div>

							<h1 style={{
								margin: '0 0 20px',
								fontSize: 'clamp(32px, 7vw, 48px)',
								fontWeight: '900',
								color: '#1a1a1a',
								lineHeight: 1.2,
								letterSpacing: '-1px'
							}}>
								{product.name}
							</h1>

							<p style={{
								margin: '0 0 32px',
								fontSize: 'clamp(16px, 3vw, 18px)',
								color: '#666',
								lineHeight: 1.8
							}}>
								{product.description}
							</p>

							{/* Price */}
							<div style={{
								padding: 'clamp(24px, 5vw, 32px)',
								background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
								borderRadius: '20px',
								marginBottom: '32px'
							}}>
								<div style={{
									fontSize: 'clamp(14px, 2.5vw, 16px)',
									color: '#666',
									fontWeight: '600',
									marginBottom: '12px'
								}}>
									Ціна за {product.unit}
								</div>
								<div style={{
									fontSize: 'clamp(40px, 8vw, 56px)',
									fontWeight: '900',
									color: '#28a745',
									lineHeight: 1
								}}>
									{product.price} ₴
								</div>
							</div>

							{/* Quantity & Add to Cart */}
							<div style={{
								display: 'grid',
								gridTemplateColumns: 'auto 1fr',
								gap: '16px',
								marginBottom: '32px'
							}}>
								<div style={{
									display: 'flex',
									alignItems: 'center',
									gap: '12px',
									background: 'white',
									padding: '8px',
									borderRadius: '14px',
									border: '2px solid #e0e0e0'
								}}>
									<button
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										style={{
											width: '44px',
											height: '44px',
											borderRadius: '10px',
											background: '#f8f9fa',
											border: 'none',
											color: '#1a1a1a',
											fontSize: '20px',
											fontWeight: '700',
											cursor: 'pointer',
											transition: 'all 0.3s ease'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = '#667eea';
											e.currentTarget.style.color = 'white';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = '#f8f9fa';
											e.currentTarget.style.color = '#1a1a1a';
										}}
									>
										−
									</button>
									<span style={{
										minWidth: '50px',
										textAlign: 'center',
										fontSize: 'clamp(18px, 3vw, 20px)',
										fontWeight: '800'
									}}>
										{quantity}
									</span>
									<button
										onClick={() => setQuantity(quantity + 1)}
										style={{
											width: '44px',
											height: '44px',
											borderRadius: '10px',
											background: '#f8f9fa',
											border: 'none',
											color: '#1a1a1a',
											fontSize: '20px',
											fontWeight: '700',
											cursor: 'pointer',
											transition: 'all 0.3s ease'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = '#667eea';
											e.currentTarget.style.color = 'white';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = '#f8f9fa';
											e.currentTarget.style.color = '#1a1a1a';
										}}
									>
										+
									</button>
								</div>

								<button
									onClick={handleAddToCart}
									disabled={!product.inStock}
									style={{
										padding: 'clamp(14px, 2.5vw, 18px)',
										background: product.inStock
											? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
											: '#e0e0e0',
										color: product.inStock ? 'white' : '#999',
										border: 'none',
										borderRadius: '14px',
										fontSize: 'clamp(16px, 3vw, 18px)',
										fontWeight: '800',
										cursor: product.inStock ? 'pointer' : 'not-allowed',
										transition: 'all 0.3s ease',
										boxShadow: product.inStock ? '0 8px 24px rgba(40,167,69,0.3)' : 'none',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '12px'
									}}
									onMouseEnter={(e) => {
										if (product.inStock) {
											e.currentTarget.style.transform = 'translateY(-2px)';
											e.currentTarget.style.boxShadow = '0 12px 32px rgba(40,167,69,0.4)';
										}
									}}
									onMouseLeave={(e) => {
										if (product.inStock) {
											e.currentTarget.style.transform = 'translateY(0)';
											e.currentTarget.style.boxShadow = '0 8px 24px rgba(40,167,69,0.3)';
										}
									}}
								>
									<span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}>
										{addedToCart ? '✓' : '🛒'}
									</span>
									{addedToCart ? 'Додано в кошик!' : 'Додати в кошик'}
								</button>
							</div>

							{/* Features */}
							{product.features && (
								<div style={{
									background: 'white',
									padding: 'clamp(24px, 5vw, 32px)',
									borderRadius: '20px',
									boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
									marginBottom: '24px'
								}}>
									<h3 style={{
										margin: '0 0 20px',
										fontSize: 'clamp(18px, 3vw, 22px)',
										fontWeight: '800',
										color: '#1a1a1a'
									}}>
										✨ Особливості
									</h3>
									<div style={{ display: 'grid', gap: '14px' }}>
										{product.features.map((feature, i) => (
											<div
												key={i}
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '12px',
													fontSize: 'clamp(14px, 2.5vw, 16px)',
													color: '#333'
												}}
											>
												<span style={{
													width: '24px',
													height: '24px',
													borderRadius: '50%',
													background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													color: 'white',
													fontSize: '14px',
													fontWeight: '700',
													flexShrink: 0
												}}>
													✓
												</span>
												{feature}
											</div>
										))}
									</div>
								</div>
							)}

							{/* Additional Info */}
							<div style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
								gap: '16px'
							}}>
								{[
									{ label: 'Походження', value: (product as any).origin || '-', icon: '🌍' },
									{ label: 'Обробка', value: (product as any).processing || (product as any).type || '-', icon: '⚙️' },
									{ label: 'Тип', value: (product as any).roast || (product as any).harvest || (product as any).cocoa || '-', icon: '📋' }
								].map((item, i) => (
									<div
										key={i}
										style={{
											background: 'white',
											padding: 'clamp(16px, 3vw, 20px)',
											borderRadius: '16px',
											border: '2px solid #e0e0e0',
											textAlign: 'center'
										}}
									>
										<div style={{ fontSize: 'clamp(24px, 5vw, 28px)', marginBottom: '8px' }}>
											{item.icon}
										</div>
										<div style={{
											fontSize: 'clamp(12px, 2vw, 13px)',
											color: '#666',
											fontWeight: '600',
											marginBottom: '4px'
										}}>
											{item.label}
										</div>
										<div style={{
											fontSize: 'clamp(14px, 2.5vw, 15px)',
											fontWeight: '800',
											color: '#1a1a1a'
										}}>
											{item.value}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Back Button */}
					<div style={{ textAlign: 'center' }}>
						<button
							onClick={() => router.push('/#catalog')}
							style={{
								padding: '14px 32px',
								background: 'white',
								color: '#667eea',
								border: '3px solid #667eea',
								borderRadius: '14px',
								fontSize: 'clamp(15px, 3vw, 17px)',
								fontWeight: '800',
								cursor: 'pointer',
								transition: 'all 0.3s ease',
								display: 'inline-flex',
								alignItems: 'center',
								gap: '10px'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = '#667eea';
								e.currentTarget.style.color = 'white';
								e.currentTarget.style.transform = 'translateY(-2px)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'white';
								e.currentTarget.style.color = '#667eea';
								e.currentTarget.style.transform = 'translateY(0)';
							}}
						>
							← Повернутись до каталогу
						</button>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
}
