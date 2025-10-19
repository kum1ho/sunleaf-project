export default function LoadingSpinner() {
	return (
		<div style={{
			position: 'fixed',
			inset: 0,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: 'rgba(255,255,255,0.9)',
			backdropFilter: 'blur(8px)',
			zIndex: 9999
		}}>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '20px'
			}}>
				<div style={{
					width: '64px',
					height: '64px',
					border: '6px solid #f3f3f3',
					borderTop: '6px solid #667eea',
					borderRadius: '50%',
					animation: 'spin 1s linear infinite'
				}} />
				<p style={{
					fontSize: '18px',
					fontWeight: '700',
					color: '#667eea',
					animation: 'pulse 2s ease-in-out infinite'
				}}>
					Завантаження...
				</p>
			</div>

			<style jsx>{`
				@keyframes spin {
					0% { transform: rotate(0deg); }
					100% { transform: rotate(360deg); }
				}
				@keyframes pulse {
					0%, 100% { opacity: 1; }
					50% { opacity: 0.5; }
				}
			`}</style>
		</div>
	);
}
