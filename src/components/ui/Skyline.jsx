// Generic world-city skyline silhouette built from simple specs (1440×240 viewBox).
// b = block, t = tower with antenna, s = stepped tower, p = spire, w = wheel.
// [type, centreX, width, heightAboveBaseline]
const LAYOUTS = {
  near: [
    ['b', 30, 120, 40], ['t', 92, 34, 120], ['b', 150, 110, 58], ['s', 214, 46, 150],
    ['b', 280, 90, 46], ['w', 350, 90, 92], ['b', 420, 100, 38], ['t', 486, 30, 132],
    ['b', 560, 140, 60], ['p', 640, 40, 210], ['b', 720, 200, 70], ['s', 800, 58, 186],
    ['b', 880, 110, 54], ['t', 946, 32, 140], ['b', 1030, 150, 46], ['p', 1110, 36, 172],
    ['b', 1180, 110, 50], ['s', 1250, 44, 130], ['b', 1320, 110, 40], ['t', 1400, 30, 112],
  ],
  far: [
    ['b', 60, 160, 70], ['s', 140, 60, 140], ['b', 260, 180, 80], ['t', 360, 40, 170],
    ['b', 470, 200, 90], ['p', 560, 50, 196], ['b', 680, 200, 86], ['s', 780, 70, 160],
    ['b', 900, 180, 92], ['t', 1000, 44, 186], ['b', 1100, 160, 72], ['p', 1190, 44, 160],
    ['b', 1300, 200, 66], ['t', 1400, 40, 150],
  ],
}

const BASE = 240

function tower(x, w, h, key) {
  const top = BASE - h
  return (
    <g key={key}>
      <rect x={x - w / 2} y={top} width={w} height={h} />
      <rect x={x - w / 2 + 4} y={top - 8} width={w - 8} height={8} />
      <rect x={x - 0.8} y={top - 30} width={1.6} height={24} />
    </g>
  )
}

function stepped(x, w, h, key) {
  const top = BASE - h
  return (
    <g key={key}>
      <rect x={x - w / 2} y={top + h * 0.3} width={w} height={h * 0.7} />
      <rect x={x - w * 0.36} y={top + h * 0.12} width={w * 0.72} height={h * 0.2} />
      <rect x={x - w * 0.22} y={top} width={w * 0.44} height={h * 0.14} />
      <rect x={x - 0.8} y={top - 18} width={1.6} height={18} />
    </g>
  )
}

function spire(x, w, h, key) {
  const top = BASE - h
  return (
    <g key={key}>
      <path d={`M${x - w / 2} ${BASE} L${x - w * 0.3} ${top + h * 0.3} L${x} ${top} L${x + w * 0.3} ${top + h * 0.3} L${x + w / 2} ${BASE} Z`} />
      <rect x={x - 0.7} y={top - 14} width={1.4} height={16} />
    </g>
  )
}

function wheel(x, w, h, key) {
  const r = w / 2
  const cy = BASE - h + r
  return (
    <g key={key}>
      <circle cx={x} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={3} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        return <path key={i} d={`M${x} ${cy} L${x + r * Math.cos(a)} ${cy + r * Math.sin(a)}`} stroke="currentColor" strokeWidth={1.2} />
      })}
      <path d={`M${x - 14} ${BASE} L${x} ${cy} L${x + 14} ${BASE} Z`} />
    </g>
  )
}

function block(x, w, h, key) {
  return <rect key={key} x={x - w / 2} y={BASE - h} width={w} height={h} />
}

// Tiny lit windows on blocks and towers
function windows(specs) {
  const out = []
  specs.forEach(([t, x, w, h], i) => {
    if (t !== 'b' && t !== 't') return
    const cols = Math.max(1, Math.floor((w - 8) / 12))
    const rows = Math.max(1, Math.floor((h - 12) / 16))
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if ((c * 7 + r * 3 + i) % 3) continue // light only some of them
        out.push(<rect key={`${i}-${c}-${r}`} x={x - w / 2 + 6 + c * 12} y={BASE - h + 8 + r * 16} width={5} height={7} />)
      }
    }
  })
  return out
}

const DRAW = { t: tower, s: stepped, p: spire, w: wheel, b: block }

export default function Skyline({ variant = 'near', className = '', fill = '#17110d', lights = false }) {
  const specs = LAYOUTS[variant]
  return (
    <svg viewBox={`0 0 1440 ${BASE}`} preserveAspectRatio="xMidYMax slice" className={className} style={{ color: fill }} aria-hidden="true">
      <g fill={fill}>{specs.map(([t, x, w, h], i) => DRAW[t](x, w, h, i))}</g>
      {lights && (
        <g fill="#e6c285" opacity="0.22">
          {windows(specs)}
        </g>
      )}
    </svg>
  )
}
