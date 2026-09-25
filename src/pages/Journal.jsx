import JournalCard from "../components/JournalCard";
import { IconBook, IconPin } from "../components/icons";
import { useLanguage } from "../i18n/LanguageContext";

import { icons, bg } from "../assets/";

export default function Journal({
  entries,
  active,
  onOpenEntry,
  onRetryLocation,
}) {
  const { t } = useLanguage();
  const sorted = [...entries].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <section
      className="  min-h-[calc(100vh-56px)]"
      style={{
        background:
          "linear-gradient(to bottom, rgb(81, 110, 97) 40%, rgb(102, 131, 117) 75%",
      }}
    >
      <div className="w-56 mx-auto bg-[var(--paper)]/15 px-6 pt-8 mb-4 rounded-b-full shadow-lg overflow-hidden">
        <img src={icons.zoo} className="w-30 h-30 mx-auto" />
      </div>

      <img
        src={bg.giraffeBgS}
        className="w-full absolute bottom-0 pointer-events-none select-none left-0"
      />

      <div className="max-w-md mx-auto px-4 pb-5 ">
        <div className="relative z-30">
          <h1 className="font-display text-2xl text-white mt-2 mb-1 text-center">
            {t("journalTitle")}
          </h1>
          <p className="text-gray-200 text-sm mb-8 text-center">
            {entries.length === 0
              ? t("emptyJournal")
              : `${entries.length} ${t("observedAnimals")}.`}
          </p>

          {!active && (
            <button
              onClick={onRetryLocation}
              className="w-full flex items-center gap-2.5 text-left backdrop-blur-sm bg-[color:var(--paper-raised)]/80 border border-[color:var(--clay)] rounded-2xl px-4 py-3 mb-5 hover:bg-[color:var(--ochre)]/15 transition-colors"
            >
              <IconPin className="w-4 h-4 text-[var(--ochre-deep)] shrink-0" />
              <span className="text-sm text-ink">{t("noActiveVisit")}</span>
            </button>
          )}

          {sorted.length === 0 ? (
            <div className=" bg-[color:var(--paper-raised)]/80 backdrop-blur-sm text-center py-16 px-6 rounded-2xl border border-dashed border-[var(--rule)] ">
              <div className="w-12 h-12 rounded-2xl bg-[color:var(--green-mid)]/12 text-[var(--green-deep)] flex items-center justify-center mx-auto mb-4">
                <IconBook className="w-5 h-5" />
              </div>
              <p className="text-ink font-medium mb-1">
                {t("emptyJournalTitle")}
              </p>
              <p className="text-sm text-ink-soft leading-relaxed">
                {t("emptyJournalBody")}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {sorted.map((entry) => (
                <JournalCard
                  key={entry.id}
                  entry={entry}
                  onClick={() => onOpenEntry(entry.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
