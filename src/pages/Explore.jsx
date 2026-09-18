import AnimalCard from '../components/AnimalCard'
import { ANIMALS } from '../data/animals'
import { IconPlus } from '../components/icons'

export default function Explore({ entries, active, onOpenAnimal, onCustomResearch }) {
  const featuredObserved = new Set(
    entries.filter((e) => e.type === 'featured').map((e) => e.animalId)
  )

  return (
    <div className="max-w-md mx-auto px-4 py-5">
      <h1 className="font-display text-2xl text-ink mb-1">Kutatás</h1>
      <p className="text-ink-soft text-sm mb-5">
        Válassz egy kiemelt állatot, vagy indíts saját kutatást egy másik fajról.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {ANIMALS.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            observed={featuredObserved.has(animal.id)}
            onClick={() => onOpenAnimal(animal.id)}
          />
        ))}
      </div>

      <button
        onClick={onCustomResearch}
        className="w-full py-4 rounded-2xl border-2 border-dashed border-[var(--rule)] flex items-center justify-center gap-2 text-[var(--green-deep)] font-medium hover:border-[var(--green-mid)] transition-colors"
      >
        <IconPlus className="w-4.5 h-4.5" />
        Másik állat kutatása
      </button>

      {!active && (
        <p className="text-xs text-ink-soft text-center mt-4 leading-relaxed">
          Új kutatás elindításához aktív látogatásra van szükség — ha rákoppintasz egy állatra, elmagyarázzuk.
        </p>
      )}
    </div>
  )
}
