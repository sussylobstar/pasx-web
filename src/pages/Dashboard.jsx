import { Link } from 'react-router-dom'
import Card from '../components/Card'
import BalanceCard from '../components/BalanceCard'
import StatusBadge from '../components/StatusBadge'
import TransactionRow from '../components/TransactionRow'
import Icon from '../components/icons'
import { StaggerList, StaggerItem } from '../components/Stagger'
import { useAuth } from '../context/AuthContext'
import { transactions, stats, assets, formatMoney } from '../data/mockData'

export default function Dashboard() {
  const { user } = useAuth()
  const recent = transactions.slice(0, 5)
  const hour = 14 // deterministic demo greeting
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[28px]">
          {greeting}, {user.firstName}
        </h1>
        <p className="mt-1 text-[15px] text-ink-2">Here’s what’s happening with your money today.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BalanceCard user={user} />
        </div>

        {/* Quick stats */}
        <StaggerList className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          <StaggerItem>
            <Card className="h-full">
              <div className="flex items-center gap-2 text-ink-3">
                <Icon.History width={16} height={16} />
                <span className="text-[13px] font-semibold">Total transactions</span>
              </div>
              <p className="mt-2 text-[26px] font-extrabold tabular-nums text-ink">
                {stats.totalTransactions.toLocaleString()}
              </p>
              <p className="mt-0.5 text-[13px] text-ink-3">
                {stats.thisMonthTransactions} this month
              </p>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card className="h-full">
              <div className="flex items-center gap-2 text-ink-3">
                <Icon.Shield width={16} height={16} />
                <span className="text-[13px] font-semibold">KYC status</span>
              </div>
              <div className="mt-3">
                <StatusBadge status={user.kycStatus} />
              </div>
              <Link
                to="/app/kyc"
                className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:text-accent-hover"
              >
                View details <Icon.Chevron width={14} height={14} />
              </Link>
            </Card>
          </StaggerItem>
        </StaggerList>
      </div>

      {/* Assets + recent activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-ink">Your assets</h3>
            <Icon.Spark width={16} height={16} className="text-ink-3" />
          </div>
          <div className="mt-4 space-y-1">
            {assets.map((a) => (
              <div key={a.code} className="flex items-center gap-3 py-2">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white"
                  style={{ background: a.tint }}
                >
                  {a.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-ink">{a.name}</p>
                  <p className="text-[12.5px] text-ink-3">
                    {a.amount.toLocaleString()} {a.code}
                  </p>
                </div>
                <p className="text-[14px] font-bold tabular-nums text-ink">{formatMoney(a.fiat)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2" padded={false}>
          <div className="flex items-center justify-between px-5 pt-5 sm:px-6">
            <h3 className="text-[15px] font-bold text-ink">Recent activity</h3>
            <Link
              to="/app/transactions"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent hover:text-accent-hover focus-ring rounded"
            >
              See all <Icon.Chevron width={14} height={14} />
            </Link>
          </div>
          <StaggerList className="mt-1 divide-y divide-line px-5 pb-3 sm:px-6">
            {recent.map((t) => (
              <StaggerItem key={t.id}>
                <TransactionRow t={t} />
              </StaggerItem>
            ))}
          </StaggerList>
        </Card>
      </div>
    </div>
  )
}
