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
		<section id="contacts" style={{
			padding: 'clamp(60px, 10vw, 120px) 20px',
			background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)'
		}}>
			<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}>
					<div style={{
						display: 'inline-block',
						padding: '10px 20px',
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						borderRadius: '50px',
						color: 'white',
						fontWeight: '700',
						fontSize: 'clamp(12px, 2vw, 14px)',
						marginBottom: '24px',
						boxShadow: '0 8px 24px rgba(102,126,234,0.3)',
						letterSpacing: '1px'
					}}>
						📍 КОНТАКТИ
					</div>

					<h2 style={{
						fontSize: 'clamp(32px, 7vw, 56px)',
						fontWeight: '900',
						margin: '0 0 20px 0',
						background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						letterSpacing: '-2px'
					}}>
						Зв'яжіться з нами
					</h2>
				</div>

				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
					gap: 'clamp(24px, 4vw, 32px)'
				}}>
					{[
						{ icon: '📞', title: 'Телефон', value: '+380 67 123-45-67', action: 'tel:+380671234567' },
						{ icon: '📧', title: 'Email', value: 'info@sunleaf.ua', action: 'mailto:info@sunleaf.ua' },
						{ icon: '📍', title: 'Адреса', value: 'вул. Київська, 75, Житомир', action: '#' },
						{ icon: '🕐', title: 'Графік', value: 'Пн-Пт: 9:00-18:00, Сб: 10:00-15:00', action: '#' }
					].map((contact, index) => (
						<a
							key={index}
							href={contact.action}
							className="card-hover"
							style={{
								background: 'white',
								borderRadius: '24px',
								padding: 'clamp(28px, 5vw, 36px)',
								boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
								border: '1px solid rgba(0,0,0,0.06)',
								textDecoration: 'none',
								display: 'block',
								textAlign: 'center'
							}}
						>
							<div style={{
								fontSize: 'clamp(48px, 8vw, 64px)',
								marginBottom: '20px',
								filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
							}}>
								{contact.icon}
							</div>

							<div style={{
								fontSize: 'clamp(14px, 2.5vw, 16px)',
								color: '#666',
								fontWeight: '600',
								marginBottom: '8px'
							}}>
								{contact.title}
							</div>

							<div style={{
								fontSize: 'clamp(16px, 3vw, 20px)',
								fontWeight: '800',
								color: '#1a1a1a'
							}}>
								{contact.value}
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
