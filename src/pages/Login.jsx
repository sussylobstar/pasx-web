import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import Button from '../components/Button'
import { Field, PasswordField } from '../components/Field'
import Icon from '../components/icons'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('patrick.adeel@gmail.com')
  const [password, setPassword] = useState('password123')
  const [loading, setLoading] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulated auth — accepts the prefilled demo credentials.
    setTimeout(() => {
      login()
      navigate('/app')
    }, 650)
  }

  return (
    <AuthShell title="Welcome back" subtitle="Log in to your PASX account to continue.">
      <form onSubmit={onSubmit} className="space-y-4">
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
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-[13px] font-semibold text-ink-2">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-[13px] font-semibold text-accent hover:text-accent-hover focus-ring rounded"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordField
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <label className="flex cursor-pointer select-none items-center gap-2.5 pt-1 text-[14px] text-ink-2">
          <input type="checkbox" defaultChecked className="peer sr-only" />
          <span
            className="grid h-5 w-5 place-items-center rounded-md border border-line bg-surface-2
              transition-colors duration-150 peer-checked:border-accent peer-checked:bg-accent
              peer-checked:text-white text-transparent"
          >
            <Icon.Check width={13} height={13} />
          </span>
          Keep me signed in
        </label>

        <Button type="submit" size="lg" full disabled={loading}>
          {loading ? 'Signing in…' : 'Log in'}
        </Button>
      </form>

      <p className="mt-7 text-center text-[14.5px] text-ink-2">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-accent hover:text-accent-hover focus-ring rounded">
          Create one
        </Link>
      </p>

    </AuthShell>
  )
}
