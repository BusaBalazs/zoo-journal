import { useLanguage } from "../i18n/LanguageContext";

//---------------------------------------------------------------------
function formatDate(ts, language, t) {
  const d = new Date(ts);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();

  if (sameDay) return t("observedToday");

  const locale = { hu: "hu-HU", en: "en-US", de: "de-DE" }[language];
  const date = d.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
  });
  return t("observedOn", date);
}

//---------------------------------------------------------------------
export default function JournalCard({ entry, onClick }) {
  const { language, t } = useLanguage();
  
  //---------------------------------------------------------------------
  return (
    <button
      onClick={onClick}
      className="text-left w-full bg-[var(--paper-raised)]/95 border border-[var(--rule)] rounded-2xl p-4 flex gap-3 hover:border-[var(--green-mid)] transition-colors"
    >
      <div className="w-25 h-25 rounded-xl overflow-hidden shrink-0 bg-[color:var(--green-line)]/40">
    
          <img
            src={entry.photo}
            alt={entry.animalName}
            className="w-full h-full object-cover"
          />
       
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-base text-ink truncate text-[1.5rem]">
            {entry.animalName}
          </p>
        </div>
        <p className="text-xs text-ink-soft">
          {formatDate(entry.createdAt, language, t)}
        </p>
        {entry.type === "custom" && (
          <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-[color:var(--ochre)]/15 text-[var(--ochre-deep)]">
            {t("customResearch")}
          </span>
        )}
        {entry.type === "featured" && (
          <span className="inline-block mt-6 text-[11px] px-2 py-0.5 rounded-full bg-[color:var(--green-mid)]/12 text-[var(--green-deep)]">
            {t("featuredAnimals")}
          </span>
        )}
        {entry.notes && (
          <p className="text-sm text-ink-soft mt-1.5 line-clamp-1">
            &ldquo;{entry.notes}&rdquo;
          </p>
        )}
      </div>
    </button>
  );
}
