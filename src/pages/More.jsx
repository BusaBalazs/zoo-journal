import { useState } from "react";
import { remainingLabel } from "../utils/session";
import { ZOO } from "../utils/session";
import { useLanguage } from "../i18n/LanguageContext";
import { bg } from "../assets";
import { IconCheck, IconEdit } from "../components/icons";

//------------------------------------------------------------
//------------------------------------------------------------
export default function More({
  user,
  visit,
  active,
  onRetryLocation,
  onExpireSession,
  onUpdateUser,
}) {
  const { language, languages, setLanguage, t } = useLanguage();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(user.name || "");

  function saveName() {
    const trimmed = nameDraft.trim();
    if (!trimmed) return;
    onUpdateUser(trimmed);
    setNameDraft(trimmed);
    setIsEditingName(false);
  }

  function handleNameKeyDown(event) {
    if (event.key === "Enter") saveName();
    if (event.key === "Escape") {
      setNameDraft(user.name || "");
      setIsEditingName(false);
    }
  }
  //------------------------------------------------------------
  return (
    <section
      className=" bg-[var(--paper-raised)] min-h-[calc(100vh-56px)]"
      style={{
        background:
          "linear-gradient(to bottom, rgb(51, 88, 71) 40%, rgb(102, 131, 117) 75%",
      }}
    >
      <div className="max-w-md mx-auto px-4 py-5 relative z-20">
        <h1 className="font-display text-2xl text-white my-8 text-center">
          {t("settings")}
        </h1>

        <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-2xl p-4 flex items-center gap-3 mb-5 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[var(--green-deep)] text-white flex items-center justify-center font-semibold text-lg shrink-0">
            {user.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div className="min-w-0 py-4">
            {isEditingName ? (
              <div className="flex items-center gap-1">
                <input
                  autoFocus
                  type="text"
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  onKeyDown={handleNameKeyDown}
                  aria-label="Name"
                  className="min-w-0 w-full border-b border-[var(--green-mid)] bg-transparent font-display text-lg text-ink leading-tight outline-none"
                />
                <button
                  type="button"
                  onClick={saveName}
                  aria-label="Save name"
                  className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[var(--green-deep)] hover:bg-[var(--paper-raised)] transition-colors bg-[var(--green-deep)]/20 p-1 ml-1"
                >
                  <IconCheck className="w-8 h-8" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <p className="font-display text-lg text-ink leading-tight truncate">
                  {user.name}
                </p>
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  aria-label="Edit name"
                  className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-ink-soft hover:bg-[var(--paper-raised)] transition-colors bg-[var(--green-deep)]/20 p-1"
                >
                  <IconEdit className="w-6 h-6" />
                </button>
              </div>
            )}
            <p className="text-sm text-ink-soft mt-4">
              {t("researcher")} · {ZOO.name}
            </p>
          </div>
        </div>

        <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-2xl divide-y divide-[var(--rule)] mb-5 overflow-hidden py-4">
          <div className="flex items-center justify-between px-4 py-3.5">
            <label htmlFor="language" className="text-sm text-ink">
              {t("language")}
            </label>
            <select
              id="language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="text-sm text-ink-soft bg-transparent outline-none text-right"
            >
              {languages.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label} ({item.short})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-sm text-ink">{t("session")}</span>
            <span className="text-sm text-ink-soft">
              {active ? remainingLabel(visit, language) : t("noActive")}
            </span>
          </div>
        </div>

        <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-soft mb-3">
            {t("prototype")}
          </p>
          <div className="space-y-2">
            <button
              onClick={onRetryLocation}
              className="w-full py-2.5 rounded-xl border border-[var(--rule)] text-sm text-ink hover:border-[var(--green-mid)] transition-colors"
            >
              {t("locationRetry")}
            </button>
            <button
              onClick={onExpireSession}
              disabled={!active}
              className="w-full py-2.5 rounded-xl border border-[var(--rule)] text-sm text-ink-soft disabled:opacity-40 hover:border-[var(--clay)] hover:text-[var(--clay)] transition-colors"
            >
              {language === "hu"
                ? "Munkamenet lejáratása / visszavonása"
                : language === "de"
                  ? "Sitzung ablaufen lassen / widerrufen"
                  : "Expire / revoke session"}
            </button>
          </div>
        </div>
      </div>
      <img
        src={bg.giraffeBgS}
        className="w-full absolute bottom-0 pointer-events-none select-none"
      />
    </section>
  );
}
