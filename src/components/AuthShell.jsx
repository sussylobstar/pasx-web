import { motion } from 'framer-motion'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

// Two-pane auth layout: branded showcase (desktop) + form pane.
export default function AuthShell({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen bg-bg">
      {/* Brand panel */}
      <div className="relative hidden w-[46%] overflow-hidden lg:block">
        {/* Full-cover background image */}
        <img
          src="/auth-bg.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Dark overlay keeps the white text readable */}
        <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.45)' }} />

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <img src="/pasx-logo.png" alt="PASX" className="h-12 w-auto" />
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-md text-[34px] font-extrabold leading-[1.15] tracking-tight"
            >
              Money that moves at the speed of the internet.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="mt-4 max-w-md text-[15px] text-white/75"
            >
              Send, spend, exchange and hold — backed by the XRP Ledger. One account for everything.
            </motion.p>
            <div className="mt-8 flex items-center gap-6 text-white/80">
              <Stat value="2.4M+" label="Customers" />
              <span className="h-8 w-px bg-white/20" />
              <Stat value="$8B" label="Processed" />
              <span className="h-8 w-px bg-white/20" />
              <Stat value="180+" label="Countries" />
            </div>
          </div>
          <p className="text-[13px] text-white/55">© 2026 PASX Financial. All rights reserved.</p>
        </div>
      </div>

      {/* Form pane */}
      <div className="flex flex-1 flex-col">
        {/* Mobile branded banner — only below lg; desktop uses the left panel instead */}
        <div className="relative h-[200px] w-full overflow-hidden lg:hidden">
          <img
            src="/auth-bg.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.45)' }} />
          <div className="absolute right-5 top-5 z-10">
            <ThemeToggle />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <Logo size={32} inverted />
            <p className="mt-2 max-w-xs text-[14px] font-medium leading-snug text-white/85">
              Money that moves at the speed of the internet.
            </p>
          </div>
        </div>

        {/* Desktop top bar — unchanged */}
        <div className="hidden items-center justify-between p-5 sm:p-6 lg:flex">
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-12 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-[400px]"
          >
            <h1 className="text-[26px] font-extrabold tracking-tight text-ink">{title}</h1>
            {subtitle && <p className="mt-2 text-[15px] text-ink-2">{subtitle}</p>}
            <div className="mt-8">{children}</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-xl font-extrabold">{value}</p>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  )
}
