import {
  checkAllowanceToSeeFollowersAndFollowingList,
  fetchFollowing,
} from "@/app/actions/follow.actions";
import FollowingPage from "./following-page";

export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const initialFollowing = await fetchFollowing(username);
  const allowed = await checkAllowanceToSeeFollowersAndFollowingList(username);

  return (
    <FollowingPage initialFollowing={initialFollowing} isAllowed={allowed} />
  );
}
