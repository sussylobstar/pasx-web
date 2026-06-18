import { useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './icons'

// Copy-to-clipboard with a brief check-mark confirmation.
export default function CopyButton({ value, className = '', label = 'Copy address' }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // fallback for non-secure contexts
      const ta = document.createElement('textarea')
      ta.value = value
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1400)
  }, [value])

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={`relative inline-flex h-8 w-8 items-center justify-center rounded-lg
        text-ink-2 transition-colors duration-150 ease-out-strong hover:bg-surface-2
        hover:text-ink active:scale-95 focus-ring ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
            className="text-success"
          >
            <Icon.Check width={17} height={17} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
          >
            <Icon.Copy width={16} height={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
