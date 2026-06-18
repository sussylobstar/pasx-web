import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import Button from '../components/Button'
import Toggle from '../components/Toggle'
import ThemeToggle from '../components/ThemeToggle'
import { PasswordField } from '../components/Field'
import Icon from '../components/icons'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { notifications as defaultPrefs } from '../data/mockData'

function Section({ title, desc, icon: IconCmp, children }) {
  return (
    <Card>
      <div className="flex items-start gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <IconCmp width={19} height={19} />
        </span>
        <div className="flex-1">
          <h3 className="text-[15px] font-bold text-ink">{title}</h3>
          {desc && <p className="mt-0.5 text-[13px] text-ink-2">{desc}</p>}
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </Card>
  )
}

const prefMeta = {
  transactionAlerts: { label: 'Transaction alerts', desc: 'Get notified for every payment and transfer.' },
  securityAlerts: { label: 'Security alerts', desc: 'Logins, password changes and suspicious activity.' },
  weeklySummary: { label: 'Weekly summary', desc: 'A digest of your spending every Monday.' },
  productUpdates: { label: 'Product updates', desc: 'New features and improvements.' },
  marketingEmails: { label: 'Marketing emails', desc: 'Offers, promotions and partner news.' },
}

export default function Settings() {
  const { logout } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState(defaultPrefs)
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' })
  const [saved, setSaved] = useState(false)
  const [confirmDeactivate, setConfirmDeactivate] = useState(false)

  const savePassword = (e) => {
    e.preventDefault()
    setSaved(true)
    setPwd({ current: '', next: '', confirm: '' })
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage security, notifications and your account." />

      <div className="grid gap-6">
        {/* Appearance */}
        <Section title="Appearance" desc="Switch between light and dark mode." icon={Icon.Sun}>
          <div className="flex items-center justify-between rounded-xl border border-line bg-surface-2 px-4 py-3">
            <div>
              <p className="text-[14px] font-semibold text-ink">Theme</p>
              <p className="text-[12.5px] text-ink-3 capitalize">Currently {theme} mode</p>
            </div>
            <ThemeToggle />
          </div>
        </Section>

        {/* Change password */}
        <Section title="Change password" desc="Use a strong, unique password." icon={Icon.Lock}>
          <form onSubmit={savePassword} className="space-y-4">
            <PasswordField
              id="current"
              label="Current password"
              placeholder="••••••••"
              value={pwd.current}
              onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <PasswordField
                id="next"
                label="New password"
                placeholder="At least 8 characters"
                value={pwd.next}
                onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
              />
              <PasswordField
                id="confirmpwd"
                label="Confirm new password"
                placeholder="Re-enter new password"
                value={pwd.confirm}
                onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit">Update password</Button>
              <AnimatePresence>
                {saved && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-success"
                  >
                    <Icon.Check width={16} height={16} /> Password updated
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Section>

        {/* Notifications */}
        <Section
          title="Notification preferences"
          desc="Choose what PASX can notify you about."
          icon={Icon.Bell}
        >
          <div className="divide-y divide-line">
            {Object.keys(prefMeta).map((key) => (
              <div key={key} className="flex items-center justify-between gap-4 py-3.5">
                <div>
                  <p className="text-[14px] font-semibold text-ink">{prefMeta[key].label}</p>
                  <p className="text-[12.5px] text-ink-3">{prefMeta[key].desc}</p>
                </div>
                <Toggle
                  checked={prefs[key]}
                  onChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))}
                  label={prefMeta[key].label}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Danger zone */}
        <Card className="border-danger/30">
          <div className="flex items-start gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-danger-soft text-danger">
              <Icon.Trash width={19} height={19} />
            </span>
            <div className="flex-1">
              <h3 className="text-[15px] font-bold text-ink">Deactivate account</h3>
              <p className="mt-0.5 max-w-lg text-[13px] text-ink-2">
                Deactivating suspends your PASX account and hides your profile. You can reactivate by
                logging back in within 30 days, after which data is permanently deleted.
              </p>

              <div className="mt-4">
                <AnimatePresence mode="wait" initial={false}>
                  {confirmDeactivate ? (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      className="flex flex-col gap-3 rounded-xl border border-danger/30 bg-danger-soft/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="text-[13.5px] font-medium text-ink">
                        Are you sure? This will sign you out immediately.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            logout()
                            navigate('/login')
                          }}
                        >
                          Yes, deactivate
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setConfirmDeactivate(false)}>
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="trigger" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Button variant="danger" onClick={() => setConfirmDeactivate(true)}>
                        Deactivate account
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
