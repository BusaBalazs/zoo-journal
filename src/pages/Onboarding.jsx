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
    <section className="bg-[var(--paper-raised)]  min-h-[calc(100vh-56px)]">
      <div className="w-56 mx-auto bg-[var(--paper)]/45 px-6 pt-8  rounded-b-full shadow-lg overflow-hidden">
        <img src={icons.diary} className="w-25 h-25  mx-auto" />
      </div>
      <div className="relative z-20 max-w-md mx-auto flex flex-col ">
       

        <div className="flex-1 px-6 pt-8 pb-8 flex flex-col text-center">
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
        <img
          src={bg.giraffeBg}
          alt="giraffe decor background"
          className="absolute left-0 bottom-0 object-contain object-bottom select-none pointer-events-none z-0"
        />
    </section>
  );
}
