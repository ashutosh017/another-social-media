"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Info,
  MessageCircle,
  Phone,
  Send,
  Video,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MeContext } from "@/components/me-context";
import {
  fetchConversationDetails,
  sendMessage,
} from "@/app/actions/messages.actions";
import { ConversationDetailsType } from "@/app/actions/types";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatSubscription } from "@/hooks/useChatSubscription";
import ChatSkeleton from "./chat-skeleton";
import EmptyChat from "./empty-chat";

export default function ChatPage({
  initialConversation,
}: {
  initialConversation: ConversationDetailsType;
}) {
  const router = useRouter();
  const params = useParams();
  const me = useContext(MeContext);
  const toUsername = params.toUsername as string;
  const username = params.username as string;
  const [message, setMessage] = useState("");
  const [conversation, setConversation] =
    useState<ConversationDetailsType>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);
  useEffect(() => {
    if (me?.username !== username) router.push(`/${me?.username}`);
    if (inputRef) inputRef.current?.focus();
    if (initialConversation) setConversation(initialConversation);
  }, []);
  useChatSubscription(conversation?.id ?? "", (msg) => {
    console.log("use chat conv ran");
    const newMessageId = crypto.randomUUID();
    if (!conversation) return;
    setConversation(
      (prev) =>
        prev && {
          ...prev,
          messages: [
            ...prev.messages,
            {
              content: msg.content,
              conversationId: prev.id,
              dateCreated: new Date(),
              id: newMessageId,
              sender: conversation.participants[0].user,
              senderId: msg.senderId,
              seen: false,
            },
          ],
        }
    );
  });

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, you would send the message to the server
      sendMessage(message, toUsername);
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <ScrollArea className="flex flex-col  pb-16 max-h-screen  ">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <div
          className="flex items-center flex-1 cursor-pointer"
          onClick={() => router.push(`/${toUsername}`)}
        >
          <button onClick={() => window.history.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src={
                conversation?.participants.find(
                  (p) => p.user.username === toUsername
                )?.user.profilePicUrl ?? "/user.png"
              }
              alt={`${toUsername}`}
            />
            {/* <AvatarFallback>{`U`}</AvatarFallback> */}
          </Avatar>
          <div className="flex-1">
            <h1 className="font-semibold">{toUsername}</h1>
            <p className="text-xs text-muted-foreground">Active Now</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Video className="h-5 w-5" />
          </Button>
          {/* <Button variant="ghost" size="icon" className="h-9 w-9">
            <Info className="h-5 w-5" />
          </Button> */}
        </div>
      </header>

      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4`}
        style={{ height: "calc(100vh - 208px)" }}
      >
        {conversation ? (
          <div
            className={`flex flex-col gap-4 ${
              conversation?.messages?.length === 1 ? "justify-end" : ""
            } h-full`}
          >
            {conversation.messages.map((msg, idx) => {
              const isLast = idx === conversation.messages.length - 1;

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === me?.id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                      msg.senderId === me?.id
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted rounded-tl-none"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.senderId === me?.id
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {formatDistanceToNow(msg.dateCreated, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  {isLast && <div ref={bottomRef} />}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyChat />
        )}
      </div>

      <div className="p-4 border-t sticky bottom-0 bg-background">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <Button
            size="icon"
            className="rounded-full"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
