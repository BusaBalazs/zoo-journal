# QRMB – Zoo Kutatási Napló (Digital Zoo Research Journal)

Test/prototype build for **Budapest Zoo**, evaluating the core UX concept:
*"Put the phone down and observe the animal."*

This is a **prototype only** — no Firebase, no real geofencing, no QR
scanner, no AI. Everything runs locally in the browser with React state
and `localStorage`, structured so the real backend can be dropped in later
without rewriting the app.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:5173`) in a
mobile-sized browser window, or on your phone via the "Network" URL Vite
prints, since the app is designed mobile-first.

No `npm run build` is needed or expected for this stage.

## What's in the prototype

- **Onboarding** — first-name capture, stored locally as a fake user id.
- **Welcome screen** — "Kutatás indítása" (start research) or jump
  straight to "Kutatási naplóm" (my journal).
- **Simulated entrance QR + GPS check** — uses the real browser
  Geolocation API, but accepts *any* coordinates and never blocks the
  flow if location is denied or unavailable. A 5-hour visit session is
  created in `localStorage` on continue.
- **Home / Explore / Journal** — three-tab shell. Home shows the session
  status and today's featured animals; Explore is the full research
  picker; Journal lists every saved entry.
- **Two featured animals** — Oroszlán (lion) and Elefánt (elephant),
  each with a learn screen, an observation question ("what is the
  animal doing right now?") with a short educational response, an
  optional own-photo step (`<input capture="environment">`), and a
  save step.
- **Custom research** — a generic form for any animal that isn't
  featured (type, diet, what was observed, notes, optional photo).
- **Session gating** — starting a *new* research entry (featured or
  custom) without an active visit shows a friendly "are you at the
  zoo right now?" screen instead of blocking silently. Existing journal
  entries stay fully readable and their notes/photo stay editable
  regardless of session state.
- **Dev-only "expire session" button** — tucked inside the profile
  icon on Home, for testing the no-active-session state without
  waiting 5 hours. Not exposed as a normal user-facing control.
- **Persistence** — user, visit session, and all journal entries
  survive a page refresh via `localStorage`.

## Project structure

```
src/
  components/   Header, BottomNav, cards, photo picker, icons, illustrations…
  pages/        Onboarding, Welcome, VisitStart, Home, Explore,
                Journal, AnimalDetail, CustomResearch, EntryDetail
  data/         animals.js — the two featured animals' content
  utils/
    storage.js  localStorage read/write, isolated so it's the only
                file that needs to change when Firestore replaces it
    session.js  visit-session creation/expiry helpers (zooId,
                5-hour window)
  App.jsx       top-level screen/tab state machine
```

Data shapes (`user`, `visit`, research `entry`) are written to already
resemble the future Firestore documents, including `zooId` on every
entry for the eventual multi-tenant (multi-zoo) setup.

## Design notes

- Palette and type are a "field-journal" look — deep forest green,
  warm ochre and a muted teal on a warm parchment background, paired
  with Fraunces (headings) and Work Sans (body/UI) — rather than a
  generic zoo-app template.
- The two animals are drawn as simple flat illustrations (inline SVG)
  instead of stock photos, so the prototype has no external image
  dependency and stays visually consistent between them.
- No `position: absolute` layout — everything uses flexbox/grid and
  normal document flow, as requested.

## Known simplifications (intentionally out of scope for this pass)

- No Firebase Auth / Firestore — local state + `localStorage` only.
- No real 500m geofence — any GPS coordinates (or none) are accepted.
- No real QR scanning — the entrance flow is a simulated screen.
- No AI photo recognition — the photo is just saved to the journal.
- Only 2 featured animals, one reusable detail layout for both.
