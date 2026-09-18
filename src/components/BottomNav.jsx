import { IconHome, IconBook, IconCompass } from './icons'

const TABS = [
  { id: 'home', label: 'Kezdőlap', Icon: IconHome },
  { id: 'explore', label: 'Kutatás', Icon: IconCompass },
  { id: 'journal', label: 'Napló', Icon: IconBook },
]

export default function BottomNav({ current, onChange }) {
  return (
    <nav className="sticky bottom-0 z-30 bg-[var(--paper-raised)] border-t border-[var(--rule)]">
      <div className="max-w-md mx-auto grid grid-cols-3">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = current === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex flex-col items-center gap-1 py-2.5 text-xs transition-colors"
              style={{ color: isActive ? 'var(--green-deep)' : 'var(--ink-soft)' }}
            >
              <Icon className="w-5 h-5" />
              <span className={isActive ? 'font-medium' : ''}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
