import { useState } from 'react';

export default function ChatBot() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{ type: 'bot', text: 'Вітаю! 👋 Я ваш помічник. Чим можу допомогти?' }
	]);
	const [input, setInput] = useState('');

	const quickReplies = [
		{ text: '☕ Асортимент кави', response: 'У нас є арабіка від 320₴/кг, робуста від 280₴/кг. Всі сорти преміум класу!' },
		{ text: '🚚 Умови доставки', response: 'Безкоштовна доставка по Житомиру від 2000₴. Відправка в день замовлення!' },
		{ text: '📞 Як замовити?', response: 'Зателефонуйте +380 67 123-45-67 або залиште заявку на сайті!' }
	];

	const handleSend = () => {
		if (!input.trim()) return;
		
		setMessages([...messages, { type: 'user', text: input }]);
		
		setTimeout(() => {
			setMessages(prev => [...prev, {
				type: 'bot',
				text: 'Дякую за повідомлення! Наш менеджер зв\'яжеться з вами найближчим часом. 😊'
			}]);
		}, 1000);
		
		setInput('');
	};

	const handleQuickReply = (reply: any) => {
		setMessages([...messages, { type: 'user', text: reply.text }, { type: 'bot', text: reply.response }]);
	};

	return (
		<>
			{/* Chat Window */}
			{isOpen && (
				<div style={{
					position: 'fixed',
					bottom: 'clamp(90px, 15vw, 100px)',
					right: 'clamp(16px, 3vw, 24px)',
					width: 'min(400px, calc(100vw - 32px))',
					height: 'min(600px, calc(100vh - 200px))',
					background: 'white',
					borderRadius: '24px',
					boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
					display: 'flex',
					flexDirection: 'column',
					zIndex: 999,
					animation: 'slideUp 0.3s ease',
					overflow: 'hidden'
				}}>
					{/* Header */}
					<div style={{
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						padding: 'clamp(16px, 3vw, 20px)',
						color: 'white',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderRadius: '24px 24px 0 0'
					}}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
							<div style={{
								width: 'clamp(40px, 7vw, 48px)',
								height: 'clamp(40px, 7vw, 48px)',
								borderRadius: '50%',
								background: 'rgba(255,255,255,0.2)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 'clamp(20px, 4vw, 24px)'
							}}>
								🤖
							</div>
							<div>
								<div style={{
									fontWeight: '800',
									fontSize: 'clamp(16px, 3vw, 18px)'
								}}>
									Sunleaf Assistant
								</div>
								<div style={{
									fontSize: 'clamp(12px, 2vw, 13px)',
									opacity: 0.9,
									display: 'flex',
									alignItems: 'center',
									gap: '6px'
								}}>
									<span style={{
										width: '8px',
										height: '8px',
										borderRadius: '50%',
										background: '#4ade80',
										display: 'inline-block',
										animation: 'pulse 2s ease-in-out infinite'
									}} />
									Онлайн
								</div>
							</div>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							style={{
								width: '36px',
								height: '36px',
								borderRadius: '50%',
								background: 'rgba(255,255,255,0.2)',
								border: 'none',
								color: 'white',
								fontSize: '20px',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'all 0.3s ease'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
								e.currentTarget.style.transform = 'scale(1.1)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
								e.currentTarget.style.transform = 'scale(1)';
							}}
						>
							✕
						</button>
					</div>

					{/* Messages */}
					<div style={{
						flex: 1,
						padding: 'clamp(16px, 3vw, 20px)',
						overflowY: 'auto',
						background: '#f8f9fa'
					}}>
						{messages.map((msg, i) => (
							<div
								key={i}
								style={{
									display: 'flex',
									justifyContent: msg.type === 'bot' ? 'flex-start' : 'flex-end',
									marginBottom: '16px',
									animation: 'fadeInUp 0.3s ease'
								}}
							>
								<div style={{
									maxWidth: '80%',
									padding: 'clamp(12px, 2vw, 14px) clamp(14px, 2.5vw, 18px)',
									borderRadius: msg.type === 'bot' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
									background: msg.type === 'bot'
										? 'white'
										: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
									color: msg.type === 'bot' ? '#1a1a1a' : 'white',
									fontSize: 'clamp(14px, 2.5vw, 15px)',
									lineHeight: 1.6,
									boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
									fontWeight: '500'
								}}>
									{msg.text}
								</div>
							</div>
						))}

						{/* Quick Replies */}
						{messages.length === 1 && (
							<div style={{
								display: 'grid',
								gap: '10px',
								marginTop: '16px'
							}}>
								{quickReplies.map((reply, i) => (
									<button
										key={i}
										onClick={() => handleQuickReply(reply)}
										style={{
											padding: 'clamp(12px, 2vw, 14px)',
											background: 'white',
											border: '2px solid #667eea',
											borderRadius: '12px',
											color: '#667eea',
											fontSize: 'clamp(13px, 2vw, 14px)',
											fontWeight: '700',
											cursor: 'pointer',
											transition: 'all 0.3s ease',
											textAlign: 'left'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = '#667eea';
											e.currentTarget.style.color = 'white';
											e.currentTarget.style.transform = 'translateX(4px)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = 'white';
											e.currentTarget.style.color = '#667eea';
											e.currentTarget.style.transform = 'translateX(0)';
										}}
									>
										{reply.text}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Input */}
					<div style={{
						padding: 'clamp(16px, 3vw, 20px)',
						borderTop: '1px solid #e0e0e0',
						background: 'white',
						display: 'flex',
						gap: '12px'
					}}>
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyPress={(e) => e.key === 'Enter' && handleSend()}
							placeholder="Напишіть повідомлення..."
							style={{
								flex: 1,
								padding: 'clamp(12px, 2vw, 14px)',
								border: '2px solid #e0e0e0',
								borderRadius: '12px',
								fontSize: 'clamp(14px, 2.5vw, 15px)',
								outline: 'none',
								transition: 'border-color 0.3s ease'
							}}
							onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
							onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
						/>
						<button
							onClick={handleSend}
							style={{
								width: 'clamp(44px, 8vw, 50px)',
								height: 'clamp(44px, 8vw, 50px)',
								borderRadius: '12px',
								background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
								border: 'none',
								color: 'white',
								fontSize: 'clamp(20px, 4vw, 22px)',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'all 0.3s ease',
								boxShadow: '0 4px 16px rgba(102,126,234,0.3)'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'scale(1.1)';
								e.currentTarget.style.boxShadow = '0 8px 24px rgba(102,126,234,0.4)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'scale(1)';
								e.currentTarget.style.boxShadow = '0 4px 16px rgba(102,126,234,0.3)';
							}}
						>
							➤
						</button>
					</div>
				</div>
			)}

			{/* Chat Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				style={{
					position: 'fixed',
					bottom: 'clamp(20px, 4vw, 24px)',
					right: 'clamp(20px, 4vw, 24px)',
					width: 'clamp(56px, 10vw, 64px)',
					height: 'clamp(56px, 10vw, 64px)',
					borderRadius: '50%',
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					border: 'none',
					color: 'white',
					fontSize: 'clamp(28px, 5vw, 32px)',
					cursor: 'pointer',
					boxShadow: '0 12px 32px rgba(102,126,234,0.4)',
					zIndex: 1000,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
					animation: isOpen ? 'none' : 'pulse 2s ease-in-out infinite'
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.transform = 'scale(1.15)';
					e.currentTarget.style.boxShadow = '0 16px 48px rgba(102,126,234,0.5)';
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.transform = 'scale(1)';
					e.currentTarget.style.boxShadow = '0 12px 32px rgba(102,126,234,0.4)';
				}}
			>
				{isOpen ? '✕' : '💬'}
			</button>

			<style jsx>{`
				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</>
	);
}
