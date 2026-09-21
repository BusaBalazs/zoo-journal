import { useState } from 'react'
import Header from '../components/Header'
import InfoCard from '../components/InfoCard'
import ObservationQuestion from '../components/ObservationQuestion'
import PhotoPicker from '../components/PhotoPicker'
import SuccessView from '../components/SuccessView'
import StepProgress from '../components/StepProgress'
import { LionArt, ElephantArt } from '../components/creatures'
import { IconLeaf, IconPin, IconHeart, IconBinoculars, IconCamera, IconMap } from '../components/icons'

const ART = { lion: LionArt, elephant: ElephantArt }
const PHOTO = { lion: '/images/landing-lion.jpg' }

const TABS = [
  { id: 'info', label: 'Fő infók' },
  { id: 'observation', label: 'Megfigyelés' },
  { id: 'fact', label: 'Érdekesség' },
]

export default function AnimalDetail({ animal, active, onBack, onGoExplore, onGoJournal, onStartVisit, onSave }) {
  const Art = ART[animal.art]
  const photo = PHOTO[animal.art]
  const [stage, setStage] = useState('learn') // learn -> observe -> photo -> success
  const [tab, setTab] = useState('info')
  const [favorite, setFavorite] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [savedPhoto, setSavedPhoto] = useState(null)
  const [notes, setNotes] = useState('')
  const [savedEntry, setSavedEntry] = useState(null)

  function beginObservation() {
    if (!active) {
      setStage('gated')
      return
    }
    setStage('observe')
  }

  function handleTabClick(id) {
    if (id === 'observation') {
      beginObservation()
      return
    }
    setTab(id)
  }

  function handleSave() {
    const entry = {
      animalId: animal.id,
      animalName: animal.name,
      type: 'featured',
      observation: answer?.label || null,
      learnedFacts: answer?.note || null,
      photo: savedPhoto,
      notes: notes.trim(),
    }
    const saved = onSave(entry)
    setSavedEntry(saved)
    setStage('success')
  }

  if (stage === 'success' && savedEntry) {
    return (
      <SuccessView
        entry={savedEntry}
        onContinueResearch={onGoExplore}
        onOpenJournal={onGoJournal}
      />
    )
  }

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)]">
      <Header
        title={stage === 'gated' ? animal.name : ''}
        onBack={stage === 'observe' ? () => setStage('learn') : stage === 'photo' ? () => setStage('observe') : onBack}
        center={stage === 'observe' ? <StepProgress step={2} total={3} /> : stage === 'photo' ? <StepProgress step={3} total={3} /> : undefined}
        right={
          stage === 'learn' ? (
            <button
              onClick={() => setFavorite((f) => !f)}
              aria-label="Kedvenc"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--clay)] hover:bg-[var(--paper)] transition-colors"
            >
              <IconHeart className="w-5 h-5" filled={favorite} />
            </button>
          ) : null
        }
      />

      <div className="flex-1">
        {stage === 'learn' && (
          <div className="rise-in">
            <div className="h-56 bg-[color:var(--green-line)]/40">
              {photo ? (
                <img src={photo} alt={animal.name} className="w-full h-full object-cover" />
              ) : (
                <Art className="w-full h-full" />
              )}
            </div>

            <div className="px-5 pt-5">
              <h1 className="font-display text-2xl text-ink mb-0.5">{animal.name}</h1>
              <p className="text-sm text-ink-soft italic mb-4">{animal.scientificName}</p>

              <div className="flex gap-1.5 bg-[var(--paper)] rounded-full p-1 mb-5">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTabClick(t.id)}
                    className={`flex-1 text-sm py-2 rounded-full font-medium transition-colors ${
                      tab === t.id
                        ? 'bg-[var(--green-deep)] text-white'
                        : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {tab === 'info' && (
                <>
                  <p className="text-ink leading-relaxed mb-5">{animal.intro}</p>
                  <div className="grid grid-cols-1 gap-2.5 mb-6">
                    <InfoCard icon={<IconPin className="w-4 h-4" />} label="Élőhely" value={animal.habitat} />
                    <InfoCard icon={<IconLeaf className="w-4 h-4" />} label="Táplálkozás" value={animal.diet} />
                    <InfoCard icon={<IconLeaf className="w-4 h-4" />} label="Életmód" value={animal.lifestyle} />
                  </div>
                </>
              )}

              {tab === 'fact' && (
                <div className="bg-[color:var(--teal)]/10 border border-[color:var(--teal)]/25 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-medium text-[var(--teal)] mb-1">Érdekesség</p>
                  <p className="text-sm text-ink leading-relaxed">{animal.interestingFact}</p>
                </div>
              )}

              <button
                onClick={beginObservation}
                className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2 mb-6"
              >
                Tovább a megfigyeléshez
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        )}

        {stage === 'gated' && (
          <div className="rise-in px-6 pt-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[color:var(--ochre)]/15 text-[var(--ochre-deep)] flex items-center justify-center mx-auto mb-5">
              <IconMap className="w-7 h-7" />
            </div>
            <h2 className="font-display text-xl text-ink mb-2">Éppen a helyszínen vagy?</h2>
            <p className="text-ink-soft leading-relaxed mb-6 max-w-xs mx-auto">
              Új kutatási bejegyzést csak a látogatás alatt lehet elindítani.
            </p>
            <button
              onClick={onStartVisit}
              className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors"
            >
              Helyzet ellenőrzése
            </button>
          </div>
        )}

        {stage === 'observe' && (
          <div className="rise-in px-6 pt-6">
            <div className="w-14 h-14 rounded-full bg-[color:var(--green-mid)]/12 text-[var(--green-deep)] flex items-center justify-center mb-5">
              <IconBinoculars className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl text-ink mb-1.5">{animal.observationQuestion}</h1>
            <p className="text-ink-soft mb-6">Figyeld meg alaposan, és válaszd ki, mit láttál éppen!</p>

            <ObservationQuestion options={animal.observationOptions} onAnswer={setAnswer} />

            <button
              onClick={() => setStage('photo')}
              disabled={!answer}
              className="w-full mt-6 py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold disabled:opacity-40 hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2"
            >
              Tovább
              <span aria-hidden>→</span>
            </button>
          </div>
        )}

        {stage === 'photo' && (
          <div className="rise-in px-6 pt-6">
            <div className="w-14 h-14 rounded-full bg-[color:var(--green-mid)]/12 text-[var(--green-deep)] flex items-center justify-center mb-5">
              <IconCamera className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl text-ink mb-1.5">Készíts egy fotót!</h1>
            <p className="text-ink-soft mb-6">
              Fotózd le az állatot, ha szeretnéd. Ez lesz a te kutatási naplód része.
            </p>

            <div className="space-y-5">
              <PhotoPicker photo={savedPhoto} onChange={setSavedPhoto} label="" />
              <div>
                <p className="text-sm font-medium text-ink-soft mb-2">Saját megjegyzés (opcionális)</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mit vettél észre? Bármi, amit meg szeretnél jegyezni…"
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none resize-none"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2"
              >
                Mentés a naplóba
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
