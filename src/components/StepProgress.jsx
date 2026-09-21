export default function StepProgress({ step, total }) {
  return (
    <div className="flex-1 flex items-center gap-2.5">
      <div className="flex-1 h-1.5 rounded-full bg-[var(--rule)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--green-mid)] transition-all"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-ink-soft shrink-0">
        {step}/{total}
      </span>
    </div>
  )
}
