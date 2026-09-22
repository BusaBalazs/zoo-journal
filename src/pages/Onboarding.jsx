import { useState } from "react";
import { IconArrowLeft } from "../components/icons";
import { icons, bg } from "../assets";
import { useLanguage } from "../i18n/LanguageContext";

//------------------------------------------------------------
export default function Onboarding({ onBack, onSubmit }) {
  const [name, setName] = useState("");
  const { t } = useLanguage();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  //------------------------------------------------------------
  //------------------------------------------------------------
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)]">
      <img
        src={bg.giraffeBg}
        alt="giraffe decor background"
        className="absolute left-0 bottom-0 object-contain object-bottom select-none pointer-events-none z-0"
      />
      <div className="px-5 pt-5 flex items-center gap-4">
        <button
          onClick={onBack}
          aria-label={t("back")}
          className="w-9 h-9 -ml-1.5 rounded-full flex items-center justify-center text-ink-soft hover:bg-[var(--paper)] transition-colors"
        >
          <IconArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 flex gap-1.5">
          <span
            className="h-1.5 rounded-full bg-[var(--green-mid)]"
            style={{ flex: 2 }}
          />
          <span
            className="h-1.5 rounded-full bg-[var(--rule)]"
            style={{ flex: 1 }}
          />
          <span
            className="h-1.5 rounded-full bg-[var(--rule)]"
            style={{ flex: 1 }}
          />
        </div>
      </div>

      <div className="flex-1 px-6 pt-8 pb-8 flex flex-col text-center">
        <img src={icons.leaf} className="w-14 h-14  mb-6 mx-auto" />

        <h1 className="font-display text-3xl text-ink mb-2 leading-tight">
          {t("askName")}
        </h1>
        <p className="text-ink-soft mb-8 leading-relaxed">{t("nameBody")}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--rule)] bg-[var(--paper)] text-ink placeholder:text-ink-soft/50 focus:border-[var(--green-mid)] outline-none text-lg"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold disabled:opacity-40 hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2 relative z-30"
          >
            {t("next")}
            <span aria-hidden>→</span>
          </button>
        </form>

        {/* <div className="absolute right-0 top-2 max-w-[168px] bg-[var(--paper)] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
            <p className="text-sm text-ink leading-snug">{t("nameHint")}</p>
          </div> */}
      </div>
    </div>
  );
}
