# QRMB – Zoo Research Journal

A mobile-first prototype for a zoo research journal. It uses React, Vite, and
browser `localStorage`; there is no backend, authentication, QR scanning, or
photo recognition.

## Run locally

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Prototype flow

1. The splash screen leads to a short name form.
2. The location screen currently simulates a successful check when continued.
   It does not request browser coordinates; the geofence helper is retained
   for a future location-validation flow.
3. A successful check starts a five-hour visit session.
4. The Home and Explore screens show four featured animals: lion, elephant,
   penguin, and giraffe. Visitors can record an observation, an optional
   80-character custom observation, a photo, and a note.
5. Custom research supports animals that are not featured. Journal entries can
   be viewed, edited, and deleted.

Without an active visit, new research is gated while existing journal entries
remain accessible. Visit, user, and journal data are stored locally in the
browser.

## Source layout

- `src/App.jsx` — routes, visit state, and journal entry actions.
- `src/components/` — reusable cards, dialogs, photo controls, and navigation.
- `src/data/animals.js` — animal descriptions and localized observation options.
- `src/i18n/LanguageProvider.jsx` and `LanguageContext.js` — translations,
  provider, and language hook.
- `src/pages/` — application screens.
- `src/utils/session.js` — visit timing and zoo geofence helpers.
- `src/utils/storage.js` — local-storage access and local ID generation.
