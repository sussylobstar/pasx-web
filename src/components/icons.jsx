// Lightweight inline icon set (stroke-based, inherits currentColor).
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = {
  Home: (p) => (
    <svg {...base} {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  ),
  Wallet: (p) => (
    <svg {...base} {...p}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v1" />
      <path d="M3 7.5V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6.5a2 2 0 0 0-2-2H5a2 2 0 0 1-2-2Z" />
      <circle cx="16.5" cy="13" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  History: (p) => (
    <svg {...base} {...p}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v3.5h3.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  Shield: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 7.5 7 9 4.1-1.5 7-4.7 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  User: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.5 3.1-5.5 7-5.5s7 2 7 5.5" />
    </svg>
  ),
  Settings: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V20a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H4a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 .9-1.4V4a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.4.9H20a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.4.9Z" />
    </svg>
  ),
  Sun: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  Moon: (p) => (
    <svg {...base} {...p}>
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
    </svg>
  ),
  Copy: (p) => (
    <svg {...base} {...p}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
    </svg>
  ),
  Check: (p) => (
    <svg {...base} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  ),
  Eye: (p) => (
    <svg {...base} {...p}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: (p) => (
    <svg {...base} {...p}>
      <path d="M3 3l18 18" />
      <path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-3 3.5M6.2 6.3A16 16 0 0 0 2.5 12s3.5 6 9.5 6a9.6 9.6 0 0 0 3.6-.7" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  ),
  ArrowUpRight: (p) => (
    <svg {...base} {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  ArrowDownLeft: (p) => (
    <svg {...base} {...p}>
      <path d="M17 7 7 17M16 17H7V8" />
    </svg>
  ),
  Plus: (p) => (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Send: (p) => (
    <svg {...base} {...p}>
      <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-8-8-4L21 3Z" />
    </svg>
  ),
  Swap: (p) => (
    <svg {...base} {...p}>
      <path d="M7 4 3.5 7.5 7 11" />
      <path d="M3.5 7.5H17a3.5 3.5 0 0 1 3.5 3.5" />
      <path d="M17 20l3.5-3.5L17 13" />
      <path d="M20.5 16.5H7A3.5 3.5 0 0 1 3.5 13" />
    </svg>
  ),
  Bell: (p) => (
    <svg {...base} {...p}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  ),
  Lock: (p) => (
    <svg {...base} {...p}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  ),
  Mail: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  Phone: (p) => (
    <svg {...base} {...p}>
      <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V18a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  ),
  Logout: (p) => (
    <svg {...base} {...p}>
      <path d="M15 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2" />
      <path d="M10 17 5 12l5-5M5 12h11" />
    </svg>
  ),
  Chevron: (p) => (
    <svg {...base} {...p}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  Trash: (p) => (
    <svg {...base} {...p}>
      <path d="M4 7h16M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2M6 7l1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7" />
    </svg>
  ),
  Filter: (p) => (
    <svg {...base} {...p}>
      <path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" />
    </svg>
  ),
  Search: (p) => (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  ),
  Card: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 9.5h18M6.5 14.5h4" />
    </svg>
  ),
  Spark: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  ),
}

export default Icon
