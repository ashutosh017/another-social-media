"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart, MessageCircle, UserPlus, Tag } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
export enum NotificationType {
  FOLLOW = "FOLLOW",
  FOLLOW_REQUEST = "FOLLOW_REQUEST",
  COMMENT = "COMMENT",
  COMMENT_REPLY = "COMMENT_REPLY",
  POST = "POST",
  LIKE = "LIKE",
}

export interface User {
  id: string
  username: string
  avatar?: string
  isVerified?: boolean
}

export interface Post {
  id: string
  imageUrl?: string
  caption?: string
}

export interface Comment {
  id: string
  content: string
  post: Post
}

export interface CommentReply {
  id: string
  content: string
  comment: Comment
}

export interface Follow {
  id: string
  followerId: string
  followingId: string
}

export interface FollowRequest {
  id: string
  requesterId: string
  requestedId: string
  status: "PENDING" | "ACCEPTED" | "DECLINED"
}

export interface PostLike {
  id: string
  userId: string
  postId?: string
  commentId?: string
  post?: Post
  comment?: Comment
}

export interface Notification {
  id: string
  dateCreated: Date
  type: NotificationType
  isRead: boolean
  postId?: string
  post?: Post
  followId?: string
  follow?: Follow
  followRequestId?: string
  followRequest?: FollowRequest
  commentId?: string
  comment?: Comment
  likeId?: string
  like?: PostLike
  commentReplyId?: string
  commentReply?: CommentReply
  actorId: string
  actor: User
  recipientId: string
  recipient: User
}

