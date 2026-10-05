import { useState } from "react";
import { LayoutGroup } from "framer-motion";
import JournalCard from "../components/JournalCard";
import EntryDetail from "./EntryDetail";
import { IconBook, IconPin } from "../components/icons";
import { useLanguage } from "../i18n/LanguageContext";

import { icons, bg } from "../assets/";

//-----------------------------------------------------------------
//-----------------------------------------------------------------
export default function Journal({
  entries,
  active,
  onRetryLocation,
  onUpdateEntry,
  onDeleteEntry,
}) {
  //-----------------------------------------------------------------
  const { t } = useLanguage();
  const [openEntryId, setOpenEntryId] = useState(null);
  const sorted = [...entries].sort((a, b) => b.createdAt - a.createdAt);
  const openEntry = sorted.find((entry) => entry.id === openEntryId);

  //-----------------------------------------------------------------
  return (
    <LayoutGroup id="journal-entry-cards">
      <img
        src={bg.noAnimalsBg}
        className="w-full  absolute fixed bottom-8 pointer-events-none select-none left-0"
      />

      <section className="min-h-[calc(100vh-56px)] bg-[var(--paper-raised)]">
        <div className="max-w-md mx-auto  ">
          <div className="bg-[var(--green-deep)] p-4 pb-6 flex items-center justify-between w-full overflow-hidden">
            <div>
              <h1 className="font-display text-2xl text-white mt-2 mb-1 text-left">
                {t("journalTitle")}
              </h1>
              <p className="text-white/85 text-sm text-left">
                {entries.length === 0
                  ? t("emptyJournal")
                  : `${entries.length} ${t("observedAnimals")}.`}
              </p>
            </div>
            <div className="w-22 h-22 flex items-center mb-4 overflow-hidden">
              <img src={icons.diary} className="w-full aspect-square mx-auto" />
            </div>
          </div>

          <svg
            className="w-full h-10 block text-[var(--paper-raised)] -mt-8"
            viewBox="0 0 1440 120"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,120L0,120Z"></path>
          </svg>

          <div className="relative z-30 px-4 pb-5">
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
              <div className=" bg-[color:var(--paper)]/80 backdrop-blur-sm text-center py-16 px-6 rounded-2xl border border-white ">
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
              <div className="grid grid-cols-2 gap-3">
                {sorted.map((entry) => (
                  <JournalCard
                    key={entry.id}
                    entry={entry}
                    isActive={entry.id === openEntryId}
                    onClick={() => setOpenEntryId(entry.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {openEntry && (
          <EntryDetail
            key={openEntry.id}
            entry={openEntry}
            layoutId={`journal-entry-${openEntry.id}`}
            onBack={() => setOpenEntryId(null)}
            onUpdate={onUpdateEntry}
            onDelete={onDeleteEntry}
          />
        )}
      </section>
    </LayoutGroup>
  );
}
