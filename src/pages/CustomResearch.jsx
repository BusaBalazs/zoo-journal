import { useState } from "react";
import Header from "../components/Header";
import PhotoPicker from "../components/PhotoPicker";
import SuccessView from "../components/SuccessView";
import RestrictedGate from "../components/RestrictedGate";
import {
  IconCamera,
  IconCheck,
  IconEye,
  IconFork,
  IconLeaf,
  IconMoon,
  IconPaw,
  IconPlay,
  IconWalk,
} from "../components/icons";
import {
  ANIMAL_TYPES,
  DIET_OPTIONS,
  OBSERVED_OPTIONS,
  getOptionLabel,
} from "../data/animals";
import { useLanguage } from "../i18n/LanguageContext";

const OBSERVATION_ICONS = {
  moving: IconWalk,
  resting: IconMoon,
  eating: IconFork,
  drinking: IconFork,
  playing: IconPlay,
  watching: IconEye,
  other: IconEye,
};

//----------------------------------------------------------------------
function ChoiceList({
  options,
  value,
  onChange,
  language,
  OptionIcon,
  getOptionIcon,
}) {
  return (
    <div className="space-y-2.5">
      {options.map((opt) => {
        const CurrentOptionIcon = getOptionIcon?.(opt) || OptionIcon;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`w-full flex items-center gap-3 pl-3 pr-4 py-3 rounded-2xl border text-left transition-colors shadow-sm ${
              value === opt.id
                ? "bg-[color:var(--green-mid)]/10 border-[var(--green-mid)]"
                : "bg-[var(--paper)] border-[var(--rule)] hover:border-[var(--green-mid)]"
            }`}
          >
            <span
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                value === opt.id
                  ? "bg-[var(--green-mid)] text-white"
                  : "bg-[var(--paper)] text-[var(--green-mid)]"
              }`}
            >
              <CurrentOptionIcon className="w-4.5 h-4.5" />
            </span>
            <span
              className={`flex-1 font-medium ${
                value === opt.id ? "text-[var(--green-deep)]" : "text-ink"
              }`}
            >
              {getOptionLabel(opt, language)}
            </span>
            {value === opt.id && (
              <span className="w-6 h-6 rounded-full bg-[var(--green-mid)] text-white flex items-center justify-center shrink-0">
                <IconCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

//----------------------------------------------------------------------
//----------------------------------------------------------------------
export default function CustomResearch({
  active,
  onBack,
  onGoExplore,
  onGoJournal,
  onStartVisit,
  onSave,
}) {
  //----------------------------------------------------------------------
  const [name, setName] = useState("");
  const [type, setType] = useState(null);
  const [diet, setDiet] = useState(null);
  const [observed, setObserved] = useState(null);
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState(null);
  const [savedEntry, setSavedEntry] = useState(null);
  const [step, setStep] = useState(0);
  const { language, t } = useLanguage();

  //----------------------------------------------------------------------
  if (savedEntry) {
    return (
      <SuccessView
        entry={savedEntry}
        onContinueResearch={onGoExplore}
        onOpenJournal={onGoJournal}
      />
    );
  }

  //----------------------------------------------------------------------
  if (!active) {
    return (
      <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)]">
        <Header title={t("customResearch")} onBack={onBack} />
        <RestrictedGate
          onRetryLocation={onStartVisit}
          onOpenJournal={onGoJournal}
        />
      </div>
    );
  }

  //----------------------------------------------------------------------
  const canSave = name.trim().length > 0;
  const selectedValues = [name, type, diet, observed];
  const canContinue = step === 0 ? canSave : step === 4 || !!selectedValues[step];
  const stepTitles = [
    t("animalName"),
    t("animalType"),
    t("diet"),
    t("observed"),
    t("takePhoto"),
  ];
  const stepIcons = [IconPaw, IconPaw, IconLeaf, IconEye, IconCamera];
  const StepIcon = stepIcons[step];
  const stepDescription =
    step === 0
      ? t("customBody")
      : step === 3
        ? t("observationPrompt")
        : step === 4
          ? t("photoBody")
          : null;

  function handleContinue() {
    if (!canContinue) return;
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    handleSave();
  }

  function handleSave() {
    if (!canSave) return;
    const entry = {
      animalId: null,
      animalName: name.trim(),
      type: "custom",
      animalType: getOptionLabel(
        ANIMAL_TYPES.find((option) => option.id === type),
        language,
      ),
      diet: getOptionLabel(
        DIET_OPTIONS.find((option) => option.id === diet),
        language,
      ),
      observation: getOptionLabel(
        OBSERVED_OPTIONS.find((option) => option.id === observed),
        language,
      ),
      learnedFacts: null,
      photo,
      notes: notes.trim(),
    };
    const saved = onSave(entry);
    setSavedEntry(saved);
  }

  //----------------------------------------------------------------------
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)]">
      <Header title={t("customResearch")} onBack={onBack} />

      <main className="flex-1 px-6 pt-6 pb-8">
        <div
          className="flex gap-1.5 mb-8"
          aria-label={`${step + 1} / 5`}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={5}
          aria-valuenow={step + 1}
        >
          {stepTitles.map((title, index) => (
            <span
              key={title}
              className={`h-1.5 flex-1 rounded-full ${
                index <= step ? "bg-[var(--green-mid)]" : "bg-[var(--rule)]"
              }`}
            />
          ))}
        </div>

        <section key={step} className="rise-in">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--paper)]/70 text-[var(--green-mid)] flex items-center justify-center shadow-sm">
            <StepIcon className="w-9 h-9" />
          </div>
          <h1 className="font-display text-2xl text-ink mb-1.5 text-center">
            {stepTitles[step]}
          </h1>
          {stepDescription && (
            <p className="text-ink-soft mb-6 text-center">{stepDescription}</p>
          )}

          {step === 0 && (
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t("animalName")}
              className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none shadow-sm"
            />
          )}

          {step === 1 && (
            <ChoiceList
              options={ANIMAL_TYPES}
              value={type}
              onChange={setType}
              language={language}
              OptionIcon={IconPaw}
            />
          )}

          {step === 2 && (
            <ChoiceList
              options={DIET_OPTIONS}
              value={diet}
              onChange={setDiet}
              language={language}
              OptionIcon={IconLeaf}
            />
          )}

          {step === 3 && (
            <ChoiceList
              options={OBSERVED_OPTIONS}
              value={observed}
              onChange={setObserved}
              language={language}
              OptionIcon={IconEye}
              getOptionIcon={(option) => OBSERVATION_ICONS[option.id]}
            />
          )}

          {step === 4 && (
            <div className="space-y-5">
              <PhotoPicker
                photo={photo}
                onChange={setPhoto}
                label={`${t("customResearch")} (${t("optional")})`}
              />
              <div>
                <p className="text-sm font-medium text-ink-soft mb-2">
                  {t("ownNote")} ({t("optional")})
                </p>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder={t("notePlaceholder")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none resize-none"
                />
              </div>
            </div>
          )}
        </section>

        <div className="flex items-center gap-3 mt-8">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-3.5 rounded-full border border-[var(--rule)] text-ink-soft font-semibold hover:border-[var(--green-mid)] transition-colors"
            >
              {t("back")}
            </button>
          )}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="flex-1 py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold disabled:opacity-40 hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2"
          >
            {step === 4 ? t("saveResearch") : t("continue")}
            <span aria-hidden>→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