export default function NotificationsPage() {
  // Mock data based on the Prisma schema
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      dateCreated: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      type: NotificationType.LIKE,
      isRead: false,
      postId: "post1",
      post: {
        id: "post1",
        imageUrl: "/placeholder.svg?height=60&width=60",
        caption: "Beautiful sunset today!",
      },
      likeId: "like1",
      like: {
        id: "like1",
        userId: "user1",
        postId: "post1",
      },
      actorId: "user1",
      actor: {
        id: "user1",
        username: "john_doe",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      recipientId: "currentUser",
      recipient: {
        id: "currentUser",
        username: "you",
      },
    },
    {
      id: "2",
      dateCreated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      type: NotificationType.FOLLOW_REQUEST,
      isRead: false,
      followRequestId: "req1",
      followRequest: {
        id: "req1",
        requesterId: "user2",
        requestedId: "currentUser",
        status: "PENDING",
      },
      actorId: "user2",
      actor: {
        id: "user2",
        username: "sarah_m",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      recipientId: "currentUser",
      recipient: {
        id: "currentUser",
        username: "you",
      },
    },
    {
      id: "3",
      dateCreated: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      type: NotificationType.COMMENT,
      isRead: false,
      commentId: "comment1",
      comment: {
        id: "comment1",
        content: "Amazing shot! @you you should check this out",
        post: {
          id: "post2",
          imageUrl: "/placeholder.svg?height=60&width=60",
          caption: "Mountain adventure",
        },
      },
      actorId: "user3",
      actor: {
        id: "user3",
        username: "alex_photo",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      recipientId: "currentUser",
      recipient: {
        id: "currentUser",
        username: "you",
      },
    },
    {
      id: "4",
      dateCreated: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      type: NotificationType.POST,
      isRead: true,
      postId: "post3",
      post: {
        id: "post3",
        imageUrl: "/placeholder.svg?height=60&width=60",
        caption: "Great time with friends!",
      },
      actorId: "user4",
      actor: {
        id: "user4",
        username: "emma_travels",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      recipientId: "currentUser",
      recipient: {
        id: "currentUser",
        username: "you",
      },
    },
    {
      id: "5",
      dateCreated: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      type: NotificationType.FOLLOW,
      isRead: true,
      followId: "follow1",
      follow: {
        id: "follow1",
        followerId: "user5",
        followingId: "currentUser",
      },
      actorId: "user5",
      actor: {
        id: "user5",
        username: "mike_fitness",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      recipientId: "currentUser",
      recipient: {
        id: "currentUser",
        username: "you",
      },
    },
    {
      id: "6",
      dateCreated: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      type: NotificationType.COMMENT_REPLY,
      isRead: true,
      commentReplyId: "reply1",
      commentReply: {
        id: "reply1",
        content: "Thanks @you! Glad you liked it",
        comment: {
          id: "comment2",
          content: "Original comment here",
          post: {
            id: "post4",
            imageUrl: "/placeholder.svg?height=60&width=60",
            caption: "Delicious meal",
          },
        },
      },
      actorId: "user6",
      actor: {
        id: "user6",
        username: "lisa_art",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      recipientId: "currentUser",
      recipient: {
        id: "currentUser",
        username: "you",
      },
    },
  ])

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.LIKE:
        return <Heart className="w-4 h-4 text-red-500 fill-current" />
      case NotificationType.COMMENT:
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case NotificationType.COMMENT_REPLY:
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case NotificationType.FOLLOW:
        return <UserPlus className="w-4 h-4 text-green-500" />
      case NotificationType.FOLLOW_REQUEST:
        return <UserPlus className="w-4 h-4 text-orange-500" />
      case NotificationType.POST:
        return <Tag className="w-4 h-4 text-purple-500" />
      default:
        return <Heart className="w-4 h-4 text-gray-500" />
    }
  }

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case NotificationType.LIKE:
        if (notification.like?.postId) {
          return "liked your photo"
        } else if (notification.like?.commentId) {
          return "liked your comment"
        }
        return "liked your content"
      case NotificationType.COMMENT:
        return "mentioned you in a comment"
      case NotificationType.COMMENT_REPLY:
        return "mentioned you in a reply"
      case NotificationType.FOLLOW:
        return "started following you"
      case NotificationType.FOLLOW_REQUEST:
        return "requested to follow you"
      case NotificationType.POST:
        return "tagged you in a photo"
      default:
        return "interacted with your content"
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "now"
    if (diffInMinutes < 60) return `${diffInMinutes}m`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d`

    return `${Math.floor(diffInDays / 7)}w`
  }

  const handleFollowRequest = (notificationId: string, action: "accept" | "decline") => {
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification.id === notificationId && notification.followRequest) {
          return {
            ...notification,
            followRequest: {
              ...notification.followRequest,
              status: action === "accept" ? "ACCEPTED" : "DECLINED",
            },
            isRead: true,
          }
        }
        return notification
      }),
    )
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-background border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-4">
          <Link href={'feed'}>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-gray-100" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Notifications</h1>
        </div>
      </header>

      {/* Notifications List */}
      <main className="max-w-md mx-auto">
        <div className="bg-white dark:bg-background transition-colors">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                !notification.isRead ? "bg-blue-50 dark:bg-muted" : ""
              }`}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
            >
              {/* User Avatar with notification icon */}
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={notification.actor.avatar || "/placeholder.svg"} />
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
                    {notification.actor.isVerified && <span className="text-blue-500 ml-1">✓</span>}
                  </span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">{getNotificationText(notification)}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{getTimeAgo(notification.dateCreated)}</p>
              </div>

              {/* Post Image or Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Follow Request Actions */}
                {notification.type === NotificationType.FOLLOW_REQUEST &&
                  notification.followRequest?.status === "PENDING" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="h-8 px-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFollowRequest(notification.id, "accept")
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-3 border-gray-300 dark:border-gray-600 bg-white dark:bg-background hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFollowRequest(notification.id, "decline")
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
                {(notification.post?.imageUrl ||
                  notification.comment?.post.imageUrl ||
                  notification.commentReply?.comment.post.imageUrl) && (
                  <Image
                    src={
                      notification.post?.imageUrl ||
                      notification.comment?.post.imageUrl ||
                      notification.commentReply?.comment.post.imageUrl ||
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
                {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="p-4 text-center bg-white dark:bg-background transition-colors">
          <Button variant="ghost" className="text-blue-500 hover:bg-blue-50 dark:hover:bg-muted">
            Load more notifications
          </Button>
        </div>
      </main>
    </div>
  )
}
