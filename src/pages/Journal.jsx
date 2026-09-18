import JournalCard from '../components/JournalCard'
import { IconBook } from '../components/icons'

export default function Journal({ entries, onOpenEntry }) {
  const sorted = [...entries].sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div className="max-w-md mx-auto px-4 py-5">
      <h1 className="font-display text-2xl text-ink mb-1">Kutatási naplóm</h1>
      <p className="text-ink-soft text-sm mb-5">
        {entries.length === 0
          ? 'Még nincs bejegyzésed.'
          : `${entries.length} megfigyelt állat eddig.`}
      </p>

      {sorted.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-2xl border border-dashed border-[var(--rule)]">
          <div className="w-12 h-12 rounded-2xl bg-[color:var(--green-mid)]/12 text-[var(--green-deep)] flex items-center justify-center mx-auto mb-4">
            <IconBook className="w-5 h-5" />
          </div>
          <p className="text-ink font-medium mb-1">A naplód még üres</p>
          <p className="text-sm text-ink-soft leading-relaxed">
            Figyelj meg egy állatot a zooban, és az első bejegyzésed itt fog megjelenni.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {sorted.map((entry) => (
            <JournalCard key={entry.id} entry={entry} onClick={() => onOpenEntry(entry.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
