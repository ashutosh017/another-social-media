import { fetchUserDetails } from "@/app/actions/profile.actions";
import ProfilePage from "./profile-page";
import wait from "@/lib/wait";

export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const profileDetails = await fetchUserDetails(username);
  return <ProfilePage initialUserDetails={profileDetails} />;
}
