import { LionArt, ElephantArt, LeafBadgeArt } from './creatures'
import { IconCheck, IconChevronRight, IconLeaf } from './icons'

const ART = { lion: LionArt, elephant: ElephantArt }
const PHOTO = { lion: '/images/landing-lion.jpg' }

const CONFETTI = [
  { top: '4%', left: '18%', color: 'var(--ochre)', size: 8 },
  { top: '12%', left: '78%', color: 'var(--teal)', size: 7 },
  { top: '0%', left: '52%', color: 'var(--green-mid)', size: 6 },
  { top: '30%', left: '8%', color: 'var(--clay)', size: 6 },
  { top: '34%', left: '88%', color: 'var(--ochre)', size: 8 },
  { top: '58%', left: '14%', color: 'var(--green-mid)', size: 5 },
  { top: '55%', left: '84%', color: 'var(--teal)', size: 6 },
]

export default function SuccessView({ entry, onContinueResearch, onOpenJournal }) {
  const Art = entry.type === 'featured' ? ART[entry.animalId] : null
  const stockPhoto = entry.type === 'featured' ? PHOTO[entry.animalId] : null
  const thumb = entry.photo || stockPhoto

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-[var(--paper-raised)]">
      <div className="flex-1 px-6 pt-16 pb-8 flex flex-col items-center text-center">
        <div className="relative w-32 h-24 mb-1">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="absolute rounded-full pop-in"
              style={{
                top: c.top,
                left: c.left,
                width: c.size,
                height: c.size,
                background: c.color,
                animationDelay: `${i * 60}ms`,
              }}
            />
          ))}
          <div className="pop-in absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[var(--green-mid)] text-white flex items-center justify-center">
            <IconCheck className="w-7 h-7" />
          </div>
        </div>

        <h1 className="font-display text-3xl text-ink mb-2">Sikerült!</h1>
        <p className="text-ink-soft mb-8">A megfigyelésed elmentve a naplóba.</p>

        <div className="w-full bg-[var(--paper)] border border-[var(--rule)] rounded-2xl p-3.5 flex items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[color:var(--green-line)]/40">
            {thumb ? (
              <img src={thumb} alt="" className="w-full h-full object-cover" />
            ) : Art ? (
              <Art className="w-full h-full" />
            ) : (
              <LeafBadgeArt className="w-full h-full" />
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="font-bold text-ink truncate">{entry.animalName}</p>
            <p className="text-xs text-ink-soft italic">
              Ma, {new Date(entry.createdAt).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <IconChevronRight className="w-4 h-4 text-ink-soft shrink-0" />
        </div>

        <button
          onClick={onContinueResearch}
          className="w-full py-3.5 rounded-full bg-[var(--green-deep)] text-white font-semibold hover:bg-[color:var(--green-deep)]/90 transition-colors flex items-center justify-center gap-2 mb-3"
        >
          Tovább kutatok
          <span aria-hidden>→</span>
        </button>
        <button
          onClick={onOpenJournal}
          className="w-full py-3.5 rounded-full border border-[var(--rule)] text-ink font-medium hover:border-[var(--green-mid)] transition-colors mb-8"
        >
          Ugrás a naplómhoz
        </button>

        <p className="text-sm text-[var(--green-mid)] font-medium flex items-center justify-center gap-1.5">
          <IconLeaf className="w-4 h-4" />
          Minden megfigyelés számít!
        </p>
      </div>
    </div>
  )
}
