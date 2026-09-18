export default function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-[var(--paper-raised)] border border-[var(--rule)] rounded-2xl p-4">
      <div className="flex items-center gap-2 text-[var(--green-mid)] mb-1.5">
        {icon}
        <span className="text-xs font-semibold tracking-wide text-ink-soft">{label}</span>
      </div>
      <p className="text-sm text-ink leading-snug">{value}</p>
    </div>
  )
}
