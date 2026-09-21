# QRMB – Zoo Kutatási Napló (Digital Zoo Research Journal)

Test/prototype build for **Budapest Zoo**, evaluating the core UX concept:
*"Put the phone down and observe the animal."*

This is a **prototype only** — no Firebase, no real backend, no AI. Everything
runs locally in the browser with React state and `localStorage`, structured so
the real backend can be dropped in later without rewriting the app.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL in a mobile-sized browser window, or on your phone
via the "Network" URL Vite prints, since the app is designed mobile-first.

No `npm run build` is needed or expected for this stage.

## Entry flow (updated)

1. **Splash** — simulates arriving via the entrance QR code (full-bleed photo,
   "Kezdd a kutatást" / "Az én naplóm").
2. **Name** — asked once, right after the simulated QR scan.
3. **Location check** — runs immediately after the name is entered, using the
   real browser Geolocation API and a real Haversine-distance check against
   Budapest Zoo's actual coordinates (Állatkerti krt. 6-12, ~700 m radius).
   - **Match** → a short celebratory screen, then the full app unlocks for a
     5-hour visit session (featured animals, custom research, everything).
   - **No match / denied / unavailable** → the app goes straight into
     **journal-only mode**: existing entries stay fully viewable and editable,
     but no *new* research entry (featured or custom) can be started until the
     location check succeeds.
4. Returning to the app later (or from Home/Explore/Journal/Egyebek) always
   offers a **"Helyzet újraellenőrzése"** action to re-run the check and
   regain full access — the same 5-hour-session model as before, just
   triggered up front instead of via a separate "start visit" button.

Because this runs in a browser rather than on-site at the zoo, two **dev-only
test shortcuts** are on the location screen itself ("Szimulálj: az
állatkertben vagyok" / "…máshol vagyok") so the whole flow — including the
restricted journal-only state — can be exercised without actually being
there. There's also a matching "Munkamenet lejáratása" tool under the new
**Egyebek** tab.

## What's in the prototype

- **Splash → Name → Location check → (celebration) → Home/Explore/Journal/Egyebek**
  four-tab shell, redesigned to match the supplied mockup (`gpt_web-design_v3.png`).
- **Two featured animals** — Oroszlán (lion) and Elefánt (elephant) — each
  with a tabbed detail screen (Fő infók / Megfigyelés / Érdekesség), an
  observation question with a short educational response, an optional own
  photo (separate camera / gallery buttons), and a save step that ends on a
  dedicated success screen.
- **Custom research** — a generic form for any animal that isn't featured.
- **Journal-only restricted mode** — implemented exactly as requested: no
  location match → only the Napló tab (view + edit existing entries) and the
  Egyebek tab are usable; Home and Explore show a friendly gate instead of
  their normal content.
- **Persistence** — user, visit session, and all journal entries survive a
  page refresh via `localStorage`.

## Design assets

The screen designs were rebuilt to closely follow the supplied reference
screenshots (`landing_page.png`, `enter_name_page.png`, `location_page.png`,
`select_research_page.png`, `markd_animal_page.png`, `activity_page.png`,
`take_photo_page.png`, `diray_page.png`, `succes_save_page.png`) — card
shapes, icon style, button treatments, the wave-cut diary hero, and the
per-option observation icons all follow those images directly rather than
the earlier looser interpretation. The four background assets are used as
follows:

- `landin_BG.jpg` → splash background and the lion's photo throughout
  (card, list row, detail hero).
- `enter_name_BG.png` → decorative giraffe illustration on the name screen.
- `location_BG.png` → the light strip at the bottom of the location-check
  and restricted-journal screens.
- `giraffe_BG.png` → background art on the dark "Látogatás aktív" screen.

**Note on the elephant:** no elephant photo was supplied, so it still uses a
flat vector illustration (same one as before, recolored to the new palette)
rather than a real photo like the lion. Drop an elephant photo into
`public/images/` and point `PHOTO.elephant` to it (in `AnimalCard.jsx`,
`AnimalListRow.jsx`, `AnimalDetail.jsx`, `SuccessView.jsx`) to swap it in.

Typography and color were switched to match the mockup: Manrope (sans-serif)
throughout, a deep forest green (`#163c2c`) as the primary color, white cards
on a very light background, and fully-rounded pill buttons.

## Project structure

```
src/
  components/   Header, BottomNav, cards, photo picker, icons, illustrations,
                RestrictedGate, SuccessView…
  pages/        Splash, Onboarding, LocationCheck, VisitSuccess, Home,
                Explore, Journal, More, AnimalDetail, CustomResearch,
                EntryDetail
  data/         animals.js — the two featured animals' content
  utils/
    storage.js  localStorage read/write, isolated so it's the only file
                that needs to change when Firestore replaces it
    session.js  visit-session + geofence helpers (zooId, 5-hour window,
                real Haversine distance check against Budapest Zoo)
  App.jsx       top-level screen/tab state machine
public/images/  the four supplied design assets
```

## Known simplifications (intentionally out of scope for this pass)

- No Firebase Auth / Firestore — local state + `localStorage` only.
- No real QR scanning — the splash screen simulates having already scanned it.
- No AI photo recognition — the photo is just saved to the journal.
- Only 2 featured animals, one reusable detail layout for both.
- Elephant photo not supplied — still an illustration (see note above).
