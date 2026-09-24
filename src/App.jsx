import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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

function UserRoute({ user, children }) {
  return user ? children : <Navigate to="/splash" replace />;
}

function Shell({ children, activeTab, onChange }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">{children}</div>
      <BottomNav current={activeTab} onChange={onChange} />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => storage.getUser());
  const [visit, setVisit] = useState(() => storage.getVisit());
  const [entries, setEntries] = useState(() => storage.getEntries());
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = setInterval(
      () => setVisit((current) => ({ ...current })),
      30000,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => storage.setUser(user), [user]);
  useEffect(() => storage.setVisit(visit), [visit]);
  useEffect(() => storage.setEntries(entries), [entries]);

  const active = isVisitActive(visit);

  function goTab(tab) {
    navigate(`/${tab}`);
  }

  function startOnboarding(landing) {
    navigate(`/onboarding?landing=${landing}`);
  }

  function handleOnboardingSubmit(name) {
    setUser({ id: makeLocalId("user"), name });
    if (searchParams.get("landing") === "journal") {
      navigate("/journal");
    } else {
      navigate("/location");
    }
  }

  function handleLocationMatched() {
    setVisit(createVisit());
    navigate(location.state?.returnTo || "/home", { replace: true });
  }

  function retryLocation(returnTo = location.pathname) {
    navigate("/location", { state: { returnTo } });
  }

  function handleExpireSession() {
    setVisit((current) => expireVisit(current));
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
    setEntries((previous) => [entry, ...previous]);
    return entry;
  }

  function updateEntry(id, patch) {
    setEntries((previous) =>
      previous.map((entry) =>
        entry.id === id ? { ...entry, ...patch } : entry,
      ),
    );
  }

  function deleteEntry(id) {
    setEntries((previous) => previous.filter((entry) => entry.id !== id));
    navigate("/journal");
  }

  function openAnimal(animalId) {
    const existing = entries.find(
      (entry) => entry.type === "featured" && entry.animalId === animalId,
    );
    navigate(existing ? `/entry/${existing.id}` : `/animal/${animalId}`);
  }

  function renderShell(page, activeTab) {
    return (
      <UserRoute user={user}>
        <Shell activeTab={activeTab} onChange={goTab}>
          {page}
        </Shell>
      </UserRoute>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? "/home" : "/splash"} replace />}
      />
      <Route
        path="/splash"
        element={
          <Splash
            onStart={() => startOnboarding("location")}
            onOpenJournal={() =>
              user ? navigate("/journal") : startOnboarding("journal")
            }
          />
        }
      />
      <Route
        path="/onboarding"
        element={
          <Onboarding
            onBack={() => navigate("/splash")}
            onSubmit={handleOnboardingSubmit}
          />
        }
      />
      <Route
        path="/location"
        element={
          <LocationCheck
            onBack={() =>
              navigate(
                location.state?.returnTo || (active ? "/home" : "/journal"),
              )
            }
            onMatched={handleLocationMatched}
            onOpenJournal={() => navigate("/journal")}
          />
        }
      />
      <Route
        path="/home"
        element={renderShell(
          <Home
            user={user}
            visit={visit}
            active={active}
            entries={entries}
            onOpenAnimal={openAnimal}
            onGoExplore={() => navigate("/explore")}
            onGoJournal={() => navigate("/journal")}
            onOpenProfile={() => navigate("/more")}
            onRetryLocation={() => retryLocation("/home")}
          />,
          "home",
        )}
      />
      <Route
        path="/explore"
        element={renderShell(
          <Explore
            entries={entries}
            active={active}
            onOpenAnimal={openAnimal}
            onCustomResearch={() => navigate("/research/custom")}
            onRetryLocation={() => retryLocation("/home")}
            onGoJournal={() => navigate("/journal")}
            onBack={() => navigate("/home")}
          />,
          "explore",
        )}
      />
      <Route
        path="/journal"
        element={renderShell(
          <Journal
            entries={entries}
            active={active}
            onOpenEntry={(id) => navigate(`/entry/${id}`)}
            onRetryLocation={() => retryLocation("/journal")}
          />,
          "journal",
        )}
      />
      <Route
        path="/more"
        element={renderShell(
          <More
            user={user}
            visit={visit}
            active={active}
            onRetryLocation={() => retryLocation("/more")}
            onExpireSession={handleExpireSession}
            onUpdateUser={handleUpdateUserName}
          />,
          "more",
        )}
      />
      <Route
        path="/animal/:id"
        element={
          <UserRoute user={user}>
            <AnimalRoute
              active={active}
              onBack={() => navigate(-1)}
              onGoExplore={() => navigate("/explore")}
              onGoJournal={() => navigate("/journal")}
              onStartVisit={() => retryLocation(location.pathname)}
              onSave={saveEntry}
            />
          </UserRoute>
        }
      />
      <Route
        path="/research/custom"
        element={
          <UserRoute user={user}>
            <CustomResearch
              active={active}
              onBack={() => navigate(-1)}
              onGoExplore={() => navigate("/explore")}
              onGoJournal={() => navigate("/journal")}
              onStartVisit={() => retryLocation(location.pathname)}
              onSave={saveEntry}
            />
          </UserRoute>
        }
      />
      <Route
        path="/entry/:id"
        element={
          <UserRoute user={user}>
            <EntryRoute
              entries={entries}
              onBack={() => navigate(-1)}
              onUpdate={updateEntry}
              onDelete={deleteEntry}
            />
          </UserRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/home" : "/splash"} replace />}
      />
    </Routes>
  );
}

function AnimalRoute({
  active,
  onBack,
  onGoExplore,
  onGoJournal,
  onStartVisit,
  onSave,
}) {
  const { id } = useParams();
  const animal = getAnimalById(id);
  if (!animal) return <Navigate to="/explore" replace />;
  return (
    <div className="min-h-screen">
      <AnimalDetail
        animal={animal}
        active={active}
        onBack={onBack}
        onGoExplore={onGoExplore}
        onGoJournal={onGoJournal}
        onStartVisit={onStartVisit}
        onSave={onSave}
      />
    </div>
  );
}

function EntryRoute({ entries, onBack, onUpdate, onDelete }) {
  const { id } = useParams();
  const entry = entries.find((item) => item.id === id);
  if (!entry) return <Navigate to="/journal" replace />;
  return (
    <div className="min-h-screen">
      <EntryDetail
        entry={entry}
        onBack={onBack}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}
