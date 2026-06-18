import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AuthShell from '../components/AuthShell'
import Button from '../components/Button'
import { Field } from '../components/Field'
import Icon from '../components/icons'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 700)
  }

  return (
    <AuthShell
      title={sent ? 'Check your inbox' : 'Reset your password'}
      subtitle={
        sent
          ? `We’ve sent a recovery link to ${email}.`
          : 'Enter the email linked to your account and we’ll send you a reset link.'
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-success-soft text-success">
              <Icon.Mail width={28} height={28} />
            </div>
            <div className="rounded-xl border border-line bg-surface-2 p-4 text-[14px] text-ink-2">
              Didn’t get the email? Check your spam folder, or{' '}
              <button
                onClick={() => setSent(false)}
                className="font-semibold text-accent hover:text-accent-hover focus-ring rounded"
              >
                try another address
              </button>
              .
            </div>
            <Button as="a" href="/login" size="lg" full variant="secondary">
              Back to login
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
            onSubmit={onSubmit}
            className="space-y-5"
          >
            <Field
              id="email"
              label="Email"
              type="email"
              icon={Icon.Mail}
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" size="lg" full disabled={loading}>
              {loading ? 'Sending…' : 'Send reset link'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="mt-7 text-center text-[14.5px] text-ink-2">
        Remembered it?{' '}
        <Link to="/login" className="font-semibold text-accent hover:text-accent-hover focus-ring rounded">
          Back to login
        </Link>
      </p>
    </AuthShell>
  )
}
