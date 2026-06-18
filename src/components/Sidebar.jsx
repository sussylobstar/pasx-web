import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navItems } from './navItems'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import Avatar from './Avatar'
import Icon from './icons'
import StatusBadge from './StatusBadge'

// Desktop sidebar navigation.
export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className="theme-tween fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col border-r border-line bg-surface px-4 py-6 lg:flex">
      <div className="px-2">
        <Logo />
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className="group relative focus-ring rounded-xl"
          >
            {({ isActive }) => (
              <span
                className={`relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-medium
                  transition-colors duration-200 ease-out-strong ${
                    isActive
                      ? 'text-accent'
                      : 'text-ink-2 hover:bg-surface-2 hover:text-ink'
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 -z-10 rounded-xl bg-accent-soft"
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
                <item.icon
                  width={20}
                  height={20}
                  className={isActive ? 'text-accent' : 'text-ink-3 group-hover:text-ink-2'}
                />
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Account card pinned to bottom */}
      <div className="theme-tween mt-4 rounded-2xl border border-line bg-surface-2 p-3">
        <div className="flex items-center gap-3">
          <Avatar user={user} size={38} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{user.fullName}</p>
            <div className="mt-0.5">
              <StatusBadge status={user.kycStatus} dot={false} className="!px-1.5 !py-0.5 !text-[10px]" />
            </div>
          </div>
          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            aria-label="Log out"
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-3 transition-colors
              duration-150 ease-out-strong hover:bg-surface hover:text-danger active:scale-95 focus-ring"
          >
            <Icon.Logout width={18} height={18} />
          </button>
        </div>
      </div>
    </aside>
  )
}
