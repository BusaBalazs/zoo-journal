import { useState } from 'react'
import Header from '../components/Header'
import PhotoPicker from '../components/PhotoPicker'
import { LionArt, ElephantArt, LeafBadgeArt } from '../components/creatures'

const ART = { lion: LionArt, elephant: ElephantArt }

function formatFullDate(ts) {
  return new Date(ts).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function EntryDetail({ entry, onBack, onUpdate }) {
  const [notes, setNotes] = useState(entry.notes || '')
  const [photo, setPhoto] = useState(entry.photo || null)
  const [saved, setSaved] = useState(false)

  const Art = entry.type === 'featured' ? ART[entry.animalId] : null
  const dirty = notes !== (entry.notes || '') || photo !== (entry.photo || null)

  function handleSave() {
    onUpdate(entry.id, { notes: notes.trim(), photo })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div className="min-h-full max-w-md mx-auto flex flex-col">
      <Header title={entry.animalName} onBack={onBack} />

      <div className="flex-1 px-5 py-5 space-y-5">
        <div className="h-40 rounded-2xl overflow-hidden bg-[color:var(--green-line)]/40">
          {entry.photo ? (
            <img src={entry.photo} alt="" className="w-full h-full object-cover" />
          ) : Art ? (
            <Art className="w-full h-full" />
          ) : (
            <LeafBadgeArt className="w-full h-full" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-2xl text-ink">{entry.animalName}</h1>
            {entry.type === 'custom' ? (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[color:var(--ochre)]/15 text-[var(--ochre-deep)]">
                Saját kutatás
              </span>
            ) : (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[color:var(--green-mid)]/12 text-[var(--green-deep)]">
                Kiemelt állat
              </span>
            )}
          </div>
          <p className="text-sm text-ink-soft mt-0.5">{formatFullDate(entry.createdAt)}</p>
        </div>

        {entry.type === 'custom' && (
          <div className="grid grid-cols-2 gap-2.5">
            {entry.animalType && (
              <div className="bg-[var(--paper-raised)] border border-[var(--rule)] rounded-xl p-3">
                <p className="text-xs text-ink-soft mb-0.5">Típus</p>
                <p className="text-sm text-ink">{entry.animalType}</p>
              </div>
            )}
            {entry.diet && (
              <div className="bg-[var(--paper-raised)] border border-[var(--rule)] rounded-xl p-3">
                <p className="text-xs text-ink-soft mb-0.5">Táplálék</p>
                <p className="text-sm text-ink">{entry.diet}</p>
              </div>
            )}
          </div>
        )}

        {entry.observation && (
          <div className="bg-[var(--paper-raised)] border border-[var(--rule)] rounded-2xl p-4">
            <p className="text-xs text-ink-soft mb-1">Amit megfigyeltem</p>
            <p className="text-ink font-medium">{entry.observation}</p>
            {entry.learnedFacts && (
              <p className="text-sm text-ink-soft mt-2 leading-relaxed">{entry.learnedFacts}</p>
            )}
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">Saját jegyzet</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Mit vettél észre? Bármi, amit meg szeretnél jegyezni…"
            className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper-raised)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none resize-none"
          />
        </div>

        <PhotoPicker photo={photo} onChange={setPhoto} label="Kutatási fotó" />

        <button
          onClick={handleSave}
          disabled={!dirty}
          className="w-full py-3.5 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] font-medium disabled:opacity-40 hover:bg-[var(--green-mid)] transition-colors"
        >
          {saved ? 'Mentve' : 'Változtatások mentése'}
        </button>
      </div>
    </div>
  )
}
