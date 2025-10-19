export default function Benefits() {
	const benefits = [
		{
			icon: '🚚',
			title: 'Безкоштовна доставка',
			description: 'По Житомиру від 2000 грн. Доставка по Україні за тарифами перевізника',
			gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
		},
		{
			icon: '💰',
			title: 'Оптові ціни',
			description: 'Найкращі ціни для оптових клієнтів. Система знижок від обсягу замовлення',
			gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
		},
		{
			icon: '⚡',
			title: 'Швидка обробка',
			description: 'Замовлення обробляються протягом 1 години. Відправка в день замовлення',
			gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
		},
		{
			icon: '✓',
			title: 'Гарантія якості',
			description: 'Всі товари сертифіковані. Повернення/обмін протягом 14 днів',
			gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
		},
		{
			icon: '📞',
			title: 'Підтримка 24/7',
			description: 'Наші менеджери завжди на зв\'язку. Допоможемо з вибором продукції',
			gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
		},
		{
			icon: '📊',
			title: 'Індивідуальний підхід',
			description: 'Персональні умови для постійних клієнтів. Гнучка система оплати',
			gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
		}
	];

	return (
		<section id="benefits" style={{
			padding: 'clamp(60px, 10vw, 120px) 20px',
			background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
			position: 'relative',
			overflow: 'hidden'
		}}>
			<div style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '800px',
				height: '800px',
				background: 'radial-gradient(circle, rgba(102,126,234,0.05) 0%, transparent 70%)',
				borderRadius: '50%',
				filter: 'blur(100px)',
				pointerEvents: 'none'
			}} />

			<div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
						⭐ НАШІ ПЕРЕВАГИ
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
						Чому обирають нас
					</h2>

					<p style={{
						fontSize: 'clamp(16px, 3vw, 20px)',
						color: '#666',
						maxWidth: '600px',
						margin: '0 auto',
						lineHeight: 1.6
					}}>
						Ми створили ідеальні умови для співпраці з вашим бізнесом
					</p>
				</div>

				{/* Benefits Grid */}
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
					gap: 'clamp(24px, 4vw, 32px)'
				}}>
					{benefits.map((benefit, index) => (
						<div
							key={index}
							className="card-hover"
							style={{
								background: 'white',
								borderRadius: '24px',
								padding: 'clamp(28px, 5vw, 40px)',
								boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
								border: '1px solid rgba(0,0,0,0.06)',
								transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
								position: 'relative',
								overflow: 'hidden',
								animation: `fadeInUp 0.8s ease ${index * 0.1}s forwards`,
								opacity: 0
							}}
						>
							{/* Gradient Background */}
							<div style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								height: '6px',
								background: benefit.gradient,
								borderRadius: '24px 24px 0 0'
							}} />

							{/* Icon */}
							<div style={{
								width: 'clamp(70px, 12vw, 90px)',
								height: 'clamp(70px, 12vw, 90px)',
								background: benefit.gradient,
								borderRadius: '20px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 'clamp(36px, 6vw, 48px)',
								marginBottom: '24px',
								boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
								transition: 'transform 0.3s ease'
							}}
							onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
							onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
							>
								{benefit.icon}
							</div>

							{/* Content */}
							<h3 style={{
								margin: '0 0 12px 0',
								fontSize: 'clamp(20px, 3.5vw, 24px)',
								fontWeight: '800',
								color: '#1a1a1a',
								lineHeight: 1.3
							}}>
								{benefit.title}
							</h3>

							<p style={{
								margin: 0,
								fontSize: 'clamp(14px, 2.5vw, 16px)',
								color: '#666',
								lineHeight: 1.7
							}}>
								{benefit.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
