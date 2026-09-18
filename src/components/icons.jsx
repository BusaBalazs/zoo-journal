// A small hand-picked set of monoline icons, drawn to match the
// field-journal aesthetic instead of pulling in an icon library.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconHome({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10.5V20h12v-9.5" />
      <path d="M10 20v-5.5h4V20" />
    </svg>
  )
}

export function IconCompass({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M14.6 9.4 13 13l-3.6 1.6L11 11l3.6-1.6Z" />
    </svg>
  )
}

export function IconBook({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 5.2c1.8-.9 4.3-.9 6 0v13.6c-1.7-.9-4.2-.9-6 0Z" />
      <path d="M20 5.2c-1.8-.9-4.3-.9-6 0v13.6c1.7-.9 4.2-.9 6 0Z" />
    </svg>
  )
}

export function IconPaw({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <ellipse cx="12" cy="16.2" rx="4.6" ry="3.6" />
      <ellipse cx="6.3" cy="10.6" rx="1.7" ry="2.2" />
      <ellipse cx="17.7" cy="10.6" rx="1.7" ry="2.2" />
      <ellipse cx="9.3" cy="7.3" rx="1.5" ry="2" />
      <ellipse cx="14.7" cy="7.3" rx="1.5" ry="2" />
    </svg>
  )
}

export function IconCamera({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 8.5c0-.8.6-1.4 1.4-1.4h2l1-1.6h7l1 1.6h2.2c.8 0 1.4.6 1.4 1.4V18c0 .8-.6 1.4-1.4 1.4H5.4C4.6 19.4 4 18.8 4 18Z" />
      <circle cx="12" cy="12.7" r="3.3" />
    </svg>
  )
}

export function IconLeaf({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 18c-1.2-6.4 2.6-11.6 12-12 .6 9-4.4 13-12 12Z" />
      <path d="M6.5 17.5 15 9" />
    </svg>
  )
}

export function IconPin({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 21s6.5-6.1 6.5-11.2a6.5 6.5 0 1 0-13 0C5.5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.7" r="2.1" />
    </svg>
  )
}

export function IconClock({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.6V12l3 2" />
    </svg>
  )
}

export function IconCheck({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 12.5 9.5 17 19 7" />
    </svg>
  )
}

export function IconArrowLeft({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  )
}

export function IconChevronRight({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9.5 5 16.5 12l-7 7" />
    </svg>
  )
}

export function IconQr({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M15 15h2.2v2.2H15zM18.5 15h1.5M15 18.5h1.5M18.7 18.7h.8" />
    </svg>
  )
}

export function IconPlus({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  )
}

export function IconX({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function IconEdit({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 19.2 5.6 16 15.8 5.8a1.7 1.7 0 0 1 2.4 2.4L8 18.4l-3.2.8Z" />
    </svg>
  )
}
