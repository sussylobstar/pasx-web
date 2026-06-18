// Status badges — green = verified/success, yellow = pending, red = rejected/failed.
const map = {
  // success
  verified: { label: 'Verified', tone: 'success' },
  active: { label: 'Active', tone: 'success' },
  completed: { label: 'Completed', tone: 'success' },
  done: { label: 'Done', tone: 'success' },
  // warning
  pending: { label: 'Pending', tone: 'warning' },
  processing: { label: 'Processing', tone: 'warning' },
  unstarted: { label: 'Not started', tone: 'neutral' },
  restricted: { label: 'Restricted', tone: 'warning' },
  frozen: { label: 'Frozen', tone: 'warning' },
  // danger
  rejected: { label: 'Rejected', tone: 'danger' },
  failed: { label: 'Failed', tone: 'danger' },
  closed: { label: 'Closed', tone: 'danger' },
}

const tones = {
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  neutral: 'bg-surface-2 text-ink-2',
}

export default function StatusBadge({ status, label, dot = true, className = '' }) {
  const cfg = map[status] || { label: label || status, tone: 'neutral' }
  const tone = cfg.tone
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            tone === 'success'
              ? 'bg-success'
              : tone === 'warning'
                ? 'bg-warning'
                : tone === 'danger'
                  ? 'bg-danger'
                  : 'bg-ink-3'
          }`}
        />
      )}
      {label || cfg.label}
    </span>
  )
}
