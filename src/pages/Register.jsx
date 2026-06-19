import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import Button from '../components/Button'
import { Field, PasswordField } from '../components/Field'
import Icon from '../components/icons'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const er = {}
    if (form.fullName.trim().length < 3) er.fullName = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Enter a valid email address.'
    if (form.password.length < 8) er.password = 'Use at least 8 characters.'
    if (form.confirm !== form.password) er.confirm = 'Passwords do not match.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      login()
      navigate('/app')
    }, 700)
  }

  // Password strength meter (0–4)
  const strength = (() => {
    const p = form.password
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()
  const strengthLabel = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['#DC2626', '#DC2626', '#D97706', '#16A34A', '#16A34A'][strength]

  return (
    <AuthShell title="Create your account" subtitle="Join PASX in under two minutes — it’s free.">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          id="fullName"
          label="Full name"
          icon={Icon.User}
          placeholder="Patrick Adeel"
          autoComplete="name"
          value={form.fullName}
          onChange={set('fullName')}
          error={errors.fullName}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          icon={Icon.Mail}
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
        />
        <div>
          <PasswordField
            id="password"
            label="Password"
            placeholder="Create a password"
            autoComplete="new-password"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
          />
          {form.password && !errors.password && (
            <div className="mt-2">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 flex-1 rounded-full bg-surface-2 transition-colors duration-300"
                    style={{ background: i < strength ? strengthColor : undefined }}
                  />
                ))}
              </div>
              <p className="mt-1 text-[12px] font-medium" style={{ color: strengthColor }}>
                {strengthLabel} password
              </p>
            </div>
          )}
        </div>
        <PasswordField
          id="confirm"
          label="Confirm password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={set('confirm')}
          error={errors.confirm}
        />

        <p className="pt-1 text-[12.5px] leading-relaxed text-ink-3">
          By creating an account you agree to PASX’s{' '}
          <span className="font-semibold text-ink-2">Terms of Service</span> and{' '}
          <span className="font-semibold text-ink-2">Privacy Policy</span>.
        </p>

        <Button type="submit" size="lg" full disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-7 text-center text-[14.5px] text-ink-2">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-accent hover:text-accent-hover focus-ring rounded">
          Log in
        </Link>
      </p>
    </AuthShell>
  )
}
