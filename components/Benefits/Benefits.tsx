export default function Benefits() {
	const items = [
		{ icon: '🚚', title: 'Безкоштовна доставка по Житомиру', desc: 'При замовленні від 2000 грн', color: '#4CAF50' },
		{ icon: '☕', title: 'Прямі контракти', desc: 'Постачання безпосередньо від виробників', color: '#8D6E63' },
		{ icon: '📦', title: 'Мінімальна партія від 5 кг', desc: 'Для малого та середнього бізнесу', color: '#FF9800' },
		{ icon: '💰', title: 'Ціни на 20-30% нижчі', desc: 'Завдяки прямим контрактам', color: '#FFD700' },
		{ icon: '🌱', title: 'Екологічна упаковка', desc: 'Свіжість і турбота про довкілля', color: '#66BB6A' },
		{ icon: '🔄', title: 'Гнучкі умови оплати', desc: 'Картка, рахунок, відстрочка', color: '#42A5F5' },
	];

	return (
		<section id="benefits" style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 40px)', background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
			<div style={{ maxWidth: 1200, margin: '0 auto' }}>
				<h2 className="section-title">Чому обирають Sunleaf</h2>
				<div style={{ display: 'grid', gap: 'clamp(24px, 4vw, 36px)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%, 300px),1fr))' }}>
					{items.map((it, i) => (
						<div
							key={i}
							className="card-3d fade-in"
							style={{
								background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
								padding: 32,
								borderRadius: 16,
								textAlign: 'center',
								border: '1px solid rgba(0,87,183,0.08)',
								animationDelay: `${i * 0.1}s`,
								cursor: 'pointer',
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							<div
								className="float"
								style={{
									fontSize: 60,
									marginBottom: 16,
									filter: `drop-shadow(0 4px 12px ${it.color}40)`,
									transition: 'transform 0.3s ease',
								}}
								onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2) rotate(10deg)')}
								onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
							>
								{it.icon}
							</div>
							<strong style={{ display: 'block', color: '#0057B7', fontSize: 19, marginBottom: 10 }}>{it.title}</strong>
							<p style={{ margin: 0, color: '#555', fontSize: 15, lineHeight: 1.6 }}>{it.desc}</p>
							<div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `radial-gradient(circle, ${it.color}20 0%, transparent 70%)`, borderRadius: '50%' }} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
