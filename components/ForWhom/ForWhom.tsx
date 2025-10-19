export default function ForWhom() {
	const clients = [
		{
			icon: '☕',
			title: 'Кав\'ярні',
			description: 'Широкий асортимент зернової кави преміум класу. Індивідуальні умови для кав\'ярень',
			features: ['Різні сорти', 'Гнучкі ціни', 'Регулярні поставки']
		},
		{
			icon: '🍽️',
			title: 'Ресторани',
			description: 'Якісна кава та чай для вашого закладу. Консультації щодо вибору',
			features: ['Преміум якість', 'Великі обсяги', 'Швидка доставка']
		},
		{
			icon: '🏨',
			title: 'Готелі',
			description: 'Комплексні поставки кави, чаю та солодощів для готельного бізнесу',
			features: ['Різноманітність', 'Стабільність', 'Вигідні ціни']
		},
		{
			icon: '🏢',
			title: 'Офіси',
			description: 'Кава та чай для офісів. Створіть комфортну атмосферу для команди',
			features: ['Зручна оплата', 'Регулярність', 'Якість']
		}
	];

	return (
		<section id="for-whom" style={{
			padding: 'clamp(60px, 10vw, 120px) 20px',
			background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
			position: 'relative'
		}}>
			<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
				{/* Header */}
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
						🎯 ДЛЯ КОГО
					</div>

					<h2 style={{
						fontSize: 'clamp(32px, 7vw, 56px)',
						fontWeight: '900',
						margin: '0 0 20px 0',
						background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						letterSpacing: '-2px',
						lineHeight: 1.2
					}}>
						Наші клієнти
					</h2>

					<p style={{
						fontSize: 'clamp(16px, 3vw, 20px)',
						color: '#666',
						maxWidth: '600px',
						margin: '0 auto',
						lineHeight: 1.6
					}}>
						Працюємо з різними типами бізнесу
					</p>
				</div>

				{/* Clients Grid */}
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
					gap: 'clamp(24px, 4vw, 32px)'
				}}>
					{clients.map((client, index) => (
						<div
							key={index}
							className="card-hover"
							style={{
								background: 'white',
								borderRadius: '24px',
								padding: 'clamp(32px, 5vw, 40px)',
								boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
								border: '1px solid rgba(0,0,0,0.06)',
								transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
								textAlign: 'center'
							}}
						>
							<div style={{
								width: 'clamp(80px, 15vw, 100px)',
								height: 'clamp(80px, 15vw, 100px)',
								background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 'clamp(40px, 7vw, 50px)',
								margin: '0 auto 24px',
								boxShadow: '0 12px 32px rgba(102,126,234,0.3)',
								transition: 'transform 0.3s ease'
							}}
							onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)'}
							onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
							>
								{client.icon}
							</div>

							<h3 style={{
								margin: '0 0 16px 0',
								fontSize: 'clamp(22px, 4vw, 28px)',
								fontWeight: '800',
								color: '#1a1a1a'
							}}>
								{client.title}
							</h3>

							<p style={{
								margin: '0 0 24px 0',
								fontSize: 'clamp(14px, 2.5vw, 16px)',
								color: '#666',
								lineHeight: 1.7
							}}>
								{client.description}
							</p>

							<div style={{
								display: 'grid',
								gap: '12px',
								padding: '20px',
								background: '#f8f9fa',
								borderRadius: '16px'
							}}>
								{client.features.map((feature, i) => (
									<div
										key={i}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '10px',
											fontSize: 'clamp(13px, 2vw, 15px)',
											fontWeight: '600',
											color: '#28a745'
										}}
									>
										<span>✓</span>
										<span>{feature}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
