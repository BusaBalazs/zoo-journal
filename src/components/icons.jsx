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

export function IconDots({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="5.5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="18.5" cy="12" r="1.6" />
    </svg>
  )
}

export function IconShield({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 4 5 6.6v5.2c0 4.6 3 7.6 7 8.6 4-1 7-4 7-8.6V6.6Z" />
      <path d="m9.2 12 1.9 1.9 3.7-3.9" />
    </svg>
  )
}

export function IconWalk({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="14.2" cy="5.4" r="1.7" fill="currentColor" stroke="none" />
      <path d="M12.5 9 9.5 11l1 4-3 5M12.5 9l3 1.5.8 4.5 3 3.5M9.5 11l3.4 1" />
    </svg>
  )
}

export function IconFork({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M8 4v6a2 2 0 0 0 4 0V4M10 10v10M16 4c-1.4 0-2.4 1.6-2.4 4.4 0 2 .9 3.3 2.4 3.6V20" />
    </svg>
  )
}

export function IconEye({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3.5 12S7 6 12 6s8.5 6 8.5 6-3.5 6-8.5 6-8.5-6-8.5-6Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  )
}

export function IconSparkle({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 4.5c.6 3 1.9 4.3 4.9 4.9-3 .6-4.3 1.9-4.9 4.9-.6-3-1.9-4.3-4.9-4.9 3-.6 4.3-1.9 4.9-4.9Z" />
      <path d="M18.5 15.5c.3 1.4.9 2 2.3 2.3-1.4.3-2 .9-2.3 2.3-.3-1.4-.9-2-2.3-2.3 1.4-.3 2-.9 2.3-2.3Z" />
    </svg>
  )
}

export function IconSearch({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m19.5 19.5-4-4" />
    </svg>
  )
}

export function IconHeart({ className = 'w-5 h-5', filled = false }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} fill={filled ? 'currentColor' : 'none'}>
      <path d="M12 20s-7.4-4.5-9.7-9C.7 7.4 2.5 4 6 4c2 0 3.5 1.1 6 3.7C14.5 5.1 16 4 18 4c3.5 0 5.3 3.4 3.7 7-2.3 4.5-9.7 9-9.7 9Z" />
    </svg>
  )
}

export function IconQuestion({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.4a2.4 2.4 0 1 1 3.4 2.2c-.9.5-1 1-1 1.9" />
      <circle cx="12" cy="16.8" r="0.15" fill="currentColor" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function IconBulb({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9 17.5h6M9.8 20h4.4" />
      <path d="M12 3.5a5.8 5.8 0 0 0-3.4 10.5c.6.5.9 1 .9 1.7h5a2 2 0 0 1 .9-1.7A5.8 5.8 0 0 0 12 3.5Z" />
    </svg>
  )
}

export function IconUser({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="8.2" r="3.4" />
      <path d="M5 20c1-3.6 4-5.6 7-5.6s6 2 7 5.6" />
    </svg>
  )
}

export function IconMoon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M19 13.5A7.5 7.5 0 1 1 10.5 5 6 6 0 0 0 19 13.5Z" />
    </svg>
  )
}

export function IconPlay({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M10.3 8.7 15 12l-4.7 3.3Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconEyeOff({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 4.5 20 19.5" />
      <path d="M8.9 6.6C9.9 6.2 10.9 6 12 6c5 0 8.5 6 8.5 6a15 15 0 0 1-3.2 3.8M6.6 8.2A15.4 15.4 0 0 0 3.5 12s3.5 6 8.5 6c1 0 1.9-.2 2.8-.5" />
      <path d="M10.2 10.3a2.6 2.6 0 0 0 3.6 3.6" />
    </svg>
  )
}

export function IconChevronDown({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  )
}

export function IconMap({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect x="5" y="8" width="38" height="28" rx="6" fill="currentColor" opacity="0.12" />
      <path d="M12 14v22M22 12v22M32 14v22" stroke="currentColor" strokeWidth="1.4" opacity="0.45" strokeLinecap="round" />
      <path d="M9 20h30M9 28h30" stroke="currentColor" strokeWidth="1.4" opacity="0.45" strokeLinecap="round" />
      <path
        d="M28 21c0 5.5-6.5 11-6.5 11S15 26.5 15 21a6.5 6.5 0 0 1 13 0Z"
        fill="currentColor"
      />
      <circle cx="21.5" cy="21" r="2.4" fill="white" />
    </svg>
  )
}

export function IconBinoculars({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9.5 10.5 8 5h3l1 5.5M14.5 10.5 16 5h-3l-1 5.5" />
      <circle cx="8" cy="15.5" r="3.2" />
      <circle cx="16" cy="15.5" r="3.2" />
      <path d="M11 15h2" />
    </svg>
  )
}
