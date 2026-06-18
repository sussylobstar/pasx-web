export default function Logo({ size = 32, showWordmark = true, inverted = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span
        className="grid place-items-center rounded-[10px] bg-accent font-black text-white shadow-glow"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
        aria-hidden
      >
        P
      </span>
      {showWordmark && (
        <span
          className={`text-[19px] font-extrabold tracking-tight ${inverted ? 'text-white' : 'text-ink'}`}
        >
          PAS<span className="text-accent">X</span>
        </span>
      )}
    </div>
  )
}
