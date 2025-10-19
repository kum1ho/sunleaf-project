interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 44, className = '' }: LogoProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        background:
          'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.6,
        boxShadow: '0 4px 12px rgba(0,87,183,0.3)',
        transition: 'all 0.3s ease',
      }}
    >
      🍃
    </div>
  );
}
