import { useState } from "react";
import AnimalListRow from "../components/AnimalListRow";
import RestrictedGate from "../components/RestrictedGate";
import { ANIMALS, getAnimalName } from "../data/animals";
import { IconSearch, IconSparkle, IconChevronRight } from "../components/icons";
import { useLanguage } from "../i18n/LanguageContext";

import { IconArrowLeft } from "../components/icons";

//-----------------------------------------------------------------
//-----------------------------------------------------------------
export default function Explore({
  entries,
  active,
  onOpenAnimal,
  onCustomResearch,
  onRetryLocation,
  onGoJournal,
  onBack,
}) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
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

  const filtered = ANIMALS.filter((a) =>
    getAnimalName(a, language).toLowerCase().includes(query.toLowerCase()),
  );

  //-----------------------------------------------------------------
  return (
    <div className="max-w-md mx-auto px-4 py-5">
      <div className="flex items-center justify-between mb-5 gap-3">
        <div className="flex gap-2">
          <button
            onClick={onBack}
            aria-label={t("back")}
            className="w-9 h-9 text-ink-soft hover:bg-[var(--paper)] transition-colors"
          >
            <IconArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="font-display text-2xl text-ink">
            {t("featuredAnimals")}
          </h1>
        </div>
        {searchOpen ? (
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => !query && setSearchOpen(false)}
            placeholder={t("search")}
            className="flex-1 min-w-0 px-3.5 py-2 text-sm rounded-full border border-[var(--rule)] bg-[var(--paper-raised)] outline-none focus:border-[var(--green-mid)]"
          />
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            aria-label={t("search")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-ink-soft hover:bg-[var(--paper-raised)] transition-colors shrink-0"
          >
            <IconSearch className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-2.5 mb-5">
        {filtered.map((animal) => (
          <AnimalListRow
            key={animal.id}
            animal={animal}
            observed={featuredObserved.has(animal.id)}
            onClick={() => onOpenAnimal(animal.id)}
            photoSrc={animal.src}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-ink-soft text-center py-6">
            {t("noAnimal")}
          </p>
        )}
      </div>

      <button
        onClick={onCustomResearch}
        className="w-full bg-[color:var(--ochre)]/10 border border-[color:var(--ochre)]/25 rounded-2xl p-4 flex items-center gap-3 text-left hover:bg-[color:var(--ochre)]/15 transition-colors"
      >
        <span className="w-10 h-10 rounded-xl bg-[color:var(--ochre)]/20 text-[var(--ochre-deep)] flex items-center justify-center shrink-0">
          <IconSparkle className="w-5 h-5" />
        </span>
        <span className="text-sm text-ink flex-1">
          <span className="font-semibold block">{t("customResearch")}</span>
          {t("customResearchPrompt")}
        </span>
        <IconChevronRight className="w-4 h-4 text-[var(--ochre-deep)] shrink-0" />
      </button>
    </div>
  );
}
