import { useState } from 'react'
import Header from '../components/Header'
import InfoCard from '../components/InfoCard'
import ObservationQuestion from '../components/ObservationQuestion'
import PhotoPicker from '../components/PhotoPicker'
import { LionArt, ElephantArt } from '../components/creatures'
import { IconLeaf, IconPin } from '../components/icons'

const ART = { lion: LionArt, elephant: ElephantArt }

export default function AnimalDetail({ animal, active, onBack, onStartVisit, onSave }) {
  const Art = ART[animal.art]
  const [stage, setStage] = useState('learn') // learn -> observe -> photo
  const [answer, setAnswer] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [notes, setNotes] = useState('')

  function handleContinueFromLearn() {
    if (!active) {
      setStage('gated')
      return
    }
    setStage('observe')
  }

  function handleSave() {
    onSave({
      animalId: animal.id,
      animalName: animal.name,
      type: 'featured',
      observation: answer?.label || null,
      learnedFacts: answer?.note || null,
      photo,
      notes: notes.trim(),
    })
  }

  return (
    <div className="min-h-full max-w-md mx-auto flex flex-col">
      <Header title={animal.name} onBack={onBack} />

      <div className="flex-1 px-5 py-5">
        {stage === 'learn' && (
          <div className="rise-in">
            <div className="h-40 rounded-2xl overflow-hidden bg-[color:var(--green-line)]/40 mb-5">
              <Art className="w-full h-full" />
            </div>
            <h1 className="font-display text-2xl text-ink mb-1">{animal.name}</h1>
            <p className="text-sm text-ink-soft italic mb-4">{animal.scientificName}</p>
            <p className="text-ink leading-relaxed mb-5">{animal.intro}</p>

            <div className="grid grid-cols-1 gap-2.5 mb-6">
              <InfoCard icon={<IconPin className="w-4 h-4" />} label="Élőhely" value={animal.habitat} />
              <InfoCard icon={<IconLeaf className="w-4 h-4" />} label="Táplálkozás" value={animal.diet} />
              <InfoCard icon={<IconLeaf className="w-4 h-4" />} label="Életmód" value={animal.lifestyle} />
            </div>

            <div className="bg-[color:var(--teal)]/10 border border-[color:var(--teal)]/25 rounded-2xl p-4 mb-6">
              <p className="text-xs font-medium text-[var(--teal)] mb-1">Érdekesség</p>
              <p className="text-sm text-ink leading-relaxed">{animal.interestingFact}</p>
            </div>

            <button
              onClick={handleContinueFromLearn}
              className="w-full py-3.5 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] font-medium hover:bg-[var(--green-mid)] transition-colors"
            >
              Megfigyelés indítása
            </button>
          </div>
        )}

        {stage === 'gated' && (
          <div className="rise-in text-center pt-6">
            <div className="w-14 h-14 rounded-2xl bg-[color:var(--ochre)]/15 text-[var(--ochre-deep)] flex items-center justify-center mx-auto mb-5">
              <IconPin className="w-6 h-6" />
            </div>
            <h2 className="font-display text-xl text-ink mb-2">Éppen a helyszínen vagy?</h2>
            <p className="text-ink-soft leading-relaxed mb-6 max-w-xs mx-auto">
              Új kutatási bejegyzést csak a látogatás alatt lehet elindítani. Olvasd be a bejáratnál lévő QR-kódot a mai kutatás aktiválásához.
            </p>
            <button
              onClick={onStartVisit}
              className="w-full py-3.5 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] font-medium hover:bg-[var(--green-mid)] transition-colors"
            >
              Zoolátogatás indítása
            </button>
          </div>
        )}

        {stage === 'observe' && (
          <div className="rise-in">
            <ObservationQuestion
              question={animal.observationQuestion}
              options={animal.observationOptions}
              onAnswer={setAnswer}
            />
            <button
              onClick={() => setStage('photo')}
              disabled={!answer}
              className="w-full mt-6 py-3.5 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] font-medium disabled:opacity-40 hover:bg-[var(--green-mid)] transition-colors"
            >
              Tovább
            </button>
          </div>
        )}

        {stage === 'photo' && (
          <div className="rise-in space-y-5">
            <PhotoPicker photo={photo} onChange={setPhoto} label="Saját kutatási fotó (opcionális)" />
            <div>
              <p className="text-sm font-medium text-ink-soft mb-2">Saját jegyzet (opcionális)</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mit vettél észre? Bármi, amit meg szeretnél jegyezni…"
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper-raised)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none resize-none"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full py-3.5 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] font-medium hover:bg-[var(--green-mid)] transition-colors"
            >
              Kutatás mentése
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
