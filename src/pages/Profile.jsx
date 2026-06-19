import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import { Field } from '../components/Field'
import Icon from '../components/icons'
import { useAuth } from '../context/AuthContext'

function InfoRow({ icon: IconCmp, label, value }) {
  return (
    <div className="flex items-center gap-3.5 py-3.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink-2">
        <IconCmp width={18} height={18} />
      </span>
      <div className="min-w-0">
        <p className="text-[12.5px] font-medium text-ink-3">{label}</p>
        <p className="truncate text-[15px] font-semibold text-ink">{value}</p>
      </div>
    </div>
  )
}

export default function Profile() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  })

  const save = (e) => {
    e.preventDefault()
    updateUser({
      ...draft,
      fullName: `${draft.firstName} ${draft.lastName}`.trim(),
    })
    setEditing(false)
  }

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your personal information and account." />

      {/* Identity header */}
      <Card className="overflow-hidden" padded={false}>
        <div
          className="h-24 w-full"
          style={{ background: 'linear-gradient(120deg, #0057D9, #002E7A)' }}
        />
        <div className="px-5 pb-5 sm:px-6">
          <div className="-mt-10 flex items-end justify-between">
            <div className="rounded-full p-1.5 bg-surface">
              <Avatar user={user} size={78} className="!text-2xl ring-2 ring-surface" />
            </div>
            {!editing && (
              <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
                <Icon.User width={15} height={15} /> Edit profile
              </Button>
            )}
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-extrabold tracking-tight text-ink">{user.fullName}</h2>
            <p className="text-[14px] text-ink-2">{user.email}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={user.accountStatus} label={`Account · ${user.accountStatus}`} />
              <StatusBadge status={user.kycStatus} label={`KYC · ${user.kycStatus}`} />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                <Icon.Spark width={12} height={12} /> {user.plan}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Personal information */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-ink">Personal information</h3>
            {editing && (
              <span className="text-[12px] font-semibold text-accent">Editing</span>
            )}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {editing ? (
              <motion.form
                key="edit"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                onSubmit={save}
                className="mt-5 space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="firstName"
                    label="First name"
                    value={draft.firstName}
                    onChange={(e) => setDraft((d) => ({ ...d, firstName: e.target.value }))}
                  />
                  <Field
                    id="lastName"
                    label="Last name"
                    value={draft.lastName}
                    onChange={(e) => setDraft((d) => ({ ...d, lastName: e.target.value }))}
                  />
                </div>
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  icon={Icon.Mail}
                  value={draft.email}
                  onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                />
                <Field
                  id="phone"
                  label="Phone"
                  icon={Icon.Phone}
                  value={draft.phone}
                  onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                />
                <div className="flex gap-3 pt-1">
                  <Button type="submit">Save changes</Button>
                  <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 divide-y divide-line"
              >
                <InfoRow icon={Icon.User} label="Full name" value={user.fullName} />
                <InfoRow icon={Icon.Mail} label="Email address" value={user.email} />
                <InfoRow icon={Icon.Phone} label="Phone number" value={user.phone} />
                <InfoRow icon={Icon.Home} label="Country" value={user.country} />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Side meta */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-[15px] font-bold text-ink">Account status</h3>
            <div className="mt-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-ink-2">Status</span>
                <StatusBadge status={user.accountStatus} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-ink-2">KYC</span>
                <StatusBadge status={user.kycStatus} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-ink-2">Member since</span>
                <span className="text-[14px] font-semibold text-ink">{user.memberSince}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-ink-2">Plan</span>
                <span className="text-[14px] font-semibold text-accent">{user.plan}</span>
              </div>
            </div>
          </Card>

          {/* Log out — works on every screen size (sidebar is hidden on mobile) */}
          <Button
            variant="secondary"
            full
            size="lg"
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="!text-danger hover:!bg-danger-soft"
          >
            <Icon.Logout width={18} height={18} /> Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
