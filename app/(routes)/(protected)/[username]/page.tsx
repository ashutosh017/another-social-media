import { fetchUsertDetails } from "@/app/actions/profile.actions";
import ProfilePage from "./profile-page";

export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const profileDetails = await fetchUsertDetails(username);
  return <ProfilePage initialProfileDetails={profileDetails} />;
}
