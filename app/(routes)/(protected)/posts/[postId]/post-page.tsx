"use client";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  toggleLikePost,
  toggleSavePost,
} from "@/app/actions/posts.actions";
import { MeContext } from "@/components/me-context";
import {
  addComment,
  toggleCommentLike,
  toggleReplyLike,
} from "@/app/actions/comments.actions";
import { cn } from "@/lib/utils";
import { CommentBox } from "@/components/commnet-box";
import { LikesModal } from "@/components/likes-modal";
import { PostType } from "@/app/actions/types";

export default function PostPage({
  initialPostDetails,
}: {
  initialPostDetails: PostType;
}) {
  console.log("render");
  const me = useContext(MeContext);
  if (!me) {
    return <div>user not found</div>;
  }
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const [localCommentLikes, setLocalCommentLikes] = useState<
    Record<string, number>
  >({});
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );
  const [localReplyLikes, setLocalReplyLikes] = useState<
    Record<string, Record<string, number>>
  >({});
  const [likedReplies, setLikedReplies] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const [post, setPost] = useState<PostType>(null);
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);
  const [showCommentReplies, setShowCommentReplies] = useState<
    Record<string, boolean>
  >({});
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [replyTo, setReplyTo] = useState("");
  const [newCommentId, setNewCommentId] = useState("");
  const [isLikesWindowOpen, setIsLikesWindowOpen] = useState<boolean>(false);
  const commentRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const commentScrollRef = useRef<HTMLDivElement | null>(null);
  const commentSectionRef = useRef<HTMLDivElement | null>(null);
  const [maxed, setMaxed] = useState(false);

  useEffect(() => {
    if (!commentSectionRef.current) return;
    const height = commentSectionRef.current.scrollHeight;
    setMaxed(height > 384); // 24rem
  }, [post?.comments]);
  useEffect(() => {
    function fetchPostWithId() {
      const p = initialPostDetails;
      if (p) {
        if (p.savedBy.length > 0) {
          setIsSaved(true);
        }
        const initialCommentLikes: Record<string, number> = {};
        const initialCommentLiked: Record<string, boolean> = {};
        const initialReplyLikes: Record<string, Record<string, number>> = {};
        const initialReplyLiked: Record<string, Record<string, boolean>> = {};

        setPost(() => p);
        setPostLikes(p.likes.length);
        p.comments.forEach((comment) => {
          initialCommentLikes[comment.id] = comment.likes.length;
          initialCommentLiked[comment.id] = comment.likes.some(
            (like) => like.user.username === me?.username
          );
          const replyLikes: Record<string, number> = {};
          const replyLiked: Record<string, boolean> = {};
          comment.replies.forEach((reply) => {
            if (reply.likes.length > 0) {
              replyLikes[reply.id] = reply.likes.length;
              replyLiked[reply.id] = reply.likes.some((id) => id === me?.id);
            }
          });
          if (comment.replies.length > 0) {
            initialReplyLikes[comment.id] = replyLikes;
            initialReplyLiked[comment.id] = replyLiked;
          }
        });
        setLocalCommentLikes(initialCommentLikes);
        setLikedComments(initialCommentLiked);
        setLocalReplyLikes(initialReplyLikes);
        setLikedReplies(initialReplyLiked);
        const myLike = p.likes.find((like) => like.user.id === me?.id);
        if (myLike) {
          setIsLiked(true);
        }
      }
    }
    fetchPostWithId();
  }, []);
  useEffect(() => {
    const el = document.getElementById(newCommentId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [post?.comments, newCommentId]);
  useEffect(() => {
    if (replyTo && commentRef?.current) {
      commentRef.current.value = `@${replyTo} `;
    }
  });

  const handleLike = (commentId?: string, replyId?: string) => {
    if (commentId && !replyId) {
      toggleCommentLike(commentId);
      const alreadyLiked = likedComments[commentId];
      setLocalCommentLikes((prev) => ({
        ...prev,
        [commentId]: prev[commentId] + (alreadyLiked ? -1 : 1),
      }));
      setLikedComments((prev) => ({
        ...prev,
        [commentId]: !alreadyLiked,
      }));
    } else if (replyId && commentId) {
      toggleReplyLike(replyId);
      const alreadyLiked = likedReplies[commentId][replyId];
      setLocalReplyLikes((prev) => ({
        ...prev,
        [commentId]: {
          ...prev[commentId],
          [replyId]: (prev[commentId][replyId] ?? 0) + (alreadyLiked ? -1 : 1),
        },
      }));
      setLikedReplies((prev) => ({
        ...prev,
        [commentId]: {
          ...prev[commentId],
          [replyId]: !prev[commentId][replyId],
        },
      }));
    } else {
      setPostLikes((prevLikes) => prevLikes + [1, -1][Number(isLiked)]);
      setIsLiked(!isLiked);
      toggleLikePost(post?.id ?? null);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toggleSavePost(postId);
  };

  const handleComment = useCallback(
    (comment: string) => {
      if (comment.trim()) {
        console.log("Adding comment:", comment);
        console.log("parent id: ", parentCommentId);
        console.log("reply to: ", replyTo);
        console.log("postId: ", postId);
        addComment(postId, comment, parentCommentId);
        setParentCommentId(null);
        setReplyTo("");
        setShowReplyPopup(false);
        const newCommentId = crypto.randomUUID();
        if (parentCommentId) {
          const reply = comment;
          setPost((prev) =>
            prev
              ? {
                  ...prev,
                  comments: prev.comments.map((comment) =>
                    comment.id === parentCommentId
                      ? {
                          ...comment,
                          replies: [
                            ...comment.replies,

                            {
                              id: newCommentId,
                              userId: me.id,
                              parentId: parentCommentId,
                              postId: postId,
                              dateCreated: new Date(),
                              text: reply,
                              user: {
                                name: me?.name,
                                username: me?.username,
                                profilePicUrl: me?.profilePicUrl,
                                isVerified: me?.isVerified,
                              },
                              likes: [],
                            },
                          ],
                        }
                      : comment
                  ),
                }
              : null
          );
        } else {
          setPost((prev) =>
            prev
              ? {
                  ...prev,
                  comments: [
                    ...prev.comments,
                    {
                      id: newCommentId,
                      dateCreated: new Date(),
                      text: comment,
                      user: {
                        name: me?.name,
                        username: me?.username,
                        profilePicUrl: me?.profilePicUrl,
                        isVerified: me?.isVerified,
                      },

                      likes: [],
                      replies: [],
                    },
                  ],
                }
              : null
          );
        }
      }
      setNewCommentId(newCommentId);
    },
    [parentCommentId]
  );

  const toggleReplies = (commentId: string) => {
    let commentReplies: Record<string, boolean> = {};
    if (showCommentReplies[commentId]) {
      commentReplies[commentId] = false;
    } else {
      commentReplies[commentId] = true;
    }
    setShowCommentReplies(commentReplies);
  };

  return (
    <div className="min-h-screen pb-16 scroll-smooth">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Button
          variant={"ghost"}
          onClick={() => window.history.back()}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5 " />
        </Button>
        <div onClick={()=>router.push(`/${post?.user.username}`)} className="flex items-center gap-2 flex-1">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={post?.user?.profilePicUrl || "/user.png"}
              alt={post?.user.username}
            />
            <AvatarFallback>
              {post?.user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{post?.user.username}</p>
            {/* {post?.location && (
              <p className="text-xs text-muted-foreground">{post?.location}</p>
            )} */}
          </div>
        </div>
        {/* <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button> */}
      </header>

      <div className="flex flex-col ">
        {/* Post Image */}
        <div className="relative aspect-square w-full">
          {post?.url && (
            <Image
              src={post?.url}
              alt={`Post by ${post?.user.username}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Post Actions */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleLike()}
                className="p-0"
              >
                <Heart
                  className={`h-6 w-6 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              <Button
                onClick={() => {
                  commentRef.current?.scrollIntoView({
                    block: "nearest",
                    behavior: "smooth",
                  });
                  commentRef.current?.focus();
                }}
                variant="ghost"
                size="icon"
                className="p-0"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="p-0">
                <Send className="h-6 w-6" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="p-0"
            >
              <Bookmark
                className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          <div className="space-y-2">
            <p
              onClick={() => {
                setIsLikesWindowOpen(true);
              }}
              className="font-semibold text-sm cursor-pointer"
            >
              {postLikes} likes
            </p>
            <div className="text-sm">
              <Link href={`/${post?.user.username}`} className="font-semibold">
                {post?.user.username}
              </Link>{" "}
              {post?.caption}
            </div>
            <p className="text-xs text-muted-foreground">
              {post?.dateCreated &&
                formatDistanceToNow(post?.dateCreated, { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="flex-1">
          <ScrollArea className={cn("p-4 border-b", maxed ? "h-96" : "h-fit")}>
            <h3 className="font-semibold text-sm mb-3">Comments</h3>
            <div ref={commentSectionRef} className={cn("space-y-4  ")}>
              {post && post?.comments.length > 0 ? (
                post?.comments.map((comment, index) => (
                  <div id={comment.id} key={index} className="mb-4 pr-2 ">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage
                          src={comment.user.profilePicUrl || "/user.png"}
                          alt={comment.user.username}
                        />
                        <AvatarFallback>
                          {comment.user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm">
                              <Link
                                href={`/${comment.user.username}`}
                                className="font-semibold"
                              >
                                {comment.user.username}
                              </Link>{" "}
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNowStrict(
                                  new Date(comment.dateCreated),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </span>
                            </p>
                            <p className="text-sm mt-1">{comment.text}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {localCommentLikes[comment.id] ??
                                  comment.likes.length}{" "}
                                likes
                              </span>
                              <button
                                onClick={() => {
                                  setParentCommentId(comment.id);
                                  setReplyTo(comment.user.username);
                                  setShowReplyPopup(true);
                                  if (bottomRef.current) {
                                    bottomRef.current.scrollIntoView({
                                      block: "nearest",
                                      behavior: "smooth",
                                    });
                                  }
                                }}
                                className="text-xs text-muted-foreground font-semibold"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-2"
                            onClick={() => handleLike(comment.id)}
                          >
                            <Heart
                              className={`h-3 w-3 ${
                                likedComments[comment.id]
                                  ? "fill-red-500 text-red-500"
                                  : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {comment.replies.length > 0 && (
                      <button
                        className="text-xs text-muted-foreground font-semibold ml-11 hover:text-foreground"
                        onClick={() => toggleReplies(comment.id)}
                      >
                        {comment.replies.length > 0 &&
                        showCommentReplies[comment.id]
                          ? `Hide replies (${comment.replies.length})`
                          : `View replies (${comment.replies.length})`}
                      </button>
                    )}
                    {showCommentReplies[comment.id] &&
                      comment.replies.map((reply) => (
                        <div
                          id={reply.id}
                          key={reply.id}
                          className="flex gap-3 ml-8"
                        >
                          <Avatar className="h-6 w-6 flex-shrink-0">
                            <AvatarImage
                              src={reply.user?.profilePicUrl || "/user.png"}
                              alt={reply.user.username}
                            />
                            <AvatarFallback>
                              {reply.user.username
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/${reply.user.username}`}
                                className="font-semibold text-sm"
                              >
                                {reply.user.username}
                              </Link>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(reply.dateCreated, {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{reply.text}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {localReplyLikes[comment.id][reply.id] ?? 0}{" "}
                                likes
                              </span>
                              <button
                                className="text-xs text-muted-foreground font-semibold hover:text-foreground"
                                onClick={() => {
                                  setParentCommentId(comment.id);
                                  setReplyTo(reply.user.username);
                                  setShowReplyPopup(true);
                                  if (bottomRef.current) {
                                    bottomRef.current.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                }}
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 ml-2 flex-shrink-0"
                            onClick={() => handleLike(comment.id, reply.id)}
                          >
                            <Heart
                              className={cn(
                                "h-2.5 w-2.5",
                                likedReplies[comment.id][reply.id] &&
                                  "fill-red-500 text-red-500"
                              )}
                            />
                          </Button>
                        </div>
                      ))}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center text-muted-foreground text-sm py-6">
                  <MessageCircle className="w-6 h-6 mb-2" />
                  <span>No comments yet. Start the conversation!</span>
                </div>
              )}
              <div ref={commentScrollRef}></div>
            </div>
          </ScrollArea>
        </div>
        <div className="relative w-full max-w-md">
          {/* Floating Reply Popup */}
          {showReplyPopup && (
            <div className="absolute bottom-full w-full px-4 py-4 bg-muted border rounded-t-md flex items-center justify-between z-10">
              <span className="text-sm text-muted-foreground">
                Replying to <span className="font-semibold">@{replyTo}</span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowReplyPopup(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Comment Box */}
          <CommentBox commentRef={commentRef} handleComment={handleComment} />
        </div>
      </div>
      <div ref={bottomRef}></div>
      <LikesModal
        likes={post?.likes ? post.likes : []}
        onOpenChange={setIsLikesWindowOpen}
        open={isLikesWindowOpen}
        totalLikes={post?.likes ? post.likes.length : 0}
      />
    </div>
  );
}
