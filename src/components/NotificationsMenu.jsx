import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './icons'
import { notificationFeed } from '../data/mockData'

// Visual treatment per notification kind — matches the app's status palette.
const kindStyle = {
  received: { icon: Icon.ArrowDownLeft, cls: 'bg-success-soft text-success' },
  kyc: { icon: Icon.Shield, cls: 'bg-success-soft text-success' },
  security: { icon: Icon.Lock, cls: 'bg-warning-soft text-warning' },
  sent: { icon: Icon.ArrowUpRight, cls: 'bg-danger-soft text-danger' },
  system: { icon: Icon.Spark, cls: 'bg-accent-soft text-accent' },
}

function NotificationItem({ n }) {
  const style = kindStyle[n.kind] || kindStyle.system
  const NIcon = style.icon
  return (
    <div
      className={`relative flex gap-3 px-4 py-3.5 transition-colors duration-150 ease-out-strong
        hover:bg-surface-2 ${n.unread ? 'bg-accent-softer' : ''}`}
    >
      {/* unread accent left border */}
      {n.unread && (
        <span className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-accent" aria-hidden />
      )}
      <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full ${style.cls}`}>
        <NIcon width={17} height={17} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[14px] font-semibold text-ink">{n.title}</p>
          {n.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />}
        </div>
        <p className="mt-0.5 text-[13px] leading-snug text-ink-2">{n.body}</p>
        <p className="mt-1 text-[12px] text-ink-3">{n.time}</p>
      </div>
    </div>
  )
}

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(notificationFeed)
  const wrapRef = useRef(null)
  const unread = items.filter((n) => n.unread).length

  // Close on outside click + Escape.
  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const markAllRead = () => setItems((list) => list.map((n) => ({ ...n, unread: false })))

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        aria-haspopup="true"
        aria-expanded={open}
        className="relative grid h-10 w-10 place-items-center rounded-xl border border-line
          bg-surface text-ink transition-colors duration-200 ease-out-strong hover:bg-surface-2
          active:scale-95 focus-ring"
      >
        <Icon.Bell width={19} height={19} />
        {/* red dot disappears once everything is read */}
        <AnimatePresence>
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent ring-2 ring-surface"
            />
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Mobile-only dim backdrop so the panel reads clearly on small screens */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black/20 sm:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="menu"
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -4 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformOrigin: 'top right' }}
              className="theme-tween fixed left-4 right-4 top-[68px] z-50 overflow-hidden rounded-2xl
                border border-line bg-surface shadow-card-hover sm:absolute sm:left-auto sm:right-0
                sm:top-full sm:mt-2 sm:w-[360px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-bold text-ink">Notifications</h3>
                  {unread > 0 && (
                    <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white">
                      {unread}
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllRead}
                  disabled={unread === 0}
                  className="rounded-lg px-2 py-1 text-[12.5px] font-semibold text-accent transition-colors
                    duration-150 ease-out-strong hover:bg-accent-soft disabled:cursor-default
                    disabled:text-ink-3 disabled:hover:bg-transparent focus-ring"
                >
                  Mark all as read
                </button>
              </div>

              {/* List */}
              <div className="max-h-[min(70vh,420px)] divide-y divide-line overflow-y-auto">
                {items.map((n) => (
                  <NotificationItem key={n.id} n={n} />
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-line px-4 py-2.5 text-center">
                <button className="text-[13px] font-semibold text-accent hover:text-accent-hover focus-ring rounded">
                  View all notifications
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
