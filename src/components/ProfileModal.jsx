import Modal from './Modal'

export default function ProfileModal({ user, visitActive, onClose, onExpireSession }) {
  return (
    <Modal title="Profil" onClose={onClose}>
      <div className="space-y-5">
        <div>
          <p className="text-xs text-ink-soft mb-0.5">Kutató neve</p>
          <p className="font-display text-lg text-ink">{user.name}</p>
        </div>

        <div className="pt-4 border-t border-[var(--rule)]">
          <p className="text-xs text-ink-soft mb-2">Teszt eszközök (csak a prototípusban)</p>
          <button
            onClick={onExpireSession}
            disabled={!visitActive}
            className="w-full py-2.5 rounded-xl border border-[var(--rule)] text-sm text-ink-soft disabled:opacity-40 hover:border-[var(--clay)] hover:text-[var(--clay)] transition-colors"
          >
            Munkamenet lejáratása
          </button>
        </div>
      </div>
    </Modal>
  )
}
