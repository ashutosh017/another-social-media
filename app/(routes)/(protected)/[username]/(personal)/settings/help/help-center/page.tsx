"use client"

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function HelpCenterPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      articles: [
        "How to create an account",
        "Setting up your profile",
        "Understanding the basics",
        "Privacy settings overview",
      ],
    },
    {
      title: "Posts & Stories",
      articles: [
        "How to create a post",
        "Adding photos and videos",
        "Using hashtags effectively",
        "Story features explained",
      ],
    },
    {
      title: "Messages & Calls",
      articles: ["Sending messages", "Group conversations", "Video calling", "Message privacy settings"],
    },
    {
      title: "Account Issues",
      articles: ["Forgot password", "Account recovery", "Deactivating your account", "Deleting your account"],
    },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Help Center</h1>
      </header>

      <div className="p-4 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search help articles..." className="pl-10" />
        </div>

        <div className="space-y-4">
          {helpCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.articles.map((article) => (
                  <Link
                    key={article}
                    href="#"
                    className="flex items-center justify-between p-2 rounded hover:bg-muted/50"
                  >
                    <span className="text-sm">{article}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center pt-6">
          <p className="text-sm text-muted-foreground">Can't find what you're looking for?</p>
          <Link href="/settings/help/report-problem" className="text-sm text-blue-600 hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
