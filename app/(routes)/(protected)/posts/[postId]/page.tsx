import { fetchPost } from "@/app/actions/posts.actions";
import PostPage from "./post-page";
import wait from "@/lib/wait";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const postId = (await params).postId;

  const postDetails = await fetchPost(postId);

  
  const isPrivatePost =
    !postDetails?.user.public && !!postDetails?.user.following ;
    if(!postDetails)notFound()
  return (
    <PostPage initialPostDetails={postDetails} isPrivatePost={isPrivatePost} />
  );
}
