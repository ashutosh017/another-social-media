import { fetchPost } from "@/app/actions/posts.actions";
import PostPage from "./post-page";
import wait from "@/lib/wait";

export default async function page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const postId = (await params).postId;

  const postDetails = await fetchPost(postId);
  return <PostPage initialPostDetails={postDetails} />;
}
