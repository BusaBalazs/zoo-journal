import { IconX } from './icons'

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-[1px] px-0 sm:px-4">
      <div className="w-full sm:max-w-md bg-[var(--paper-raised)] rounded-t-3xl sm:rounded-3xl border border-[var(--rule)] shadow-xl p-6 max-h-[85vh] overflow-y-auto rise-in">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="font-display text-xl text-[var(--green-deep)]">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Bezárás"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-ink-soft hover:bg-[var(--paper)] transition-colors"
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
