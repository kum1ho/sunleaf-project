import { useState } from 'react';

export default function OnlineConsultant() {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		setTimeout(() => {
			setIsOpen(false);
			setSubmitted(false);
			setFormData({ name: '', phone: '', message: '' });
		}, 3000);
	};

	return (
		<>
			{isOpen && (
				<div style={{
					position: 'fixed',
					inset: 0,
					background: 'rgba(0,0,0,0.7)',
					backdropFilter: 'blur(8px)',
					zIndex: 9999,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '20px',
					animation: 'fadeIn 0.3s ease'
				}}
				onClick={() => setIsOpen(false)}
				>
					<div
						style={{
							background: 'white',
							borderRadius: '32px',
							padding: 'clamp(32px, 6vw, 48px)',
							maxWidth: '500px',
							width: '100%',
							boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
							animation: 'scaleIn 0.3s ease',
							position: 'relative'
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setIsOpen(false)}
							style={{
								position: 'absolute',
								top: '20px',
								right: '20px',
								width: '40px',
								height: '40px',
								borderRadius: '50%',
								background: '#f8f9fa',
								border: 'none',
								fontSize: '20px',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'all 0.3s ease'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = '#dc3545';
								e.currentTarget.style.color = 'white';
								e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = '#f8f9fa';
								e.currentTarget.style.color = 'inherit';
								e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
							}}
						>
							✕
						</button>

						{!submitted ? (
							<>
								<div style={{
									width: 'clamp(60px, 12vw, 80px)',
									height: 'clamp(60px, 12vw, 80px)',
									borderRadius: '50%',
									background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: 'clamp(32px, 6vw, 40px)',
									margin: '0 auto 24px',
									boxShadow: '0 12px 32px rgba(102,126,234,0.3)'
								}}>
									📞
								</div>

								<h2 style={{
									margin: '0 0 12px',
									fontSize: 'clamp(24px, 5vw, 32px)',
									fontWeight: '900',
									textAlign: 'center',
									color: '#1a1a1a'
								}}>
									Замовити консультацію
								</h2>

								<p style={{
									margin: '0 0 32px',
									fontSize: 'clamp(14px, 2.5vw, 16px)',
									color: '#666',
									textAlign: 'center',
									lineHeight: 1.6
								}}>
									Залиште заявку і наш менеджер зв'яжеться з вами протягом 15 хвилин
								</p>

								<form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
									<div>
										<label style={{
											display: 'block',
											marginBottom: '8px',
											fontSize: 'clamp(14px, 2.5vw, 15px)',
											fontWeight: '700',
											color: '#1a1a1a'
										}}>
											Ваше ім'я *
										</label>
										<input
											type="text"
											required
											value={formData.name}
											onChange={(e) => setFormData({...formData, name: e.target.value})}
											placeholder="Введіть ваше ім'я"
											style={{
												width: '100%',
												padding: 'clamp(12px, 2vw, 16px)',
												border: '2px solid #e0e0e0',
												borderRadius: '14px',
												fontSize: 'clamp(14px, 2.5vw, 16px)',
												outline: 'none',
												transition: 'all 0.3s ease'
											}}
											onFocus={(e) => {
												e.currentTarget.style.borderColor = '#667eea';
												e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
											}}
											onBlur={(e) => {
												e.currentTarget.style.borderColor = '#e0e0e0';
												e.currentTarget.style.boxShadow = 'none';
											}}
										/>
									</div>

									<div>
										<label style={{
											display: 'block',
											marginBottom: '8px',
											fontSize: 'clamp(14px, 2.5vw, 15px)',
											fontWeight: '700',
											color: '#1a1a1a'
										}}>
											Телефон *
										</label>
										<input
											type="tel"
											required
											value={formData.phone}
											onChange={(e) => setFormData({...formData, phone: e.target.value})}
											placeholder="+380 XX XXX XX XX"
											style={{
												width: '100%',
												padding: 'clamp(12px, 2vw, 16px)',
												border: '2px solid #e0e0e0',
												borderRadius: '14px',
												fontSize: 'clamp(14px, 2.5vw, 16px)',
												outline: 'none',
												transition: 'all 0.3s ease'
											}}
											onFocus={(e) => {
												e.currentTarget.style.borderColor = '#667eea';
												e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
											}}
											onBlur={(e) => {
												e.currentTarget.style.borderColor = '#e0e0e0';
												e.currentTarget.style.boxShadow = 'none';
											}}
										/>
									</div>

									<div>
										<label style={{
											display: 'block',
											marginBottom: '8px',
											fontSize: 'clamp(14px, 2.5vw, 15px)',
											fontWeight: '700',
											color: '#1a1a1a'
										}}>
											Повідомлення (необов'язково)
										</label>
										<textarea
											value={formData.message}
											onChange={(e) => setFormData({...formData, message: e.target.value})}
											placeholder="Напишіть ваше питання..."
											rows={4}
											style={{
												width: '100%',
												padding: 'clamp(12px, 2vw, 16px)',
												border: '2px solid #e0e0e0',
												borderRadius: '14px',
												fontSize: 'clamp(14px, 2.5vw, 16px)',
												outline: 'none',
												resize: 'vertical',
												fontFamily: 'inherit',
												transition: 'all 0.3s ease'
											}}
											onFocus={(e) => {
												e.currentTarget.style.borderColor = '#667eea';
												e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
											}}
											onBlur={(e) => {
												e.currentTarget.style.borderColor = '#e0e0e0';
												e.currentTarget.style.boxShadow = 'none';
											}}
										/>
									</div>

									<button
										type="submit"
										style={{
											padding: 'clamp(14px, 2.5vw, 18px)',
											background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
											color: 'white',
											border: 'none',
											borderRadius: '14px',
											fontSize: 'clamp(15px, 3vw, 17px)',
											fontWeight: '800',
											cursor: 'pointer',
											transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
											boxShadow: '0 8px 24px rgba(40,167,69,0.3)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '10px'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'translateY(-3px)';
											e.currentTarget.style.boxShadow = '0 12px 32px rgba(40,167,69,0.4)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'translateY(0)';
											e.currentTarget.style.boxShadow = '0 8px 24px rgba(40,167,69,0.3)';
										}}
									>
										<span style={{ fontSize: 'clamp(20px, 4vw, 22px)' }}>📞</span>
										Відправити заявку
									</button>
								</form>
							</>
						) : (
							<div style={{ textAlign: 'center', padding: 'clamp(20px, 4vw, 40px) 0' }}>
								<div style={{
									width: 'clamp(80px, 15vw, 100px)',
									height: 'clamp(80px, 15vw, 100px)',
									borderRadius: '50%',
									background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: 'clamp(48px, 9vw, 60px)',
									margin: '0 auto 24px',
									animation: 'scaleIn 0.5s ease'
								}}>
									✓
								</div>
								<h3 style={{
									margin: '0 0 16px',
									fontSize: 'clamp(24px, 5vw, 28px)',
									fontWeight: '900',
									color: '#28a745'
								}}>
									Дякуємо!
								</h3>
								<p style={{
									margin: 0,
									fontSize: 'clamp(15px, 3vw, 17px)',
									color: '#666',
									lineHeight: 1.6
								}}>
									Ваша заявка прийнята. Наш менеджер зв'яжеться з вами найближчим часом.
								</p>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Floating Button */}
			<button
				onClick={() => setIsOpen(true)}
				style={{
					position: 'fixed',
					bottom: 'clamp(100px, 18vw, 110px)',
					right: 'clamp(20px, 4vw, 24px)',
					width: 'clamp(56px, 10vw, 64px)',
					height: 'clamp(56px, 10vw, 64px)',
					borderRadius: '50%',
					background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
					border: 'none',
					color: 'white',
					fontSize: 'clamp(28px, 5vw, 32px)',
					cursor: 'pointer',
					boxShadow: '0 12px 32px rgba(40,167,69,0.4)',
					zIndex: 999,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
					animation: 'pulse 2s ease-in-out infinite'
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.transform = 'scale(1.15)';
					e.currentTarget.style.boxShadow = '0 16px 48px rgba(40,167,69,0.5)';
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.transform = 'scale(1)';
					e.currentTarget.style.boxShadow = '0 12px 32px rgba(40,167,69,0.4)';
				}}
			>
				📞
			</button>

			<style jsx>{`
				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}

				@keyframes scaleIn {
					from {
						opacity: 0;
						transform: scale(0.9);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}
			`}</style>
		</>
	);
}
