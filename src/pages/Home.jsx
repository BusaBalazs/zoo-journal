import RestrictedGate from '../components/RestrictedGate'
import AnimalCard from '../components/AnimalCard'
import { ANIMALS } from '../data/animals'
import { IconChevronRight, IconClock, IconSparkle, IconUser, IconPin } from '../components/icons'
import { ZOO, remainingLabel } from '../utils/session'
import { useLanguage } from '../i18n/LanguageContext'

export default function Home({
  user,
  visit,
  active,
  entries,
  onOpenAnimal,
  onGoExplore,
  onGoJournal,
  onOpenProfile,
  onRetryLocation,
}) {
  const { language, t } = useLanguage()
  if (!active) {
    return <RestrictedGate onRetryLocation={onRetryLocation} onOpenJournal={onGoJournal} />
  }

  const featuredObserved = new Set(
    entries.filter((e) => e.type === 'featured').map((e) => e.animalId)
  )

  return (
    <div className="max-w-md mx-auto px-4 py-5">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-2xl text-ink">{t('greeting', user.name)}</h1>
          <p className="text-sm text-ink-soft mt-0.5">{t('ready')}</p>
        </div>
        <button
          onClick={onOpenProfile}
          aria-label="Profil"
          className="w-10 h-10 rounded-full border-[1.5px] border-[var(--green-mid)] text-[var(--green-mid)] flex items-center justify-center shrink-0"
        >
          <IconUser className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-[var(--paper-raised)] border border-[var(--rule)] rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <IconPin className="w-4 h-4 text-[var(--green-mid)]" />
          <p className="font-bold text-ink">{ZOO.name}</p>
          <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full bg-[color:var(--green-mid)]/12 text-[var(--green-deep)] font-semibold">
            {t('activeResearch')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-ink-soft">
          <IconClock className="w-4 h-4" />
          {remainingLabel(visit, language)}
        </div>
      </div>

      <button
        onClick={onGoJournal}
        className="w-full bg-[var(--paper-raised)] border border-[var(--rule)] rounded-2xl p-4 flex items-center justify-between hover:border-[var(--green-mid)] transition-colors mb-7"
      >
        <div className="text-left">
          <p className="font-display text-2xl text-[var(--green-deep)] leading-none">{entries.length}</p>
          <p className="text-sm text-ink-soft mt-1">{t('observedAnimals')}</p>
        </div>
        <IconChevronRight className="w-5 h-5 text-ink-soft" />
      </button>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg text-ink">{t('featuredAnimals')}</h2>
          <button onClick={onGoExplore} className="text-sm text-[var(--green-deep)] font-semibold">
            {t('all')}
          </button>
        </div>
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
      </div>

      <button
        onClick={onGoExplore}
        className="w-full bg-[color:var(--ochre)]/10 border border-[color:var(--ochre)]/25 rounded-2xl p-4 flex items-center gap-3 text-left hover:bg-[color:var(--ochre)]/15 transition-colors"
      >
        <span className="w-10 h-10 rounded-xl bg-[color:var(--ochre)]/20 text-[var(--ochre-deep)] flex items-center justify-center shrink-0">
          <IconSparkle className="w-5 h-5" />
        </span>
        <span className="text-sm text-ink flex-1">
          <span className="font-semibold block">{t('customResearch')}</span>
          {t('customResearchPrompt')}
        </span>
        <IconChevronRight className="w-4 h-4 text-[var(--ochre-deep)] shrink-0" />
      </button>
    </div>
  )
}
