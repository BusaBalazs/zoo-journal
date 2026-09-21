import { useRef, useState } from 'react'
import WaveDivider from '../components/WaveDivider'
import { LionArt, ElephantArt, LeafBadgeArt } from '../components/creatures'
import {
  IconArrowLeft,
  IconQuestion,
  IconBulb,
  IconChevronDown,
  IconCheck,
  IconCamera,
  IconPin,
} from '../components/icons'
import { getAnimalById } from '../data/animals'
import { ZOO } from '../utils/session'

const ART = { lion: LionArt, elephant: ElephantArt }
const PHOTO = { lion: '/images/landing-lion.jpg' }

function formatObservedAt(ts) {
  const d = new Date(ts)
  const today = new Date()
  const time = d.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })
  if (d.toDateString() === today.toDateString()) return `Ma, ${time}`
  return `${d.toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })}, ${time}`
}

export default function EntryDetail({ entry, onBack, onUpdate }) {
  const [notes, setNotes] = useState(entry.notes || '')
  const [photo, setPhoto] = useState(entry.photo || null)
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const fileRef = useRef(null)

  const animal = entry.type === 'featured' ? getAnimalById(entry.animalId) : null
  const Art = entry.type === 'featured' ? ART[entry.animalId] : null
  const stockPhoto = entry.type === 'featured' ? PHOTO[entry.animalId] : null
  const heroPhoto = photo || stockPhoto

  const dirty = notes !== (entry.notes || '') || photo !== (entry.photo || null)

  function handleSave() {
    onUpdate(entry.id, { notes: notes.trim(), photo })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)]">
      <div className="relative h-72 shrink-0 bg-[color:var(--green-line)]/40">
        {heroPhoto ? (
          <img src={heroPhoto} alt={entry.animalName} className="w-full h-full object-cover" />
        ) : Art ? (
          <Art className="w-full h-full" />
        ) : (
          <LeafBadgeArt className="w-full h-full" />
        )}

        <button
          onClick={onBack}
          aria-label="Vissza"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[color:white]/85 backdrop-blur-sm flex items-center justify-center text-ink shadow-sm"
        >
          <IconArrowLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => fileRef.current?.click()}
          aria-label="Fotó cseréje"
          className="absolute bottom-6 right-4 w-9 h-9 rounded-full bg-[color:white]/85 backdrop-blur-sm flex items-center justify-center text-[var(--green-deep)] shadow-sm"
        >
          <IconCamera className="w-4 h-4" />
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

        <WaveDivider />
      </div>

      <div className="flex-1 px-6 pt-4 pb-8">
        <h1 className="font-display text-3xl text-ink leading-tight">{entry.animalName}</h1>
        {entry.type === 'featured' && animal ? (
          <p className="text-ink-soft italic mb-2">{animal.scientificName}</p>
        ) : (
          entry.animalType && <p className="text-ink-soft mb-2">{entry.animalType}</p>
        )}
        <p className="text-sm text-ink-soft mb-5 flex items-center gap-1.5 flex-wrap">
          <span>Megfigyelve: {formatObservedAt(entry.createdAt)}</span>
          <span className="inline-flex items-center gap-1">
            <IconPin className="w-3.5 h-3.5" />
            {ZOO.name}
          </span>
        </p>

        <div className="flex items-center justify-between border-b border-[var(--rule)] mb-5">
          <button className="pb-2.5 text-sm font-bold text-[var(--green-deep)] border-b-2 border-[var(--green-deep)] -mb-px">
            Főbb infók
          </button>
          {entry.type === 'featured' && animal && (
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-label="Több információ"
              className={`mb-1.5 text-ink-soft transition-transform ${expanded ? 'rotate-180' : ''}`}
            >
              <IconChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>

        {expanded && entry.type === 'featured' && animal && (
          <div className="rise-in grid grid-cols-1 gap-2 mb-5 text-sm">
            <div className="bg-[var(--paper)] rounded-xl p-3">
              <p className="text-ink-soft text-xs mb-0.5">Élőhely</p>
              <p className="text-ink">{animal.habitat}</p>
            </div>
            <div className="bg-[var(--paper)] rounded-xl p-3">
              <p className="text-ink-soft text-xs mb-0.5">Táplálkozás</p>
              <p className="text-ink">{animal.diet}</p>
            </div>
          </div>
        )}

        {entry.observation && (
          <div className="flex gap-3 mb-6">
            <span className="w-9 h-9 rounded-full border-[1.5px] border-[var(--green-mid)] text-[var(--green-mid)] flex items-center justify-center shrink-0">
              <IconQuestion className="w-4.5 h-4.5" />
            </span>
            <div>
              <p className="font-bold text-ink">Megfigyelés</p>
              <p className="text-ink font-medium">{entry.observation}</p>
              {entry.learnedFacts && (
                <p className="text-sm text-ink-soft mt-1 leading-relaxed">{entry.learnedFacts}</p>
              )}
            </div>
          </div>
        )}

        <p className="font-bold text-ink mb-2">Saját Jegyzetem</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Mit vettél észre? Bármi, amit meg szeretnél jegyezni…"
          className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper-raised)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none resize-none mb-6"
        />

        {entry.type === 'featured' && animal && (
          <div className="flex gap-3 mb-8">
            <span className="w-9 h-9 rounded-full border-[1.5px] border-[var(--green-mid)] text-[var(--green-mid)] flex items-center justify-center shrink-0">
              <IconBulb className="w-4.5 h-4.5" />
            </span>
            <div>
              <p className="font-bold text-ink">Mit Tanultam</p>
              <p className="text-sm text-ink-soft leading-relaxed">{animal.interestingFact}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={!dirty}
          className="w-full py-3.5 rounded-full bg-[var(--green-mid)] text-white font-semibold disabled:opacity-45 hover:bg-[color:var(--green-mid)]/90 transition-colors flex items-center justify-center gap-2"
        >
          {saved ? 'Mentve' : 'Szerkesztés Mentése'}
          <IconCheck className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
