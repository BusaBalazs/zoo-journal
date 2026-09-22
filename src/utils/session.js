// Visit-session + location helpers. A "visit" is the 5-hour window that
// unlocks the full app (new research) after a successful location check.
// Without an active visit, the app falls back to journal-only access.

const ZOO_ID = 'budapest-zoo'
const ZOO_NAME = 'Fővárosi Állat- és Növénykert'
const SESSION_LENGTH_MS = 5 * 60 * 60 * 1000 // 5 hours

// Fővárosi Állat- és Növénykert, Budapest — Állatkerti krt. 6-12.
const ZOO_LAT = 47.5178
const ZOO_LNG = 19.0775
const GEOFENCE_RADIUS_M = 700 // generous radius to cover the whole zoo grounds

export const ZOO = { id: ZOO_ID, name: ZOO_NAME, lat: ZOO_LAT, lng: ZOO_LNG }

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

export function remainingLabel(visit, language = 'hu') {
  if (!isVisitActive(visit)) return null
  const ms = visit.expiresAt - Date.now()
  const totalMinutes = Math.max(0, Math.floor(ms / 60000))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (language === 'en') {
    if (hours <= 0) return `${minutes} min remaining`
    return `${hours} hr ${minutes} min remaining`
  }
  if (language === 'de') {
    if (hours <= 0) return `${minutes} Min. verbleiben`
    return `${hours} Std. ${minutes} Min. verbleiben`
  }
  if (hours <= 0) return `${minutes} perc van hátra`
  return `${hours} óra ${minutes} perc`
}

export function remainingRatio(visit) {
  if (!isVisitActive(visit)) return 0
  const total = visit.expiresAt - visit.startedAt
  const left = visit.expiresAt - Date.now()
  return Math.min(1, Math.max(0, left / total))
}

// Haversine distance in meters between two lat/lng points.
function distanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000
  const toRad = (deg) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

// Returns true if the given coordinates fall within the zoo's geofence.
export function isWithinZoo(lat, lng) {
  return distanceMeters(lat, lng, ZOO_LAT, ZOO_LNG) <= GEOFENCE_RADIUS_M
}
