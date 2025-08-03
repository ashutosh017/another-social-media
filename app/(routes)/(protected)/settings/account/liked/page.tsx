import { getMe } from "@/app/actions/auth.actions";
import prisma from "@/lib/db";
import LikedPostsPage from "./liked-page";

export default async function page() {
  const me = await getMe();
  const likedPosts = await prisma.post.findMany({
    where: {
      likes: {
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
  return <LikedPostsPage likedPosts={likedPosts} />;
}
