import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import BalanceCard from '../components/BalanceCard'
import StatusBadge from '../components/StatusBadge'
import CopyButton from '../components/CopyButton'
import TxTable from '../components/TxTable'
import Icon from '../components/icons'
import { useAuth } from '../context/AuthContext'
import { transactions, balance, formatMoney } from '../data/mockData'

export default function Wallet() {
  const { user } = useAuth()

  return (
    <div>
      <PageHeader title="Wallet" subtitle="Your XRPL-backed balance and full transaction history." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BalanceCard user={user} />
        </div>

        {/* Wallet meta */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink">Wallet details</h3>
              <StatusBadge status={user.walletStatus} />
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wide text-ink-3">
                  XRPL Address
                </p>
                <div className="mt-1.5 flex items-center justify-between gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2.5">
                  <span className="truncate font-mono text-[13px] text-ink">{user.xrplAddress}</span>
                  <CopyButton value={user.xrplAddress} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[12px] text-ink-3">Available</p>
                  <p className="mt-0.5 text-[16px] font-bold tabular-nums text-ink">
                    {formatMoney(balance.available)}
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[12px] text-ink-3">Pending</p>
                  <p className="mt-0.5 text-[16px] font-bold tabular-nums text-ink">
                    {formatMoney(balance.pending)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-success-soft px-3 py-2.5 text-[12.5px] font-medium text-success">
            <Icon.Shield width={15} height={15} />
            Secured on the XRP Ledger
          </div>
        </Card>
      </div>

      {/* Transaction history */}
      <Card className="mt-6" padded={false}>
        <div className="flex items-center justify-between px-5 pb-2 pt-5 sm:px-6">
          <h3 className="text-[15px] font-bold text-ink">Transaction history</h3>
          <span className="text-[13px] text-ink-3">{transactions.length} transactions</span>
        </div>
        <div className="px-5 pb-4 sm:px-6">
          <TxTable rows={transactions} />
        </div>
      </Card>
    </div>
  )
}
