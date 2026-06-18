import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AppLayout from './components/AppLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Wallet from './pages/Wallet'
import Transactions from './pages/Transactions'
import KYC from './pages/KYC'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function RequireAuth({ children }) {
  const { isAuthed } = useAuth()
  const location = useLocation()
  if (!isAuthed) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

function PublicOnly({ children }) {
  const { isAuthed } = useAuth()
  if (isAuthed) return <Navigate to="/app" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Public / auth */}
      <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
      <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
      <Route path="/forgot-password" element={<PublicOnly><ForgotPassword /></PublicOnly>} />

      {/* Authenticated app shell */}
      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="kyc" element={<KYC />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Defaults */}
      <Route path="/" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  )
}
