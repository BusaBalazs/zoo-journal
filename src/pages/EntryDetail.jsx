import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import WaveDivider from "../components/WaveDivider";
import Modal from "../components/Modal";
import PhotoChangeControl from "../components/PhotoChangeControl";
import { LeafBadgeArt } from "../components/creatures";
import {
  IconArrowLeft,
  IconQuestion,
  IconBulb,
  IconChevronDown,
  IconTrash,
  IconFlip,
  IconPin,
  IconX,
} from "../components/icons";
import {
  getAnimalById,
  getAnimalObservationOptions,
  getAnimalText,
  getAnimalName,
  getAnimalTypeLabel,
} from "../data/animals";
import { animalCards, icons } from "../assets/";
import { ZOO } from "../utils/session";
import { useLanguage } from "../i18n/LanguageContext";

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

const faceStyle = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

//-----------------------------------------------------------------
//-----------------------------------------------------------------
export default function EntryDetail({
  entry,
  onBack,
  onUpdate,
  onDelete,
  layoutId,
}) {
  const { language, t } = useLanguage();

  const [flipped, setFlipped] = useState(false);
  const [closing, setClosing] = useState(false);
  const [notes, setNotes] = useState(entry.notes || "");
  const [photo, setPhoto] = useState(entry.photo || null);
  const [expanded, setExpanded] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const flipButtonRef = useRef(null);
  const backCloseRef = useRef(null);
  const flipCardRef = useRef(null);
  const flipTimelineRef = useRef(null);
  const gsapRef = useRef(null);

  const animal =
    entry.type === "featured" ? getAnimalById(entry.animalId) : null;
  const animalName = animal
    ? getAnimalName(animal, language)
    : entry.animalName;
  const typeLabel = animal
    ? getAnimalTypeLabel(animal, language)
    : entry.animalType;
  const animalOptions = animal
    ? getAnimalObservationOptions(animal, language)
    : [];
  const observation = entry.observationId
    ? animalOptions.find((option) => option.id === entry.observationId)
    : null;
  const stockPhoto = animal ? animalCards[animal.src] : null;
  const heroPhoto = photo || stockPhoto;

  useEffect(() => {
    let mounted = true;
    import("gsap").then(({ gsap }) => {
      if (mounted) gsapRef.current = gsap;
    });
    return () => {
      mounted = false;
      flipTimelineRef.current?.kill();
    };
  }, []);

  //-----------------------------------------------------------------
  function persistNotesIfDirty() {
    if (notes !== (entry.notes || ""))
      onUpdate(entry.id, { notes: notes.trim() });
  }

  function handlePhotoChange(dataUrl) {
    setPhoto(dataUrl);
    onUpdate(entry.id, { photo: dataUrl });
  }

  function handleClose() {
    persistNotesIfDirty();
    setClosing(true);
    setTimeout(onBack, 240);
  }

  function handleDelete() {
    onDelete(entry.id);
  }

  //-----------------------------------------------------------------
  async function handleFlip(nextFlipped) {
    const gsap = gsapRef.current || (await import("gsap")).gsap;
    gsapRef.current = gsap;
    setFlipped(nextFlipped);
    flipTimelineRef.current?.kill();
    const focusTarget = nextFlipped ? backCloseRef : flipButtonRef;
    const timeline = gsap.timeline({
      onComplete: () => {
        flipTimelineRef.current = null;
        requestAnimationFrame(() => {
          focusTarget.current?.focus({ preventScroll: true });
        });
      },
    });
    flipTimelineRef.current = timeline;
    timeline
      .to(
        flipCardRef.current,
        {
          rotateY: nextFlipped ? 180 : 0,
          duration: 0.68,
          ease: "power2.inOut",
        },
        0,
      )
      .to(
        flipCardRef.current,
        { scaleX: 0.92, duration: 0.3, ease: "power2.in" },
        0,
      )
      .to(
        flipCardRef.current,
        { scaleX: 1.04, duration: 0.14, ease: "back.out(2.5)" },
        0.3,
      )
      .to(
        flipCardRef.current,
        { scaleX: 1, duration: 0.24, ease: "power2.out" },
        0.44,
      );
  }

  //-----------------------------------------------------------------
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-3 backdrop-blur-[2px] sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: closing ? 0 : 1 }}
      transition={{ duration: closing ? 0.24 : 0.3 }}
      style={{ perspective: 1400 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={animalName || t("viewPhoto")}
        layoutId={layoutId}
        initial={
          layoutId ? false : { opacity: 0, scale: 0.92, y: 16, rotateY: 0 }
        }
        animate={{
          opacity: closing ? 0.4 : 1,
          scale: closing ? 0.82 : 1,
          y: closing ? 10 : 0,
        }}
        transition={{
          default: { duration: closing ? 0.4 : 0.4, ease: [0.8, 1, 0.6, 1.2] },
        }}
        style={{
          width: "min(85vw, 24rem)",
          height: "min(68vh, 54rem)",
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: "1.25rem",
          boxShadow:
            "0 2px 0 rgba(15,42,30,0.4), 0 5px 0 rgba(15,42,30,0.2), 0 18px 48px rgba(0,0,0,0.3)",
        }}
      >
        <div
          ref={flipCardRef}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            border: "1px solid rgba(255,255,255,0.7)",
            borderRadius: "1.25rem",
            background: "var(--green-line)",
          }}
        >
          {/* ---------------- FRONT FACE ---------------- */}
          <div
            inert={flipped}
            style={{
              ...faceStyle,
              pointerEvents: flipped ? "none" : "auto",
            }}
            className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-[color:var(--green-line)]/40"
          >
            <button
              type="button"
              onClick={() => setPhotoOpen(true)}
              aria-label={t("viewPhoto")}
              className="absolute inset-0 w-full h-full cursor-zoom-in"
            >
              {heroPhoto ? (
                <img
                  src={heroPhoto}
                  alt={animalName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <LeafBadgeArt className="w-full h-full" />
              )}
            </button>

            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
              <div className="pointer-events-auto">
                <PhotoChangeControl
                  onChange={handlePhotoChange}
                  className="w-10 h-10 rounded-full bg-[color:white]/85 backdrop-blur-sm flex items-center justify-center text-[var(--green-deep)] shadow-sm hover:bg-white transition-colors"
                  iconClassName="w-4.5 h-4.5"
                />
              </div>
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                aria-label={t("deleteEntry")}
                title={t("deleteEntry")}
                className="pointer-events-auto w-10 h-10 rounded-full bg-[color:white]/85 backdrop-blur-sm flex items-center justify-center text-[var(--clay)] shadow-sm hover:bg-white transition-colors"
              >
                <IconTrash className="w-4.5 h-4.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label={t("close")}
              title={t("close")}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[color:white]/85 backdrop-blur-sm flex items-center justify-center text-ink shadow-sm hover:bg-white transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>

            <div
              className="absolute bottom-0 left-0 right-0 px-5 pt-14 pb-6 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(14,26,16,0.92) 10%, rgba(14,26,16,0.55) 55%, transparent 100%)",
              }}
            >
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="font-display text-2xl text-white leading-tight truncate">
                    {animalName}
                  </h1>
                  {animal && (
                    <p className="italic text-white/75 text-sm truncate">
                      {animal.scientificName}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  ref={flipButtonRef}
                  onClick={() => handleFlip(true)}
                  aria-label={t("flipToBack")}
                  title={t("flipToBack")}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-white text-[var(--green-deep)] flex items-center justify-center shadow-md shrink-0 hover:scale-105 transition-transform"
                >
                  <IconFlip className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* ---------------- BACK FACE ---------------- */}
          <div
            inert={!flipped}
            style={{
              ...faceStyle,
              transform: "rotateY(180deg)",
              pointerEvents: flipped ? "auto" : "none",
            }}
            className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-[var(--paper-raised)] flex flex-col"
          >
            <div className="relative shrink-0 bg-[var(--green-deep)] px-6 pt-7 pb-8 overflow-hidden">
              <button
                type="button"
                ref={backCloseRef}
                onClick={handleClose}
                aria-label={t("close")}
                title={t("close")}
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
              >
                <IconX className="w-5 h-5" />
              </button>
              <img
                src={icons.leaf}
                alt=""
                className="absolute -top-5 -right-6 w-28 h-28 opacity-15 rotate-12 pointer-events-none select-none "
              />
              <h1 className="relative pr-12 font-display text-2xl text-white leading-tight truncate">
                {animalName}
              </h1>
              {animal && (
                <p className="relative pr-12 italic text-white/75 text-sm mt-0.5 truncate">
                  {animal.scientificName}
                </p>
              )}
              <WaveDivider color="var(--paper-raised)" />
            </div>

            <div className="flex-1 overflow-y-auto px-6 pt-5 pb-4">
              <p className="text-sm text-ink-soft mb-4 flex items-center gap-1.5 flex-wrap">
                <span>
                  {t("observedAt")}:{" "}
                  {formatObservedAt(entry.createdAt, language)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <IconPin className="w-3.5 h-3.5" />
                  {ZOO.name}
                </span>
              </p>

              {typeLabel && (
                <p className="text-sm mb-4">
                  <span className="text-ink-soft">{t("typeLabel")}: </span>
                  <span className="font-medium text-ink">{typeLabel}</span>
                </p>
              )}

              {entry.type === "custom" && entry.diet && (
                <p className="text-sm mb-4 bg-[var(--paper)] p-4 rounded-2xl">
                  <span className="text-ink-soft flex">{t("diet")}</span><br/>
                  <span className="font-medium text-ink">{entry.diet}</span>
                </p>
              )}

              {entry.type === "featured" && animal && (
                <div className="mb-5">
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="w-full flex items-center justify-between border-b border-[var(--rule)] pb-2.5"
                  >
                    <span className="text-sm font-bold text-[var(--green-deep)]">
                      {t("mainInfo")}
                    </span>
                    <IconChevronDown
                      className={`w-5 h-5 text-ink-soft transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expanded && (
                    <div className="rise-in grid grid-cols-1 gap-2 mt-3 text-sm">
                      <div className="bg-[var(--paper)] rounded-xl p-3">
                        <p className="text-ink-soft text-xs mb-0.5">
                          {t("habitat")}
                        </p>
                        <p className="text-ink">
                          {getAnimalText(animal, "habitat", language)}
                        </p>
                      </div>
                      <div className="bg-[var(--paper)] rounded-xl p-3">
                        <p className="text-ink-soft text-xs mb-0.5">
                          {t("dietLabel")}
                        </p>
                        <p className="text-ink">
                          {getAnimalText(animal, "diet", language)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {(observation || entry.observation) && (
                <div className="flex gap-3 mb-5 bg-[var(--paper)] p-4 rounded-2xl">
                  <span className="text-[var(--green-mid)] shrink-0">
                    <IconQuestion className="w-8 h-8" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-ink">{t("observed")}</p>
                    <p className="text-ink font-medium">
                      {observation?.label || entry.observation}
                    </p>
                    {entry.type === "featured" && observation?.note && (
                      <p className="text-sm text-ink-soft mt-1 leading-relaxed">
                        {observation.note}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-5">
                <p className="font-bold text-ink mb-2">{t("myNote")}</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={persistNotesIfDirty}
                  rows={3}
                  placeholder={t("notePlaceholder")}
                  className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper)]/65 text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none resize-none"
                />
              </div>

              {entry.type === "featured" && animal && (
                <div className="flex gap-3 bg-[var(--paper)] p-4 rounded-2xl">
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
            </div>

            <div className="shrink-0 px-6 pb-6 pt-2">
              <button
                type="button"
                onClick={() => handleFlip(false)}
                className="w-full py-3.5 rounded-full bg-[var(--green-mid)] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[color:var(--green-mid)]/90 transition-colors"
              >
                <IconArrowLeft className="w-4 h-4" />
                {t("backToPhoto")}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

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
          <div className="relative max-w-full max-h-full">
            <img
              src={heroPhoto}
              alt={animalName}
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
              onClick={handleDelete}
              className="flex-1 py-3 rounded-full bg-[var(--clay)] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {t("deleteEntry")}
            </button>
          </div>
        </Modal>
      )}
    </motion.div>
  );
}
