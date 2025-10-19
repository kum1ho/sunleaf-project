export default function Footer() {
	const socials = [
		{ icon: '📘', name: 'Facebook', url: 'https://facebook.com', color: '#1877F2' },
		{ icon: '📷', name: 'Instagram', url: 'https://instagram.com', color: '#E4405F' },
		{ icon: '💼', name: 'LinkedIn', url: 'https://linkedin.com', color: '#0A66C2' },
		{ icon: '📞', name: 'Telegram', url: 'https://t.me', color: '#0088cc' },
	];

	return (
		<footer style={{
			background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
			color: '#fff',
			marginTop: 'clamp(60px, 10vw, 100px)'
		}}>
			<div style={{
				maxWidth: '1400px',
				margin: '0 auto',
				padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 40px) clamp(32px, 5vw, 48px)'
			}}>
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
					gap: 'clamp(32px, 6vw, 48px)',
					marginBottom: 'clamp(40px, 7vw, 60px)'
				}}>
					{/* Logo & Socials */}
					<div>
						<div style={{
							display: 'flex',
							alignItems: 'center',
							gap: '12px',
							marginBottom: '20px'
						}}>
							<div style={{
								width: 'clamp(48px, 8vw, 56px)',
								height: 'clamp(48px, 8vw, 56px)',
								borderRadius: '16px',
								background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 'clamp(24px, 4vw, 28px)',
								boxShadow: '0 8px 24px rgba(255,215,0,0.3)'
							}}>
								🍃
							</div>
							<div>
								<div style={{
									fontSize: 'clamp(22px, 4vw, 26px)',
									fontWeight: '900',
									letterSpacing: '-0.5px'
								}}>
									Sunleaf
								</div>
								<div style={{
									fontSize: 'clamp(10px, 2vw, 11px)',
									opacity: 0.7,
									fontWeight: '600',
									letterSpacing: '0.5px',
									marginTop: '2px'
								}}>
									ПРЕМІУМ КАВА
								</div>
							</div>
						</div>
						<p style={{
							margin: '0 0 24px',
							opacity: 0.85,
							lineHeight: 1.7,
							fontSize: 'clamp(14px, 2.5vw, 16px)'
						}}>
							Оптові поставки преміум кави, чаю та солодощів для вашого бізнесу
						</p>
						<div style={{
							display: 'flex',
							gap: '12px',
							flexWrap: 'wrap'
						}}>
							{socials.map((s, i) => (
								<a
									key={i}
									href={s.url}
									target="_blank"
									rel="noopener noreferrer"
									title={s.name}
									style={{
										width: 'clamp(44px, 8vw, 50px)',
										height: 'clamp(44px, 8vw, 50px)',
										borderRadius: '50%',
										background: 'rgba(255,255,255,0.1)',
										backdropFilter: 'blur(10px)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 'clamp(20px, 4vw, 24px)',
										textDecoration: 'none',
										border: '2px solid rgba(255,255,255,0.2)',
										transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
										cursor: 'pointer'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = s.color;
										e.currentTarget.style.borderColor = s.color;
										e.currentTarget.style.transform = 'translateY(-6px) scale(1.1)';
										e.currentTarget.style.boxShadow = `0 12px 24px ${s.color}40`;
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
										e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
										e.currentTarget.style.transform = 'translateY(0) scale(1)';
										e.currentTarget.style.boxShadow = 'none';
									}}
								>
									{s.icon}
								</a>
							))}
						</div>
					</div>

					{/* Links Sections */}
					{[
						{
							title: '📦 Продукція',
							links: [
								{ text: 'Кава преміум', icon: '☕', href: '#catalog' },
								{ text: 'Елітний чай', icon: '🍵', href: '#catalog' },
								{ text: 'Солодощі', icon: '🍫', href: '#catalog' }
							]
						},
						{
							title: '🏢 Компанія',
							links: [
								{ text: 'Про нас', icon: 'ℹ️', href: '#benefits' },
								{ text: 'Відгуки', icon: '⭐', href: '#reviews' },
								{ text: 'Контакти', icon: '📞', href: '#contacts' }
							]
						},
						{
							title: '👥 Клієнтам',
							links: [
								{ text: 'Для кого', icon: '🎯', href: '#for-whom' },
								{ text: 'Оптові закупівлі', icon: '📦', href: '#catalog' },
								{ text: 'Доставка', icon: '🚚', href: '#contacts' }
							]
						}
					].map((section, i) => (
						<div key={i}>
							<h4 style={{
								color: '#FFD700',
								marginBottom: '20px',
								fontSize: 'clamp(16px, 3vw, 18px)',
								fontWeight: '800',
								letterSpacing: '-0.3px'
							}}>
								{section.title}
							</h4>
							<div style={{ display: 'grid', gap: '14px' }}>
								{section.links.map((link, j) => (
									<a
										key={j}
										href={link.href}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '10px',
											color: '#fff',
											opacity: 0.8,
											transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
											textDecoration: 'none',
											fontSize: 'clamp(14px, 2.5vw, 15px)',
											fontWeight: '500',
											padding: '4px 0'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.opacity = '1';
											e.currentTarget.style.paddingLeft = '12px';
											e.currentTarget.style.color = '#FFD700';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.opacity = '0.8';
											e.currentTarget.style.paddingLeft = '0';
											e.currentTarget.style.color = '#fff';
										}}
									>
										<span style={{ fontSize: 'clamp(16px, 3vw, 18px)' }}>{link.icon}</span>
										{link.text}
									</a>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Contact Info */}
				<div style={{
					padding: 'clamp(24px, 4vw, 32px)',
					background: 'rgba(255,255,255,0.05)',
					borderRadius: '20px',
					marginBottom: 'clamp(32px, 5vw, 40px)',
					border: '1px solid rgba(255,255,255,0.1)'
				}}>
					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
						gap: 'clamp(20px, 4vw, 32px)',
						textAlign: 'center'
					}}>
						{[
							{ icon: '📞', title: 'Телефон', value: '+380 67 123-45-67', href: 'tel:+380671234567' },
							{ icon: '📧', title: 'Email', value: 'info@sunleaf.ua', href: 'mailto:info@sunleaf.ua' },
							{ icon: '📍', title: 'Адреса', value: 'вул. Київська, 75, Житомир', href: '#contacts' }
						].map((item, i) => (
							<a
								key={i}
								href={item.href}
								style={{
									textDecoration: 'none',
									color: 'inherit',
									transition: 'transform 0.3s ease'
								}}
								onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
								onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'
								}>
								<div style={{
									fontSize: 'clamp(32px, 6vw, 40px)',
									marginBottom: '12px'
								}}>
									{item.icon}
								</div>
								<div style={{
									fontSize: 'clamp(12px, 2vw, 13px)',
									opacity: 0.6,
									marginBottom: '6px',
									fontWeight: '600'
								}}>
									{item.title}
								</div>
								<div style={{
									fontSize: 'clamp(14px, 2.5vw, 16px)',
									fontWeight: '700',
									color: '#FFD700'
								}}>
									{item.value}
								</div>
							</a>
						))}
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div style={{
				textAlign: 'center',
				padding: 'clamp(24px, 4vw, 32px) clamp(20px, 4vw, 40px)',
				borderTop: '1px solid rgba(255,255,255,0.1)',
				background: 'rgba(0,0,0,0.2)'
			}}>
				<p style={{
					margin: '0 0 8px',
					fontSize: 'clamp(13px, 2vw, 15px)',
					opacity: 0.85,
					fontWeight: '500'
				}}>
					&copy; {new Date().getFullYear()} Sunleaf. Всі права захищені.
				</p>
				<p style={{
					margin: 0,
					fontSize: 'clamp(12px, 2vw, 14px)',
					opacity: 0.6,
					fontWeight: '500'
				}}>
					Зроблено з ❤️ для українського бізнесу 🇺🇦
				</p>
			</div>
		</footer>
	);
}
