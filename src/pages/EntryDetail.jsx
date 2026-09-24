import { useEffect, useRef, useState } from "react";
import WaveDivider from "../components/WaveDivider";
import Modal from "../components/Modal";
import { LionArt, ElephantArt, LeafBadgeArt } from "../components/creatures";
import {
  IconArrowLeft,
  IconQuestion,
  IconBulb,
  IconChevronDown,
  IconCheck,
  IconCamera,
  IconExpand,
  IconPin,
  IconX,
} from "../components/icons";
import {
  getAnimalById,
  getAnimalObservationOptions,
  getAnimalText,
  getAnimalName,
} from "../data/animals";
import { ZOO } from "../utils/session";
import { useLanguage } from "../i18n/LanguageContext";

const ART = { lion: LionArt, elephant: ElephantArt };
const PHOTO = { lion: "/images/landing-lion.jpg" };
//-----------------------------------------------------------------
function formatObservedAt(ts, language) {
  const d = new Date(ts);
  const today = new Date();
  const locale = { hu: "hu-HU", en: "en-US", de: "de-DE" }[language] || "hu-HU";
  const todayLabel = { hu: "Ma", en: "Today", de: "Heute" }[language] || "Ma";
  const time = d.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (d.toDateString() === today.toDateString())
    return `${todayLabel}, ${time}`;
  return `${d.toLocaleDateString(locale, { month: "short", day: "numeric" })}, ${time}`;
}

