"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PostsStoriesCommentsPage() {
  const notificationSettings = [
    {
      id: "likes",
      title: "Likes",
      description: "When someone likes your posts or stories",
      enabled: true,
    },
    {
      id: "comments",
      title: "Comments",
      description: "When someone comments on your posts",
      enabled: true,
    },
    {
      id: "mentions",
      title: "Mentions",
      description: "When someone mentions you in a post or comment",
      enabled: true,
    },
    {
      id: "story-replies",
      title: "Story Replies",
      description: "When someone replies to your story",
      enabled: true,
    },
    {
      id: "story-mentions",
      title: "Story Mentions",
      description: "When someone mentions you in their story",
      enabled: false,
    },
    {
      id: "reposts",
      title: "Reposts",
      description: "When someone reposts your content",
      enabled: true,
    },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Posts, Stories & Comments</h1>
      </header>

      <div className="p-4 space-y-6">
        <p className="text-sm text-muted-foreground">
          Choose what notifications you want to receive about your posts, stories, and comments.
        </p>

        {notificationSettings.map((setting) => (
          <div key={setting.id} className="flex items-start justify-between space-x-4">
            <div className="flex-1">
              <Label htmlFor={setting.id} className="text-base font-medium">
                {setting.title}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">{setting.description}</p>
            </div>
            <Switch id={setting.id} defaultChecked={setting.enabled} />
          </div>
        ))}
      </div>
    </div>
  )
}
