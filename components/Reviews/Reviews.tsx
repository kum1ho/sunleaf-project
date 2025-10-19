export default function Reviews() {
	const reviews = [
		{ name: "Кав'ярня «Аромат»", rating: 5, text: 'Якість кави стабільно висока, ціни приємні, доставка вчасно.', img: 'https://via.placeholder.com/100x100/0057B7/FFFFFF?text=КА', bg: 'linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)' },
		{ name: 'Ресторан «Подолянь»', rating: 5, text: 'Значно покращили кавову картку. Гості помічають різницю!', img: 'https://via.placeholder.com/100x100/FFD700/0057B7?text=РП', bg: 'linear-gradient(145deg, #fff3e0 0%, #ffe0b2 100%)' },
		{ name: 'Готель «Житомир»', rating: 4, text: 'Стабільна якість, професійне обслуговування. Рекомендуємо!', img: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=ГЖ', bg: 'linear-gradient(145deg, #f3e5f5 0%, #e1bee7 100%)' },
	];

	const Star = ({ filled }: { filled: boolean }) => <span style={{ color: filled ? '#FFD700' : '#ddd', fontSize: 20 }}>★</span>;

	return (
		<section id="reviews" style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 40px)', background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
			<div style={{ maxWidth: 1200, margin: '0 auto' }}>
				<h2 className="section-title">Відгуки клієнтів</h2>
				<div style={{ display: 'grid', gap: 'clamp(24px, 4vw, 36px)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%, 320px),1fr))', marginBottom: 40 }}>
					{reviews.map((r, i) => (
						<div
							key={i}
							className="card-hover fade-in"
							style={{
								background: r.bg,
								padding: 28,
								borderRadius: 16,
								boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
								border: '1px solid rgba(0,87,183,0.1)',
								animationDelay: `${i * 0.12}s`,
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
								<div style={{ width: 60, height: 60, borderRadius: '50%', backgroundImage: `url('${r.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
								<div>
									<strong style={{ display: 'block', color: '#0057B7', fontSize: 17 }}>{r.name}</strong>
									<div>{[...Array(5)].map((_, j) => <Star key={j} filled={j < r.rating} />)}</div>
								</div>
							</div>
							<p style={{ margin: 0, color: '#555', fontSize: 15, lineHeight: 1.7 }}>"{r.text}"</p>
						</div>
					))}
				</div>
				<div className="scale-in" style={{ textAlign: 'center', padding: 28, background: 'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)', borderRadius: 16, color: '#fff', boxShadow: '0 12px 32px rgba(0,87,183,0.25)' }}>
					<div style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>★ 4.8/5</div>
					<p style={{ margin: 0, fontSize: 16, opacity: 0.95 }}>На основі 47 реальних відгуків з Google Бізнес</p>
				</div>
			</div>
		</section>
	);
}
