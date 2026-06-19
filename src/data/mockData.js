// ---------------------------------------------------------------------------
// PASX mock data — realistic dummy data used across the whole app.
// ---------------------------------------------------------------------------

export const currentUser = {
  firstName: 'Patrick',
  lastName: 'Adeel',
  fullName: 'Patrick Adeel',
  email: 'patrick.adeel@gmail.com',
  phone: '+44 7700 900812',
  country: 'United Kingdom',
  memberSince: 'March 2024',
  avatar: null, // fall back to initials
  accountStatus: 'active', // active | restricted | closed
  kycStatus: 'verified', // verified | pending | rejected | unstarted
  walletStatus: 'active', // active | frozen | pending
  xrplAddress: 'rPb6Hq9k2mZxL4tVgN8sJ7yC3wD1eA5fT',
  plan: 'PASX Metal',
}

export const balance = {
  currency: 'USD',
  symbol: '$',
  available: 18452.76,
  pending: 240.0,
  // 7-point sparkline for the balance card
  trend: [12880, 13420, 13110, 15240, 14980, 17320, 18452],
  changePct: 4.32,
}

export const assets = [
  { code: 'USD', name: 'US Dollar', amount: 9240.12, fiat: 9240.12, icon: '$', tint: '#2E7D32' },
  { code: 'XRP', name: 'Ripple', amount: 11200.0, fiat: 6832.0, icon: 'XRP', tint: '#23292F' },
  { code: 'GBP', name: 'Pound Sterling', amount: 1860.44, fiat: 2380.64, icon: '£', tint: '#6A1B9A' },
]

const tx = (id, date, description, type, amount, status, channel) => ({
  id,
  date,
  description,
  type, // deposit | withdrawal | transfer | payment | exchange
  amount,
  status, // completed | pending | failed
  channel,
})

export const transactions = [
  tx('TXN-9F2A41', '2026-06-17T14:22:00', 'Salary — Helio Labs Ltd', 'deposit', 4200.0, 'completed', 'Bank transfer'),
  tx('TXN-9E11C7', '2026-06-17T09:05:00', 'Spotify Premium', 'payment', -10.99, 'completed', 'Card'),
  tx('TXN-9D87B0', '2026-06-16T19:48:00', 'Sent to Daniel Mensah', 'transfer', -150.0, 'completed', 'PASX P2P'),
  tx('TXN-9C40FE', '2026-06-16T11:30:00', 'XRP → USD exchange', 'exchange', 612.4, 'completed', 'Exchange'),
  tx('TXN-9B02A9', '2026-06-15T16:12:00', 'Whole Foods Market', 'payment', -84.27, 'completed', 'Card'),
  tx('TXN-9A98D3', '2026-06-15T08:00:00', 'Withdrawal to Barclays ••2241', 'withdrawal', -1000.0, 'pending', 'Bank transfer'),
  tx('TXN-99F1B5', '2026-06-14T21:39:00', 'Top-up from Visa ••5589', 'deposit', 500.0, 'completed', 'Card'),
  tx('TXN-98AA20', '2026-06-14T13:15:00', 'Uber Trip', 'payment', -23.4, 'completed', 'Card'),
  tx('TXN-9711EE', '2026-06-13T10:02:00', 'Received from Lina Park', 'transfer', 320.0, 'completed', 'PASX P2P'),
  tx('TXN-9650C1', '2026-06-12T18:55:00', 'Amazon UK', 'payment', -142.8, 'completed', 'Card'),
  tx('TXN-95DD74', '2026-06-12T07:41:00', 'Withdrawal to Revolut', 'withdrawal', -260.0, 'failed', 'Bank transfer'),
  tx('TXN-94BC09', '2026-06-11T15:20:00', 'USD → XRP exchange', 'exchange', -800.0, 'completed', 'Exchange'),
  tx('TXN-93A8F6', '2026-06-10T12:09:00', 'Netflix', 'payment', -15.49, 'completed', 'Card'),
  tx('TXN-92FE31', '2026-06-09T17:33:00', 'Sent to Mom', 'transfer', -400.0, 'completed', 'PASX P2P'),
  tx('TXN-91C7AD', '2026-06-08T09:50:00', 'Freelance — Brightpixel', 'deposit', 1250.0, 'completed', 'Bank transfer'),
]

export const stats = {
  totalTransactions: 1284,
  thisMonthTransactions: 38,
  totalSent: 9420.55,
  totalReceived: 16280.0,
}

export const kyc = {
  status: 'verified', // verified | pending | rejected | unstarted
  level: 2,
  steps: [
    { key: 'email', label: 'Email verification', status: 'done' },
    { key: 'identity', label: 'Identity document', status: 'done' },
    { key: 'selfie', label: 'Liveness & selfie', status: 'done' },
    { key: 'address', label: 'Proof of address', status: 'done' },
  ],
  submittedOn: '2024-03-22',
  verifiedOn: '2024-03-23',
}

export const notifications = {
  transactionAlerts: true,
  productUpdates: false,
  securityAlerts: true,
  marketingEmails: false,
  weeklySummary: true,
}

// Notification feed shown in the header bell dropdown.
// `kind` drives the icon + tint in the NotificationsMenu component.
export const notificationFeed = [
  {
    id: 'n1',
    kind: 'received',
    title: 'Money received',
    body: 'You received $4,200.00 from Helio Labs Ltd',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 'n2',
    kind: 'kyc',
    title: 'Identity verified',
    body: 'Your KYC verification is complete. You now have full access.',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 'n3',
    kind: 'security',
    title: 'New login detected',
    body: 'A new login was detected from Lagos, Nigeria.',
    time: '3 hours ago',
    unread: false,
  },
  {
    id: 'n4',
    kind: 'sent',
    title: 'Payment sent',
    body: 'Your payment of $10.99 to Spotify Premium was successful.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'n5',
    kind: 'system',
    title: 'Welcome to PASX',
    body: 'Your account is set up and ready to use.',
    time: '3 days ago',
    unread: false,
  },
]

export const formatMoney = (value, currency = 'USD') => {
  const sign = value < 0 ? '-' : ''
  const abs = Math.abs(value)
  return `${sign}${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(abs)}`
}

export const formatDate = (iso, withTime = false) => {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  if (!withTime) return date
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  return `${date} · ${time}`
}

export const truncateAddress = (addr, head = 6, tail = 4) =>
  addr ? `${addr.slice(0, head)}…${addr.slice(-tail)}` : ''
