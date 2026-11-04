interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export default function BrandLogo({
  variant = 'auto',
  size = 'md',
  showTagline = true,
  className = ''
}: BrandLogoProps) {
  // Sizing definitions
  const dimensions = {
    sm: { symbolWidth: 42, symbolHeight: 22, textClass: 'text-sm', subClass: 'text-[9px]' },
    md: { symbolWidth: 58, symbolHeight: 30, textClass: 'text-base md:text-lg', subClass: 'text-[10px] md:text-[11px]' },
    lg: { symbolWidth: 80, symbolHeight: 42, textClass: 'text-xl md:text-2xl', subClass: 'text-xs' },
    xl: { symbolWidth: 110, symbolHeight: 56, textClass: 'text-2xl md:text-3xl', subClass: 'text-sm' }
  }[size];

  const holidaysColor = variant === 'dark' 
    ? 'text-white' 
    : 'text-slate-900';

  const taglineColor = variant === 'dark'
    ? 'text-slate-300'
    : 'text-slate-500';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Precision Vector Emblem matching uploaded brand logo in vibrant travel blues and teals */}
      <svg
        width={dimensions.symbolWidth}
        height={dimensions.symbolHeight}
        viewBox="0 0 160 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105"
        aria-label="Infinity Club Holidays Logo Emblem"
      >
        <defs>
          <linearGradient id="ringGradientLeft" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#00c2cb" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="ringGradientRight" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0284c7" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Left ring oval */}
        <ellipse
          cx="62"
          cy="42"
          rx="38"
          ry="28"
          fill="none"
          stroke="url(#ringGradientLeft)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#softGlow)"
        />

        {/* Right ring oval overlapping */}
        <ellipse
          cx="98"
          cy="42"
          rx="38"
          ry="28"
          fill="none"
          stroke="url(#ringGradientRight)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#softGlow)"
        />
        
        {/* Center overlay highlight for seamless 3D weave effect */}
        <path
          d="M 80 14 A 38 28 0 0 1 98 14"
          stroke="#00c2cb"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      {/* Typography with vibrant travel blue and dark ocean slate */}
      <div className="text-center mt-1">
        <div className={`font-black tracking-wider uppercase leading-tight font-outfit ${dimensions.textClass}`}>
          <span className="text-sky-600">INFINITY CLUB </span>
          <span className={holidaysColor}>HOLIDAYS</span>
        </div>
        {showTagline && (
          <div className={`tracking-[0.22em] lowercase font-medium ${taglineColor} ${dimensions.subClass}`}>
            endless travel possibilities
          </div>
        )}
      </div>
    </div>
  );
}
