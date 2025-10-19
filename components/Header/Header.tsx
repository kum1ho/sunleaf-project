import { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const links = [
		{ name: 'Переваги', id: 'benefits' },
		{ name: 'Каталог', id: 'catalog' },
		{ name: 'Для кого', id: 'for-whom' },
		{ name: 'Процес', id: 'process' },
		{ name: 'Відгуки', id: 'reviews' },
		{ name: 'Контакти', id: 'contacts' },
	];

	const closeMenu = () => setMenuOpen(false);

	return (
		<>
			<header
				className="header-sticky"
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 50,
					background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)',
					backdropFilter: 'saturate(180%) blur(10px)',
					borderBottom: scrolled ? '1px solid rgba(0,87,183,0.1)' : '1px solid transparent',
					boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
					transition: 'all 0.3s ease',
				}}
			>
				<div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: scrolled ? '8px 20px' : '14px 20px', transition: 'padding 0.3s ease' }}>
					{/* Logo */}
					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
						<Logo size={scrolled ? 38 : 44} className="float" />
						<strong className="gradient-text" style={{ fontSize: scrolled ? 18 : 20, transition: 'font-size 0.3s ease', background: 'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
							Sunleaf
						</strong>
					</div>

					{/* Desktop Navigation */}
					<nav className="desktop-nav">
						<ul style={{ display: 'flex', gap: 20, listStyle: 'none', margin: 0, padding: 0 }}>
							{links.map((link, i) => (
								<li key={i}>
									<a
										href={`#${link.id}`}
										style={{
											color: '#333',
											fontWeight: 500,
											textDecoration: 'none',
											transition: 'color 0.3s ease',
										}}
										onMouseEnter={(e) => (e.currentTarget.style.color = '#0057B7')}
										onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
									>
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</nav>

					{/* Phone (Desktop) */}
					<a href="tel:+380671234567" className="desktop-phone" style={{ color: '#0057B7', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
						+380 67 123 45 67
					</a>

					{/* Burger Menu */}
					<div className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
						<span style={{ width: 28, height: 3, background: '#0057B7', borderRadius: 2, transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }}></span>
						<span style={{ width: 28, height: 3, background: '#0057B7', borderRadius: 2, transition: 'all 0.3s ease', opacity: menuOpen ? 0 : 1 }}></span>
						<span style={{ width: 28, height: 3, background: '#0057B7', borderRadius: 2, transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }}></span>
					</div>
				</div>
			</header>

			{/* Mobile Menu */}
			<div className={`mobile-menu ${menuOpen ? 'open' : ''}`} style={{ position: 'fixed', top: 0, right: menuOpen ? 0 : '-100%', width: '80%', maxWidth: 320, height: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', boxShadow: '-4px 0 20px rgba(0,0,0,0.15)', padding: '80px 24px 24px', transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 99, overflowY: 'auto' }}>
				<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
					{links.map((link, i) => (
						<li key={i} style={{ marginBottom: 20 }}>
							<a
								href={`#${link.id}`}
								onClick={closeMenu}
								style={{
									display: 'block',
									padding: '12px 16px',
									color: '#333',
									fontWeight: 600,
									fontSize: 18,
									borderRadius: 8,
									textDecoration: 'none',
									transition: 'all 0.3s ease',
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,87,183,0.1) 0%, rgba(255,215,0,0.1) 100%)';
									e.currentTarget.style.color = '#0057B7';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'transparent';
									e.currentTarget.style.color = '#333';
								}}
							>
								{link.name}
							</a>
						</li>
					))}
					<li style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e5e7eb' }}>
						<a href="tel:+380671234567" style={{ background: 'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)', color: '#fff', textAlign: 'center', fontWeight: 700, display: 'block', padding: '12px 16px', borderRadius: 8, textDecoration: 'none' }}>
							📞 +380 67 123 45 67
						</a>
					</li>
				</ul>
			</div>

			{/* Overlay */}
			<div className={`mobile-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none', transition: 'opacity 0.3s ease', zIndex: 98 }}></div>

			<style jsx>{`
				.burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; z-index: 100; }
				.desktop-nav, .desktop-phone { display: block; }
				@media (max-width: 768px) {
					.burger { display: flex; }
					.desktop-nav, .desktop-phone { display: none !important; }
				}
			`}</style>
		</>
	);
}
