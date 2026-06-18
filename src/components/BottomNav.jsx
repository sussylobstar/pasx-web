import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { bottomNavItems } from './navItems'

// Mobile bottom navigation. No entrance animation — it's persistent chrome.
export default function BottomNav() {
  return (
    <nav
      className="theme-tween fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/90
        backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {bottomNavItems.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.end}
              className="group flex flex-col items-center gap-1 py-2.5 focus-ring rounded-lg"
            >
              {({ isActive }) => (
                <>
                  <span className="relative grid place-items-center">
                    {isActive && (
                      <motion.span
                        layoutId="bottomnav-active"
                        className="absolute -inset-x-3 -inset-y-1.5 -z-10 rounded-full bg-accent-soft"
                        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      />
                    )}
                    <item.icon
                      width={22}
                      height={22}
                      className={
                        isActive ? 'text-accent' : 'text-ink-3 transition-colors group-hover:text-ink-2'
                      }
                    />
                  </span>
                  <span
                    className={`text-[10.5px] font-semibold transition-colors ${
                      isActive ? 'text-accent' : 'text-ink-3'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
