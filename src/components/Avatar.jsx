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
        background: 'linear-gradient(135deg, #D9003E 0%, #8A0027 100%)',
      }}
      aria-hidden
    >
      {initials}
    </div>
  )
}
