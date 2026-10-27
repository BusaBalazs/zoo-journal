// Fallback illustration for entries without an animal photo.

export function LeafBadgeArt({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 200 160" className={className}>
      <rect width="200" height="160" fill="#3f6b45" opacity="0.14" />
      <path d="M76 106c-10-34 12-58 60-62 4 44-20 66-60 62Z" fill="#3f6b45" />
      <path d="M78 104 128 52" stroke="#f2efe3" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}
