"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FollowingFollowersPage() {
  const notificationSettings = [
    {
      id: "new-followers",
      title: "New Followers",
      description: "When someone starts following you",
      enabled: true,
    },
    {
      id: "follow-requests",
      title: "Follow Requests",
      description: "When someone requests to follow your private account",
      enabled: true,
    },
    {
      id: "accepted-requests",
      title: "Accepted Follow Requests",
      description: "When someone accepts your follow request",
      enabled: false,
    },
    {
      id: "friends-join",
      title: "Friends Join",
      description: "When contacts from your phone join the platform",
      enabled: false,
    },
    {
      id: "suggested-follows",
      title: "Suggested People",
      description: "Suggestions for people you might want to follow",
      enabled: true,
    },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Following & Followers</h1>
      </header>

      <div className="p-4 space-y-6">
        <p className="text-sm text-muted-foreground">
          Manage notifications about your followers and the people you follow.
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
