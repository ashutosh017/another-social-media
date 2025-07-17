import { memo, RefObject, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Smile, X } from "lucide-react";
type CommentBoxProps = {
  showReplyPopup: boolean;
  replyTo: string;
  setShowReplyPopup: (val: boolean) => void;
  handleComment: (comment: string) => void;
};
export const CommentBox = (
  ({
    showReplyPopup,
    replyTo,
    setShowReplyPopup,
    handleComment,
  }: CommentBoxProps) => {
    console.log("comment box render")
    const [comment, setComment] = useState("");
    const commentRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
      if (replyTo && commentRef?.current) {
        commentRef.current.value = `@${replyTo} `;
        commentRef.current.focus();
      }
    });
    return (
      <div className="">
        {showReplyPopup && (
          <div className="px-4 py-2 bg-muted/50 border-b flex items-center justify-between ">
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

        <div className="p-4 border-t sticky bottom-0 bg-background">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/user.png" alt="Your avatar" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>

            <div className="flex-1 flex items-center gap-2">
              <Input
                placeholder="Add a comment..."
                value={comment}
                ref={commentRef}
                onChange={(e) => setComment(e.target.value)}
                className="border-none shadow-none focus-visible:ring-0 px-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleComment(comment);
                    setComment("");
                    if(commentRef.current){
                      commentRef.current.value = ""
                    }
                  }
                }}
              />
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            {comment.trim() && (
              <Button
                onClick={() => {
                  handleComment(comment);
                  setComment("");
                  if(commentRef.current){
                    commentRef.current.value = ""
                  }
                }}
                size="sm"
                variant="ghost"
                className="text-blue-500 font-semibold"
              >
                Post
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
