// Accessible switch. Thumb slides with a strong ease-out; track color crossfades.
export default function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors
        duration-200 ease-out-strong focus-ring ${checked ? 'bg-accent' : 'bg-line'}`}
    >
      <span
        className="inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform
          duration-200 ease-out-strong"
        style={{ transform: checked ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  )
}
