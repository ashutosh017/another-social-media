import { Heart, MessageCircle } from "lucide-react";

export default function FeedSkeleton() {
  return (
    <div className="space-y-8 animate-pulse px-4 py-6">
      {/* <div className="flex justify-between w-md  h-10 items-center">
        <div className="w-32 h-5 bg-muted"></div>
        <div className="flex gap-4 items-center justify-center mr-12">
          <Heart className="h-6 w-6 text-muted fill-muted rounded-xl"></Heart>
          <MessageCircle className="h-6 w-6 text-muted fill-muted rounded-xl"></MessageCircle>
        </div>
      </div> */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-4">
          {/* Header: Avatar + Username */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div className="h-4 w-24 bg-muted rounded" />
          </div>

          {/* Image placeholder */}
          <div className="w-full h-[400px] bg-muted rounded-xl" />

          {/* Actions row */}
          <div className="flex gap-4">
            <div className="w-6 h-6 bg-muted rounded" />
            <div className="w-6 h-6 bg-muted rounded" />
            <div className="w-6 h-6 bg-muted rounded" />
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <div className="w-3/4 h-4 bg-muted rounded" />
            <div className="w-1/2 h-4 bg-muted rounded" />
          </div>

          <hr className="border-muted/50" />
        </div>
      ))}
    </div>
  );
}
