import { LionArt, ElephantArt, LeafBadgeArt } from './creatures'

const ART = { lion: LionArt, elephant: ElephantArt }

function formatDate(ts) {
  const d = new Date(ts)
  const today = new Date()
  const sameDay = d.toDateString() === today.toDateString()
  if (sameDay) return 'Ma megfigyelve'
  return d.toLocaleDateString('hu-HU', { year: 'numeric', month: 'short', day: 'numeric' }) + '-án megfigyelve'
}

export default function JournalCard({ entry, onClick }) {
  const Art = entry.type === 'featured' ? ART[entry.animalId] : null

  return (
    <button
      onClick={onClick}
      className="text-left w-full bg-[var(--paper-raised)] border border-[var(--rule)] rounded-2xl p-4 flex gap-3 hover:border-[var(--green-mid)] transition-colors"
    >
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[color:var(--green-line)]/40">
        {entry.photo ? (
          <img src={entry.photo} alt="" className="w-full h-full object-cover" />
        ) : Art ? (
          <Art className="w-full h-full" />
        ) : (
          <LeafBadgeArt className="w-full h-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-base text-ink truncate">{entry.animalName}</p>
        </div>
        <p className="text-xs text-ink-soft">{formatDate(entry.createdAt)}</p>
        {entry.type === 'custom' && (
          <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-[color:var(--ochre)]/15 text-[var(--ochre-deep)]">
            Saját kutatás
          </span>
        )}
        {entry.type === 'featured' && (
          <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-[color:var(--green-mid)]/12 text-[var(--green-deep)]">
            Kiemelt állat
          </span>
        )}
        {entry.notes && (
          <p className="text-sm text-ink-soft mt-1.5 line-clamp-1">&ldquo;{entry.notes}&rdquo;</p>
        )}
      </div>
    </button>
  )
}
