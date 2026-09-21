import { IconMap, IconBook } from './icons'
import { ZOO } from '../utils/session'
import { useLanguage } from '../i18n/LanguageContext'

export default function RestrictedGate({ onRetryLocation, onOpenJournal }) {
  const { t } = useLanguage()
  return (
    <div className="max-w-md mx-auto px-6 pt-14 pb-0 relative overflow-hidden min-h-[calc(100vh-56px)] flex flex-col">
      <div className="relative flex-1 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[color:var(--ochre)]/15 text-[var(--ochre-deep)] flex items-center justify-center mb-6">
          <IconMap className="w-7 h-7" />
        </div>
        <h1 className="font-display text-2xl text-ink mb-2">{t('outsideZoo', ZOO.name)}</h1>
        <p className="text-ink-soft leading-relaxed mb-8 max-w-xs">
          {t('restrictedBody')}
        </p>
        <button
          onClick={onRetryLocation}
          className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors mb-3"
        >
          {t('locationRetry')}
        </button>
        <button
          onClick={onOpenJournal}
          className="w-full py-3.5 rounded-full border border-[var(--rule)] text-ink font-medium hover:border-[var(--green-mid)] transition-colors flex items-center justify-center gap-2"
        >
          <IconBook className="w-4 h-4" />
          {t('journalOpen')}
        </button>
      </div>
      <img
        src="/images/location-bg.png"
        alt=""
        className="w-full h-20 object-cover object-top pointer-events-none select-none -mx-6 mt-8"
        style={{ width: 'calc(100% + 3rem)' }}
      />
    </div>
  )
}
