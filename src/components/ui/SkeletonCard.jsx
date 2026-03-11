export default function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--color-border)' }}
    >
      <div className="skeleton-shimmer w-full" style={{ height: 220 }} />
      <div className="p-5 space-y-3">
        <div className="skeleton-shimmer rounded" style={{ height: 14, width: '40%' }} />
        <div className="skeleton-shimmer rounded" style={{ height: 20, width: '75%' }} />
        <div className="skeleton-shimmer rounded" style={{ height: 12, width: '90%' }} />
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton-shimmer rounded" style={{ height: 16, width: '30%' }} />
          <div className="skeleton-shimmer rounded-lg" style={{ height: 36, width: 100 }} />
        </div>
      </div>
    </div>
  );
}
