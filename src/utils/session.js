// Visit-session helpers. A "visit" is the 5-hour window that unlocks new
// research after the visitor starts today's session at the zoo entrance.

const ZOO_ID = 'budapest-zoo'
const ZOO_NAME = 'Budapest Zoo'
const SESSION_LENGTH_MS = 5 * 60 * 60 * 1000 // 5 hours

export const ZOO = { id: ZOO_ID, name: ZOO_NAME }

export function createVisit() {
  const startedAt = Date.now()
  return {
    zooId: ZOO_ID,
    startedAt,
    expiresAt: startedAt + SESSION_LENGTH_MS,
    active: true,
  }
}

export function isVisitActive(visit) {
  if (!visit || !visit.active) return false
  return Date.now() < visit.expiresAt
}

export function expireVisit(visit) {
  if (!visit) return visit
  return { ...visit, active: false }
}

export function remainingLabel(visit) {
  if (!isVisitActive(visit)) return null
  const ms = visit.expiresAt - Date.now()
  const totalMinutes = Math.max(0, Math.floor(ms / 60000))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours <= 0) return `${minutes}m remaining`
  return `${hours}h ${minutes}m remaining`
}
