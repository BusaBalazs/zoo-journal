import JournalCard from '../components/JournalCard'
import { IconBook, IconPin } from '../components/icons'
import { useLanguage } from '../i18n/LanguageContext'

export default function Journal({ entries, active, onOpenEntry, onRetryLocation }) {
  const { t } = useLanguage()
  const sorted = [...entries].sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div className="max-w-md mx-auto px-4 py-5">
      <h1 className="font-display text-2xl text-ink mb-1">{t('journalTitle')}</h1>
      <p className="text-ink-soft text-sm mb-4">
        {entries.length === 0
          ? t('emptyJournal')
          : `${entries.length} ${t('observedAnimals')}.`}
      </p>

      {!active && (
        <button
          onClick={onRetryLocation}
          className="w-full flex items-center gap-2.5 text-left bg-[color:var(--ochre)]/10 border border-[color:var(--ochre)]/25 rounded-2xl px-4 py-3 mb-5 hover:bg-[color:var(--ochre)]/15 transition-colors"
        >
          <IconPin className="w-4 h-4 text-[var(--ochre-deep)] shrink-0" />
          <span className="text-sm text-ink">
            {t('noActiveVisit')}
          </span>
        </button>
      )}

      {sorted.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-2xl border border-dashed border-[var(--rule)]">
          <div className="w-12 h-12 rounded-2xl bg-[color:var(--green-mid)]/12 text-[var(--green-deep)] flex items-center justify-center mx-auto mb-4">
            <IconBook className="w-5 h-5" />
          </div>
          <p className="text-ink font-medium mb-1">{t('emptyJournalTitle')}</p>
          <p className="text-sm text-ink-soft leading-relaxed">
            {t('emptyJournalBody')}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {sorted.map((entry) => (
            <JournalCard key={entry.id} entry={entry} onClick={() => onOpenEntry(entry.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
