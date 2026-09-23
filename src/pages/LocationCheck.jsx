import { useState } from "react";
import {
  IconArrowLeft,
  IconClock,
  IconShield,
  IconBook,
} from "../components/icons";
import { ZOO, isWithinZoo } from "../utils/session";
import { useLanguage } from "../i18n/LanguageContext";
import {icons, bg} from "../assets"

//-----------------------------------------------------------------------
const STEPS = {
  idle: "idle",
  checking: "checking",
  matched: "matched",
  unmatched: "unmatched",
  unavailable: "unavailable",
};

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
export default function LocationCheck({ onBack, onMatched, onOpenJournal }) {
  const [step, setStep] = useState(STEPS.idle);
  const { t } = useLanguage();

  function evaluate(lat, lng) {
    if (isWithinZoo(lat, lng)) {
      setStep(STEPS.matched);
    } else {
      setStep(STEPS.unmatched);
    }
  }

  function handleCheck() {
    setStep(STEPS.checking);

    if (!("geolocation" in navigator)) {
      setStep(STEPS.unavailable);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => evaluate(pos.coords.latitude, pos.coords.longitude),
      () => setStep(STEPS.unavailable),
      { timeout: 6000 },
    );
  }

  // Dev-only shortcuts so the flow can be tested away from the zoo.
  function simulate(matched) {
    setStep(STEPS.checking);
    setTimeout(() => setStep(matched ? STEPS.matched : STEPS.unmatched), 500);
  }

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)] relative overflow-hidden">
      <div className="px-5 pt-5 flex items-center gap-4">
        <button
          onClick={onBack}
          aria-label={t("back")}
          className="w-9 h-9 -ml-1.5 rounded-full flex items-center justify-center text-ink-soft hover:bg-[var(--paper)] transition-colors"
        >
          <IconArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 px-6 pt-4 pb-8 flex flex-col items-center text-center relative">
     
          <img src={icons.map} className="w-20 h-20 mb-10 " />
        

        {(step === STEPS.idle || step === STEPS.checking) && (
          <>
            <h1 className="font-display text-2xl text-ink mb-2">
              {t("startToday")}
            </h1>
            <p className="text-ink-soft leading-relaxed mb-7 max-w-xs">
              {t("locationBody")}
            </p>

            <div className="w-full bg-[var(--paper-light)]  rounded-2xl p-4 text-left mb-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2.5 text-sm text-ink">
                <IconClock className="w-8 h-8 mt-0.5 shrink-0 text-[var(--green-mid)]" />
                {t("locationPermission")}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-ink">
                <IconShield className="w-8 h-8 mt-0.5 shrink-0 text-[var(--green-mid)]" />
                {t("dataSafe")}
              </div>
            </div>

            <button
              onClick={handleCheck}
              disabled={step === STEPS.checking}
              className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors disabled:opacity-60"
            >
              {step === STEPS.checking ? t("checking") : t("checkLocation")}
            </button>

            <div className="mt-8 text-xs text-ink-soft/70">
              <p className="mb-1.5">{t("prototype")}</p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => simulate(true)}
                  className="underline underline-offset-2 hover:text-ink-soft"
                >
                  {t("simulateHere")}
                </button>
                <button
                  onClick={() => simulate(false)}
                  className="underline underline-offset-2 hover:text-ink-soft"
                >
                  {t("simulateAway")}
                </button>
              </div>
            </div>
          </>
        )}

        {step === STEPS.matched && (
          <div className="rise-in w-full">
            <h1 className="font-display text-2xl text-ink mb-2">
              {t("locationConfirmed")}
            </h1>
            <p className="text-ink-soft leading-relaxed mb-7 max-w-xs mx-auto">
              {t("locationConfirmedBody", ZOO.name)}
            </p>
            <button
              onClick={() => onMatched()}
              className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors"
            >
              {t("startSession")}
            </button>
          </div>
        )}

        {(step === STEPS.unmatched || step === STEPS.unavailable) && (
          <div className="rise-in w-full">
            <h1 className="font-display text-2xl text-ink mb-2">
              {t("notAtZoo")}
            </h1>
            <p className="text-ink-soft leading-relaxed mb-7 max-w-xs mx-auto">
              {step === STEPS.unavailable
                ? t("locationUnavailable")
                : t("locationOutside", ZOO.name)}
            </p>
            <button
              onClick={onOpenJournal}
              className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2 mb-3"
            >
              <IconBook className="w-4 h-4" />
              {t("journalOpen")}
            </button>
            <button
              onClick={() => setStep(STEPS.idle)}
              className="w-full py-3.5 rounded-full border border-[var(--rule)] text-ink font-medium hover:border-[var(--green-mid)] transition-colors"
            >
              {t("retry")}
            </button>
          </div>
        )}
      </div>

      <img
        src={bg.treesBg}
        alt=""
        className="w-full object-cover object-top pointer-events-none select-none mt-auto"
      />
    </div>
  );
}
