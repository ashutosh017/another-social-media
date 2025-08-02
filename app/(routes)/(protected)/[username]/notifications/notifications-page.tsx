"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  UserPlus,
  Tag,
  BellOff,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { markAsSeenNotification } from "@/app/actions/notifications.actions";
import { NotificationsType } from "@/app/actions/types";
import { Notification, NotificationType } from "@/lib/generated/prisma";
import { acceptRejectFollowRequest } from "@/app/actions/follow.actions";
import NotificationsSkeleton from "./notifications-skeleton";

export default function NotificationsPage({
  initialNotifications,
}: {
  initialNotifications: NotificationsType;
}) {
  const [notifications, setNotifications] = useState<NotificationsType>();
  useEffect(() => {
    setNotifications(initialNotifications);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case NotificationType.LIKE:
        return <Heart className="w-4 h-4 text-red-500 fill-current" />;
      case NotificationType.COMMENT:
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case NotificationType.COMMENT_REPLY:
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case NotificationType.FOLLOW:
        return <UserPlus className="w-4 h-4 text-green-500" />;
      case NotificationType.FOLLOW_REQUEST:
        return <UserPlus className="w-4 h-4 text-orange-500" />;
      case NotificationType.MENTION:
        return <Tag className="w-4 h-4 text-purple-500" />;
      default:
        return <Heart className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case NotificationType.LIKE:
        if (notification.postId) {
          return "liked your photo";
        } else if (notification.commentId) {
          return "liked your comment";
        }
        return "liked your content";
      case NotificationType.COMMENT:
        return "mentioned you in a comment";
      case NotificationType.COMMENT_REPLY:
        return "mentioned you in a reply";
      case NotificationType.FOLLOW:
        return "started following you";
      case NotificationType.FOLLOW_REQUEST:
        return "requested to follow you";
      case NotificationType.MENTION:
        return "tagged you in a photo";
      default:
        return "interacted with your content";
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "now";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;

    return `${Math.floor(diffInDays / 7)}w`;
  };

  const handleFollowRequest = (
    fromUserId: string,
    notificationId: string,
    action: "accept" | "decline"
  ) => {
    console.log("handlefollow request called");

    setNotifications(
      (prev) =>
        prev &&
        prev.map((notification) => {
          if (
            notification.id === notificationId &&
            notification.followRequest
          ) {
            return {
              ...notification,
              followRequest: null,
              isRead: true,
            };
          }
          return notification;
        })
    );

    acceptRejectFollowRequest(fromUserId, action === "accept");
    // deleteNotification(notificationId)
    // createNotification(me?.id, notifications?.find((n)=>n.id===notificationId)?.actorId, "FOLLOW",{

    // })

    markAsSeenNotification(notificationId);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(
      (prev) =>
        prev &&
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-background border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-gray-100" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Notifications
          </h1>
        </div>
      </header>

      {/* Notifications List */}
      <main className="max-w-md mx-auto">
        <div className="bg-white dark:bg-background transition-colors">
          {!notifications ? (
            <NotificationsSkeleton />
          ) : notifications?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <BellOff className="w-10 h-10 mb-3" />
              <p className="text-lg font-semibold">You're all caught up</p>
              <p className="text-sm">No new notifications for now</p>
            </div>
          ) : (
            notifications?.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                  !notification.isRead ? "bg-blue-50 dark:bg-muted" : ""
                }`}
                onClick={() => {
                  markAsSeenNotification(notification.id);
                  !notification.isRead && markAsRead(notification.id);
                }}
              >
                {/* User Avatar with notification icon */}
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={notification.actor.profilePicUrl || "/user.png"}
                    />
                    <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                      {notification.actor.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-background rounded-full p-1 shadow-sm border border-gray-200 dark:border-gray-600">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-semibold">
                      {notification.actor.username}
                      {notification.actor.isVerified && (
                        <span className="text-blue-500 ml-1">✓</span>
                      )}
                    </span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {getNotificationText(notification)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {getTimeAgo(notification.dateCreated)}
                  </p>
                </div>

                {/* Post Image or Action Buttons */}
                <div
                  className="flex items-center gap-2"
                  onClick={() => {
                    console.log("mark as seen called");
                    markAsSeenNotification(notification.id);
                  }}
                >
                  {/* Follow Request Actions */}
                  {notification.type === NotificationType.FOLLOW_REQUEST &&
                    notification.followRequest && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="h-8 px-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollowRequest(
                              notification.actorId,
                              notification.id,
                              "accept"
                            );
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 border-gray-300 dark:border-gray-600 bg-white dark:bg-background hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollowRequest(
                              notification.actorId,
                              notification.id,
                              "decline"
                            );
                          }}
                        >
                          Decline
                        </Button>
                      </div>
                    )}

                  {/* Follow Button for new followers */}
                  {notification.type === NotificationType.FOLLOW && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 border-gray-300 dark:border-gray-600 bg-white dark:bg-background hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      Follow
                    </Button>
                  )}

                  {/* Post Image for post-related notifications */}
                  {(notification.post?.url ||
                    notification.comment?.post.url ||
                    notification.commentReply?.post.url) && (
                    <Image
                      src={
                        notification.post?.url ||
                        notification.comment?.post.url ||
                        notification.commentReply?.post.url ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt="Post"
                      width={44}
                      height={44}
                      className="rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                    />
                  )}

                  {/* Unread Indicator */}
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {/* <div className="p-4 text-center bg-white dark:bg-background transition-colors">
          <Button
            variant="ghost"
            className="text-blue-500 hover:bg-blue-50 dark:hover:bg-muted"
          >
            Load more notifications
          </Button>
        </div> */}
      </main>
    </div>
  );
}
