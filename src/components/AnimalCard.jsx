import { LionArt, ElephantArt } from './creatures'
import { IconChevronRight, IconCheck } from './icons'

const ART = { lion: LionArt, elephant: ElephantArt }

export default function AnimalCard({ animal, observed, onClick }) {
  const Art = ART[animal.art]
  return (
    <button
      onClick={onClick}
      className="text-left bg-[var(--paper-raised)] border border-[var(--rule)] rounded-2xl overflow-hidden hover:border-[var(--green-mid)] transition-colors group w-full"
    >
      <div className="h-28 bg-[color:var(--green-line)]/40">
        <Art className="w-full h-full" />
      </div>
      <div className="p-3.5 flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-display text-base text-ink truncate">{animal.name}</p>
          <p className="text-xs text-ink-soft italic truncate">{animal.scientificName}</p>
        </div>
        {observed ? (
          <span className="shrink-0 w-6 h-6 rounded-full bg-[color:var(--green-mid)]/15 text-[var(--green-deep)] flex items-center justify-center">
            <IconCheck className="w-3.5 h-3.5" />
          </span>
        ) : (
          <IconChevronRight className="w-4 h-4 text-ink-soft shrink-0 group-hover:translate-x-0.5 transition-transform" />
        )}
      </div>
    </button>
  )
}
