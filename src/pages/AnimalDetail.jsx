import { useState } from "react";
import InfoCard from "../components/InfoCard";
import ObservationQuestion from "../components/ObservationQuestion";
import PhotoPicker from "../components/PhotoPicker";
import SuccessView from "../components/SuccessView";

import {
  IconFork,
  IconPin,
  IconBinoculars,
  IconCamera,
  IconMap,
  IconArrowLeft,
  IconPaw
} from "../components/icons";
import {
  getAnimalName,
  getAnimalObservationOptions,
  getAnimalText,
} from "../data/animals";
import { useLanguage } from "../i18n/LanguageContext";

import { animalCards, icons } from "../assets";

//------------------------------------------------------------------------

const TABS = [
  { id: "info", label: "infoTab" },
  { id: "observation", label: "observationTab" },
  { id: "fact", label: "factTab" },
];

//------------------------------------------------------------------------
//------------------------------------------------------------------------
export default function AnimalDetail({
  animal,
  active,
  onBack,
  onGoExplore,
  onGoJournal,
  onStartVisit,
  onSave,
}) {
  const { language, t } = useLanguage();
  const animalName = getAnimalName(animal, language);
  const animalOptions = getAnimalObservationOptions(animal, language);
  const [stage, setStage] = useState("learn"); // learn -> observe -> photo -> success
  const [tab, setTab] = useState("info");
  const [favorite, setFavorite] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [savedPhoto, setSavedPhoto] = useState(null);
  const [notes, setNotes] = useState("");
  const [savedEntry, setSavedEntry] = useState(null);
  //------------------------------------------------------------------------
  const photo = animalCards[animal.src];

  //------------------------------------------------------------------------
  function beginObservation() {
    if (!active) {
      setStage("gated");
      return;
    }
    setStage("observe");
  }

  //------------------------------------------------------------------------
  function handleTabClick(id) {
    if (id === "observation") {
      beginObservation();
      return;
    }
    setTab(id);
  }

  //------------------------------------------------------------------------
  function handleSave() {
    const entry = {
      animalId: animal.id,
      animalName,
      type: "featured",
      observationId: answer?.id || null,
      observation: answer?.label || null,
      learnedFacts: answer?.note || null,
      photo: savedPhoto,
      notes: notes.trim(),
    };
    const saved = onSave(entry);
    setSavedEntry(saved);
    setStage("success");
  }

  //------------------------------------------------------------------------
  if (stage === "success" && savedEntry) {
    return (
      <SuccessView
        entry={savedEntry}
        onContinueResearch={onGoExplore}
        onOpenJournal={onGoJournal}
      />
    );
  }

  //------------------------------------------------------------------------
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)] pb-8">
      <button
        onClick={onBack}
        aria-label={t("back")}
        className="w-9 h-9 text-ink-soft absolute top-4 left-4 z-30 transition-colors bg-[var(--paper)]/85 flex items-center justify-center rounded-full"
      >
        <IconArrowLeft className="w-5 h-5" />
      </button>

      <div className="flex-1">
        {stage === "learn" && (
          <div className="rise-in">
            <div className="h-100 bg-[color:var(--green-line)]/40 relative">
              <img
                src={photo}
                alt={animalName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hullámos SVG átmenet negatív margóval felhúzva a képre */}
            <div className="relative -mt-8 z-10">
              <svg
                className="w-full h-10 block text-[var(--paper-raised)]"
                viewBox="0 0 1440 120"
                fill="currentColor"
                preserveAspectRatio="none"
              >
                <path d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,120L0,120Z"></path>
              </svg>

              <div className="px-5 pt-2">
                <h1 className="font-display text-2xl text-ink mb-0.5">
                  {animalName}
                </h1>
                <p className="text-sm text-ink-soft italic mb-4">
                  {animal.scientificName}
                </p>

                <div className="flex gap-1.5 bg-[var(--paper)] rounded-full p-1 mb-5">
                  {TABS.map((tabItem) => (
                    <button
                      key={tabItem.id}
                      onClick={() => handleTabClick(tabItem.id)}
                      className={`flex-1 text-sm py-2 rounded-full font-medium transition-colors ${
                        tab === tabItem.id
                          ? "bg-[var(--green-deep)] text-white"
                          : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      {t(tabItem.label)}
                    </button>
                  ))}
                </div>

                {tab === "info" && (
                  <>
                    <p className="text-ink leading-relaxed mb-5">
                      {getAnimalText(animal, "intro", language)}
                    </p>
                    <div className="grid grid-cols-1 gap-2.5 mb-6">
                      <InfoCard
                        icon={<IconPin className="w-8 h-8" />}
                        label={t("habitat")}
                        value={getAnimalText(animal, "habitat", language)}
                      />
                      <InfoCard
                        icon={<IconFork className="w-8 h-8" />}
                        label={t("dietLabel")}
                        value={getAnimalText(animal, "diet", language)}
                      />
                      <InfoCard
                        icon={<IconPaw className="w-8 h-8" />}
                        label={t("lifestyle")}
                        value={getAnimalText(animal, "lifestyle", language)}
                      />
                    </div>
                  </>
                )}

                {tab === "fact" && (
                  <div className="bg-[color:var(--teal)]/10 border border-[color:var(--teal)]/25 rounded-2xl p-4 mb-6">
                    <p className="text-xs font-medium text-[var(--teal)] mb-1">
                      {t("interestingFact")}
                    </p>
                    <p className="text-sm text-ink leading-relaxed">
                      {getAnimalText(animal, "interestingFact", language)}
                    </p>
                  </div>
                )}

                <button
                  onClick={beginObservation}
                  className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2 mb-6"
                >
                  {t("continueObservation")}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === "gated" && (
          <div className="rise-in px-6 pt-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[color:var(--ochre)]/15 text-[var(--ochre-deep)] flex items-center justify-center mx-auto mb-5">
              <IconMap className="w-7 h-7" />
            </div>
            <h2 className="font-display text-xl text-ink mb-2">
              {t("atLocationQuestion")}
            </h2>
            <p className="text-ink-soft leading-relaxed mb-6 max-w-xs mx-auto">
              {t("visitRequired")}
            </p>
            <button
              onClick={onStartVisit}
              className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors"
            >
              {t("checkLocationButton")}
            </button>
          </div>
        )}

        {stage === "observe" && (
          <div className="rise-in px-6">
            <div className="w-56 mx-auto bg-[var(--paper)]/45 px-6 pt-8 mb-4 rounded-b-full shadow-lg overflow-hidden">
              <img src={icons.binoculars} className="w-30 h-25 mx-auto" />
            </div>
            <h1 className="font-display text-2xl text-ink mb-1.5 text-center">
              {getAnimalText(animal, "observationQuestion", language)}
            </h1>
            <p className="text-ink-soft mb-6 text-center">{t("observationPrompt")}</p>

            <ObservationQuestion options={animalOptions} onAnswer={setAnswer} />

            <button
              onClick={() => setStage("photo")}
              disabled={!answer}
              className="w-full mt-6 py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold disabled:opacity-40 hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2"
            >
              {t("continue")}
              <span aria-hidden>→</span>
            </button>
          </div>
        )}

        {stage === "photo" && (
          <div className="rise-in px-6">
            <div className="w-56 mx-auto bg-[var(--paper)]/45 px-6 pt-8 mb-4 rounded-b-full shadow-lg overflow-hidden">
              <img src={icons.camera} className="w-25 h-20 mx-auto" />
            </div>
            <h1 className="font-display text-2xl text-ink mb-1.5 text-center">
              {t("takePhoto")}
            </h1>
            <p className="text-ink-soft text-center">{t("photoBody")}</p>

            <div className="space-y-5">
              <PhotoPicker
                photo={savedPhoto}
                onChange={setSavedPhoto}
                label=""
              />
              <div className="mt-8">
                <p className="text-sm font-medium text-ink-soft mb-2">
                  {t("ownNote")} ({t("optional")})
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("notePlaceholder")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper)] text-ink placeholder:text-ink-soft/60 focus:border-[var(--green-mid)] outline-none resize-none"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2"
              >
                {t("saveToJournal")}
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
