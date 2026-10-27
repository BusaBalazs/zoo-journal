import { useState } from "react";
import {
  IconCheck,
  IconDrink,
  IconEye,
  IconEyeOff,
  IconFork,
  IconMoon,
  IconPlay,
  IconPlus,
  IconPreen,
  IconSwim,
  IconWalk,
} from "./icons";
import Modal from "./Modal";
import { useLanguage } from "../i18n/LanguageContext";

const OPTION_ICON = {
  resting: IconMoon,
  moving: IconWalk,
  eating: IconFork,
  watching: IconEye,
  playing: IconPlay,
  drinking: IconDrink,
  swimming: IconSwim,
  preening: IconPreen,
  "not-visible": IconEyeOff,
  other: IconPlus,
};

export default function ObservationQuestion({
  options,
  onAnswer,
  onContinue,
  continueLabel,
}) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [otherText, setOtherText] = useState("");
  const choices = [
    ...options.filter((option) => option.id !== "other"),
    { id: "other", label: t("other") },
  ];

  function choose(option) {
    setSelected(option.id);
    setIsFeedbackOpen(true);
    setOtherText("");
    onAnswer?.(option);
  }

  function chooseOther() {
    setSelected("other");
    setIsFeedbackOpen(true);
    onAnswer?.(
      otherText.trim()
        ? { id: "other", label: otherText.trim(), note: "" }
        : null,
    );
  }

  function updateOtherText(value) {
    setOtherText(value);
    const text = value.trim();
    onAnswer?.(text ? { id: "other", label: text, note: "" } : null);
  }

  const selectedNote = options.find((option) => option.id === selected)?.note;
  const feedbackTitle =
    selected === "other"
      ? t("otherObservationTitle")
      : selected === "not-visible"
        ? t("notVisibleFeedbackTitle")
        : t("observationFeedbackTitle");

  return (
    <div className="space-y-2.5">
      {choices.map((option) => {
        const isSelected = selected === option.id;
        const OptionIcon = OPTION_ICON[option.id];

        return (
          <button
            key={option.id}
            type="button"
            onClick={() =>
              option.id === "other" ? chooseOther() : choose(option)
            }
            aria-pressed={isSelected}
            className={`w-full flex items-center gap-3 pl-3 pr-4 py-3 rounded-2xl border text-left transition-colors shadow-sm ${
              isSelected
                ? "bg-[color:var(--green-mid)]/10 border-[var(--green-mid)]"
                : "bg-[var(--paper)] border-[var(--rule)] hover:border-[var(--green-mid)]"
            }`}
          >
            <span
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                isSelected
                  ? "bg-[var(--green-mid)] text-white"
                  : "bg-[var(--paper)] text-[var(--green-mid)]"
              }`}
            >
              {OptionIcon && <OptionIcon className="w-4.5 h-4.5" />}
            </span>
            <span
              className={`flex-1 font-medium ${
                isSelected ? "text-[var(--green-deep)]" : "text-ink"
              }`}
            >
              {option.label}
            </span>
            {isSelected && (
              <span className="w-6 h-6 rounded-full bg-[var(--green-mid)] text-white flex items-center justify-center shrink-0">
                <IconCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </button>
        );
      })}

      {selected && isFeedbackOpen && (
        <Modal
          title={feedbackTitle}
          onClose={() => setIsFeedbackOpen(false)}
        >
          {selected === "other" ? (
            <div className="mb-5">
              <label
                htmlFor="other-observation"
                className="block text-sm text-ink-soft mb-2"
              >
                {t("otherObservationPrompt")}
              </label>
              <input
                id="other-observation"
                type="text"
                value={otherText}
                onChange={(event) => updateOtherText(event.target.value)}
                maxLength={80}
                placeholder={t("otherObservationPlaceholder")}
                className="w-full bg-[var(--paper)] border border-[var(--rule)] rounded-2xl px-4 py-3 text-ink outline-none focus:border-[var(--green-mid)]"
              />
              <p className="text-xs text-ink-soft text-right mt-1">
                {otherText.length}/80
              </p>
            </div>
          ) : (
            <div className="bg-[color:var(--ochre)]/12 border border-[color:var(--ochre)]/30 rounded-2xl p-4 mb-5">
              <p className="text-sm text-ink-soft leading-snug">
                {selectedNote}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={onContinue}
            disabled={selected === "other" && !otherText.trim()}
            className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold disabled:opacity-40 hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2"
          >
            {continueLabel}
            <span aria-hidden>→</span>
          </button>
        </Modal>
      )}
    </div>
  );
}
