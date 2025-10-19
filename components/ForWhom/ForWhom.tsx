export default function ForWhom() {
	const items = [
		{ icon: '☕', title: "Кав'ярні та кофейні", desc: 'Повний асортимент для вашого меню', gradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
		{ icon: '🍽️', title: 'Ресторани та бари', desc: 'Якісна кава і чай для гостей', gradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' },
		{ icon: '🏨', title: 'Готелі та хостели', desc: 'Рішення для номерного фонду', gradient: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
		{ icon: '🏢', title: 'Офісні центри', desc: 'Напої для співробітників', gradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
		{ icon: '🛒', title: 'Продуктові магазини', desc: 'Оптова полиця під ключ', gradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
		{ icon: '👥', title: 'Корпоративні клієнти', desc: 'Індивідуальні умови', gradient: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)' },
	];

	return (
		<section id="for-whom" style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 40px)', background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)' }}>
			<div style={{ maxWidth: 1200, margin: '0 auto' }}>
				<h2 className="section-title">Для кого ми працюємо</h2>
				<div style={{ display: 'grid', gap: 'clamp(24px, 4vw, 36px)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%, 280px),1fr))' }}>
					{items.map((it, i) => (
						<div
							key={i}
							className="card-hover fade-in"
							style={{
								background: it.gradient,
								padding: 32,
								borderRadius: 16,
								textAlign: 'center',
								border: '1px solid rgba(0,87,183,0.1)',
								boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
								animationDelay: `${i * 0.1}s`,
							}}
						>
							<div className="float" style={{ fontSize: 60, marginBottom: 16 }}>
								{it.icon}
							</div>
							<strong style={{ display: 'block', color: '#0057B7', fontSize: 19, marginBottom: 10, fontWeight: 700 }}>{it.title}</strong>
							<p style={{ margin: 0, color: '#555', fontSize: 15, lineHeight: 1.6 }}>{it.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
