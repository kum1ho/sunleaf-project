import { useEffect, useState } from 'react';

export default function Hero() {
	const [text, setText] = useState('');
	const [scrollY, setScrollY] = useState(0);
	const full = 'Оптові поставки преміум кави, чаю та солодощів для вашого бізнесу';

	useEffect(() => {
		let i = 0;
		const timer = setInterval(() => {
			setText(full.slice(0, i));
			i++;
			if (i > full.length) clearInterval(timer);
		}, 40);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const onScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<section
			style={{
				position: 'relative',
				minHeight: '90vh',
				display: 'grid',
				placeItems: 'center',
				color: '#fff',
				overflow: 'hidden',
			}}
		>
			{/* Parallax Background */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: "url('/images/coffee-beans-hero.jpg')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
					transition: 'transform 0.1s ease-out',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: 'linear-gradient(135deg, rgba(0,87,183,0.92) 0%, rgba(255,215,0,0.75) 100%)',
				}}
			/>

			{/* Floating particles */}
			<div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
				{[...Array(8)].map((_, i) => (
					<div
						key={i}
						className="float"
						style={{
							position: 'absolute',
							width: 4,
							height: 4,
							background: '#FFD700',
							borderRadius: '50%',
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							opacity: 0.6,
							animationDelay: `${i * 0.5}s`,
							animationDuration: `${3 + i * 0.5}s`,
						}}
					/>
				))}
			</div>

			<div
				className="fade-in"
				style={{
					position: 'relative',
					zIndex: 1,
					maxWidth: 1000,
					padding: '0 20px',
					textAlign: 'center',
				}}
			>
				<h1
					className="scale-in"
					style={{
						fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
						lineHeight: 1.2,
						marginBottom: 20,
						fontWeight: 900,
						textShadow: '0 4px 30px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)',
						letterSpacing: '-0.03em',
					}}
				>
					{text}
					<span style={{ borderRight: '4px solid #FFD700', animation: 'blink 1s step-end infinite', paddingLeft: 4 }}>|</span>
				</h1>
				<p className="slide-in-left" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', marginBottom: 32, opacity: 0.98, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
					Якість від виробника - вигода для партнера
				</p>
				<div className="slide-in-right" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
					<a
						href="#pricing-form"
						className="btn btn-primary bounce-on-hover"
						style={{
							background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
							color: '#0057B7',
							padding: 'clamp(14px, 2.5vw, 16px) clamp(24px, 4vw, 32px)',
							fontSize: 'clamp(16px, 2.2vw, 19px)',
							fontWeight: 800,
							borderRadius: 14,
							boxShadow: '0 10px 30px rgba(255,165,0,0.5)',
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							textDecoration: 'none',
						}}
					>
						<span style={{ fontSize: '1.3em' }}>📄</span> Отримати прайс
					</a>
					<a
						href="#contacts"
						className="btn btn-secondary bounce-on-hover"
						style={{
							border: '3px solid #fff',
							padding: 'clamp(12px, 2.5vw, 14px) clamp(22px, 4vw, 30px)',
							fontSize: 'clamp(16px, 2.2vw, 19px)',
							borderRadius: 14,
							background: 'rgba(255,255,255,0.2)',
							backdropFilter: 'blur(10px)',
							fontWeight: 700,
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							textDecoration: 'none',
							color: '#fff',
						}}
					>
						<span style={{ fontSize: '1.3em' }}>💬</span> Консультація
					</a>
				</div>
			</div>

			<style jsx>{`
				@keyframes blink {
					0%, 50% { opacity: 1; }
					51%, 100% { opacity: 0; }
				}
			`}</style>
		</section>
	);
}
