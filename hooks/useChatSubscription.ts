import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher-client";

export function useChatSubscription(
  conversationId: string,
  onMessage: (msg: { content: string; senderId: string }) => void
) {
  useEffect(() => {
    if (!conversationId) return;

    const channel = pusherClient.subscribe(conversationId);

    channel.bind(
      "new-message",
      (message: { content: string; senderId: string }) => {
        onMessage(message);
      }
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [conversationId, onMessage]);
}
