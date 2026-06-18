import Icon from './icons'
import StatusBadge from './StatusBadge'
import { formatMoney, formatDate } from '../data/mockData'

const typeIcon = {
  deposit: Icon.ArrowDownLeft,
  withdrawal: Icon.ArrowUpRight,
  transfer: Icon.Send,
  payment: Icon.Card,
  exchange: Icon.Swap,
}

export default function TransactionRow({ t, showStatus = true }) {
  const credit = t.amount > 0
  const TIcon = typeIcon[t.type] || Icon.Card
  return (
    <div className="flex items-center gap-3.5 py-3">
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
          credit ? 'bg-success-soft text-success' : 'bg-surface-2 text-ink-2'
        }`}
      >
        <TIcon width={18} height={18} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-ink">{t.description}</p>
        <p className="mt-0.5 truncate text-[13px] text-ink-3">
          {formatDate(t.date, true)} · {t.channel}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span
          className={`text-[15px] font-bold tabular-nums ${credit ? 'text-success' : 'text-ink'}`}
        >
          {credit ? '+' : ''}
          {formatMoney(t.amount)}
        </span>
        {showStatus && t.status !== 'completed' && (
          <StatusBadge status={t.status} dot={false} className="!px-1.5 !py-0.5 !text-[10px]" />
        )}
      </div>
    </div>
  )
}
