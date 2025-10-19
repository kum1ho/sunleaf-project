import { useState, useEffect } from 'react';

type Message = { text: string; isBot: boolean; timestamp: Date; needsHuman?: boolean };

export default function ChatBot() {
	const [open, setOpen] = useState(false);
	const [registered, setRegistered] = useState(false);
	const [sessionId, setSessionId] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>(
		[
			{ text: 'Привіт! Я SunBot ☕ — ваш персональний помічник у світі преміум кави та чаю. Для початку, давайте познайомимось!', isBot: true, timestamp: new Date() },
		]
	);
	const [inputValue, setInputValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [showConsultantButton, setShowConsultantButton] = useState(false);
	const [error, setError] = useState('');

	// Відновлюємо стан з localStorage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedSession = localStorage.getItem('sunbot_session');
			if (savedSession) {
				try {
					const session = JSON.parse(savedSession);
					setSessionId(session.sessionId);
					setRegistered(true);
					setMessages([
						{ text: `Вітаю знову! Продовжуємо нашу розмову. Чим можу допомогти? ☕`, isBot: true, timestamp: new Date() }
					]);
				} catch (e) {
					console.log('Failed to restore session');
				}
			}
		}
	}, []);

	// Реєстрація
	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		
		const fd = new FormData(e.currentTarget);
		const name = String(fd.get('name') || '').trim();
		const phone = String(fd.get('phone') || '').trim();
		const businessType = String(fd.get('businessType') || '');

		if (!name || !phone) {
			setError('Заповніть обов\'язкові поля');
			setLoading(false);
			return;
		}

		console.log('[SunBot] Registering:', { name, phone, businessType });

		try {
			const response = await fetch('/api/chatbot/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, phone, businessType }),
			});

			console.log('[SunBot] Register response status:', response.status);
			const data = await response.json();
			console.log('[SunBot] Register response data:', data);

			if (response.ok && data.success) {
				setSessionId(data.sessionId);
				setRegistered(true);
				setMessages([{ text: data.message, isBot: true, timestamp: new Date() }]);
				
				// Зберігаємо сесію
				if (typeof window !== 'undefined') {
					localStorage.setItem('sunbot_session', JSON.stringify({ 
						sessionId: data.sessionId, 
						name, 
						phone,
						timestamp: Date.now()
					}));
				}
				
				console.log('[SunBot] ✅ Registration successful');
			} else {
				setError(data.error || 'Помилка реєстрації. Спробуйте ще раз.');
				console.error('[SunBot] ❌ Registration failed:', data);
			}
		} catch (error) {
			console.error('[SunBot] ❌ Network error:', error);
			setError('Помилка підключення. Перевірте інтернет та спробуйте ще раз.');
		} finally {
			setLoading(false);
		}
	};

	// Надіслати повідомлення
	const handleSend = async () => {
		if (!inputValue.trim() || !sessionId || loading) return;

		const userMessage = inputValue.trim();
		setMessages(prev => [...prev, { text: userMessage, isBot: false, timestamp: new Date() }]);
		setInputValue('');
		setLoading(true);
		setError('');

		console.log('[SunBot] Sending message:', userMessage);

		try {
			const response = await fetch('/api/chatbot/message', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: userMessage, sessionId }),
			});

			console.log('[SunBot] Message response status:', response.status);
			const data = await response.json();
			console.log('[SunBot] Message response data:', data);

			if (response.ok) {
				setMessages(prev => [...prev, { 
					text: data.reply, 
					isBot: true, 
					timestamp: new Date(),
					needsHuman: data.needsHuman 
				}]);
				
				if (data.needsHuman) {
					setShowConsultantButton(true);
				}
			} else {
				setMessages(prev => [...prev, { 
					text: 'Вибачте, виникла помилка. Спробуйте ще раз або зв\'яжіться з менеджером за номером +380 67 123-45-67', 
					isBot: true, 
					timestamp: new Date() 
				}]);
			}
		} catch (error) {
			console.error('[SunBot] ❌ Message error:', error);
			setMessages(prev => [...prev, { 
				text: 'Помилка підключення. Перевірте інтернет або зв\'яжіться з менеджером:\n📞 +380 67 123-45-67\n📧 info@sunleaf.ua', 
				isBot: true, 
				timestamp: new Date() 
			}]);
		} finally {
			setLoading(false);
		}
	};

	const connectToHuman = () => {
		setMessages(prev => [...prev, { 
			text: 'Зʼєдную вас з менеджером! Одну хвилину... 📞', 
			isBot: true, 
			timestamp: new Date() 
		}]);
		setShowConsultantButton(false);
		
		// Знаходимо кнопку консультанта
		setTimeout(() => {
			const consultantBtn = document.querySelector('.consultant-btn') as HTMLButtonElement;
			if (consultantBtn) {
				consultantBtn.click();
			} else {
				// Fallback - показуємо контакти
				setMessages(prev => [...prev, { 
					text: 'Зв\'яжіться з нашими менеджерами:\n📞 +380 67 123-45-67\n📞 +380 63 765-43-21\n📧 info@sunleaf.ua', 
					isBot: true, 
					timestamp: new Date() 
				}]);
			}
		}, 500);
	};

	const resetChat = () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('sunbot_session');
		}
		setRegistered(false);
		setSessionId(null);
		setMessages([
			{ text: 'Привіт! Я SunBot ☕ — ваш персональний помічник у світі преміум кави та чаю. Для початку, давайте познайомимось!', isBot: true, timestamp: new Date() }
		]);
		setShowConsultantButton(false);
		setError('');
	};

	return (
		<>
			{open && (
				<div
					className="slide-in-right"
					style={{
						position: 'fixed',
						right: 'clamp(10px, 2vw, 20px)',
						bottom: 'clamp(80px, 15vw, 100px)',
						width: 'min(420px, calc(100vw - 40px))',
						maxHeight: '80vh',
						background: '#fff',
						borderRadius: 20,
						boxShadow: '0 20px 70px rgba(0,0,0,0.3), 0 10px 30px rgba(0,87,183,0.2)',
						overflow: 'hidden',
						zIndex: 1000,
						border: '2px solid rgba(0,87,183,0.1)',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{/* Header */}
					<div style={{ background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)', color: '#fff', padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
							<div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', display: 'grid', placeItems: 'center', fontSize: 24 }}>☕</div>
							<div>
								<strong style={{ fontSize: 18, display: 'block' }}>SunBot</strong>
								<div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, opacity: 0.95 }}>
									<div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF50', animation: 'pulse 2s infinite' }} />
									<span>Онлайн 24/7</span>
								</div>
							</div>
						</div>
						<div style={{ display: 'flex', gap: 8 }}>
							{registered && (
								<button onClick={resetChat} title="Нова розмова" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 0, fontSize: 16, cursor: 'pointer', width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
									🔄
								</button>
							)}
							<button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 0, fontSize: 20, cursor: 'pointer', width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
								×
							</button>
						</div>
					</div>

					{/* Content */}
					{!registered ? (
						<div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>
							<div style={{ textAlign: 'center', marginBottom: 20 }}>
								<div style={{ width: 80, height: 80, margin: '0 auto 16px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', display: 'grid', placeItems: 'center', fontSize: 40 }}>☕</div>
								<h3 style={{ color: '#0057B7', marginBottom: 8, fontSize: 22 }}>👋 Вітаю в Sunleaf!</h3>
								<p style={{ color: '#666', lineHeight: 1.6 }}>Я SunBot — ваш AI-помічник у виборі кави та чаю. Давайте познайомимось!</p>
							</div>

							{error && (
								<div style={{ marginBottom: 16, padding: 12, background: '#ffebee', border: '1px solid #f44336', borderRadius: 10, color: '#c62828', fontSize: 14 }}>
									❌ {error}
								</div>
							)}

							<form onSubmit={handleRegister}>
								<div style={{ marginBottom: 16 }}>
									<label style={{ display: 'block', marginBottom: 6, color: '#0057B7', fontWeight: 600, fontSize: 14 }}>👤 Ваше імʼя *</label>
									<input name="name" required placeholder="Іван Іваненко" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 15 }} />
								</div>
								<div style={{ marginBottom: 16 }}>
									<label style={{ display: 'block', marginBottom: 6, color: '#0057B7', fontWeight: 600, fontSize: 14 }}>📞 Телефон *</label>
									<input name="phone" type="tel" required placeholder="+380 XX XXX XX XX" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 15 }} />
								</div>
								<div style={{ marginBottom: 20 }}>
									<label style={{ display: 'block', marginBottom: 6, color: '#0057B7', fontWeight: 600, fontSize: 14 }}>🏢 Тип бізнесу</label>
									<select name="businessType" style={{ width: '100%', padding: 12, border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 15 }}>
										<option value="">Оберіть тип</option>
										<option value="coffee-shop">Кавʼярня</option>
										<option value="restaurant">Ресторан</option>
										<option value="hotel">Готель</option>
										<option value="office">Офіс</option>
										<option value="store">Магазин</option>
										<option value="other">Інше</option>
									</select>
								</div>
								<button disabled={loading} type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#0057B7', border: 0, padding: 14, borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer' }}>
									{loading ? '⏳ Зачекайте...' : '🚀 Почати розмову'}
								</button>
							</form>
						</div>
					) : (
						<>
							{/* Messages */}
							<div style={{ flex: 1, padding: 20, overflowY: 'auto', background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)', maxHeight: 400 }}>
								{messages.map((msg, i) => (
									<div key={i} style={{ marginBottom: 12, display: 'flex', justifyContent: msg.isBot ? 'flex-start' : 'flex-end' }}>
										<div style={{ maxWidth: '85%', padding: 14, borderRadius: 16, background: msg.isBot ? 'linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)' : 'linear-gradient(145deg, #FFD700 0%, #FFA500 100%)', color: msg.isBot ? '#0d47a1' : '#fff', fontSize: 15, lineHeight: 1.5, whiteSpace: 'pre-wrap', position: 'relative' }}>
											{msg.isBot && <div style={{ position: 'absolute', top: -10, left: 12, width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', display: 'grid', placeItems: 'center', fontSize: 12 }}>☕</div>}
											{msg.text}
										</div>
									</div>
								))}
								
								{loading && (
									<div style={{ display: 'flex', gap: 6, padding: 14 }}>
										<div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0057B7', animation: 'pulse 1s infinite' }} />
										<div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0057B7', animation: 'pulse 1s infinite 0.2s' }} />
										<div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0057B7', animation: 'pulse 1s infinite 0.4s' }} />
									</div>
								)}
								
								{showConsultantButton && (
									<div style={{ textAlign: 'center', marginTop: 12 }}>
										<button onClick={connectToHuman} style={{ background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)', color: '#fff', border: 0, padding: '12px 20px', borderRadius: 12, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
											<span>👨‍💼</span> Зʼєднати з консультантом
										</button>
									</div>
								)}
							</div>

							{/* Input */}
							<div style={{ display: 'flex', gap: 10, padding: 16, borderTop: '2px solid #e5e7eb', background: '#fff' }}>
								<input 
									value={inputValue} 
									onChange={(e) => setInputValue(e.target.value)} 
									onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()} 
									placeholder="Напишіть ваше питання..." 
									disabled={loading}
									style={{ flex: 1, padding: 12, border: '2px solid #e5e7eb', borderRadius: 12, fontSize: 14 }} 
								/>
								<button 
									onClick={handleSend} 
									disabled={!inputValue.trim() || loading} 
									style={{ background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)', color: '#fff', border: 0, borderRadius: 12, padding: '0 20px', cursor: (!inputValue.trim() || loading) ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 18 }}
								>
									▶
								</button>
							</div>
						</>
					)}
				</div>
			)}

			{/* Toggle Button */}
			<button
				onClick={() => setOpen(true)}
				style={{
					position: 'fixed',
					right: 'clamp(10px, 2vw, 20px)',
					bottom: 'clamp(10px, 2vw, 20px)',
					background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
					color: '#0057B7',
					border: '2px solid #0057B7',
					borderRadius: '50%',
					width: 64,
					height: 64,
					boxShadow: '0 12px 40px rgba(255,165,0,0.6)',
					display: 'grid',
					placeItems: 'center',
					zIndex: 999,
					fontSize: 28,
					cursor: 'pointer',
				}}
			>
				☕
			</button>
		</>
	);
}
