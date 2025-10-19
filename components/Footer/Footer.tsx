export default function Footer() {
	const socials = [
		{ icon: '📘', name: 'Facebook', url: '#', color: '#1877F2' },
		{ icon: '📷', name: 'Instagram', url: '#', color: '#E4405F' },
		{ icon: '💼', name: 'LinkedIn', url: '#', color: '#0A66C2' },
		{ icon: '📞', name: 'Telegram', url: '#', color: '#0088cc' },
	];

	return (
		<footer style={{ background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)', color: '#fff', marginTop: 80 }}>
			<div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px 40px', display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%, 220px),1fr))' }}>
				<div className="fade-in">
					<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
						<div
							className="pulse-glow"
							style={{
								width: 50,
								height: 50,
								borderRadius: '50%',
								background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
								display: 'grid',
								placeItems: 'center',
								fontWeight: 700,
								fontSize: 24,
								boxShadow: '0 8px 20px rgba(255,215,0,0.4)',
							}}
						>
							🍃
						</div>
						<strong style={{ fontSize: 22, letterSpacing: '-0.02em' }}>Sunleaf</strong>
					</div>
					<p style={{ margin: '0 0 20px', opacity: 0.9, lineHeight: 1.7 }}>Оптові поставки кави, чаю та солодощів</p>
					<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
						{socials.map((s, i) => (
							<a
								key={i}
								href={s.url}
								title={s.name}
								className="bounce-on-hover"
								style={{
									width: 44,
									height: 44,
									borderRadius: '50%',
									background: 'rgba(255,255,255,0.15)',
									backdropFilter: 'blur(10px)',
									display: 'grid',
									placeItems: 'center',
									fontSize: 20,
									textDecoration: 'none',
									border: '2px solid rgba(255,255,255,0.2)',
									transition: 'all 0.3s ease',
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = s.color;
									e.currentTarget.style.borderColor = s.color;
									e.currentTarget.style.transform = 'translateY(-4px)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
									e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
									e.currentTarget.style.transform = '';
								}}
							>
								{s.icon}
							</a>
						))}
					</div>
				</div>
				{[
					{ h: '📦 Продукція', l: [{ t: 'Кава', i: '☕' }, { t: 'Чай', i: '🍵' }, { t: 'Солодощі', i: '🍫' }] },
					{ h: '🏢 Компанія', l: [{ t: 'Про нас', i: 'ℹ️' }, { t: 'Відгуки', i: '⭐' }, { t: 'Контакти', i: '📞' }] },
					{ h: '👥 Клієнтам', l: [{ t: 'Для кого', i: '🎯' }, { t: 'Оптові закупівлі', i: '📦' }, { t: 'Програма лояльності', i: '🎁' }] },
				].map((g, i) => (
					<div key={i} className="slide-in-right" style={{ animationDelay: `${i * 0.15}s` }}>
						<h4 style={{ color: '#FFD700', marginBottom: 16, fontSize: 17, fontWeight: 700 }}>{g.h}</h4>
						{g.l.map((lnk, j) => (
							<a
								key={j}
								href="#"
								style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, color: '#fff', opacity: 0.85, transition: 'all 0.3s ease', textDecoration: 'none', fontSize: 15 }}
								onMouseEnter={(e) => {
									e.currentTarget.style.opacity = '1';
									e.currentTarget.style.paddingLeft = '8px';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.opacity = '0.85';
									e.currentTarget.style.paddingLeft = '0';
								}}
							>
								<span style={{ fontSize: 16 }}>{lnk.i}</span> {lnk.t}
							</a>
						))}
					</div>
				))}
			</div>
			<div style={{ textAlign: 'center', padding: '24px 20px', borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: 14, opacity: 0.9 }}>
				<p style={{ margin: '0 0 8px' }}>&copy; 2025 Sunleaf. Всі права захищені.</p>
				<p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>Зроблено з ❤️ для українського бізнесу 🇺🇦</p>
			</div>
		</footer>
	);
}
