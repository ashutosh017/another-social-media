"use client";
import { editPost } from "@/app/actions/posts.actions";
import { PostType } from "@/app/actions/types";
import Link from "next/link";
import {
  Dispatch,
  memo,
  SetStateAction,
  useReducer,
  useRef,
  useState,
} from "react";

export const PostCaption = memo(
  ({
    post,
    isEditing,
    setIsEditing,
  }: {
    post: PostType;
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
  }) => {
    const [caption, setCaption] = useState(post?.caption || "");

    const countRef = useRef(0);
    countRef.current++;
    console.log("count: ", countRef.current);
    const username = post?.user.username;

    const handleSave = async () => {
      if (!post) return;
      await editPost(post.id, caption);
      setIsEditing(false);
    };

    return (
      <div className="text-sm">
        <Link href={`/${username}`} className="font-semibold">
          {username}
        </Link>{" "}
        {isEditing ? (
          <div className="mt-1">
            <textarea
              autoFocus
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full mt-1 p-1 border rounded text-sm"
              rows={2}
            />
            <div className="flex gap-2 mt-1">
              <button
                onClick={handleSave}
                className="text-blue-600 hover:underline text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setCaption(post?.caption || "");
                  setIsEditing(false);
                }}
                className="text-gray-500 hover:underline text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <span>{caption} </span>
        )}
      </div>
    );
  }
);
