import {
  fetchConversations,
} from "@/app/actions/messages.actions";
import MessagesPage from "./messages-page";

export default async function page() {
  const conversations = await fetchConversations();
  return <MessagesPage initialConversations={conversations} />;
}
