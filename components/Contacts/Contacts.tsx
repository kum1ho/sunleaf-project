import { FormEvent, useState } from 'react';

export default function Contacts() {
	const [loading, setLoading] = useState(false);
	const [ok, setOk] = useState('');
	const [error, setError] = useState('');

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setOk('');
		setError('');

		const fd = new FormData(e.currentTarget);
		const data = {
			name: String(fd.get('name') || ''),
			company: String(fd.get('company') || ''),
			email: String(fd.get('email') || ''),
			phone: String(fd.get('phone') || ''),
			businessType: String(fd.get('businessType') || ''),
			message: String(fd.get('message') || ''),
		};

		try {
			const r = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			setLoading(false);
			if (r.ok) {
				setOk("Дякуємо! Менеджер зв'яжеться з вами найближчим часом.");
				e.currentTarget.reset();
			} else {
				setError('Помилка відправки. Спробуйте пізніше.');
			}
		} catch {
			setLoading(false);
			setError('Помилка мережі. Перевірте підключення.');
		}
	};

	return (
		<section id="contacts" style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 40px)', background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%)' }}>
			<div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))' }}>
				<div className="fade-in">
					<h2 style={{ color: '#0057B7', marginBottom: 24, fontSize: 32, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 10 }}>
						<span>📞</span> Зв'яжіться з нами
					</h2>
					<div
						style={{
							background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
							padding: 32,
							borderRadius: 16,
							boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
							border: '1px solid rgba(0,87,183,0.1)',
						}}
					>
						<p style={{ marginBottom: 20, lineHeight: 1.8 }}>
							<strong style={{ color: '#0057B7' }}>📍 Адреса:</strong> м. Житомир, вул. Київська, 75
						</p>
						<p style={{ marginBottom: 20, lineHeight: 1.8 }}>
							<strong style={{ color: '#0057B7' }}>📞 Телефони:</strong> +380 (67) 123-45-67, +380 (63) 765-43-21
						</p>
						<p style={{ marginBottom: 20, lineHeight: 1.8 }}>
							<strong style={{ color: '#0057B7' }}>📧 Email:</strong> info@sunleaf.ua
						</p>
						<p style={{ marginBottom: 0, lineHeight: 1.8 }}>
							<strong style={{ color: '#0057B7' }}>🕒 Графік:</strong> Пн-Пт 9:00-18:00, Сб 10:00-15:00
						</p>
					</div>
				</div>

				<div id="pricing-form" className="scale-in">
					<h3 style={{ color: '#0057B7', marginBottom: 20, fontSize: 28, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
						<span>📄</span> Отримати прайс-лист
					</h3>
					<form
						onSubmit={onSubmit}
						style={{
							background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
							padding: 32,
							borderRadius: 16,
							boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
							border: '1px solid rgba(0,87,183,0.1)',
						}}
					>
						<input name="name" required placeholder="Ваше ім'я *" style={{ width: '100%', padding: 14, marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 15 }} />
						<input name="phone" required type="tel" placeholder="Телефон *" style={{ width: '100%', padding: 14, marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 15 }} />
						<input name="email" required type="email" placeholder="Email *" style={{ width: '100%', padding: 14, marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 15 }} />
						<input name="company" placeholder="Назва компанії" style={{ width: '100%', padding: 14, marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 15 }} />
						<select name="businessType" style={{ width: '100%', padding: 14, marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 15 }}>
							<option value="">Оберіть тип бізнесу</option>
							<option value="coffee-shop">Кав'ярня</option>
							<option value="restaurant">Ресторан</option>
							<option value="hotel">Готель</option>
							<option value="office">Офіс</option>
							<option value="store">Магазин</option>
							<option value="other">Інше</option>
						</select>
						<textarea name="message" placeholder="Повідомлення (необов'язково)" rows={4} style={{ width: '100%', padding: 14, marginBottom: 20, border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 15, resize: 'vertical' }} />
						<button disabled={loading} className="btn btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#0057B7', border: 0, padding: 14, borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
							<span>{loading ? '⏳' : '📤'}</span> {loading ? 'Надсилання...' : 'Отримати прайс'}
						</button>
						{ok && <p style={{ color: '#0a7', marginTop: 12, fontWeight: 600 }}>✅ {ok}</p>}
						{error && <p style={{ color: '#c00', marginTop: 12, fontWeight: 600 }}>❌ {error}</p>}
					</form>
				</div>
			</div>
		</section>
	);
}
