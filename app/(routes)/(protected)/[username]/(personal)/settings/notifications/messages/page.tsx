"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MessagesPage() {
  const notificationSettings = [
    {
      id: "message-requests",
      title: "Message Requests",
      description: "When someone you don't follow sends you a message",
      enabled: true,
    },
    {
      id: "messages",
      title: "Messages",
      description: "When someone sends you a message",
      enabled: true,
    },
    {
      id: "group-messages",
      title: "Group Messages",
      description: "When someone sends a message in a group you're in",
      enabled: true,
    },
    {
      id: "video-calls",
      title: "Video Calls",
      description: "When someone calls you",
      enabled: true,
    },
    {
      id: "message-reactions",
      title: "Message Reactions",
      description: "When someone reacts to your messages",
      enabled: false,
    },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Messages</h1>
      </header>

      <div className="p-4 space-y-6">
        <p className="text-sm text-muted-foreground">Control notifications for messages and calls.</p>

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
