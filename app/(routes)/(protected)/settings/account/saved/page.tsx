import { getMe } from "@/app/actions/auth.actions";
import prisma from "@/lib/db";
import SavedPage from "./saved-posts";

export default async function page() {
  const me = await getMe();
  const savedPosts = await prisma.post.findMany({
    where: {
      savedBy: {
        some: {
          userId: me?.id,
        },
      },
    },
    select: {
      url: true,
      id: true,
    },
  });
  return <SavedPage savedPosts={savedPosts}/> 
}
