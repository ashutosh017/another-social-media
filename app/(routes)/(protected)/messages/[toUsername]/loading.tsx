import { Skeleton } from "@/components/ui/skeleton";
import ChatPage from "./chat-page";
import ChatSkeleton from "./chat-skeleton";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return <ChatPageSkeleton />;
}

const ChatPageSkeleton = () => {
  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="w-8 h-8 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-muted bg-muted" />
        </div>
        <Skeleton className="h-6 w-32" /> {/* Username skeleton */}
      </div>
      <ChatSkeleton />
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  );
};
