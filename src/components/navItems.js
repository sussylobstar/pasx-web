import Icon from './icons'

export const navItems = [
  { to: '/app', label: 'Home', icon: Icon.Home, end: true },
  { to: '/app/wallet', label: 'Wallet', icon: Icon.Wallet },
  { to: '/app/transactions', label: 'Activity', icon: Icon.History },
  { to: '/app/kyc', label: 'KYC', icon: Icon.Shield },
  { to: '/app/profile', label: 'Profile', icon: Icon.User },
  { to: '/app/settings', label: 'Settings', icon: Icon.Settings },
]

// Mobile bottom-nav shows the 5 most-used destinations.
export const bottomNavItems = [
  { to: '/app', label: 'Home', icon: Icon.Home, end: true },
  { to: '/app/wallet', label: 'Wallet', icon: Icon.Wallet },
  { to: '/app/transactions', label: 'Activity', icon: Icon.History },
  { to: '/app/kyc', label: 'KYC', icon: Icon.Shield },
  { to: '/app/profile', label: 'Profile', icon: Icon.User },
]
