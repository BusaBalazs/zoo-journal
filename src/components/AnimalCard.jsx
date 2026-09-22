
import { IconChevronRight, IconCheck } from './icons'
import { animalCards } from '../assets/index'



export default function AnimalCard({ animal, observed, onClick, photoSrc }) {
  const photo = animalCards[photoSrc]

  return (
    <button
      onClick={onClick}
      className="relative text-left bg-[var(--paper-light)] rounded-2xl overflow-hidden shadow-sm border border-[var(--rule)] hover:shadow-md transition-shadow w-full"
    >
      <div className="h-55">
        {photo ? <img src={photo} alt={animal.name} className="w-full h-full object-cover" /> : null}
      </div>
      <div className="absolute bottom-0 px-3 py-4 flex items-center gap-2 bg-[var(--paper-light)]/95  rounded-t-2xl w-full">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[15px] text-ink truncate leading-tight">{animal.name}</p>
          <p className="text-xs text-ink-soft italic truncate">{animal.scientificName}</p>
        </div>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center ${
            observed
              ? 'bg-[var(--green-mid)] border-[var(--green-mid)] text-white'
              : 'border-[var(--green-mid)] text-[var(--green-mid)]'
          }`}
        >
          {observed ? <IconCheck className="w-4 h-4" /> : <IconChevronRight className="w-4 h-4" />}
        </span>
      </div>
    </button>
  )
}
