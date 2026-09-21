import { useRef } from 'react'
import { IconCamera, IconX } from './icons'
import { useLanguage } from '../i18n/LanguageContext'

export default function PhotoPicker({ photo, onChange, label = 'Saját kutatási fotó' }) {
  const { language } = useLanguage()
  const text = language === 'en'
    ? { uploaded: 'Uploaded research photo', remove: 'Remove photo', hint: 'Take a photo of the animal if you like', camera: 'Take photo', gallery: 'Choose from gallery' }
    : language === 'de'
      ? { uploaded: 'Hochgeladenes Forschungsfoto', remove: 'Foto entfernen', hint: 'Fotografiere das Tier, wenn du möchtest', camera: 'Foto aufnehmen', gallery: 'Aus Galerie wählen' }
      : { uploaded: 'Feltöltött kutatási fotó', remove: 'Fotó eltávolítása', hint: 'Fotózd le az állatot, ha szeretnéd', camera: 'Fotó készítése', gallery: 'Galériából választok' }
  const cameraRef = useRef(null)
  const galleryRef = useRef(null)

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
            alt={text.uploaded}
            className="w-full h-48 object-cover rounded-2xl border border-[var(--rule)]"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label={text.remove}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/45 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="w-full h-32 rounded-2xl border-2 border-dashed border-[var(--rule)] flex flex-col items-center justify-center gap-1.5 text-ink-soft">
          <IconCamera className="w-6 h-6" />
          <span className="text-sm">{text.hint}</span>
        </div>
      )}

      <div className="flex gap-2 mt-2.5">
        <button
          type="button"
          onClick={() => cameraRef.current?.click()}
          className="flex-1 text-sm font-medium px-3.5 py-2.5 rounded-full border-[1.5px] border-[var(--green-mid)] text-[var(--green-mid)] flex items-center justify-center gap-1.5 hover:bg-[color:var(--green-mid)]/8 transition-colors"
        >
          <IconCamera className="w-4 h-4" />
          {text.camera}
        </button>
        <button
          type="button"
          onClick={() => galleryRef.current?.click()}
          className="flex-1 text-sm px-3.5 py-2.5 rounded-full border border-[var(--rule)] text-ink-soft hover:border-[var(--green-mid)] transition-colors"
        >
          {text.gallery}
        </button>
      </div>

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />
      <input ref={galleryRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  )
}
