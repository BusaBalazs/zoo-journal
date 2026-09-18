import { useEffect, useState } from 'react'
import Onboarding from './pages/Onboarding'
import Welcome from './pages/Welcome'
import VisitStart from './pages/VisitStart'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Journal from './pages/Journal'
import AnimalDetail from './pages/AnimalDetail'
import CustomResearch from './pages/CustomResearch'
import EntryDetail from './pages/EntryDetail'
import BottomNav from './components/BottomNav'
import ProfileModal from './components/ProfileModal'
import { storage, makeLocalId } from './utils/storage'
import { createVisit, isVisitActive, expireVisit } from './utils/session'
import { getAnimalById } from './data/animals'

export default function App() {
  const [user, setUser] = useState(() => storage.getUser())
  const [visit, setVisit] = useState(() => storage.getVisit())
  const [entries, setEntries] = useState(() => storage.getEntries())

  const [screen, setScreen] = useState(() => (storage.getUser() ? 'shell' : 'onboarding'))
  const [activeTab, setActiveTab] = useState('home')
  const [subScreen, setSubScreen] = useState(null) // { type: 'animal'|'custom'|'entry', id }
  const [returnTo, setReturnTo] = useState(null) // where to land after visit-start completes
  const [showProfile, setShowProfile] = useState(false)

  // Re-render every 30s so the "time remaining" label and expiry state stay fresh.
  const [, forceTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => storage.setUser(user), [user])
  useEffect(() => storage.setVisit(visit), [visit])
  useEffect(() => storage.setEntries(entries), [entries])

  const active = isVisitActive(visit)

  function handleOnboardingSubmit(name) {
    setUser({ id: makeLocalId('user'), name })
    setScreen('welcome')
  }

  function goShell(tab, sub = null) {
    setScreen('shell')
    setActiveTab(tab)
    setSubScreen(sub)
  }

  function openVisitStart(landingAfter) {
    setReturnTo(landingAfter)
    setScreen('visit-start')
  }

  function handleSessionStarted() {
    setVisit(createVisit())
    if (returnTo) {
      goShell(returnTo.activeTab, returnTo.subScreen)
    } else {
      goShell('home')
    }
    setReturnTo(null)
  }

  function handleExpireSession() {
    setVisit((v) => expireVisit(v))
  }

  function saveEntry(data) {
    const entry = {
      id: makeLocalId('entry'),
      zooId: 'budapest-zoo',
      userId: user.id,
      createdAt: Date.now(),
      ...data,
    }
    setEntries((prev) => [entry, ...prev])
    goShell('journal')
  }

  function updateEntry(id, patch) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  function openAnimal(animalId) {
    const existing = entries.find((e) => e.type === 'featured' && e.animalId === animalId)
    if (existing) {
      setSubScreen({ type: 'entry', id: existing.id })
    } else {
      setSubScreen({ type: 'animal', id: animalId })
    }
  }

  // ---- top-level screens ----

  if (screen === 'onboarding') {
    return <Onboarding onSubmit={handleOnboardingSubmit} />
  }

  if (screen === 'welcome') {
    return (
      <Welcome
        userName={user?.name}
        entryCount={entries.length}
        onStart={() => openVisitStart({ activeTab: 'home', subScreen: null })}
        onOpenJournal={() => goShell('journal')}
      />
    )
  }

  if (screen === 'visit-start') {
    return (
      <VisitStart
        onBack={() => (returnTo ? goShell(returnTo.activeTab, returnTo.subScreen) : goShell('home'))}
        onSessionStarted={handleSessionStarted}
      />
    )
  }

  // ---- shell (home / explore / journal + overlays) ----

  let overlay = null
  if (subScreen?.type === 'animal') {
    const animal = getAnimalById(subScreen.id)
    overlay = (
      <AnimalDetail
        animal={animal}
        active={active}
        onBack={() => setSubScreen(null)}
        onStartVisit={() => openVisitStart({ activeTab, subScreen })}
        onSave={saveEntry}
      />
    )
  } else if (subScreen?.type === 'custom') {
    overlay = (
      <CustomResearch
        active={active}
        onBack={() => setSubScreen(null)}
        onStartVisit={() => openVisitStart({ activeTab, subScreen })}
        onSave={saveEntry}
      />
    )
  } else if (subScreen?.type === 'entry') {
    const entry = entries.find((e) => e.id === subScreen.id)
    overlay = entry ? (
      <EntryDetail entry={entry} onBack={() => setSubScreen(null)} onUpdate={updateEntry} />
    ) : null
  }

  if (overlay) {
    return <div className="min-h-screen">{overlay}</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {activeTab === 'home' && (
          <Home
            user={user}
            visit={visit}
            active={active}
            entries={entries}
            onStartVisit={() => openVisitStart({ activeTab: 'home', subScreen: null })}
            onOpenAnimal={openAnimal}
            onGoExplore={() => setActiveTab('explore')}
            onGoJournal={() => setActiveTab('journal')}
            onOpenProfile={() => setShowProfile(true)}
          />
        )}
        {activeTab === 'explore' && (
          <Explore
            entries={entries}
            active={active}
            onOpenAnimal={openAnimal}
            onCustomResearch={() => setSubScreen({ type: 'custom' })}
          />
        )}
        {activeTab === 'journal' && (
          <Journal entries={entries} onOpenEntry={(id) => setSubScreen({ type: 'entry', id })} />
        )}
      </div>
      <BottomNav current={activeTab} onChange={setActiveTab} />

      {showProfile && (
        <ProfileModal
          user={user}
          visitActive={active}
          onClose={() => setShowProfile(false)}
          onExpireSession={() => {
            handleExpireSession()
            setShowProfile(false)
          }}
        />
      )}
    </div>
  )
}
