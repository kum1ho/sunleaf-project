export default function CooperationProcess() {
	const steps = [
		{ n: 1, t: 'Консультація', d: 'Визначаємо ваші потреби', icon: '📞' },
		{ n: 2, t: 'Підбір', d: 'Формуємо оптимальний асортимент', icon: '📦' },
		{ n: 3, t: 'Доставка', d: 'Відправляємо за 24 години', icon: '🚚' },
		{ n: 4, t: 'Підтримка', d: 'Супровід на всіх етапах', icon: '🤝' },
	];

	return (
		<section id="process" style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 40px)', background: 'linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%)' }}>
			<div style={{ maxWidth: 1200, margin: '0 auto' }}>
				<h2 className="section-title">Процес співпраці</h2>
				<div style={{ display: 'grid', gap: 'clamp(32px, 5vw, 48px)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%, 240px),1fr))', position: 'relative' }}>
					{steps.map((s, i) => (
						<div key={i} className="scale-in" style={{ textAlign: 'center', animationDelay: `${i * 0.15}s` }}>
							<div
								style={{
									width: 90,
									height: 90,
									borderRadius: '50%',
									background: 'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)',
									color: '#fff',
									display: 'grid',
									placeItems: 'center',
									fontSize: 36,
									margin: '0 auto 20px',
									boxShadow: '0 8px 24px rgba(0,87,183,0.3)',
									position: 'relative',
								}}
								className="pulse-glow"
							>
								{s.icon}
								<div style={{ position: 'absolute', top: -8, right: -8, width: 32, height: 32, borderRadius: '50%', background: '#FFD700', color: '#0057B7', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 18, boxShadow: '0 4px 12px rgba(255,215,0,0.4)' }}>{s.n}</div>
							</div>
							<strong style={{ display: 'block', color: '#0057B7', fontSize: 20, marginBottom: 10, fontWeight: 700 }}>{s.t}</strong>
							<p style={{ margin: 0, color: '#555', fontSize: 15, lineHeight: 1.6 }}>{s.d}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
