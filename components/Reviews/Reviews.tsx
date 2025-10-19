export default function Reviews() {
	const reviews = [
		{ name: 'Олександр К.', business: 'Кав\'ярня "Аромат"', text: 'Співпрацюємо вже 2 роки. Завжди якісна кава, вчасна доставка. Рекомендую!', rating: 5 },
		{ name: 'Марина С.', business: 'Ресторан "Подолянь"', text: 'Чудовий асортимент та ціни. Менеджери завжди допоможуть з вибором.', rating: 5 },
		{ name: 'Дмитро П.', business: 'Готель "Житомир"', text: 'Індивідуальний підхід до кожного клієнта. Дуже задоволені співпрацею!', rating: 5 }
	];

	return (
		<section id="reviews" style={{
			padding: 'clamp(60px, 10vw, 120px) 20px',
			background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)'
		}}>
			<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
					<div style={{
						display: 'inline-block',
						padding: '10px 20px',
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						borderRadius: '50px',
						color: 'white',
						fontWeight: '700',
						fontSize: 'clamp(12px, 2vw, 14px)',
						marginBottom: '24px',
						boxShadow: '0 8px 24px rgba(102,126,234,0.3)',
						letterSpacing: '1px'
					}}>
						💬 ВІДГУКИ
					</div>

					<h2 style={{
						fontSize: 'clamp(32px, 7vw, 56px)',
						fontWeight: '900',
						margin: '0 0 20px 0',
						background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						letterSpacing: '-2px'
					}}>
						Що кажуть клієнти
					</h2>
				</div>

				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
					gap: 'clamp(24px, 4vw, 32px)'
				}}>
					{reviews.map((review, index) => (
						<div
							key={index}
							className="card-hover"
							style={{
								background: 'white',
								borderRadius: '24px',
								padding: 'clamp(28px, 5vw, 40px)',
								boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
								border: '1px solid rgba(0,0,0,0.06)',
								position: 'relative'
							}}
						>
							<div style={{
								position: 'absolute',
								top: '24px',
								right: '24px',
								fontSize: 'clamp(48px, 8vw, 64px)',
								opacity: 0.1,
								fontFamily: 'serif'
							}}>
								"
							</div>

							<div style={{
								display: 'flex',
								gap: '6px',
								marginBottom: '20px'
							}}>
								{[...Array(review.rating)].map((_, i) => (
									<span key={i} style={{ fontSize: 'clamp(18px, 3vw, 24px)', color: '#FFD700' }}>⭐</span>
								))}
							</div>

							<p style={{
								margin: '0 0 24px 0',
								fontSize: 'clamp(15px, 2.5vw, 17px)',
								color: '#333',
								lineHeight: 1.8,
								fontStyle: 'italic'
							}}>
								"{review.text}"
							</p>

							<div>
								<div style={{
									fontWeight: '800',
									fontSize: 'clamp(16px, 3vw, 18px)',
									color: '#1a1a1a',
									marginBottom: '4px'
								}}>
									{review.name}
								</div>
								<div style={{
									fontSize: 'clamp(13px, 2vw, 15px)',
									color: '#667eea',
									fontWeight: '600'
								}}>
									{review.business}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
