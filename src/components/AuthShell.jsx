import { motion } from 'framer-motion'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

// Two-pane auth layout: branded showcase (desktop) + form pane.
export default function AuthShell({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen bg-bg">
      {/* Brand panel */}
      <div className="relative hidden w-[46%] overflow-hidden lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 120% at 0% 0%, #D9003E 0%, #A6002F 42%, #5C001A 100%)',
          }}
        />
        {/* soft decorative glows */}
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-black/20 blur-3xl" />

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo size={34} />
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
        <div className="flex items-center justify-between p-5 sm:p-6">
          <div className="lg:hidden">
            <Logo />
          </div>
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
