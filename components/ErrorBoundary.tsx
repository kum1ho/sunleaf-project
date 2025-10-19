import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: null,
		errorInfo: null
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error, errorInfo: null };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Error caught by boundary:', error, errorInfo);
		this.setState({
			error,
			errorInfo
		});

		// Тут можна відправити помилку на сервер логування
		// logErrorToService(error, errorInfo);
	}

	private handleReload = () => {
		window.location.reload();
	};

	private handleGoHome = () => {
		window.location.href = '/';
	};

	public render() {
		if (this.state.hasError) {
			return (
				<div style={{
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					padding: '20px'
				}}>
					<div style={{
						background: 'white',
						padding: 'clamp(40px, 8vw, 60px)',
						borderRadius: '32px',
						boxShadow: '0 30px 90px rgba(0,0,0,0.25)',
						maxWidth: '600px',
						width: '100%',
						textAlign: 'center'
					}}>
						<div style={{
							width: '100px',
							height: '100px',
							background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
							borderRadius: '24px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '48px',
							margin: '0 auto 32px',
							boxShadow: '0 16px 40px rgba(220,53,69,0.4)',
							animation: 'shake 0.5s ease'
						}}>
							⚠️
						</div>

						<h1 style={{
							margin: '0 0 16px',
							fontSize: 'clamp(28px, 6vw, 36px)',
							fontWeight: '900',
							color: '#1a1a1a'
						}}>
							Щось пішло не так
						</h1>

						<p style={{
							margin: '0 0 32px',
							fontSize: 'clamp(16px, 3vw, 18px)',
							color: '#666',
							lineHeight: 1.6
						}}>
							Вибачте за незручності. Сталася помилка при завантаженні сторінки.
							Спробуйте перезавантажити або повернутися на головну.
						</p>

						{process.env.NODE_ENV === 'development' && this.state.error && (
							<details style={{
								marginBottom: '32px',
								padding: '20px',
								background: '#f8f9fa',
								borderRadius: '12px',
								textAlign: 'left',
								fontSize: '14px',
								maxHeight: '200px',
								overflow: 'auto'
							}}>
								<summary style={{
									cursor: 'pointer',
									fontWeight: '700',
									marginBottom: '10px',
									color: '#dc3545'
								}}>
									Деталі помилки (тільки для розробки)
								</summary>
								<pre style={{
									whiteSpace: 'pre-wrap',
									wordBreak: 'break-word',
									fontSize: '12px',
									color: '#666'
								}}>
									{this.state.error.toString()}
									{this.state.errorInfo && this.state.errorInfo.componentStack}
								</pre>
							</details>
						)}

						<div style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
							gap: '16px'
						}}>
							<button
								onClick={this.handleReload}
								style={{
									padding: '16px 24px',
									background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
									color: 'white',
									border: 'none',
									borderRadius: '14px',
									fontSize: '16px',
									fontWeight: '800',
									cursor: 'pointer',
									transition: 'all 0.3s ease',
									boxShadow: '0 8px 24px rgba(102,126,234,0.3)'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'translateY(-2px)';
									e.currentTarget.style.boxShadow = '0 12px 32px rgba(102,126,234,0.4)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'translateY(0)';
									e.currentTarget.style.boxShadow = '0 8px 24px rgba(102,126,234,0.3)';
								}}
							>
								🔄 Перезавантажити
							</button>

							<button
								onClick={this.handleGoHome}
								style={{
									padding: '16px 24px',
									background: 'white',
									color: '#667eea',
									border: '3px solid #667eea',
									borderRadius: '14px',
									fontSize: '16px',
									fontWeight: '800',
									cursor: 'pointer',
									transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = '#667eea';
									e.currentTarget.style.color = 'white';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'white';
									e.currentTarget.style.color = '#667eea';
								}}
							>
								🏠 На головну
							</button>
						</div>
					</div>

					<style jsx>{`
						@keyframes shake {
							0%, 100% { transform: translateX(0); }
							25% { transform: translateX(-10px) rotate(-5deg); }
							75% { transform: translateX(10px) rotate(5deg); }
						}
					`}</style>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
