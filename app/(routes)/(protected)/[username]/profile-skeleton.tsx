export default function ProfileSkeleton() {
  return (
    <div className="pb-16">
      {/* Header Skeleton */}
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <div className="h-6 bg-muted rounded w-24 animate-pulse flex-1 text-center" />
        <div className="h-5 w-5 bg-muted rounded animate-pulse absolute right-4" />
      </header>

      {/* Profile Info Skeleton */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-8">
          <div className="h-20 w-20 bg-muted rounded-full animate-pulse" />
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-6 w-12 bg-muted rounded animate-pulse mb-1" />
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-5 bg-muted rounded w-32 animate-pulse" />
          <div className="h-4 bg-muted rounded w-full animate-pulse" />
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-muted rounded w-24 animate-pulse" />
        </div>

        {/* <div className="mt-4 flex gap-2">
          <div className="h-9 bg-muted rounded flex-1 animate-pulse" />
          <div className="h-9 bg-muted rounded flex-1 animate-pulse" />
          <div className="h-9 bg-muted rounded w-20 animate-pulse" />
        </div> */}

        {/* Story Highlights Skeleton */}
        {/* <div className="mt-6">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-1 flex-shrink-0">
                <div className="h-14 w-14 bg-muted rounded-full animate-pulse" />
                <div className="h-3 w-16 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Tabs Skeleton */}
      <div className="border-b">
        <div className="flex">
          <div className="flex-1 h-12 bg-muted animate-pulse" />
          <div className="flex-1 h-12 bg-muted/50 animate-pulse" />
        </div>
      </div>

      {/* Posts Grid Skeleton */}
      <div className="grid grid-cols-3 gap-0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  )
}
