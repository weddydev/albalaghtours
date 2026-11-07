// Mosque skyline silhouette built from simple specs (1440×240 viewBox).
// d = dome, m = minaret, b = arcade block. [type, centreX, width, heightAboveBaseline]
const LAYOUTS = {
  near: [
    ['b', 30, 120, 40], ['m', 70, 10, 120], ['b', 140, 130, 55], ['d', 160, 70, 60],
    ['m', 238, 12, 150], ['b', 300, 120, 50], ['d', 330, 90, 70], ['b', 420, 90, 34],
    ['m', 480, 11, 130], ['b', 560, 140, 60], ['m', 610, 14, 200], ['d', 720, 210, 105],
    ['b', 720, 280, 70], ['m', 830, 14, 200], ['b', 900, 120, 52], ['m', 965, 11, 130],
    ['d', 1060, 100, 72], ['b', 1060, 160, 46], ['m', 1150, 12, 150], ['b', 1230, 120, 40],
    ['d', 1270, 70, 58], ['m', 1340, 10, 115], ['b', 1405, 90, 44],
  ],
  far: [
    ['b', 60, 160, 70], ['d', 110, 110, 80], ['m', 200, 10, 160], ['b', 300, 180, 80],
    ['d', 420, 140, 95], ['m', 520, 12, 190], ['b', 640, 200, 90], ['m', 760, 10, 170],
    ['d', 900, 150, 92], ['b', 1000, 160, 72], ['m', 1090, 12, 185], ['d', 1200, 120, 84],
    ['b', 1320, 200, 66], ['m', 1400, 10, 150],
  ],
}

const BASE = 240

function dome(x, w, h, key) {
  const l = x - w / 2
  const r = x + w / 2
  const shoulder = BASE - h * 0.32
  const top = BASE - h
  return (
    <g key={key}>
      <rect x={l + w * 0.06} y={shoulder} width={w * 0.88} height={BASE - shoulder} />
      <path
        d={`M${l} ${shoulder} C${l} ${shoulder - h * 0.42} ${x - w * 0.18} ${top + h * 0.18} ${x} ${top} C${x + w * 0.18} ${top + h * 0.18} ${r} ${shoulder - h * 0.42} ${r} ${shoulder} Z`}
      />
      <rect x={x - 0.9} y={top - 14} width={1.8} height={16} />
      <circle cx={x} cy={top - 17} r={3} />
    </g>
  )
}

function minaret(x, w, h, key) {
  const top = BASE - h
  return (
    <g key={key}>
      <rect x={x - w / 2} y={top + 16} width={w} height={h - 16} />
      <rect x={x - w / 2 - 3} y={top + h * 0.38} width={w + 6} height={4} />
      <rect x={x - w / 2 - 2} y={top + h * 0.16} width={w + 4} height={3} />
      <path d={`M${x - w / 2} ${top + 16} L${x} ${top - 8} L${x + w / 2} ${top + 16} Z`} />
      <rect x={x - 0.7} y={top - 18} width={1.4} height={12} />
    </g>
  )
}

function block(x, w, h, key) {
  return <rect key={key} x={x - w / 2} y={BASE - h} width={w} height={h} />
}

// Tiny lit arch windows on arcade blocks
function windows(specs) {
  const out = []
  specs.forEach(([t, x, w, h], i) => {
    if (t !== 'b') return
    const n = Math.floor(w / 22)
    for (let k = 0; k < n; k++) {
      const wx = x - w / 2 + 8 + k * 22
      out.push(<path key={`${i}-${k}`} d={`M${wx} ${BASE - 6} v-${h * 0.4} q5 -7 10 0 v${h * 0.4} z`} />)
    }
  })
  return out
}

export default function Skyline({ variant = 'near', className = '', fill = '#03110b', lights = false }) {
  const specs = LAYOUTS[variant]
  return (
    <svg viewBox={`0 0 1440 ${BASE}`} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <g fill={fill}>
        {specs.map(([t, x, w, h], i) =>
          t === 'd' ? dome(x, w, h, i) : t === 'm' ? minaret(x, w, h, i) : block(x, w, h, i),
        )}
      </g>
      {lights && (
        <g fill="#e8cf7a" opacity="0.22">
          {windows(specs)}
        </g>
      )}
    </svg>
  )
}
