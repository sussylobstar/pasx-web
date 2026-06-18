// Tiny SVG sparkline for the balance card. Decorative — animates its draw once.
import { motion } from 'framer-motion'

export default function Sparkline({
  data = [],
  width = 120,
  height = 40,
  stroke = '#ffffff',
  fill = true,
}) {
  if (!data.length) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)
  const points = data.map((v, i) => [i * step, height - ((v - min) / range) * (height - 6) - 3])
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const area = `${line} L ${width} ${height} L 0 ${height} Z`
  const gid = `spark-${width}-${height}`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <motion.path
        d={line}
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      />
    </svg>
  )
}
