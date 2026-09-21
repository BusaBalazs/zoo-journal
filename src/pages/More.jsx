import { remainingLabel } from '../utils/session'
import { ZOO } from '../utils/session'
import { useLanguage } from '../i18n/LanguageContext'

export default function More({ user, visit, active, onRetryLocation, onExpireSession }) {
  const { language, languages, setLanguage, t } = useLanguage()
  return (
    <div className="max-w-md mx-auto px-4 py-5">
      <h1 className="font-display text-2xl text-ink mb-5">{t('more')}</h1>

      <div className="bg-[var(--paper-raised)] border border-[var(--rule)] rounded-2xl p-4 flex items-center gap-3 mb-5 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[var(--green-deep)] text-white flex items-center justify-center font-semibold text-lg shrink-0">
          {user.name?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <p className="font-display text-lg text-ink leading-tight">{user.name}</p>
          <p className="text-sm text-ink-soft">{t('researcher')} · {ZOO.name}</p>
        </div>
      </div>

      <div className="bg-[var(--paper-raised)] border border-[var(--rule)] rounded-2xl divide-y divide-[var(--rule)] mb-5 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3.5">
          <label htmlFor="language" className="text-sm text-ink">{t('language')}</label>
          <select id="language" value={language} onChange={(event) => setLanguage(event.target.value)} className="text-sm text-ink-soft bg-transparent outline-none text-right">
            {languages.map((item) => <option key={item.code} value={item.code}>{item.label} ({item.short})</option>)}
          </select>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-sm text-ink">{t('session')}</span>
          <span className="text-sm text-ink-soft">{active ? remainingLabel(visit, language) : t('noActive')}</span>
        </div>
      </div>

      <div className="bg-[var(--paper-raised)] border border-[var(--rule)] rounded-2xl p-4">
        <p className="text-xs font-semibold text-ink-soft mb-3">{t('prototype')}</p>
        <div className="space-y-2">
          <button
            onClick={onRetryLocation}
            className="w-full py-2.5 rounded-xl border border-[var(--rule)] text-sm text-ink hover:border-[var(--green-mid)] transition-colors"
          >
            {t('locationRetry')}
          </button>
          <button
            onClick={onExpireSession}
            disabled={!active}
            className="w-full py-2.5 rounded-xl border border-[var(--rule)] text-sm text-ink-soft disabled:opacity-40 hover:border-[var(--clay)] hover:text-[var(--clay)] transition-colors"
          >
            {language === 'hu' ? 'Munkamenet lejáratása / visszavonása' : language === 'de' ? 'Sitzung ablaufen lassen / widerrufen' : 'Expire / revoke session'}
          </button>
        </div>
      </div>
    </div>
  )
}
