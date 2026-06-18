import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import Icon from '../components/icons'
import { useAuth } from '../context/AuthContext'
import { kyc } from '../data/mockData'

const statusCopy = {
  verified: {
    title: 'You’re verified',
    body: 'Your identity has been confirmed. You have full access to PASX, including higher limits and withdrawals.',
    tone: 'success',
  },
  pending: {
    title: 'Verification in review',
    body: 'We’re reviewing your documents. This usually takes a few minutes but can take up to 24 hours.',
    tone: 'warning',
  },
  rejected: {
    title: 'Verification failed',
    body: 'We couldn’t verify your identity. Please review the requirements and resubmit your documents.',
    tone: 'danger',
  },
  unstarted: {
    title: 'Verify your identity',
    body: 'Complete a quick verification to unlock deposits, withdrawals and higher limits.',
    tone: 'neutral',
  },
}

function StepDot({ step, index, total }) {
  const done = step.status === 'done'
  const active = step.status === 'active'
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex w-full items-center">
        <span className={`h-0.5 flex-1 ${index === 0 ? 'bg-transparent' : done || active ? 'bg-accent' : 'bg-line'}`} />
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[13px] font-bold ${
            done
              ? 'bg-accent text-white shadow-glow'
              : active
                ? 'border-2 border-accent bg-surface text-accent'
                : 'border border-line bg-surface text-ink-3'
          }`}
        >
          {done ? <Icon.Check width={16} height={16} /> : index + 1}
        </motion.span>
        <span className={`h-0.5 flex-1 ${index === total - 1 ? 'bg-transparent' : done ? 'bg-accent' : 'bg-line'}`} />
      </div>
      <p
        className={`mt-2 max-w-[90px] text-center text-[11.5px] font-medium leading-tight ${
          done || active ? 'text-ink' : 'text-ink-3'
        }`}
      >
        {step.label}
      </p>
    </div>
  )
}

export default function KYC() {
  const { user } = useAuth()
  const status = user.kycStatus
  const copy = statusCopy[status] || statusCopy.unstarted
  const doneCount = kyc.steps.filter((s) => s.status === 'done').length
  const pct = Math.round((doneCount / kyc.steps.length) * 100)

  return (
    <div>
      <PageHeader
        title="Identity verification"
        subtitle="Know Your Customer (KYC) keeps your account and money secure."
      />

      {/* Status banner */}
      <Card
        className="relative overflow-hidden"
        style={{
          background:
            status === 'verified'
              ? 'linear-gradient(120deg, rgba(22,163,74,0.10), transparent)'
              : undefined,
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
                copy.tone === 'success'
                  ? 'bg-success-soft text-success'
                  : copy.tone === 'warning'
                    ? 'bg-warning-soft text-warning'
                    : copy.tone === 'danger'
                      ? 'bg-danger-soft text-danger'
                      : 'bg-accent-soft text-accent'
              }`}
            >
              <Icon.Shield width={24} height={24} />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-ink">{copy.title}</h2>
                <StatusBadge status={status} />
              </div>
              <p className="mt-1 max-w-xl text-[14px] text-ink-2">{copy.body}</p>
            </div>
          </div>
          {status !== 'verified' && (
            <Button className="shrink-0">
              {status === 'pending' ? 'Check status' : status === 'rejected' ? 'Resubmit' : 'Start verification'}
            </Button>
          )}
        </div>
      </Card>

      {/* Step indicator */}
      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-ink">Verification progress</h3>
          <span className="text-[13px] font-semibold text-ink-2">{pct}% complete</span>
        </div>

        {/* progress bar */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>

        <div className="mt-7 flex items-start">
          {kyc.steps.map((s, i) => (
            <StepDot key={s.key} step={s} index={i} total={kyc.steps.length} />
          ))}
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-surface-2 p-4 text-[13px] sm:grid-cols-2">
          <div className="flex items-center justify-between sm:justify-start sm:gap-2">
            <span className="text-ink-3">Verification level</span>
            <span className="font-semibold text-ink">Level {kyc.level} · Full access</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start sm:gap-2">
            <span className="text-ink-3">Submitted</span>
            <span className="font-semibold text-ink">{kyc.submittedOn}</span>
          </div>
        </div>
      </Card>

      {/* What & why */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h3 className="text-[15px] font-bold text-ink">What is KYC?</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
            KYC (Know Your Customer) is the process of verifying your identity. You’ll provide a
            government-issued ID, a quick selfie for liveness, and proof of address. It typically
            takes under 5 minutes.
          </p>
        </Card>
        <Card>
          <h3 className="text-[15px] font-bold text-ink">Why it’s needed</h3>
          <ul className="mt-2 space-y-2.5">
            {[
              'Protects your account against fraud and theft',
              'Required by financial regulations worldwide',
              'Unlocks higher limits, withdrawals and exchange',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] text-ink-2">
                <Icon.Check width={17} height={17} className="mt-0.5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
