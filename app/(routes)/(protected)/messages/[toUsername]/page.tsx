import { fetchConversationDetails } from "@/app/actions/messages.actions";
import ChatPage from "./chat-page";
import wait from "@/lib/wait";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ toUsername: string }>;
}) {
  const toUsername = (await params).toUsername;
  let conversation;
  try {
    conversation = await fetchConversationDetails(toUsername);
    // console.log("conv fetched: ", conversation)
  } catch (error) {
    redirect("./");
  }
  return <ChatPage initialConversation={conversation} />;
}