//-----------------------------------------------------------------
//-----------------------------------------------------------------
export default function EntryDetail({ entry, onBack, onUpdate, onDelete }) {
  const [notes, setNotes] = useState(entry.notes || "");
  const [photo, setPhoto] = useState(entry.photo || null);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const fileRef = useRef(null);
  //-----------------------------------------------------------------
  const { language, t } = useLanguage();

  //-----------------------------------------------------------------
  const animal =
    entry.type === "featured" ? getAnimalById(entry.animalId) : null;
  const Art = entry.type === "featured" ? ART[entry.animalId] : null;
  const stockPhoto = entry.type === "featured" ? PHOTO[entry.animalId] : null;
  const heroPhoto = photo || stockPhoto;
  const animalName = animal
    ? getAnimalName(animal, language)
    : entry.animalName;
  const animalOptions = animal
    ? getAnimalObservationOptions(animal, language)
    : [];
  const observation = entry.observationId
    ? animalOptions.find((option) => option.id === entry.observationId)
    : null;

  useEffect(() => {
    if (!photoOpen) return undefined;
    function handleKeyDown(e) {
      if (e.key === "Escape") setPhotoOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photoOpen]);

  const dirty =
    notes !== (entry.notes || "") || photo !== (entry.photo || null);

  //-----------------------------------------------------------------
  function handleSave() {
    onUpdate(entry.id, { notes: notes.trim(), photo });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  //-----------------------------------------------------------------
  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  //-----------------------------------------------------------------
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)]">
      <div className="relative h-72 shrink-0 bg-[color:var(--green-line)]/40">
        {heroPhoto ? (
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            aria-label={t("viewPhoto")}
            className="w-full h-full block cursor-zoom-in"
          >
            <img
              src={heroPhoto}
              alt={entry.animalName}
              className="w-full h-full object-cover"
            />
          </button>
        ) : Art ? (
          <Art className="w-full h-full" />
        ) : (
          <LeafBadgeArt className="w-full h-full" />
        )}

        <button
          onClick={onBack}
          aria-label={t("back")}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[color:white]/85 backdrop-blur-sm flex items-center justify-center text-ink shadow-sm"
        >
          <IconArrowLeft className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 right-4 flex gap-2">
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            aria-label={t("viewPhoto")}
            title={t("viewPhoto")}
            className="w-9 h-9 rounded-full bg-[color:white]/85 backdrop-blur-sm flex items-center justify-center text-[var(--green-deep)] shadow-sm hover:bg-white transition-colors"
          >
            <IconExpand className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label={t("replacePhoto")}
            title={t("replacePhoto")}
            className="w-9 h-9 rounded-full bg-[color:white]/85 backdrop-blur-sm flex items-center justify-center text-[var(--green-deep)] shadow-sm hover:bg-white transition-colors"
          >
            <IconCamera className="w-4 h-4" />
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />

        <WaveDivider />
      </div>

      {photoOpen && heroPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("viewPhoto")}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setPhotoOpen(false);
          }}
        >
          <div className="relative max-w-full max-h-full ">
            <img
              src={heroPhoto}
              alt={entry.animalName}
              className="block max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] w-auto h-auto object-contain rounded-xl"
            />
            <button
              type="button"
              onClick={() => setPhotoOpen(false)}
              aria-label={t("close")}
              className="absolute top-2 right-2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 px-6 pt-4 pb-8">
        <h1 className="font-display text-3xl text-ink leading-tight">
          {animalName}
        </h1>
        {entry.type === "featured" && animal ? (
          <p className="text-ink-soft italic mb-2">{animal.scientificName}</p>
        ) : (
          entry.animalType && (
            <p className="text-ink-soft mb-2">{entry.animalType}</p>
          )
        )}
        <p className="text-sm text-ink-soft mb-5 flex items-center gap-1.5 flex-wrap">
          <span>
            {t("observedAt")}: {formatObservedAt(entry.createdAt, language)}
          </span>
          <span className="inline-flex items-center gap-1">
            <IconPin className="w-3.5 h-3.5" />
            {ZOO.name}
          </span>
        </p>

        <div className="flex items-center justify-between border-b border-[var(--rule)] mb-5">
          <button className="pb-2.5 text-sm font-bold text-[var(--green-deep)] border-b-2 border-[var(--green-deep)] -mb-px">
            {t("mainInfo")}
          </button>
          {entry.type === "featured" && animal && (
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-label={t("moreInformation")}
              className={`mb-1.5 text-ink-soft transition-transform ${expanded ? "rotate-180" : ""}`}
            >
              <IconChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>

        {expanded && entry.type === "featured" && animal && (
          <div className="rise-in grid grid-cols-1 gap-2 mb-5 text-sm">
            <div className="bg-[var(--paper)] rounded-xl p-3">
              <p className="text-ink-soft text-xs mb-0.5">{t("habitat")}</p>
              <p className="text-ink">
                {getAnimalText(animal, "habitat", language)}
              </p>
            </div>
            <div className="bg-[var(--paper)] rounded-xl p-3">
              <p className="text-ink-soft text-xs mb-0.5">{t("dietLabel")}</p>
              <p className="text-ink">
                {getAnimalText(animal, "diet", language)}
              </p>
            </div>
          </div>
        )}

        {entry.observation && (
          <div className="flex gap-3 mb-6 bg-[var(--paper)] p-4 rounded-2xl">
            <span className="text-[var(--green-mid)]">
              <IconQuestion className="w-8 h-8" />
            </span>

            <div>
              <p className="font-bold text-ink">{t("observed")}</p>
              <p className="text-ink font-medium">
                {observation?.label || entry.observation}
              </p>
              {entry.learnedFacts && (
                <p className="text-sm text-ink-soft mt-1 leading-relaxed">
                  {observation?.note || entry.learnedFacts}
                </p>
              )}
            </div>
          </div>
        )}

        <p className="font-bold text-ink mb-2">{t("myNote")}</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder={t("notePlaceholder")}
          className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper)]/65 text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none resize-none mb-6"
        />

        {entry.type === "featured" && animal && (
          <div className="flex gap-3 mb-8 bg-[var(--paper)] p-4 rounded-2xl">
            <span className="w-9 h-9 text-[var(--green-mid)] flex items-center justify-center shrink-0">
              <IconBulb className="w-8 h-8" />
            </span>
            <div>
              <p className="font-bold text-ink">{t("learned")}</p>
              <p className="text-sm text-ink-soft leading-relaxed">
                {getAnimalText(animal, "interestingFact", language)}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={!dirty}
          className="w-full py-3.5 rounded-full bg-[var(--green-mid)] text-white font-semibold disabled:opacity-45 hover:bg-[color:var(--green-mid)]/90 transition-colors flex items-center justify-center gap-2"
        >
          {saved ? t("saved") : t("saveEdits")}
          <IconCheck className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="w-full mt-3 py-3.5 rounded-full border border-[var(--clay)] text-[var(--clay)] font-semibold hover:bg-[color:var(--clay)]/10 transition-colors"
        >
          {t("deleteEntry")}
        </button>
      </div>

      {deleteOpen && (
        <Modal
          title={t("deleteEntryTitle")}
          onClose={() => setDeleteOpen(false)}
        >
          <p className="text-ink-soft leading-relaxed mb-6">
            {t("deleteEntryBody")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDeleteOpen(false)}
              className="flex-1 py-3 rounded-full border border-[var(--rule)] text-ink font-medium hover:border-[var(--green-mid)] transition-colors"
            >
              {t("cancel")}
            </button>
            <button
              type="button"
              onClick={() => onDelete(entry.id)}
              className="flex-1 py-3 rounded-full bg-[var(--clay)] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {t("deleteEntry")}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
