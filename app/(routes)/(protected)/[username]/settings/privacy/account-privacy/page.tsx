"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AccountPrivacyPage() {
  const privacySettings = [
    {
      id: "private-account",
      title: "Private Account",
      description: "When your account is private, only people you approve can see your posts and stories.",
      enabled: false,
    },
    {
      id: "activity-status",
      title: "Activity Status",
      description: "Allow others to see when you were last active.",
      enabled: true,
    },
    {
      id: "story-sharing",
      title: "Allow Story Sharing",
      description: "Let others share your stories to their stories.",
      enabled: true,
    },
    {
      id: "read-receipts",
      title: "Read Receipts",
      description: "Let others know when you've read their messages.",
      enabled: true,
    },
    {
      id: "online-status",
      title: "Show Online Status",
      description: "Show when you're active or recently active.",
      enabled: false,
    },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Account Privacy</h1>
      </header>

      <div className="p-4 space-y-6">
        {privacySettings.map((setting) => (
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

        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full bg-transparent">
            Download Your Data
          </Button>
        </div>
      </div>
    </div>
  )
}
