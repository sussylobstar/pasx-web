import { motion } from 'framer-motion'

// Press feedback per Emil's framework: scale(0.97) on active, fast ease-out.
const variants = {
  primary:
    'bg-accent text-white shadow-glow hover:bg-accent-hover active:bg-accent-active border-transparent',
  secondary:
    'bg-surface text-ink border border-line hover:bg-surface-2 active:bg-surface-2',
  ghost: 'bg-transparent text-ink border-transparent hover:bg-surface-2',
  danger:
    'bg-danger-soft text-danger border border-transparent hover:bg-danger/15 active:bg-danger/20',
}

const sizes = {
  sm: 'h-9 px-3.5 text-[13px] rounded-lg gap-1.5',
  md: 'h-11 px-5 text-[15px] rounded-xl gap-2',
  lg: 'h-[52px] px-6 text-[15px] rounded-xl gap-2',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  full = false,
  as = 'button',
  ...props
}) {
  const Comp = motion[as] || motion.button
  return (
    <Comp
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
      className={`inline-flex select-none items-center justify-center font-semibold
        transition-colors duration-200 ease-out-strong focus-ring disabled:opacity-50
        disabled:pointer-events-none ${sizes[size]} ${variants[variant]} ${
        full ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}
