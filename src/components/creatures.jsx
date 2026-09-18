// Flat, field-guide-style illustrations for the two featured animals.
// Drawn as components (not photos) so the prototype has no external
// image dependency and stays visually consistent.

export function LionArt({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 200 160" className={className}>
      <ellipse cx="100" cy="82" rx="58" ry="54" fill="#c1893a" />
      <ellipse cx="100" cy="82" rx="58" ry="54" fill="none" stroke="#9c6c28" strokeWidth="2" opacity="0.5" />
      <circle cx="100" cy="80" r="32" fill="#e7b56b" />
      <path d="M78 66c-2 8 1 15 6 18M122 66c2 8-1 15-6 18" stroke="#9c6c28" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <ellipse cx="86" cy="78" rx="4.2" ry="5.4" fill="#2c2117" />
      <ellipse cx="114" cy="78" rx="4.2" ry="5.4" fill="#2c2117" />
      <path d="M92 92c2 3 14 3 16 0" stroke="#2c2117" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M100 88v5" stroke="#2c2117" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="100" cy="87" rx="5" ry="3.6" fill="#2c2117" />
      <path d="M70 84h-14M132 84h14M72 92l-13 5M130 92l13 5" stroke="#4b5a4e" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function ElephantArt({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 200 160" className={className}>
      <ellipse cx="95" cy="70" rx="46" ry="40" fill="#35636b" opacity="0.9" />
      <path d="M64 92c-6 10-6 26 4 34 4-8 4-18 2-26" fill="#2c4f56" />
      <ellipse cx="80" cy="66" rx="6.5" ry="8" fill="#1f2a22" />
      <path d="M44 60c-10 4-14 16-8 26 6-4 12-12 14-20" fill="#2c4f56" opacity="0.9" />
      <path d="M118 96c8 3 20 2 26-6-6-4-16-6-24-4" fill="#2c4f56" />
      <path d="M112 60c10 4 14 16 8 26-6-4-12-12-14-20" fill="#2c4f56" opacity="0.9" />
    </svg>
  )
}

export function LeafBadgeArt({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 200 160" className={className}>
      <rect width="200" height="160" fill="#3f6b45" opacity="0.14" />
      <path d="M76 106c-10-34 12-58 60-62 4 44-20 66-60 62Z" fill="#3f6b45" />
      <path d="M78 104 128 52" stroke="#f2efe3" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}
