export default function Loading() {
  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10">
        <div className="relative">
          <div className="h-10 bg-muted rounded-md animate-pulse" />
        </div>
      </header>
      <div className="p-4">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-12 w-12 bg-muted rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
