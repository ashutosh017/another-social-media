import { fetchNotifications } from "@/app/actions/notifications.actions";
import NotificationsPage from "./notifications-page";

export default async function page() {
  const notifications = await fetchNotifications();
  // await new Promise((res) => {
  //   setTimeout(() => {
  //     res(1);
  //   }, 2000);
  // });

  return <NotificationsPage initialNotifications={[]} />;
}
