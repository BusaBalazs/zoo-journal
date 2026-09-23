import { useEffect, useState } from "react";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import LocationCheck from "./pages/LocationCheck";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Journal from "./pages/Journal";
import More from "./pages/More";
import AnimalDetail from "./pages/AnimalDetail";
import CustomResearch from "./pages/CustomResearch";
import EntryDetail from "./pages/EntryDetail";
import BottomNav from "./components/BottomNav";
import { storage, makeLocalId } from "./utils/storage";
import { createVisit, isVisitActive, expireVisit } from "./utils/session";
import { getAnimalById } from "./data/animals";

//---------------------------------------------------------------------
//---------------------------------------------------------------------
export default function App() {
  const [user, setUser] = useState(() => storage.getUser());
  const [visit, setVisit] = useState(() => storage.getVisit());
  const [entries, setEntries] = useState(() => storage.getEntries());

  const [screen, setScreen] = useState(() =>
    storage.getUser() ? "shell" : "splash",
  );
  const [activeTab, setActiveTab] = useState("home");
  const [subScreen, setSubScreen] = useState(null); // { type: 'animal'|'custom'|'entry', id }
  const [afterOnboarding, setAfterOnboarding] = useState("location"); // 'location' | 'journal'
  const [returnTo, setReturnTo] = useState(null); // where to land after a successful location check

  // Re-render every 30s so the "time remaining" label / expiry state stays fresh.
  const [, forceTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => storage.setUser(user), [user]);
  useEffect(() => storage.setVisit(visit), [visit]);
  useEffect(() => storage.setEntries(entries), [entries]);

  const active = isVisitActive(visit);

  function goShell(tab, sub = null) {
    setScreen("shell");
    setActiveTab(tab);
    setSubScreen(sub);
  }

  function startOnboarding(landing) {
    setAfterOnboarding(landing);
    setScreen("onboarding");
  }

  function handleOnboardingSubmit(name) {
    setUser({ id: makeLocalId("user"), name });
    if (afterOnboarding === "journal") {
      goShell("journal");
    } else {
      setScreen("location");
    }
  }

  function handleLocationMatched() {
    setVisit(createVisit());
    if (returnTo) {
      goShell(returnTo.activeTab, returnTo.subScreen);
    } else {
      goShell("home");
    }
    setReturnTo(null);
  }

  function retryLocation(landing = null) {
    setReturnTo(landing);
    setScreen("location");
  }

  function retryLocationFromOverlay() {
    retryLocation({ activeTab, subScreen });
  }

  function handleExpireSession() {
    setVisit((v) => expireVisit(v));
  }

  function handleUpdateUserName(name) {
    setUser((current) => (current ? { ...current, name } : current));
  }

  function saveEntry(data) {
    const entry = {
      id: makeLocalId("entry"),
      zooId: "budapest-zoo",
      userId: user.id,
      createdAt: Date.now(),
      ...data,
    };
    setEntries((prev) => [entry, ...prev]);
    return entry;
  }

  function updateEntry(id, patch) {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
  }

  function openAnimal(animalId) {
    const existing = entries.find(
      (e) => e.type === "featured" && e.animalId === animalId,
    );
    if (existing) {
      setSubScreen({ type: "entry", id: existing.id });
    } else {
      setSubScreen({ type: "animal", id: animalId });
    }
  }

  //---------------------------------------------------------------------
  // ---- top-level (pre-shell) screens ----

  if (screen === "splash") {
    return (
      <Splash
        onStart={() => startOnboarding("location")}
        onOpenJournal={() =>
          user ? goShell("journal") : startOnboarding("journal")
        }
      />
    );
  }

  if (screen === "onboarding") {
    return (
      <Onboarding
        onBack={() => setScreen("splash")}
        onSubmit={handleOnboardingSubmit}
      />
    );
  }

  if (screen === "location") {
    return (
      <LocationCheck
        onBack={() =>
          returnTo
            ? goShell(returnTo.activeTab, returnTo.subScreen)
            : goShell(active ? "home" : "journal")
        }
        onMatched={handleLocationMatched}
        onOpenJournal={() => goShell("journal")}
      />
    );
  }

  //---------------------------------------------------------------------
  // ---- shell (home / explore / journal / more + overlays) ----

  let overlay = null;
  if (subScreen?.type === "animal") {
    const animal = getAnimalById(subScreen.id);
    overlay = (
      <AnimalDetail
        animal={animal}
        active={active}
        onBack={() => setSubScreen(null)}
        onGoExplore={() => setSubScreen(null)}
        onGoJournal={() => goShell("journal")}
        onStartVisit={retryLocationFromOverlay}
        onSave={saveEntry}
      />
    );
  } else if (subScreen?.type === "custom") {
    overlay = (
      <CustomResearch
        active={active}
        onBack={() => setSubScreen(null)}
        onGoExplore={() => setSubScreen(null)}
        onGoJournal={() => goShell("journal")}
        onStartVisit={retryLocationFromOverlay}
        onSave={saveEntry}
      />
    );
  } else if (subScreen?.type === "entry") {
    const entry = entries.find((e) => e.id === subScreen.id);
    overlay = entry ? (
      <EntryDetail
        entry={entry}
        onBack={() => setSubScreen(null)}
        onUpdate={updateEntry}
      />
    ) : null;
  }

  if (overlay) {
    return <div className="min-h-screen">{overlay}</div>;
  }

  //---------------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {activeTab === "home" && (
          <Home
            user={user}
            visit={visit}
            active={active}
            entries={entries}
            onOpenAnimal={openAnimal}
            onGoExplore={() => setActiveTab("explore")}
            onGoJournal={() => setActiveTab("journal")}
            onOpenProfile={() => setActiveTab("more")}
            onRetryLocation={() => retryLocation()}
          />
        )}
        {activeTab === "explore" && (
          <Explore
            entries={entries}
            active={active}
            onOpenAnimal={openAnimal}
            onCustomResearch={() => setSubScreen({ type: "custom" })}
            onRetryLocation={() => retryLocation()}
            onGoJournal={() => setActiveTab("journal")}
            onBack={() => setActiveTab("home")}
          />
        )}
        {activeTab === "journal" && (
          <Journal
            entries={entries}
            active={active}
            onOpenEntry={(id) => setSubScreen({ type: "entry", id })}
            onRetryLocation={() => retryLocation()}
          />
        )}
        {activeTab === "more" && (
          <More
            user={user}
            visit={visit}
            active={active}
            onRetryLocation={() => retryLocation()}
            onExpireSession={handleExpireSession}
            onUpdateUser={handleUpdateUserName}
          />
        )}
      </div>
      <BottomNav current={activeTab} onChange={setActiveTab} />
    </div>
  );
}
