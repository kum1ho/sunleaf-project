export default function Logo({ size = 40, className = '' }: { size?: number; className?: string }) {
	return (
		<svg width={size} height={size} viewBox="0 0 100 100" className={className} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,87,183,0.3))' }}>
			<defs>
				<linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style={{ stopColor: '#0057B7', stopOpacity: 1 }} />
					<stop offset="50%" style={{ stopColor: '#4CAF50', stopOpacity: 1 }} />
					<stop offset="100%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
				</linearGradient>
				<radialGradient id="glowGradient" cx="50%" cy="50%">
					<stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 0.8 }} />
					<stop offset="100%" style={{ stopColor: '#FFD700', stopOpacity: 0 }} />
				</radialGradient>
			</defs>
			
			{/* Світло позаду */}
			<circle cx="50" cy="50" r="45" fill="url(#glowGradient)" opacity="0.6">
				<animate attributeName="r" values="40;48;40" dur="3s" repeatCount="indefinite" />
			</circle>
			
			{/* Чайне листя */}
			<path
				d="M50 15 C 35 25, 30 40, 30 55 C 30 70, 40 80, 50 85 C 60 80, 70 70, 70 55 C 70 40, 65 25, 50 15 Z"
				fill="url(#leafGradient)"
				stroke="#fff"
				strokeWidth="2"
			>
				<animateTransform
					attributeName="transform"
					type="rotate"
					from="0 50 50"
					to="360 50 50"
					dur="20s"
					repeatCount="indefinite"
				/>
			</path>
			
			{/* Центральна жилка */}
			<path d="M50 20 L50 80" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
			
			{/* Бічні жилки */}
			<path d="M50 35 Q 40 40, 35 50" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
			<path d="M50 35 Q 60 40, 65 50" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
			<path d="M50 50 Q 40 55, 35 65" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
			<path d="M50 50 Q 60 55, 65 65" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
		</svg>
	);
}
