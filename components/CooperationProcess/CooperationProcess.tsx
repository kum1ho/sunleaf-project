export default function CooperationProcess() {
	const steps = [
		{ number: '01', title: 'Заявка', description: 'Залиште заявку на сайті або зателефонуйте нам', icon: '📝' },
		{ number: '02', title: 'Консультація', description: 'Наш менеджер зв\'яжеться з вами протягом 15 хвилин', icon: '📞' },
		{ number: '03', title: 'Оформлення', description: 'Обираєте товар та оформлюєте замовлення', icon: '✓' },
		{ number: '04', title: 'Доставка', description: 'Отримуєте замовлення у зручний для вас час', icon: '🚚' }
	];

	return (
		<section style={{
			padding: 'clamp(60px, 10vw, 120px) 20px',
			background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			position: 'relative',
			overflow: 'hidden'
		}}>
			<div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
					<h2 style={{
						fontSize: 'clamp(32px, 7vw, 56px)',
						fontWeight: '900',
						margin: '0 0 20px 0',
						color: 'white',
						letterSpacing: '-2px',
						textShadow: '0 4px 12px rgba(0,0,0,0.2)'
					}}>
						Як почати співпрацю
					</h2>
					<p style={{
						fontSize: 'clamp(16px, 3vw, 20px)',
						color: 'rgba(255,255,255,0.9)',
						maxWidth: '600px',
						margin: '0 auto',
						lineHeight: 1.6
					}}>
						Простий процес від заявки до доставки
					</p>
				</div>

				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
					gap: 'clamp(24px, 4vw, 40px)'
				}}>
					{steps.map((step, index) => (
						<div
							key={index}
							style={{
								background: 'rgba(255,255,255,0.95)',
								backdropFilter: 'blur(20px)',
								borderRadius: '24px',
								padding: 'clamp(28px, 5vw, 40px)',
								position: 'relative',
								transition: 'all 0.4s ease',
								border: '1px solid rgba(255,255,255,0.5)',
								boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
								e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.2)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0) scale(1)';
								e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
							}}
						>
							<div style={{
								position: 'absolute',
								top: '-16px',
								right: '24px',
								width: 'clamp(56px, 10vw, 72px)',
								height: 'clamp(56px, 10vw, 72px)',
								background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 'clamp(22px, 4vw, 28px)',
								fontWeight: '900',
								color: '#1a1a1a',
								boxShadow: '0 8px 24px rgba(255,215,0,0.4)',
								border: '4px solid white'
							}}>
								{step.number}
							</div>

							<div style={{
								fontSize: 'clamp(48px, 8vw, 64px)',
								marginBottom: '20px',
								filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
							}}>
								{step.icon}
							</div>

							<h3 style={{
								margin: '0 0 12px 0',
								fontSize: 'clamp(22px, 4vw, 28px)',
								fontWeight: '800',
								color: '#1a1a1a'
							}}>
								{step.title}
							</h3>

							<p style={{
								margin: 0,
								fontSize: 'clamp(14px, 2.5vw, 16px)',
								color: '#666',
								lineHeight: 1.7
							}}>
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
