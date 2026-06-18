import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import Icon from './icons'

// Light/dark toggle. Occasional action → a small, satisfying icon swap is fine.
export default function ThemeToggle({ className = '' }) {
  const { isDark, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`relative inline-flex h-10 w-10 items-center justify-center overflow-hidden
        rounded-xl border border-line bg-surface text-ink transition-colors duration-200
        ease-out-strong hover:bg-surface-2 active:scale-95 focus-ring ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ y: 14, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <Icon.Moon width={19} height={19} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: 14, opacity: 0, rotate: 30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: -30 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <Icon.Sun width={19} height={19} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
