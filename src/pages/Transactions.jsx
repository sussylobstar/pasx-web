import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import TxTable from '../components/TxTable'
import Icon from '../components/icons'
import { transactions, formatMoney } from '../data/mockData'

const TYPES = [
  { key: 'all', label: 'All' },
  { key: 'deposit', label: 'Deposits' },
  { key: 'withdrawal', label: 'Withdrawals' },
  { key: 'transfer', label: 'Transfers' },
  { key: 'payment', label: 'Payments' },
  { key: 'exchange', label: 'Exchange' },
]

const RANGES = [
  { key: 'all', label: 'All time', days: Infinity },
  { key: '7d', label: 'Last 7 days', days: 7 },
  { key: '30d', label: 'Last 30 days', days: 30 },
]

// Reference "now" matches the mock data window (mid-June 2026).
const NOW = new Date('2026-06-18T00:00:00')

export default function Transactions() {
  const [type, setType] = useState('all')
  const [range, setRange] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const days = RANGES.find((r) => r.key === range)?.days ?? Infinity
    const minTime = days === Infinity ? -Infinity : NOW.getTime() - days * 86400000
    return transactions.filter((t) => {
      if (type !== 'all' && t.type !== type) return false
      if (new Date(t.date).getTime() < minTime) return false
      if (query && !t.description.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [type, range, query])

  const totals = useMemo(() => {
    const inc = filtered.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0)
    const out = filtered.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0)
    return { inc, out }
  }, [filtered])

  return (
    <div>
      <PageHeader
        title="Activity"
        subtitle="Every transaction across your PASX account."
      />

      {/* Summary chips */}
      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card className="!p-4">
          <p className="text-[12.5px] text-ink-3">Money in</p>
          <p className="mt-1 text-[20px] font-extrabold tabular-nums text-success">
            +{formatMoney(totals.inc)}
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-[12.5px] text-ink-3">Money out</p>
          <p className="mt-1 text-[20px] font-extrabold tabular-nums text-ink">
            {formatMoney(totals.out)}
          </p>
        </Card>
        <Card className="col-span-2 !p-4 sm:col-span-1">
          <p className="text-[12.5px] text-ink-3">Transactions</p>
          <p className="mt-1 text-[20px] font-extrabold tabular-nums text-ink">{filtered.length}</p>
        </Card>
      </div>

      <Card padded={false}>
        {/* Filter bar */}
        <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div className="relative">
            <Icon.Search
              width={18}
              height={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search transactions…"
              className="field !bg-surface-2 pl-11"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Type filter — segmented chips */}
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5">
              {TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setType(t.key)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-150 ease-out-strong ${
                    type === t.key
                      ? 'bg-accent text-white'
                      : 'bg-surface-2 text-ink-2 hover:text-ink'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Date range */}
            <div className="flex items-center gap-2">
              <Icon.Filter width={15} height={15} className="text-ink-3" />
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[13px] font-semibold text-ink focus-ring"
              >
                {RANGES.map((r) => (
                  <option key={r.key} value={r.key}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="px-5 py-2 sm:px-6">
          <TxTable rows={filtered} />
        </div>
      </Card>
    </div>
  )
}
