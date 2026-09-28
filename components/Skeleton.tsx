export default function Skeleton({ count = 3 }: { count?: number }) {
  return (
    <div aria-label="Loading tasks" className="grid gap-3" role="status">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-12 rounded-card border border-border"
        />
      ))}
      <span className="sr-only">Loading tasks…</span>
    </div>
  );
}
