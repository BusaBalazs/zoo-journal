import { useState } from 'react'
import Header from '../components/Header'
import { IconQr, IconPin, IconCheck } from '../components/icons'
import { ZOO } from '../utils/session'

const STEPS = {
  idle: 'idle',
  checking: 'checking',
  verified: 'verified',
  unavailable: 'unavailable',
  started: 'started',
}

export default function VisitStart({ onBack, onSessionStarted }) {
  const [step, setStep] = useState(STEPS.idle)

  function handleStart() {
    setStep(STEPS.checking)

    if (!('geolocation' in navigator)) {
      setStep(STEPS.unavailable)
      return
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        // Prototype: accept any coordinates, no geofence check yet.
        setStep(STEPS.verified)
      },
      () => {
        setStep(STEPS.unavailable)
      },
      { timeout: 6000 }
    )
  }

  function handleContinue() {
    setStep(STEPS.started)
    onSessionStarted()
  }

  return (
    <div className="min-h-full max-w-md mx-auto flex flex-col">
      <Header title="Bejáratkori QR" onBack={onBack} />

      <div className="flex-1 px-6 py-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-[var(--green-deep)] text-[var(--paper-raised)] flex items-center justify-center mb-6">
          <IconQr className="w-9 h-9" />
        </div>

        <h1 className="font-display text-2xl text-ink mb-2">Ma itt kezded a kutatást: {ZOO.name}</h1>
        <p className="text-ink-soft leading-relaxed mb-8 max-w-xs">
          A végleges alkalmazásban ezt a bejáratnál kihelyezett QR-kód beolvasásával indítod. Ez most egy szimulált beolvasás.
        </p>

        {step === STEPS.idle && (
          <button
            onClick={handleStart}
            className="w-full py-3.5 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] font-medium hover:bg-[var(--green-mid)] transition-colors"
          >
            Mai kutatás indítása
          </button>
        )}

        {step === STEPS.checking && (
          <div className="flex items-center gap-2 text-ink-soft rise-in">
            <span className="w-2 h-2 rounded-full bg-[var(--ochre)] animate-pulse" />
            Helyzet ellenőrzése…
          </div>
        )}

        {(step === STEPS.verified || step === STEPS.unavailable) && (
          <div className="w-full rise-in">
            <div className="flex items-center justify-center gap-2 text-[var(--green-deep)] mb-1">
              {step === STEPS.verified ? <IconCheck className="w-5 h-5" /> : <IconPin className="w-5 h-5" />}
              <span className="font-medium">
                {step === STEPS.verified ? 'Helyzet megerősítve' : 'A helyzet nem érhető el'}
              </span>
            </div>
            <p className="text-sm text-ink-soft mb-6">
              {step === STEPS.verified
                ? 'Szuper, indíthatod a mai kutatási munkamenetet.'
                : 'Nem gond — a prototípusban enélkül is folytathatod.'}
            </p>
            <button
              onClick={handleContinue}
              className="w-full py-3.5 rounded-2xl bg-[var(--green-deep)] text-[var(--paper-raised)] font-medium hover:bg-[var(--green-mid)] transition-colors"
            >
              Kutatási munkamenet indítása
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
