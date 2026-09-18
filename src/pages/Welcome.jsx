import { LeafBadgeArt } from '../components/creatures'
import { ZOO } from '../utils/session'

export default function Welcome({ userName, onStart, onOpenJournal, entryCount }) {
  return (
    <div className="min-h-full flex flex-col max-w-md mx-auto">
      <div className="h-44 relative overflow-hidden">
        <LeafBadgeArt className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper)] via-transparent to-transparent" />
      </div>

      <div className="flex-1 px-6 pb-8 -mt-4">
        <p className="text-sm text-[var(--ochre-deep)] font-medium mb-1">Üdvözlünk, {ZOO.name}!</p>
        <h1 className="font-display text-3xl text-ink leading-tight mb-3">
          {userName ? `Szia, ${userName}` : 'A saját kutatási naplód'}
        </h1>
        <p className="text-ink-soft leading-relaxed mb-8">
          Fedezz fel állatokat, figyeld meg őket élőben, és készíts saját digitális kutatási naplót a látogatásodról.
        </p>

        <button
          onClick={onStart}
          className="w-full py-3.5 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] font-medium hover:bg-[var(--green-mid)] transition-colors mb-3"
        >
          Kutatás indítása
        </button>
        <button
          onClick={onOpenJournal}
          className="w-full py-3.5 rounded-2xl border border-[var(--rule)] text-ink font-medium hover:border-[var(--green-mid)] transition-colors"
        >
          Kutatási naplóm{entryCount > 0 ? ` (${entryCount})` : ''}
        </button>
      </div>
    </div>
  )
}
