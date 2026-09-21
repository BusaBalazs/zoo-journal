import { IconArrowLeft } from './icons'

export default function Header({ title, onBack, right, center }) {
  return (
    <header className="sticky top-0 z-30 bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--rule)]">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-2">
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Vissza"
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-ink-soft hover:bg-[var(--paper-raised)] transition-colors shrink-0"
          >
            <IconArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-2" />
        )}
        {center || <h1 className="font-display text-base text-ink flex-1 truncate">{title}</h1>}
        {right}
      </div>
    </header>
  )
}
