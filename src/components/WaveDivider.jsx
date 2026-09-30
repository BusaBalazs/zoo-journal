export default function WaveDivider({ color = "var(--paper-raised)", className = "" }) {
  return (
    <svg
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      className={`absolute -bottom-px left-0 w-full h-8 ${className}`}
      style={{ color }}
    >
      <path
        d="M0 40V18c40-14 90-14 130 0s90 14 130 0 90-14 140 0v22Z"
        fill="currentColor"
      />
    </svg>
  )
}
