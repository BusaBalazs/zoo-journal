import { useState } from 'react'
import Header from '../components/Header'
import PhotoPicker from '../components/PhotoPicker'
import { ANIMAL_TYPES, DIET_OPTIONS, OBSERVED_OPTIONS } from '../data/animals'
import { IconPin } from '../components/icons'

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
              ? 'bg-[var(--green-deep)] border-[var(--green-deep)] text-[var(--paper-raised)]'
              : 'bg-[var(--paper-raised)] border-[var(--rule)] text-ink hover:border-[var(--green-mid)]'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export default function CustomResearch({ active, onBack, onStartVisit, onSave }) {
  const [name, setName] = useState('')
  const [type, setType] = useState(null)
  const [diet, setDiet] = useState(null)
  const [observed, setObserved] = useState(null)
  const [notes, setNotes] = useState('')
  const [photo, setPhoto] = useState(null)

  if (!active) {
    return (
      <div className="min-h-full max-w-md mx-auto flex flex-col">
        <Header title="Saját kutatás" onBack={onBack} />
        <div className="flex-1 px-6 py-10 text-center">
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
      </div>
    )
  }

  const canSave = name.trim().length > 0

  function handleSave() {
    if (!canSave) return
    onSave({
      animalId: null,
      animalName: name.trim(),
      type: 'custom',
      animalType: type,
      diet,
      observation: observed,
      learnedFacts: null,
      photo,
      notes: notes.trim(),
    })
  }

  return (
    <div className="min-h-full max-w-md mx-auto flex flex-col">
      <Header title="Saját kutatás" onBack={onBack} />

      <div className="flex-1 px-5 py-5 space-y-6">
        <p className="text-ink-soft text-sm leading-relaxed">
          Találtál egy állatot, ami nincs a kiemeltek között? Rögzítsd itt a saját megfigyelésedet.
        </p>

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">Az állat neve</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pl. Vörös panda"
            className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper-raised)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">Milyen típusú állat?</p>
          <ChipGroup options={ANIMAL_TYPES} value={type} onChange={setType} />
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">Mit eszik?</p>
          <ChipGroup options={DIET_OPTIONS} value={diet} onChange={setDiet} />
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">Mit figyeltél meg?</p>
          <ChipGroup options={OBSERVED_OPTIONS} value={observed} onChange={setObserved} />
        </div>

        <div>
          <p className="text-sm font-medium text-ink-soft mb-2">Saját jegyzet</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Mit vettél észre? Bármi, amit meg szeretnél jegyezni…"
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper-raised)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none resize-none"
          />
        </div>

        <PhotoPicker photo={photo} onChange={setPhoto} label="Saját fotó (opcionális)" />

        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full py-3.5 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] font-medium disabled:opacity-40 hover:bg-[var(--green-mid)] transition-colors"
        >
          Kutatás mentése
        </button>
      </div>
    </div>
  )
}
