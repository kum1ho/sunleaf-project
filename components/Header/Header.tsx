import { useState, useEffect } from 'react';

export default function Header() {
	const [mobileMenu, setMobileMenu] = useState(false);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const updateCartCount = () => {
			try {
				const cart = JSON.parse(localStorage.getItem('cart') || '[]');
				const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
				setCartCount(count);
			} catch (e) {
				console.error('Error updating cart count:', e);
				setCartCount(0);
			}
		};

		updateCartCount();
		window.addEventListener('cartUpdated', updateCartCount);
		window.addEventListener('storage', updateCartCount);

		return () => {
			window.removeEventListener('cartUpdated', updateCartCount);
			window.removeEventListener('storage', updateCartCount);
		};
	}, []);

	return (
		<>
			<header style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1000,
				background: 'rgba(255, 255, 255, 0.98)',
				backdropFilter: 'blur(20px)',
				boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
				borderBottom: '1px solid rgba(0,0,0,0.08)',
				transition: 'all 0.3s ease'
			}}>
				<div style={{
					maxWidth: '1400px',
					margin: '0 auto',
					padding: 'clamp(16px, 3vw, 20px) clamp(20px, 4vw, 40px)',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
					{/* Logo */}
					<a href="/" style={{
						display: 'flex',
						alignItems: 'center',
						gap: 'clamp(10px, 2vw, 14px)',
						textDecoration: 'none',
						transition: 'all 0.3s ease'
					}}
					onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
					onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
					>
						<div style={{
							width: 'clamp(44px, 8vw, 52px)',
							height: 'clamp(44px, 8vw, 52px)',
							borderRadius: '14px',
							background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 'clamp(22px, 4vw, 26px)',
							boxShadow: '0 8px 24px rgba(255,215,0,0.3)'
						}}>
							🍃
						</div>
						<div>
							<div style={{
								fontSize: 'clamp(20px, 4vw, 24px)',
								fontWeight: '900',
								color: '#1a1a1a',
								letterSpacing: '-0.5px',
								lineHeight: 1
							}}>
								Sunleaf
							</div>
							<div style={{
								fontSize: 'clamp(9px, 1.8vw, 10px)',
								opacity: 0.8,
								fontWeight: '700',
								letterSpacing: '0.5px',
								marginTop: '2px',
								color: '#667eea'
							}}>
								ПРЕМІУМ КАВА
							</div>
						</div>
					</a>

					{/* Desktop Navigation */}
					<nav style={{
						display: 'flex',
						gap: 'clamp(20px, 3vw, 32px)',
						alignItems: 'center'
					}}
					className="desktop-nav"
					>
						{[
							{ href: '#benefits', label: 'Переваги' },
							{ href: '#catalog', label: 'Каталог' },
							{ href: '#for-whom', label: 'Для кого' },
							{ href: '#reviews', label: 'Відгуки' },
							{ href: '#contacts', label: 'Контакти' }
						].map((link) => (
							<a
								key={link.href}
								href={link.href}
								style={{
									color: '#1a1a1a',
									textDecoration: 'none',
									fontSize: 'clamp(14px, 2.5vw, 16px)',
									fontWeight: '700',
									transition: 'all 0.3s ease',
									position: 'relative',
									padding: '8px 0'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.color = '#667eea';
									e.currentTarget.style.transform = 'translateY(-2px)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.color = '#1a1a1a';
									e.currentTarget.style.transform = 'translateY(0)';
								}}
							>
								{link.label}
							</a>
						))}

						{/* Cart Button */}
						<button
							onClick={() => {
								try {
									if (typeof window !== 'undefined' && (window as any).openCart) {
										(window as any).openCart();
									}
								} catch (e) {
									console.error('Error opening cart:', e);
								}
							}}
							style={{
								padding: '12px 20px',
								background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
								color: '#1a1a1a',
								border: 'none',
								borderRadius: '12px',
								fontWeight: '700',
								fontSize: '15px',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
								position: 'relative',
								boxShadow: '0 4px 16px rgba(255,215,0,0.4)',
								marginLeft: '16px',
								whiteSpace: 'nowrap'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
								e.currentTarget.style.boxShadow = '0 12px 28px rgba(255,215,0,0.5)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0) scale(1)';
								e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,215,0,0.4)';
							}}
						>
							<span style={{ fontSize: '18px' }}>🛒</span>
							<span className="cart-label">Кошик</span>
							{cartCount > 0 && (
								<span style={{
									position: 'absolute',
									top: '-6px',
									right: '-6px',
									background: '#dc3545',
									color: 'white',
									borderRadius: '50%',
									width: '22px',
									height: '22px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '12px',
									fontWeight: '700',
									border: '2px solid white',
									boxShadow: '0 4px 12px rgba(220,53,69,0.4)',
									animation: 'pulse 2s ease-in-out infinite'
								}}>
									{cartCount}
								</span>
							)}
						</button>
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenu(!mobileMenu)}
						style={{
							display: 'none',
							width: '44px',
							height: '44px',
							borderRadius: '12px',
							background: '#f8f9fa',
							border: '2px solid #e0e0e0',
							color: '#1a1a1a',
							fontSize: '24px',
							cursor: 'pointer',
							alignItems: 'center',
							justifyContent: 'center',
							transition: 'all 0.3s ease'
						}}
						className="mobile-menu-btn"
						onMouseEnter={(e) => {
							e.currentTarget.style.background = '#667eea';
							e.currentTarget.style.color = 'white';
							e.currentTarget.style.borderColor = '#667eea';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = '#f8f9fa';
							e.currentTarget.style.color = '#1a1a1a';
							e.currentTarget.style.borderColor = '#e0e0e0';
						}}
					>
						{mobileMenu ? '✕' : '☰'}
					</button>
				</div>

				{/* Mobile Menu */}
				{mobileMenu && (
					<div style={{
						background: 'white',
						padding: '24px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
						animation: 'slideDown 0.3s ease',
						borderTop: '1px solid #e0e0e0'
					}}
					className="mobile-menu"
					>
						<nav style={{ display: 'grid', gap: '16px' }}>
							{[
								{ href: '#benefits', label: '✨ Переваги' },
								{ href: '#catalog', label: '📦 Каталог' },
								{ href: '#for-whom', label: '🎯 Для кого' },
								{ href: '#reviews', label: '⭐ Відгуки' },
								{ href: '#contacts', label: '📞 Контакти' }
							].map((link) => (
								<a
									key={link.href}
									href={link.href}
									onClick={() => setMobileMenu(false)}
									style={{
										color: '#1a1a1a',
										textDecoration: 'none',
										fontSize: '18px',
										fontWeight: '700',
										padding: '12px 16px',
										borderRadius: '12px',
										background: '#f8f9fa',
										transition: 'all 0.3s ease',
										display: 'block'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = '#667eea';
										e.currentTarget.style.color = 'white';
										e.currentTarget.style.transform = 'translateX(8px)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = '#f8f9fa';
										e.currentTarget.style.color = '#1a1a1a';
										e.currentTarget.style.transform = 'translateX(0)';
									}}
								>
									{link.label}
								</a>
							))}
							<button
								onClick={() => {
									try {
										if (typeof window !== 'undefined' && (window as any).openCart) {
											(window as any).openCart();
										}
										setMobileMenu(false);
									} catch (e) {
										console.error('Error opening cart from mobile menu:', e);
									}
								}}
								style={{
									padding: '16px',
									background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
									color: '#1a1a1a',
									border: 'none',
									borderRadius: '12px',
									fontWeight: '800',
									fontSize: '18px',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: '10px',
									boxShadow: '0 6px 20px rgba(255,215,0,0.3)',
									position: 'relative',
									transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'scale(1.05)';
									e.currentTarget.style.boxShadow = '0 10px 28px rgba(255,215,0,0.4)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'scale(1)';
									e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,215,0,0.3)';
								}}
							>
								<span style={{ fontSize: '22px' }}>🛒</span>
								Кошик
								{cartCount > 0 && (
									<span style={{
										background: '#dc3545',
										color: 'white',
										borderRadius: '50%',
										width: '24px',
										height: '24px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '13px',
										fontWeight: '700'
									}}>
										{cartCount}
									</span>
								)}
							</button>
						</nav>
					</div>
				)}
			</header>

			<style jsx>{`
				@media (max-width: 768px) {
					.desktop-nav { display: none !important; }
					.mobile-menu-btn { display: flex !important; }
				}
				@media (max-width: 480px) {
					.cart-label { display: none; }
				}
				@keyframes pulse {
					0%, 100% { transform: scale(1); opacity: 1; }
					50% { transform: scale(1.1); opacity: 0.9; }
				}
				@keyframes slideDown {
					from { opacity: 0; transform: translateY(-10px); }
					to { opacity: 1; transform: translateY(0); }
				}
			`}</style>
		</>
	);
}
