import { MessageCircle } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="max-h-screen h-3/5 flex flex-col items-center justify-end text-center text-muted-foreground p-8">
      <MessageCircle className="w-12 h-12 mb-4 text-gray-400" />
      <p className="text-lg font-semibold">Start the conversation</p>
      <p className="text-sm">Send a message to break the ice.</p>
    </div>
  );
}
