import { useState } from 'react';

export default function SavingsCalculator() {
	const [monthly, setMonthly] = useState(50);
	const [current, setCurrent] = useState(400);

	const sunleafPrice = 320;
	const monthlySavings = (current - sunleafPrice) * monthly;
	const yearlySavings = monthlySavings * 12;

	return (
		<section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 40px)', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
			<div style={{ maxWidth: 1200, margin: '0 auto' }}>
				<h2 className="section-title">💰 Розрахуйте вашу економію</h2>
				<p style={{ textAlign: 'center', marginBottom: 50, fontSize: 18, color: '#666', maxWidth: 600, margin: '0 auto 50px' }}>
					Дізнайтеся, скільки ви зможете заощадити, перейшовши на Sunleaf
				</p>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>
					<div style={{ background: '#fff', padding: 40, borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
						<h3 style={{ marginBottom: 30, color: '#0057B7', fontSize: 24 }}>Ваші дані</h3>
						
						<div style={{ marginBottom: 20 }}>
							<label style={{ display: 'block', marginBottom: 10, fontWeight: 600, color: '#333' }}>
								Споживання кави на місяць (кг):
							</label>
							<input
								type="range"
								min="10"
								max="200"
								value={monthly}
								onChange={(e) => setMonthly(Number(e.target.value))}
								style={{ width: '100%', marginBottom: 10 }}
							/>
							<div style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#0057B7' }}>
								{monthly} кг/місяць
							</div>
						</div>

						<div style={{ marginBottom: 20 }}>
							<label style={{ display: 'block', marginBottom: 10, fontWeight: 600, color: '#333' }}>
								Поточна ціна за кг (грн):
							</label>
							<input
								type="range"
								min="280"
								max="500"
								value={current}
								onChange={(e) => setCurrent(Number(e.target.value))}
								style={{ width: '100%', marginBottom: 10 }}
							/>
							<div style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#dc3545' }}>
								{current} грн/кг
							</div>
						</div>

						<div style={{ textAlign: 'center', marginTop: 20, padding: 15, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', borderRadius: 10 }}>
							<div style={{ fontSize: 14, color: '#0d47a1', marginBottom: 5 }}>Ціна Sunleaf:</div>
							<div style={{ fontSize: 24, fontWeight: 'bold', color: '#28a745' }}>{sunleafPrice} грн/кг</div>
						</div>
					</div>

					<div style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: '#fff', padding: 40, borderRadius: 20, textAlign: 'center' }}>
						<h3 style={{ marginBottom: 30, fontSize: 28, margin: '0 0 30px' }}>💸 Ваша економія</h3>
						
						<div style={{ marginBottom: 30 }}>
							<div style={{ fontSize: 16, opacity: 0.9, marginBottom: 10 }}>За місяць:</div>
							<div style={{ fontSize: 36, fontWeight: 'bold' }}>
								{monthlySavings > 0 ? `${monthlySavings.toLocaleString()} грн` : '0 грн'}
							</div>
						</div>

						<div style={{ marginBottom: 30 }}>
							<div style={{ fontSize: 16, opacity: 0.9, marginBottom: 10 }}>За рік:</div>
							<div style={{ fontSize: 48, fontWeight: 'bold' }}>
								{yearlySavings > 0 ? `${yearlySavings.toLocaleString()} грн` : '0 грн'}
							</div>
						</div>

						{yearlySavings > 0 && (
							<div style={{ padding: 15, background: 'rgba(255,255,255,0.2)', borderRadius: 10, fontSize: 14 }}>
								🎯 За ці гроші можна купити {Math.floor(yearlySavings / 320)} кг кави безкоштовно!
							</div>
						)}
					</div>
				</div>

				<div style={{ textAlign: 'center', marginTop: 40 }}>
					<a href="#contacts" className="btn btn-primary" style={{ display: 'inline-block', padding: '16px 32px', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#0057B7', textDecoration: 'none', borderRadius: 12, fontWeight: 800, fontSize: 18 }}>
						💰 Почати економити зараз!
					</a>
				</div>
			</div>
		</section>
	);
}
