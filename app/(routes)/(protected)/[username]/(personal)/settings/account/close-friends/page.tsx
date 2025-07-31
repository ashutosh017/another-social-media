"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, UserMinus, UserPlus } from "lucide-react"
import Link from "next/link"

export default function CloseFriendsPage() {
  const closeFriends = [
    { id: 1, username: "sarah_wilson", name: "Sarah Wilson", isCloseFriend: true },
    { id: 2, username: "mike_chen", name: "Mike Chen", isCloseFriend: true },
    { id: 3, username: "emma_davis", name: "Emma Davis", isCloseFriend: true },
  ]

  const suggestions = [
    { id: 4, username: "alex_johnson", name: "Alex Johnson", isCloseFriend: false },
    { id: 5, username: "lisa_brown", name: "Lisa Brown", isCloseFriend: false },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Close Friends</h1>
      </header>

      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search friends..." className="pl-10" />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold mb-3">Close Friends ({closeFriends.length})</h2>
            <div className="space-y-3">
              {closeFriends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">@{friend.username}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <UserMinus className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Suggestions</h2>
            <div className="space-y-3">
              {suggestions.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">@{friend.username}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
