// Local-storage helpers standing in for the future Firestore layer.
// Every read/write goes through here so swapping in Firebase later
// only means changing this file, not the components that use it.

const KEYS = {
  user: 'qrmb.user',
  visit: 'qrmb.visit',
  entries: 'qrmb.entries',
}

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage unavailable (private mode, quota, etc.) — fail silently for the prototype
  }
}

export const storage = {
  getUser: () => read(KEYS.user, null),
  setUser: (user) => write(KEYS.user, user),

  getVisit: () => read(KEYS.visit, null),
  setVisit: (visit) => write(KEYS.visit, visit),

  getEntries: () => read(KEYS.entries, []),
  setEntries: (entries) => write(KEYS.entries, entries),
}

export function makeLocalId(prefix = 'local') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`
}
