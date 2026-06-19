# PASX — Financial Platform Web App

A Revolut-inspired fintech web app for the PASX platform. Single-page application with
client-side routing, full light/dark mode, and realistic dummy data throughout.

**Brand accent:** `#0057D9`

## Stack

- **React 18** + **Vite 5**
- **React Router 6** — SPA routing
- **Tailwind CSS 3** — theming via CSS variables for smooth light/dark transitions
- **Framer Motion** — page transitions, staggered lists, press feedback, micro-interactions

## Run it

```bash
cd pasx
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

The demo starts at the **Login** page — credentials are prefilled, just press **Log in**
(auth is simulated and persisted in `localStorage`).

## Pages

| Route | Page |
| --- | --- |
| `/login` | Login (email, password, forgot-password + register links) |
| `/register` | Register (name, email, password, confirm, strength meter) |
| `/forgot-password` | Password reset request |
| `/app` | Dashboard — balance card, XRPL address, quick stats, recent activity |
| `/app/wallet` | Wallet — balance, XRPL address, status, transaction history |
| `/app/transactions` | Activity — full list with type/date filters and search |
| `/app/kyc` | KYC — step indicator, status, what & why |
| `/app/profile` | Profile — avatar, info, inline edit, status badges |
| `/app/settings` | Settings — theme, change password, notifications, deactivate |

## Design notes

- **Theme** — `light`/`dark` toggle in the top bar and Settings; persisted and respects
  system preference on first load. Surfaces are driven by CSS variables so the whole UI
  cross-fades smoothly when toggled. Dark mode uses deep charcoal (`#0B0C10`), never pure black.
- **Navigation** — sidebar on desktop, bottom nav on mobile, with a shared animated active pill.
- **Motion** — follows Emil Kowalski's framework: strong `cubic-bezier(0.23, 1, 0.32, 1)` ease-out,
  sub-300ms UI animations, `scale(0.97)` press feedback, staggered list entrances, and
  `prefers-reduced-motion` support.
- **Status badges** — green = verified/success, yellow = pending, red = rejected/failed.

All data lives in `src/data/mockData.js`.
