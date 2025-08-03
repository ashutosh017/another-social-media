import { getMe } from "@/app/actions/auth.actions";
import { getFeed } from "@/app/actions/feed.actions";
import { redirect } from "next/navigation";
import FeedPage from "./feed-page";

export default async function Page() {
  const me = await getMe();
  if (!me) redirect("/signin");
  const feed = await getFeed(me.username);

  return <FeedPage initialFeed={feed} hasInitialNewNotifications={false} />;
}
