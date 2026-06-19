export default function Avatar({ user, size = 40, className = '' }) {
  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
  return (
    <div
      className={`relative grid shrink-0 place-items-center rounded-full font-bold text-white
        shadow-sm ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: 'linear-gradient(135deg, #0057D9 0%, #003FA3 100%)',
      }}
      aria-hidden
    >
      {initials}
    </div>
  )
}
