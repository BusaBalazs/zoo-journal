import { useState } from 'react'
import { IconMoon, IconWalk, IconFork, IconEye, IconPlay, IconEyeOff, IconCheck } from './icons'

const OPTION_ICON = {
  resting: IconMoon,
  moving: IconWalk,
  eating: IconFork,
  watching: IconEye,
  playing: IconPlay,
  'not-visible': IconEyeOff,
}

export default function ObservationQuestion({ options, onAnswer, initialAnswer }) {
  const [selected, setSelected] = useState(initialAnswer || null)

  function choose(opt) {
    setSelected(opt.id)
    onAnswer?.(opt)
  }

  return (
    <div className="space-y-2.5">
      {options.map((opt) => {
        const isSelected = selected === opt.id
        const OptIcon = OPTION_ICON[opt.id]
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => choose(opt)}
            className={`w-full flex items-center gap-3 pl-3 pr-4 py-3 rounded-2xl border text-left transition-colors shadow-sm ${
              isSelected
                ? 'bg-[color:var(--green-mid)]/10 border-[var(--green-mid)]'
                : 'bg-[var(--paper)] border-[var(--rule)] hover:border-[var(--green-mid)]'
            }`}
          >
            <span
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                isSelected ? 'bg-[var(--green-mid)] text-white' : 'bg-[var(--paper)] text-[var(--green-mid)]'
              }`}
            >
              {OptIcon && <OptIcon className="w-4.5 h-4.5" />}
            </span>
            <span className={`flex-1 font-medium ${isSelected ? 'text-[var(--green-deep)]' : 'text-ink'}`}>
              {opt.label}
            </span>
            {isSelected && (
              <span className="w-6 h-6 rounded-full bg-[var(--green-mid)] text-white flex items-center justify-center shrink-0">
                <IconCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </button>
        )
      })}

      {selected && (
        <div className="rise-in mt-4 bg-[color:var(--ochre)]/12 border border-[color:var(--ochre)]/30 rounded-2xl p-4">
          <p className="text-sm font-semibold text-[var(--ochre-deep)] mb-1">
            {selected === 'not-visible' ? 'Nem baj.' : 'Szép megfigyelés!'}
          </p>
          <p className="text-sm text-ink-soft leading-snug">
            {options.find((o) => o.id === selected)?.note}
          </p>
        </div>
      )}
    </div>
  )
}
