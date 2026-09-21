import { useState } from 'react'
import Header from '../components/Header'
import PhotoPicker from '../components/PhotoPicker'
import SuccessView from '../components/SuccessView'
import RestrictedGate from '../components/RestrictedGate'
import { ANIMAL_TYPES, DIET_OPTIONS, OBSERVED_OPTIONS } from '../data/animals'
import { useLanguage } from '../i18n/LanguageContext'

function ChipGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`text-sm px-3.5 py-2 rounded-full border transition-colors ${
            value === opt
              ? 'bg-[var(--green-deep)] border-[var(--green-deep)] text-white'
              : 'bg-[var(--paper-raised)] border-[var(--rule)] text-ink hover:border-[var(--green-mid)]'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export default function CustomResearch({ active, onBack, onGoExplore, onGoJournal, onStartVisit, onSave }) {
  const [name, setName] = useState('')
  const [type, setType] = useState(null)
  const [diet, setDiet] = useState(null)
  const [observed, setObserved] = useState(null)
  const [notes, setNotes] = useState('')
  const [photo, setPhoto] = useState(null)
  const [savedEntry, setSavedEntry] = useState(null)
  const { t } = useLanguage()

  if (savedEntry) {
    return <SuccessView entry={savedEntry} onContinueResearch={onGoExplore} onOpenJournal={onGoJournal} />
  }

  if (!active) {
    return (
      <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)]">
        <Header title={t('customResearch')} onBack={onBack} />
        <RestrictedGate onRetryLocation={onStartVisit} onOpenJournal={onGoJournal} />
      </div>
    )
  }

  const canSave = name.trim().length > 0

  function handleSave() {
    if (!canSave) return
    const entry = {
      animalId: null,
      animalName: name.trim(),
      type: 'custom',
      animalType: type,
      diet,
      observation: observed,
      learnedFacts: null,
      photo,
      notes: notes.trim(),
    }
    const saved = onSave(entry)
    setSavedEntry(saved)
  }

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)]">
      <Header title={t('customResearch')} onBack={onBack} />

      <div className="flex-1 px-5 py-5 space-y-6">
        <p className="text-ink-soft text-sm leading-relaxed">
          {t('customBody')}
        </p>

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">{t('animalName')}</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pl. Vörös panda"
            className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">{t('animalType')}</p>
          <ChipGroup options={ANIMAL_TYPES} value={type} onChange={setType} />
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">{t('diet')}</p>
          <ChipGroup options={DIET_OPTIONS} value={diet} onChange={setDiet} />
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">{t('observed')}</p>
          <ChipGroup options={OBSERVED_OPTIONS} value={observed} onChange={setObserved} />
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">{t('ownNote')}</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('notePlaceholder')}
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none resize-none"
          />
        </div>

        <PhotoPicker photo={photo} onChange={setPhoto} label={`${t('customResearch')} (${t('optional')})`} />

        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold disabled:opacity-40 hover:bg-[color:var(--green-deep)]/90 transition-colors"
        >
          {t('saveResearch')}
        </button>
      </div>
    </div>
  )
}
