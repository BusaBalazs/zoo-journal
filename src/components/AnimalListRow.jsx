import { LionArt, ElephantArt } from './creatures'
import { IconChevronRight, IconCheck } from './icons'
import { animalCards } from '../assets'
import { getAnimalName } from '../data/animals'
import { useLanguage } from '../i18n/LanguageContext'
const ART = { lion: LionArt, elephant: ElephantArt }


export default function AnimalListRow({ animal, observed, onClick, photoSrc }) {

  const photo = animalCards[photoSrc]
  const { language } = useLanguage()
  const animalName = getAnimalName(animal, language)

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-[var(--paper-raised)] rounded-2xl overflow-hidden shadow-sm border border-[var(--rule)] hover:shadow-md transition-shadow"
    >
      <div className="h-45 bg-[color:var(--green-line)]/40">
        {photo ? <img src={photo} alt="" className="w-full h-full object-cover" /> : null}
      </div>
      <div className="p-4 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-lg text-ink truncate leading-tight">{animalName}</p>
          <p className="text-sm text-ink-soft italic truncate">{animal.scientificName}</p>
        </div>
        <span
          className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center ${
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
