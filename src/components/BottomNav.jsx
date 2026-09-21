import { IconHome, IconBook, IconPaw, IconDots } from './icons'
import { useLanguage } from '../i18n/LanguageContext'

const TABS = [
  { id: 'home', key: 'home', Icon: IconHome },
  { id: 'explore', key: 'explore', Icon: IconPaw },
  { id: 'journal', key: 'journal', Icon: IconBook },
  { id: 'more', key: 'more', Icon: IconDots },
]

export default function BottomNav({ current, onChange }) {
  const { t } = useLanguage()
  return (
    <nav className="sticky bottom-0 z-30 bg-[var(--paper-raised)] border-t border-[var(--rule)]">
      <div className="max-w-md mx-auto grid grid-cols-4">
        {TABS.map(({ id, key, Icon }) => {
          const isActive = current === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex flex-col items-center gap-1 py-2.5 text-xs transition-colors"
              style={{ color: isActive ? 'var(--green-deep)' : 'var(--ink-soft)' }}
            >
              <Icon className="w-5 h-5" />
              <span className={isActive ? 'font-semibold' : ''}>{t(key)}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
