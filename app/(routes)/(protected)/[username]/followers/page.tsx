import {
  checkAllowanceToSeeFollowersAndFollowingList,
  fetchFollowers,
} from "@/app/actions/follow.actions";
import FollowersPage from "./followers-page";

export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const initialFollowers = await fetchFollowers(username);
  const allowed = await checkAllowanceToSeeFollowersAndFollowingList(username);
  return (
    <FollowersPage initialFollowers={initialFollowers} isAllowed={allowed} />
  );
}
