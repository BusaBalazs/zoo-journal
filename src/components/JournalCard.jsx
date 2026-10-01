import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { getAnimalById } from "../data/animals";
import { animalCards } from "../assets/";
import { IconFlip } from "./icons";

//---------------------------------------------------------------------
function formatDate(ts, language, t) {
  const d = new Date(ts);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();

  if (sameDay) return t("observedToday");

  const locale = { hu: "hu-HU", en: "en-US", de: "de-DE" }[language];
  const date = d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return t("observedOn", date);
}

//---------------------------------------------------------------------
export default function JournalCard({ entry, onClick, isActive = false }) {
  const { language, t } = useLanguage();

  const animal = entry.type === "featured" ? getAnimalById(entry.animalId) : null;
  const stockPhoto = animal ? animalCards[animal.src] : null;
  const photo = entry.photo || stockPhoto;

  //---------------------------------------------------------------------
  return (
    <motion.button
      onClick={onClick}
      layoutId={`journal-entry-${entry.id}`}
      animate={{ opacity: isActive ? 0 : 1 }}
      transition={{ opacity: { duration: .2 } }}
      aria-hidden={isActive}
      tabIndex={isActive ? -1 : 0}
      style={{ borderRadius: "1rem" }}
      className="group relative w-full aspect-[656/861] rounded-2xl overflow-hidden shadow-md text-left bg-[color:var(--green-line)]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      {photo ? (
        <img
          src={photo}
          alt={entry.animalName}
          className="absolute inset-0 w-full h-full rounded-2xl object-cover"
        />
      ) : (
        <div className="absolute inset-0 rounded-2xl bg-[var(--green-line)]" />
      )}

      <div
        className="absolute inset-x-0 bottom-0 px-3.5 pt-4 pb-3.5 bg-[var(--paper-light)]/95  rounded-t-2xl"
        
      >
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="font-display text-base text-ink leading-tight truncate">
              {entry.animalName}
            </p>
            <p className="text-[11px] text-ink-soft truncate">
              {formatDate(entry.createdAt, language, t)}
            </p>
          </div>
          <span className="shrink-0 w-8 h-8 rounded-full bg-white/90 text-[var(--green-deep)] flex items-center justify-center group-hover:scale-105 transition-transform">
            <IconFlip className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
