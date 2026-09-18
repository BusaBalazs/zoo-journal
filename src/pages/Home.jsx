import SessionStatus from '../components/SessionStatus'
import AnimalCard from '../components/AnimalCard'
import { ANIMALS } from '../data/animals'
import { IconChevronRight, IconEdit } from '../components/icons'

export default function Home({ user, visit, active, entries, onStartVisit, onOpenAnimal, onGoExplore, onGoJournal, onOpenProfile }) {
  const featuredObserved = new Set(
    entries.filter((e) => e.type === 'featured').map((e) => e.animalId)
  )

  return (
    <div className="max-w-md mx-auto px-4 py-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-sm text-ink-soft">Szia, {user.name}</p>
          <h1 className="font-display text-2xl text-ink">Kutatási naplód</h1>
        </div>
        <button
          onClick={onOpenProfile}
          aria-label="Profil"
          className="w-9 h-9 rounded-full bg-[var(--paper-raised)] border border-[var(--rule)] flex items-center justify-center text-ink-soft hover:border-[var(--green-mid)] transition-colors shrink-0"
        >
          <IconEdit className="w-4 h-4" />
        </button>
      </div>

      <SessionStatus visit={visit} active={active} onStartVisit={onStartVisit} />

      <button
        onClick={onGoJournal}
        className="mt-4 w-full bg-[var(--paper-raised)] border border-[var(--rule)] rounded-2xl p-4 flex items-center justify-between hover:border-[var(--green-mid)] transition-colors"
      >
        <div className="text-left">
          <p className="font-display text-2xl text-[var(--green-deep)] leading-none">{entries.length}</p>
          <p className="text-sm text-ink-soft mt-1">
            {entries.length === 1 ? 'megfigyelt állat' : 'megfigyelt állat'}
          </p>
        </div>
        <IconChevronRight className="w-5 h-5 text-ink-soft" />
      </button>

      <div className="mt-7">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg text-ink">Kiemelt állatok ma</h2>
          <button onClick={onGoExplore} className="text-sm text-[var(--green-deep)] font-medium">
            Összes
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {ANIMALS.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              observed={featuredObserved.has(animal.id)}
              onClick={() => onOpenAnimal(animal.id)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onGoExplore}
        className="mt-6 w-full py-3.5 rounded-2xl border border-[var(--rule)] text-ink font-medium hover:border-[var(--green-mid)] transition-colors"
      >
        Másik állat kutatása
      </button>
    </div>
  )
}
