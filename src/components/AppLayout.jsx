import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'
import Avatar from './Avatar'
import NotificationsMenu from './NotificationsMenu'
import { useAuth } from '../context/AuthContext'

export default function AppLayout() {
  const location = useLocation()
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />

      <div className="lg:pl-[260px]">
        {/* Top bar */}
        <header className="theme-tween sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
            <div className="lg:hidden">
              <Logo size={28} />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-ink-3">Welcome back,</p>
              <p className="-mt-0.5 text-[15px] font-bold text-ink">{user.firstName} 👋</p>
            </div>

            <div className="flex items-center gap-2">
              <NotificationsMenu />
              <ThemeToggle />
              <div className="hidden sm:block lg:hidden">
                <Avatar user={user} size={36} />
              </div>
            </div>
          </div>
        </header>

        {/* Routed page with crossfade + subtle slide */}
        <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:px-6 lg:pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
