import { useState } from 'react'
import { IconLeaf } from '../components/icons'

export default function Onboarding({ onSubmit }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onSubmit(trimmed)
  }

  return (
    <div className="min-h-full flex flex-col justify-center px-6 py-10 max-w-md mx-auto">
      <div className="w-12 h-12 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] flex items-center justify-center mb-6">
        <IconLeaf className="w-6 h-6" />
      </div>
      <h1 className="font-display text-3xl text-ink mb-2 leading-tight">Hogy szólíthatunk?</h1>
      <p className="text-ink-soft mb-8 leading-relaxed">
        Ezen a néven fogjuk elnevezni a kutatási naplódat. Bármikor megváltoztathatod.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pl. Anna"
          className="w-full px-4 py-3.5 rounded-2xl border border-[var(--rule)] bg-[var(--paper-raised)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none text-lg"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full py-3.5 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] font-medium disabled:opacity-40 hover:bg-[var(--green-mid)] transition-colors"
        >
          Napló elindítása
        </button>
      </form>
    </div>
  )
}
