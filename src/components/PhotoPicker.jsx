import { useRef } from 'react'
import { IconCamera, IconX } from './icons'

export default function PhotoPicker({ photo, onChange, label = 'Saját kutatási fotó' }) {
  const inputRef = useRef(null)

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <p className="text-sm font-medium text-ink-soft mb-2">{label}</p>
      {photo ? (
        <div className="relative">
          <img
            src={photo}
            alt="Feltöltött kutatási fotó"
            className="w-full h-48 object-cover rounded-2xl border border-[var(--rule)]"
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-sm px-3 py-1.5 rounded-full border border-[var(--rule)] text-ink-soft hover:border-[var(--green-mid)] hover:text-[var(--green-deep)] transition-colors"
            >
              Fotó cseréje
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-sm px-3 py-1.5 rounded-full border border-[var(--rule)] text-ink-soft hover:border-[var(--clay)] hover:text-[var(--clay)] transition-colors flex items-center gap-1"
            >
              <IconX className="w-3.5 h-3.5" />
              Eltávolítás
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-32 rounded-2xl border-2 border-dashed border-[var(--rule)] flex flex-col items-center justify-center gap-2 text-ink-soft hover:border-[var(--green-mid)] hover:text-[var(--green-deep)] transition-colors"
        >
          <IconCamera className="w-6 h-6" />
          <span className="text-sm">Fotó készítése vagy kiválasztása</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}
