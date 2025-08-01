import { ArrowLeft } from "lucide-react";



export default function NotificationsSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="flex items-center space-x-4 animate-pulse">
          {/* Profile picture skeleton */}
          <div className="w-12 h-12 rounded-full bg-muted" />

          {/* Text skeleton */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>

          {/* Thumbnail or icon */}
          <div className="w-10 h-10 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
