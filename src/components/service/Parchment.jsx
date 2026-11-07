/**
 * Cream parchment card with an ogee (pointed onion) top edge and a thin gold border.
 * The cap is a fixed-height SVG so the curve looks the same at any card height.
 */
export default function Parchment({ children, className = '', capClassName = 'h-20 sm:h-28', innerClassName = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 400 100" preserveAspectRatio="none" className={`pc-cap block w-full ${capClassName}`} aria-hidden="true">
        <path d="M0 100V62C0 40 120 40 168 26 186 20 196 12 200 0c4 12 14 20 32 26 48 14 168 14 168 36v38z" fill="#f3e9d8" />
        <path
          d="M1 100V62C1 41 120 41 168 27 186 21 196 13 200 2c4 11 14 19 32 25 48 14 167 14 167 35v38"
          fill="none"
          stroke="#c8963e"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M10 100V64C10 47 124 46 170 33 186 28 195 21 200 11c5 10 14 17 30 22 46 13 160 14 160 31v36"
          fill="none"
          stroke="#c8963e"
          strokeOpacity="0.45"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        className={`relative -mt-px bg-cream-100 shadow-[inset_1px_0_0_#c8963e,inset_-1px_0_0_#c8963e,inset_0_-1px_0_#c8963e] ${innerClassName}`}
        style={{ backgroundImage: 'radial-gradient(90% 60% at 50% 0%, #f8f1e4 0%, transparent 70%)' }}
      >
        <div className="pointer-events-none absolute inset-[10px] top-0 border-x border-b border-gold-500/30" />
        {children}
      </div>
    </div>
  )
}
