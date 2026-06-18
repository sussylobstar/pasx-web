export default function Card({ children, className = '', padded = true, ...props }) {
  return (
    <div
      className={`theme-tween rounded-2xl border border-line bg-surface shadow-card ${
        padded ? 'p-5 sm:p-6' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
