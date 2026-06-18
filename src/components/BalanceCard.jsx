import { useState } from 'react'
import { motion } from 'framer-motion'
import Sparkline from './Sparkline'
import CopyButton from './CopyButton'
import Icon from './icons'
import { balance, formatMoney, truncateAddress } from '../data/mockData'

// The large, prominent balance card (Revolut-style gradient).
export default function BalanceCard({ user, actions = true }) {
  const [hidden, setHidden] = useState(false)
  const up = balance.changePct >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="relative overflow-hidden rounded-3xl p-6 text-white shadow-glow sm:p-7"
      style={{
        background:
          'linear-gradient(135deg, #D9003E 0%, #B30033 46%, #7A0023 100%)',
      }}
    >
      {/* decorative glow */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-black/20 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-medium text-white/70">Total balance</p>
            <div className="mt-1.5 flex items-center gap-3">
              <h2 className="text-[38px] font-extrabold leading-none tracking-tight tabular-nums sm:text-[44px]">
                {hidden ? '••••••' : formatMoney(balance.available, balance.currency)}
              </h2>
              <button
                onClick={() => setHidden((h) => !h)}
                aria-label={hidden ? 'Show balance' : 'Hide balance'}
                className="grid h-8 w-8 place-items-center rounded-lg text-white/70
                  transition-colors duration-150 hover:bg-white/10 hover:text-white active:scale-95"
              >
                {hidden ? <Icon.Eye width={18} height={18} /> : <Icon.EyeOff width={18} height={18} />}
              </button>
            </div>
            <div className="mt-2.5 flex items-center gap-2 text-[13px]">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                  up ? 'bg-white/15' : 'bg-black/20'
                }`}
              >
                <Icon.ArrowUpRight width={13} height={13} className={up ? '' : 'rotate-90'} />
                {up ? '+' : ''}
                {balance.changePct}%
              </span>
              <span className="text-white/60">this month</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <Sparkline data={balance.trend} width={132} height={48} />
          </div>
        </div>

        {/* XRPL address */}
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/60">
              XRPL Wallet Address
            </p>
            <p className="mt-0.5 truncate font-mono text-[14px] font-medium text-white">
              {truncateAddress(user.xrplAddress, 10, 6)}
            </p>
          </div>
          <CopyButton
            value={user.xrplAddress}
            className="!text-white/80 hover:!bg-white/15 hover:!text-white"
          />
        </div>

        {actions && (
          <div className="mt-5 grid grid-cols-4 gap-2.5">
            {[
              { icon: Icon.Plus, label: 'Add' },
              { icon: Icon.Send, label: 'Send' },
              { icon: Icon.Swap, label: 'Exchange' },
              { icon: Icon.ArrowUpRight, label: 'Withdraw' },
            ].map((a) => (
              <button
                key={a.label}
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/10 py-3
                  text-white backdrop-blur-sm transition-colors duration-150 hover:bg-white/20 active:scale-[0.97]"
              >
                <a.icon width={20} height={20} />
                <span className="text-[12px] font-semibold">{a.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
