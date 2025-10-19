import { useState } from 'react';

export default function OnlineConsultant() {
	const [open, setOpen] = useState(false);
	const [mode, setMode] = useState<'menu' | 'form'>('menu');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		
		const fd = new FormData(e.currentTarget);
		const data = {
			name: String(fd.get('name') || ''),
			phone: String(fd.get('phone') || ''),
			email: String(fd.get('email') || ''),
			businessType: String(fd.get('businessType') || ''),
			message: `Запит на консультацію. Тип: ${String(fd.get('consultationType') || 'Загальна консультація')}`,
		};

		console.log('[OnlineConsultant] Submitting:', data);

		try {
			const r = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			
			console.log('[OnlineConsultant] Response status:', r.status);
			
			if (r.ok) {
				setSuccess(true);
				console.log('[OnlineConsultant] ✅ Success');
				setTimeout(() => {
					setOpen(false);
					setSuccess(false);
					setMode('menu');
					setError('');
				}, 3000);
			} else {
				const errorData = await r.json().catch(() => ({ error: 'Помилка сервера' }));
				setError(errorData.error || 'Помилка відправлення');
			}
		} catch (error) {
			console.error('[OnlineConsultant] ❌ Error:', error);
			setError('Помилка підключення. Перевірте інтернет.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{open && (
				<div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center', zIndex: 1100, padding: 20 }}>
					<div className="scale-in" style={{ width: '100%', maxWidth: 480, background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 25px 80px rgba(0,0,0,0.4)' }}>
						{/* Header */}
						<div style={{ background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)', color: '#fff', padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
								<div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', display: 'grid', placeItems: 'center', fontSize: 24, boxShadow: '0 4px 12px rgba(255,215,0,0.4)' }}>👨‍💼</div>
								<div>
									<strong style={{ fontSize: 18, display: 'block' }}>Онлайн-консультант</strong>
									<span style={{ fontSize: 12, opacity: 0.9 }}>Зв'яжемось за 30 секунд</span>
								</div>
							</div>
							<button onClick={() => setOpen(false)} style={{ background: 'transparent', color: '#fff', border: 0, fontSize: 28, cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', transition: 'all 0.3s ease' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
								×
							</button>
						</div>
						
						<div style={{ padding: 32 }}>
							{mode === 'menu' ? (
								<>
									<p style={{ marginBottom: 24, color: '#555', fontSize: 15, lineHeight: 1.7 }}>Наш менеджер готовий відповісти на всі питання та допомогти з підбором продукції</p>
									<div style={{ display: 'grid', gap: 14 }}>
										<button onClick={() => setMode('form')} className="card-3d bounce-on-hover" style={{ border: '2px solid #0057B7', color: '#0057B7', background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)', padding: '14px 20px', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 10 }}>
											<span style={{ fontSize: 20 }}>📹</span> Відеоконсультація
										</button>
										<button onClick={() => setMode('form')} className="card-3d bounce-on-hover" style={{ border: '2px solid #0057B7', color: '#0057B7', background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)', padding: '14px 20px', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 10 }}>
											<span style={{ fontSize: 20 }}>🎁</span> Демонстрація продукції
										</button>
										<button onClick={() => setMode('form')} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#0057B7', padding: '14px 20px', borderRadius: 12, border: 0, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 15px rgba(255,165,0,0.4)', fontSize: 15, display: 'flex', alignItems: 'center', gap: 10 }}>
											<span style={{ fontSize: 20 }}>📅</span> Запис на зустріч
										</button>
									</div>
									<div style={{ marginTop: 20, padding: 16, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', borderRadius: 12, fontSize: 13, color: '#0d47a1', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
										<span style={{ fontSize: 18 }}>💡</span>
										<div>
											<strong style={{ display: 'block', marginBottom: 4 }}>Безкоштовна консультація та дегустація!</strong>
											<p style={{ margin: 0, opacity: 0.9 }}>Приїжджайте до нашого офісу або замовте зустріч з менеджером у вашому закладі</p>
										</div>
									</div>
								</>
							) : success ? (
								<div className="scale-in" style={{ textAlign: 'center', padding: 40 }}>
									<div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
									<h3 style={{ color: '#4CAF50', marginBottom: 12, fontSize: 24 }}>Дякуємо!</h3>
									<p style={{ color: '#666' }}>Менеджер зв'яжеться з вами найближчим часом</p>
								</div>
							) : (
								<form onSubmit={handleSubmit}>
									<h3 style={{ color: '#0057B7', marginBottom: 20, fontSize: 20 }}>Залиште ваші контакти</h3>
									
									{error && (
										<div style={{ marginBottom: 16, padding: 12, background: '#ffebee', border: '1px solid #f44336', borderRadius: 10, color: '#c62828', fontSize: 14 }}>
											❌ {error}
										</div>
									)}
									
									<div style={{ marginBottom: 16 }}>
										<label style={{ display: 'block', marginBottom: 6, color: '#0057B7', fontWeight: 600 }}>👤 Імʼя *</label>
										<input name="name" required placeholder="Іван Іваненко" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15 }} />
									</div>
									<div style={{ marginBottom: 16 }}>
										<label style={{ display: 'block', marginBottom: 6, color: '#0057B7', fontWeight: 600 }}>📞 Телефон *</label>
										<input name="phone" type="tel" required placeholder="+380 XX XXX XX XX" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15 }} />
									</div>
									<div style={{ marginBottom: 16 }}>
										<label style={{ display: 'block', marginBottom: 6, color: '#0057B7', fontWeight: 600 }}>📧 Email</label>
										<input name="email" type="email" placeholder="ivan@example.com" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15 }} />
									</div>
									<div style={{ marginBottom: 16 }}>
										<label style={{ display: 'block', marginBottom: 6, color: '#0057B7', fontWeight: 600 }}>🏢 Тип бізнесу</label>
										<select name="businessType" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15 }}>
											<option value="">Оберіть тип</option>
											<option value="coffee-shop">Кав'ярня</option>
											<option value="restaurant">Ресторан</option>
											<option value="hotel">Готель</option>
											<option value="office">Офіс</option>
											<option value="store">Магазин</option>
											<option value="other">Інше</option>
										</select>
									</div>
									<input type="hidden" name="consultationType" value="Онлайн консультація" />
									<div style={{ display: 'flex', gap: 10 }}>
										<button type="button" onClick={() => setMode('menu')} style={{ flex: 1, padding: 12, border: '2px solid #e5e7eb', borderRadius: 10, background: '#fff', cursor: 'pointer' }}>Назад</button>
										<button disabled={loading} type="submit" style={{ flex: 2, padding: 12, background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#0057B7', border: 0, borderRadius: 10, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
											{loading ? '⏳ Надсилання...' : '📤 Відправити'}
										</button>
									</div>
								</form>
							)}
						</div>
					</div>
				</div>
			)}
			
			<button
				onClick={() => setOpen(true)}
				className="pulse-glow bounce-on-hover consultant-btn"
				style={{
					position: 'fixed',
					left: 'clamp(10px, 2vw, 20px)',
					bottom: 'clamp(10px, 2vw, 20px)',
					background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)',
					color: '#fff',
					border: '2px solid #FFD700',
					borderRadius: 999,
					padding: 'clamp(14px, 2.5vw, 16px) clamp(18px, 3.5vw, 24px)',
					boxShadow: '0 12px 40px rgba(0,87,183,0.5)',
					zIndex: 999,
					fontWeight: 800,
					fontSize: 'clamp(13px, 2vw, 15px)',
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					gap: 10,
				}}
			>
				<span style={{ fontSize: '1.5em' }}>👨‍💼</span>
				<style jsx>{`button { display: flex; } @media (max-width: 480px) { button span:last-child { display: none; } }`}</style>
				<span>Консультант</span>
			</button>
		</>
	);
}
