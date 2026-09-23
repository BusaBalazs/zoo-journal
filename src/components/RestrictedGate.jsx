import { IconMap, IconBook } from "./icons";

import { useLanguage } from "../i18n/LanguageContext";
import { icons, bg } from "../assets";

//---------------------------------------------------------------------
//---------------------------------------------------------------------
export default function RestrictedGate({ onRetryLocation, onOpenJournal }) {
  const { t } = useLanguage();
  //---------------------------------------------------------------------
  return (
    <section className="bg-[var(--paper-raised)]  min-h-[calc(100vh-56px)]">
      <div className="max-w-md mx-auto px-6 pt-14 relative overflow-hidden flex flex-col">
        <div className="relative flex-1 flex flex-col items-center text-center">
          <img src={icons.map} className="w-20 h-20 mb-10" />

          <h1 className="font-display text-2xl text-ink mb-2">
            {t("outsideZoo")}
          </h1>
          <p className="text-ink-soft leading-relaxed mb-10 max-w-xs">
            {t("restrictedBody")}
          </p>
          <button
            onClick={onRetryLocation}
            className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors mb-3"
          >
            {t("locationRetry")}
          </button>
          <button
            onClick={onOpenJournal}
            className="w-full py-3.5 rounded-full border border-[var(--ochre)] text-ink font-medium bg-[var(--paper)]/80 hover:border-[var(--green-mid)] transition-colors flex items-center justify-center gap-2 relative z-20"
          >
            <img src={icons.diary} className="w-10 h-10" />
            {t("journalOpen")}
          </button>
        </div>
      </div>
      <img
        src={bg.treesBg}
        alt=""
        className="w-full absolute bottom-10 z-0 object-cover object-top pointer-events-none select-none "
      />
    </section>
  );
}
