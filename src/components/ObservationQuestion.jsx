import { useState } from 'react'
import { IconLeaf } from './icons'

export default function ObservationQuestion({ question, options, onAnswer, initialAnswer }) {
  const [selected, setSelected] = useState(initialAnswer || null)

  const chosen = options.find((o) => o.id === selected)

  function choose(opt) {
    setSelected(opt.id)
    onAnswer?.(opt)
  }

  return (
    <div>
      <div className="bg-[var(--green-deep)] text-[var(--paper-raised)] rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-2 text-[color:var(--paper)]/80 mb-2">
          <IconLeaf className="w-4 h-4" />
          <span className="text-sm">Tedd le most a telefont</span>
        </div>
        <p className="font-display text-lg leading-snug">Figyeld meg alaposan az állatot egy percig.</p>
      </div>

      <p className="font-medium text-ink mb-3">{question}</p>

      <div className="grid grid-cols-2 gap-2.5">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => choose(opt)}
            className={`text-sm text-left px-3.5 py-3 rounded-xl border transition-colors ${
              selected === opt.id
                ? 'bg-[var(--green-deep)] border-[var(--green-deep)] text-[var(--paper-raised)]'
                : 'bg-[var(--paper-raised)] border-[var(--rule)] text-ink hover:border-[var(--green-mid)]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {chosen && (
        <div className="mt-4 rise-in bg-[color:var(--ochre)]/12 border border-[color:var(--ochre)]/35 rounded-2xl p-4">
          <p className="text-sm font-semibold text-[var(--ochre-deep)] mb-1">
            {chosen.id === 'not-visible' ? 'Nem baj.' : 'Szép megfigyelés!'}
          </p>
          <p className="text-sm text-ink-soft leading-snug">{chosen.note}</p>
        </div>
      )}
    </div>
  )
}
