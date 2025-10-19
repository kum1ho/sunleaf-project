import { useState, useEffect } from 'react';

export default function Hero() {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section style={{
			minHeight: '100vh',
			background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			position: 'relative',
			overflow: 'hidden',
			display: 'flex',
			alignItems: 'center',
			padding: '100px 20px 60px'
		}}>
			{/* Animated Background Elements */}
			<div style={{
				position: 'absolute',
				top: '20%',
				left: '-10%',
				width: '500px',
				height: '500px',
				background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
				borderRadius: '50%',
				filter: 'blur(80px)',
				animation: 'float 6s ease-in-out infinite',
				transform: `translateY(${scrollY * 0.3}px)`
			}} />
			<div style={{
				position: 'absolute',
				bottom: '10%',
				right: '-10%',
				width: '600px',
				height: '600px',
				background: 'radial-gradient(circle, rgba(0,87,183,0.15) 0%, transparent 70%)',
				borderRadius: '50%',
				filter: 'blur(100px)',
				animation: 'float 8s ease-in-out infinite',
				animationDelay: '1s',
				transform: `translateY(${scrollY * -0.2}px)`
			}} />

			<div style={{
				maxWidth: '1400px',
				margin: '0 auto',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
				gap: '60px',
				alignItems: 'center',
				position: 'relative',
				zIndex: 1
			}}>
				{/* Left Content */}
				<div style={{ animation: 'fadeInUp 1s ease forwards' }}>
					<div style={{
						display: 'inline-block',
						padding: '10px 20px',
						background: 'rgba(255,255,255,0.2)',
						backdropFilter: 'blur(10px)',
						borderRadius: '50px',
						color: 'white',
						fontWeight: '700',
						fontSize: 'clamp(12px, 2vw, 14px)',
						marginBottom: '24px',
						border: '1px solid rgba(255,255,255,0.3)',
						boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
					}}>
						🏆 №1 ПОСТАЧАЛЬНИК В ЖИТОМИРІ
					</div>

					<h1 style={{
						margin: '0 0 24px 0',
						fontSize: 'clamp(36px, 7vw, 72px)',
						fontWeight: '900',
						color: 'white',
						lineHeight: 1.1,
						letterSpacing: '-2px',
						textShadow: '0 10px 30px rgba(0,0,0,0.2)'
					}}>
						Преміум кава<br/>
						<span style={{
							background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text'
						}}>
							оптом
						</span>
					</h1>

					<p style={{
						fontSize: 'clamp(16px, 3vw, 22px)',
						color: 'rgba(255,255,255,0.95)',
						lineHeight: 1.7,
						marginBottom: '40px',
						maxWidth: '600px',
						textShadow: '0 2px 8px rgba(0,0,0,0.1)'
					}}>
						Арабіка від <strong style={{ color: '#FFD700' }}>320 грн/кг</strong>. Безкоштовна доставка по Житомиру від 2000 грн. Мінімальне замовлення 5 кг.
					</p>

					{/* CTA Buttons */}
					<div style={{
						display: 'flex',
						gap: '16px',
						flexWrap: 'wrap',
						marginBottom: '48px'
					}}>
						<a
							href="#catalog"
							style={{
								padding: 'clamp(14px, 2.5vw, 18px) clamp(28px, 5vw, 40px)',
								background: 'white',
								color: '#667eea',
								textDecoration: 'none',
								borderRadius: '16px',
								fontWeight: '800',
								fontSize: 'clamp(15px, 2.5vw, 18px)',
								display: 'inline-flex',
								alignItems: 'center',
								gap: '10px',
								transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
								boxShadow: '0 12px 40px rgba(255,255,255,0.3)',
								border: '3px solid white'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
								e.currentTarget.style.color = '#1a1a1a';
								e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
								e.currentTarget.style.boxShadow = '0 20px 60px rgba(255,215,0,0.5)';
								e.currentTarget.style.borderColor = '#FFD700';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'white';
								e.currentTarget.style.color = '#667eea';
								e.currentTarget.style.transform = 'translateY(0) scale(1)';
								e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,255,255,0.3)';
								e.currentTarget.style.borderColor = 'white';
							}}
						>
							<span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}>🛒</span>
							Переглянути каталог
						</a>

						<a
							href="#contacts"
							style={{
								padding: 'clamp(14px, 2.5vw, 18px) clamp(28px, 5vw, 40px)',
								background: 'rgba(255,255,255,0.15)',
								backdropFilter: 'blur(10px)',
								color: 'white',
								textDecoration: 'none',
								borderRadius: '16px',
								fontWeight: '700',
								fontSize: 'clamp(15px, 2.5vw, 18px)',
								display: 'inline-flex',
								alignItems: 'center',
								gap: '10px',
								transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
								border: '2px solid rgba(255,255,255,0.3)',
								boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
								e.currentTarget.style.transform = 'translateY(-4px)';
								e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
							}}
						>
							<span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}>📞</span>
							Зв'язатися
						</a>
					</div>

					{/* Trust Badges */}
					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
						gap: '16px',
						maxWidth: '500px'
					}}>
						{[
							{ icon: '⚡', label: 'Швидка доставка' },
							{ icon: '✓', label: 'Гарантія якості' },
							{ icon: '💎', label: 'Преміум клас' }
						].map((item, i) => (
							<div
								key={i}
								style={{
									padding: '16px',
									background: 'rgba(255,255,255,0.1)',
									backdropFilter: 'blur(10px)',
									borderRadius: '12px',
									textAlign: 'center',
									border: '1px solid rgba(255,255,255,0.2)',
									transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
									e.currentTarget.style.transform = 'translateY(-4px)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
									e.currentTarget.style.transform = 'translateY(0)';
								}}
							>
								<div style={{ fontSize: 'clamp(28px, 5vw, 36px)', marginBottom: '8px' }}>
									{item.icon}
								</div>
								<div style={{
									fontSize: 'clamp(12px, 2vw, 14px)',
									fontWeight: '700',
									color: 'white'
								}}>
									{item.label}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Right Content - Product Showcase */}
				<div style={{
					animation: 'fadeInUp 1s ease 0.2s forwards',
					opacity: 0,
					display: 'flex',
					justifyContent: 'center'
				}}>
					<div style={{
						position: 'relative',
						width: '100%',
						maxWidth: '500px'
					}}>
						{/* Main Product Card */}
						<div style={{
							background: 'rgba(255,255,255,0.95)',
							backdropFilter: 'blur(20px)',
							borderRadius: '32px',
							padding: 'clamp(32px, 5vw, 48px)',
							boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
							border: '1px solid rgba(255,255,255,0.5)',
							animation: 'float 4s ease-in-out infinite'
						}}>
							<div style={{
								width: '100%',
								height: 'clamp(200px, 30vw, 300px)',
								background: 'linear-gradient(135deg, #6F4E37 0%, #3E2723 100%)',
								borderRadius: '24px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 'clamp(80px, 15vw, 120px)',
								marginBottom: '24px',
								position: 'relative',
								overflow: 'hidden'
							}}>
								<div style={{
									position: 'absolute',
									inset: 0,
									background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)'
								}} />
								<span style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}>
									☕
								</span>
							</div>

							<h3 style={{
								margin: '0 0 12px 0',
								fontSize: 'clamp(24px, 4vw, 32px)',
								fontWeight: '900',
								color: '#1a1a1a',
								lineHeight: 1.2
							}}>
								Арабіка преміум
							</h3>

							<p style={{
								margin: '0 0 24px 0',
								color: '#666',
								fontSize: 'clamp(14px, 2.5vw, 16px)',
								lineHeight: 1.6
							}}>
								Елітна арабіка з Ефіопії з нотками цитрусових та квітів
							</p>

							<div style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: 'clamp(16px, 3vw, 24px)',
								background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
								borderRadius: '16px',
								marginBottom: '24px'
							}}>
								<div>
									<div style={{ fontSize: 'clamp(12px, 2vw, 14px)', color: '#666', marginBottom: '4px' }}>
										Ціна за кг
									</div>
									<div style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: '900', color: '#28a745' }}>
										420 ₴
									</div>
								</div>
								<div style={{
									padding: '12px 20px',
									background: 'rgba(40,167,69,0.1)',
									color: '#28a745',
									borderRadius: '12px',
									fontSize: 'clamp(13px, 2vw, 15px)',
									fontWeight: '700',
									display: 'flex',
									alignItems: 'center',
									gap: '6px'
								}}>
									<span>✓</span>
									В наявності
								</div>
							</div>

							<button style={{
								width: '100%',
								padding: 'clamp(14px, 2.5vw, 18px)',
								background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
								color: 'white',
								border: 'none',
								borderRadius: '16px',
								fontSize: 'clamp(15px, 2.5vw, 17px)',
								fontWeight: '800',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '10px',
								transition: 'all 0.3s ease',
								boxShadow: '0 8px 24px rgba(40,167,69,0.3)'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
								e.currentTarget.style.boxShadow = '0 12px 32px rgba(40,167,69,0.4)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0) scale(1)';
								e.currentTarget.style.boxShadow = '0 8px 24px rgba(40,167,69,0.3)';
							}}
							>
								<span style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}>🛒</span>
								Замовити зараз
							</button>
						</div>

						{/* Floating Badge */}
						<div style={{
							position: 'absolute',
							top: '-20px',
							right: '-20px',
							width: 'clamp(80px, 15vw, 120px)',
							height: 'clamp(80px, 15vw, 120px)',
							background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
							borderRadius: '50%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0 16px 40px rgba(255,215,0,0.4)',
							animation: 'pulse 2s ease-in-out infinite',
							border: '4px solid white'
						}}>
							<span style={{ fontSize: 'clamp(28px, 5vw, 40px)' }}>⭐</span>
							<span style={{
								fontSize: 'clamp(10px, 2vw, 12px)',
								fontWeight: '800',
								color: '#1a1a1a',
								marginTop: '4px'
							}}>
								ХІТ
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll Indicator */}
			<div style={{
				position: 'absolute',
				bottom: '40px',
				left: '50%',
				transform: 'translateX(-50%)',
				animation: 'float 2s ease-in-out infinite',
				cursor: 'pointer'
			}}>
				<a
					href="#benefits"
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '8px',
						textDecoration: 'none',
						color: 'white',
						opacity: 0.8,
						transition: 'opacity 0.3s ease'
					}}
					onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
					onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
				>
					<span style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '1px' }}>
						ПРОКРУТІТЬ
					</span>
					<span style={{ fontSize: '24px', animation: 'bounce 2s ease-in-out infinite' }}>
						↓
					</span>
				</a>
			</div>

			<style jsx>{`
				@keyframes bounce {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(10px); }
				}

				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(40px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</section>
	);
}
