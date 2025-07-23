"use client";

import { sendUnsendFollowRequest } from "@/app/actions/follow.actions";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";

export const FollowButton = ({
  toUserId,
  toUserIsPublic,
  status,
}: {
  toUserId: string;
  toUserIsPublic: boolean;
  status: string;
}) => {
  const [followStatus, setFollowStatus] = useState(status);
  return (
    <Button
      onClick={() => {
        if (followStatus === "Follow") {
          if (toUserIsPublic) {
            setFollowStatus("Following");
          } else {
            setFollowStatus("Requested");
          }
        } else {
          setFollowStatus("Follow");
        }

        sendUnsendFollowRequest(toUserId);
      }}
      variant={followStatus === "Following" ? "outline" : "default"}
      size="sm"
      className="rounded-lg"
    >
      {followStatus}
    </Button>
  );
};
