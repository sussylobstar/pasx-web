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

const typeLabel = {
  deposit: 'Deposit',
  withdrawal: 'Withdrawal',
  transfer: 'Transfer',
  payment: 'Payment',
  exchange: 'Exchange',
}

// Responsive transaction table — real table on desktop, stacked rows on mobile.
export default function TxTable({ rows }) {
  if (!rows.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-2 text-ink-3">
          <Icon.Search width={22} height={22} />
        </span>
        <p className="mt-3 text-[15px] font-semibold text-ink">No transactions found</p>
        <p className="mt-1 text-[13px] text-ink-3">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Desktop table */}
      <table className="hidden w-full sm:table">
        <thead>
          <tr className="border-b border-line text-left text-[12px] font-semibold uppercase tracking-wide text-ink-3">
            <th className="px-3 py-3 font-semibold">Date</th>
            <th className="px-3 py-3 font-semibold">Type</th>
            <th className="px-3 py-3 font-semibold">Description</th>
            <th className="px-3 py-3 text-right font-semibold">Amount</th>
            <th className="px-3 py-3 text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => {
            const credit = t.amount > 0
            const TIcon = typeIcon[t.type] || Icon.Card
            return (
              <tr
                key={t.id}
                className="group border-b border-line/70 transition-colors hover:bg-surface-2"
              >
                <td className="whitespace-nowrap px-3 py-3.5 text-[13.5px] text-ink-2">
                  {formatDate(t.date)}
                </td>
                <td className="px-3 py-3.5">
                  <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-ink">
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-full ${
                        credit ? 'bg-success-soft text-success' : 'bg-surface-2 text-ink-2'
                      }`}
                    >
                      <TIcon width={14} height={14} />
                    </span>
                    {typeLabel[t.type]}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-[14px] font-medium text-ink">{t.description}</td>
                <td
                  className={`whitespace-nowrap px-3 py-3.5 text-right text-[14px] font-bold tabular-nums ${
                    credit ? 'text-success' : 'text-ink'
                  }`}
                >
                  {credit ? '+' : ''}
                  {formatMoney(t.amount)}
                </td>
                <td className="px-3 py-3.5 text-right">
                  <StatusBadge status={t.status} dot={false} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Mobile stacked */}
      <div className="divide-y divide-line sm:hidden">
        {rows.map((t) => {
          const credit = t.amount > 0
          const TIcon = typeIcon[t.type] || Icon.Card
          return (
            <div key={t.id} className="flex items-center gap-3 py-3.5">
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                  credit ? 'bg-success-soft text-success' : 'bg-surface-2 text-ink-2'
                }`}
              >
                <TIcon width={18} height={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14.5px] font-semibold text-ink">{t.description}</p>
                <p className="text-[12.5px] text-ink-3">{formatDate(t.date)} · {typeLabel[t.type]}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[14px] font-bold tabular-nums ${credit ? 'text-success' : 'text-ink'}`}>
                  {credit ? '+' : ''}
                  {formatMoney(t.amount)}
                </span>
                <StatusBadge status={t.status} dot={false} className="!px-1.5 !py-0.5 !text-[10px]" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
