export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy-900/15 border-t-gold-500" />
        <p className="text-sm text-ink-muted">Loading Madina Luxury Car Travels...</p>
      </div>
    </div>
  );
}
