import { useState } from 'react'
import Icon from './icons'

export function Field({ label, icon: IconCmp, hint, error, id, ...props }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink-2">
          {label}
        </label>
      )}
      <div className="relative">
        {IconCmp && (
          <IconCmp
            width={18}
            height={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3"
          />
        )}
        <input
          id={id}
          className={`field ${IconCmp ? 'pl-11' : ''} ${
            error ? 'border-danger/60 focus:border-danger/60' : ''
          }`}
          {...props}
        />
      </div>
      {error ? (
        <p className="mt-1.5 text-[12.5px] font-medium text-danger">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[12.5px] text-ink-3">{hint}</p>
      ) : null}
    </div>
  )
}

export function PasswordField({ label, icon: IconCmp = Icon.Lock, id, error, hint, ...props }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink-2">
          {label}
        </label>
      )}
      <div className="relative">
        {IconCmp && (
          <IconCmp
            width={18}
            height={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3"
          />
        )}
        <input
          id={id}
          type={show ? 'text' : 'password'}
          className={`field pl-11 pr-11 ${error ? 'border-danger/60 focus:border-danger/60' : ''}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center
            rounded-lg text-ink-3 transition-colors duration-150 ease-out-strong hover:bg-surface-2
            hover:text-ink active:scale-95 focus-ring"
        >
          {show ? <Icon.EyeOff width={17} height={17} /> : <Icon.Eye width={17} height={17} />}
        </button>
      </div>
      {error ? (
        <p className="mt-1.5 text-[12.5px] font-medium text-danger">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[12.5px] text-ink-3">{hint}</p>
      ) : null}
    </div>
  )
}
