import { useState } from 'react';

export default function SavingsCalculator() {
	const [amount, setAmount] = useState(50);
	const retailPrice = 550;
	const wholesalePrice = 420;
	const savings = (retailPrice - wholesalePrice) * amount;

	return (
		<section style={{
			padding: 'clamp(60px, 10vw, 120px) 20px',
			background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
		}}>
			<div style={{ maxWidth: '900px', margin: '0 auto' }}>
				<div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}>
					<h2 style={{
						fontSize: 'clamp(32px, 7vw, 48px)',
						fontWeight: '900',
						margin: '0 0 20px 0',
						color: '#1a1a1a',
						letterSpacing: '-1px'
					}}>
						Калькулятор економії
					</h2>
					<p style={{
						fontSize: 'clamp(16px, 3vw, 18px)',
						color: '#666',
						lineHeight: 1.6
					}}>
						Порахуйте скільки ви заощадите при купівлі оптом
					</p>
				</div>

				<div style={{
					background: 'white',
					borderRadius: '32px',
					padding: 'clamp(32px, 6vw, 48px)',
					boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
					border: '1px solid rgba(0,0,0,0.06)'
				}}>
					<div style={{ marginBottom: '40px' }}>
						<label style={{
							display: 'block',
							marginBottom: '16px',
							fontSize: 'clamp(16px, 3vw, 20px)',
							fontWeight: '700',
							color: '#1a1a1a'
						}}>
							Кількість кілограмів: <span style={{ color: '#667eea' }}>{amount} кг</span>
						</label>
						<input
							type="range"
							min="5"
							max="200"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							style={{
								width: '100%',
								height: '12px',
								borderRadius: '10px',
								background: 'linear-gradient(to right, #667eea, #764ba2)',
								outline: 'none',
								cursor: 'pointer'
							}}
						/>
					</div>

					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: '24px',
						marginBottom: '32px'
					}}>
						<div style={{
							padding: '24px',
							background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
							borderRadius: '20px',
							textAlign: 'center'
						}}>
							<div style={{
								fontSize: 'clamp(13px, 2vw, 15px)',
								color: '#666',
								marginBottom: '8px',
								fontWeight: '600'
							}}>
								Роздрібна ціна
							</div>
							<div style={{
								fontSize: 'clamp(24px, 5vw, 32px)',
								fontWeight: '900',
								color: '#dc3545'
							}}>
								{retailPrice} ₴/кг
							</div>
						</div>

						<div style={{
							padding: '24px',
							background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
							borderRadius: '20px',
							textAlign: 'center'
						}}>
							<div style={{
								fontSize: 'clamp(13px, 2vw, 15px)',
								color: '#155724',
								marginBottom: '8px',
								fontWeight: '600'
							}}>
								Оптова ціна
							</div>
							<div style={{
								fontSize: 'clamp(24px, 5vw, 32px)',
								fontWeight: '900',
								color: '#28a745'
							}}>
								{wholesalePrice} ₴/кг
							</div>
						</div>
					</div>

					<div style={{
						padding: 'clamp(28px, 5vw, 40px)',
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						borderRadius: '24px',
						textAlign: 'center',
						boxShadow: '0 12px 40px rgba(102,126,234,0.3)'
					}}>
						<div style={{
							fontSize: 'clamp(16px, 3vw, 20px)',
							color: 'rgba(255,255,255,0.9)',
							marginBottom: '12px',
							fontWeight: '600'
						}}>
							Ваша економія
						</div>
						<div style={{
							fontSize: 'clamp(40px, 8vw, 64px)',
							fontWeight: '900',
							color: '#FFD700',
							textShadow: '0 4px 16px rgba(0,0,0,0.2)',
							marginBottom: '8px'
						}}>
							{savings.toLocaleString()} ₴
						</div>
						<div style={{
							fontSize: 'clamp(14px, 2.5vw, 16px)',
							color: 'rgba(255,255,255,0.8)',
							fontWeight: '600'
						}}>
							при замовленні {amount} кг
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
