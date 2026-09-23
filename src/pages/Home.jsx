import RestrictedGate from "../components/RestrictedGate";
import AnimalCard from "../components/AnimalCard";
import { ANIMALS } from "../data/animals";
import {
  IconChevronRight,
  IconClock,
  IconSparkle,
  IconUser,
  IconPin,
} from "../components/icons";
import { ZOO, remainingLabel } from "../utils/session";
import { useLanguage } from "../i18n/LanguageContext";

import { icons, animalCards } from "../assets/index.js";
import p from "../assets/animals/lion_card_bg.webp"


//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export default function Home({
  user,
  visit,
  active,
  entries,
  onOpenAnimal,
  onGoExplore,
  onGoJournal,
  onOpenProfile,
  onRetryLocation,
}) {
  const { language, t } = useLanguage();
  if (!active) {
    return (
      <RestrictedGate
        onRetryLocation={onRetryLocation}
        onOpenJournal={onGoJournal}
      />
    );
  }

  const featuredObserved = new Set(
    entries.filter((e) => e.type === "featured").map((e) => e.animalId),
  );

  return (
    <div
      className="max-w-md pb-5"
      style={{
        background:
          "linear-gradient(to bottom, rgb(231, 238, 240) 40%, rgb(178, 197, 203) 100%)",
      }}
    >
      <div className="sticky top-0 mb-10 px-4 py-2 flex justify-between items-center bg-[var(--paper-raised)] w-full rounded-b-2xl shadow-sm">
        <span className="w-20 h-20 rounded-full bg-[white]/15 backdrop-blur-xs flex items-center justify-center p-2">
          <img src={icons.zoo} />
        </span>
        <button
          onClick={onOpenProfile}
          aria-label="Profil"
          className="w-10 h-10 rounded-full border-[1.5px] border-[var(--green-mid)] text-[var(--green-mid)] flex items-center justify-center shrink-0"
        >
          <IconUser className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4">
        <div className="mb-8">
          <h1 className="font-display text-4xl text-ink">
            {t("greeting", user.name)}
          </h1>
          <p className="text-sm text-ink-soft mt-0.5">{t("ready")}</p>
        </div>

        <div className="bg-[var(--paper-light)] border border-[var(--rule)] rounded-2xl px-4 py-8 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <IconPin className="w-10 h-10 text-[var(--green-mid)]" />
            <p className="font-bold text-ink">{ZOO.name}</p>
            <span className="ml-auto text-[11px] px-2 py-2 rounded-full bg-[color:var(--green-mid)] text-white font-semibold text-center">
              {t("activeResearch")}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 text-sm text-ink-soft">
            {remainingLabel(visit, language)}
            <IconClock className="w-6 h-6" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg text-ink">
              {t("featuredAnimals")}
            </h2>
            <button
              onClick={onGoExplore}
              className="text-sm text-[var(--green-deep)] font-semibold flex gap-1"
            >
              {t("all")}
              <IconChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {ANIMALS.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                observed={featuredObserved.has(animal.id)}
                onClick={() => onOpenAnimal(animal.id)}
                photoSrc={animal.src}
              />
            ))}
          </div>
        </div>

        <button
          onClick={onGoExplore}
          className="w-full bg-[color:var(--ochre)]/30 border border-[color:var(--ochre)]/25 rounded-2xl p-4 flex items-center gap-3 text-left hover:bg-[color:var(--ochre)]/15 transition-colors"
        >
          <span className="w-10 h-10 rounded-xl  text-[var(--ochre-deep)] flex items-center justify-center shrink-0">
            <IconSparkle className="w-5 h-5" />
          </span>
          <span className="text-sm text-ink flex-1">
            <span className="text-[1rem] font-semibold block">{t("customResearch")}</span>
            {t("customResearchPrompt")}
          </span>
          <span className="rounded-full p-3 bg-[color:var(--paper)]/90  flex items-center justify-center shrink-0">

          <IconChevronRight className="w-5 h-5 text-[var(--ink)] shrink-0" />
          </span>
        </button>
      </div>
    </div>
  );
}
