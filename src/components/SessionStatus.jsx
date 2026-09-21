import { IconClock, IconPin } from './icons'
import { remainingLabel, ZOO } from '../utils/session'
import { useLanguage } from '../i18n/LanguageContext'

export default function SessionStatus({ visit, active, onStartVisit }) {
  const { language, t } = useLanguage()
  if (active) {
    return (
      <div className="flex items-center gap-2 text-xs text-[var(--green-mid)] bg-[color:var(--green-mid)]/10 border border-[color:var(--green-mid)]/25 rounded-full px-3 py-1.5 w-fit">
        <IconPin className="w-3.5 h-3.5" />
        <span>{ZOO.name} {t('session').toLowerCase()} aktív</span>
        <span className="text-ink-soft">·</span>
        <span className="flex items-center gap-1 text-ink-soft">
          <IconClock className="w-3.5 h-3.5" />
          {remainingLabel(visit, language)}
        </span>
      </div>
    )
  }

  return (
    <button
      onClick={onStartVisit}
      className="flex items-center gap-2 text-xs text-[var(--ochre-deep)] bg-[color:var(--ochre)]/12 border border-[color:var(--ochre)]/30 rounded-full px-3 py-1.5 w-fit hover:bg-[color:var(--ochre)]/20 transition-colors"
    >
      <IconPin className="w-3.5 h-3.5" />
      {t('noActive')}
    </button>
  )
}
