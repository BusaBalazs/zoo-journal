import { IconBook, IconBpZoo } from "../components/icons";
import { icons, bg } from "../assets/index.js";

import { useLanguage } from "../i18n/LanguageContext";

//---------------------------------------------------------------------
//---------------------------------------------------------------------
export default function Splash({ onStart, onOpenJournal }) {
  const { language, languages, setLanguage, t } = useLanguage();
  return (
    <div className="min-h-screen max-w-md mx-auto relative flex flex-col text-white overflow-hidden">
      <img
        src={bg.lionBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(28,28,28,0.05) 40%, rgba(28,28,28,0.64) 82%, rgba(28,28,28,0.8) 100%)",
        }}
      />

      <div className="relative flex-1 flex flex-col justify-end px-6 pb-9 pt-8">
        <div className="flex items-center gap-2 mb-auto">
          <span className="w-20 h-20 backdrop-blur-xs flex items-center justify-center p-2">
            <IconBpZoo />
          </span>

          <label className="ml-auto">
            <span className="sr-only">{t("language")}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="text-xs px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white outline-none cursor-pointer"
            >
              {languages.map((item) => (
                <option key={item.code} value={item.code} className="text-ink">
                  {item.short}
                </option>
              ))}
            </select>
          </label>
        </div>

        <h1 className="font-display text-4xl leading-[1.08] mb-3">
          {t("discover")}
          <br />
          {t("observe")}
          <br />
          {t("record")}
        </h1>
        <p className="text-white/80 leading-relaxed mb-7 max-w-xs">
          {t("splashBody")}
        </p>

        <button
          onClick={onStart}
          className="w-full py-3.5 rounded-full bg-[var(--green-mid)] font-semibold flex items-center justify-center gap-2 transition-colors mb-3"
        >
          {t("startResearch")}
          <span aria-hidden>→</span>
        </button>
        <button
          onClick={onOpenJournal}
          className="w-full py-3.5 rounded-full border border-white/35 font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors mb-6"
        >
          <IconBook className="w-6 h-6" />
          {t("myJournal")}
        </button>
      </div>
    </div>
  );
}
