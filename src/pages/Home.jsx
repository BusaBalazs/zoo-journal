import RestrictedGate from "../components/RestrictedGate";
import AnimalCard from "../components/AnimalCard";
import { ANIMALS } from "../data/animals";
import { IconChevronRight, IconBpZoo } from "../components/icons";
import WaveDivider from "../components/WaveDivider";
import { useLanguage } from "../i18n/LanguageContext";

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export default function Home({
  user,
  active,
  entries,
  onOpenAnimal,
  onGoExplore,
  onGoJournal,
  onRetryLocation,
}) {
  const { t } = useLanguage();
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

  //--------------------------------------------------------------------------
  return (
    <div
      className="max-w-md min-h-[calc(100vh-56px)]"
      style={{
        background:
          "linear-gradient(to bottom, var(--bg-800) 40%, rgb(178, 197, 203) 100%)",
      }}
    >
      <header className="relative px-4 pt-4 pb-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-14 h-20 shrink-0">
            <IconBpZoo className="w-full h-full" />
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[var(--paper)] bg-[color:var(--paper)]/20 border border-[color:var(--green-mid)]/55 rounded-full px-3 py-2">
            <span className="font-semibold">{t("activeResearch")}</span>
          </div>
        </div>
        <div>
          <h1 className="font-display text-4xl text-paper">
            {t("greeting", user.name)}
          </h1>
          <p className="text-sm text-paper mt-0.5">{t("collect")}</p>
        </div>
        <WaveDivider color="var(--paper-light)" />
      </header>

      <div className="bg-[var(--paper-light)] p-4">
        <div className="flex items-center justify-end mb-3">
          <button
            onClick={onGoExplore}
            className="text-sm text-[var(--green-deep)] font-semibold flex gap-1"
          >
            {t("all")}
            <IconChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
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
    </div>
  );
}
