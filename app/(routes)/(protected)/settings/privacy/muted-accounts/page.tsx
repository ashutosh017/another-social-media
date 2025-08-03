"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, VolumeX } from "lucide-react"
import Link from "next/link"

export default function MutedAccountsPage() {
  const mutedAccounts = [
    { id: 1, username: "noisy_friend", name: "Noisy Friend", mutedDate: "2024-01-20" },
    { id: 2, username: "brand_account", name: "Brand Account", mutedDate: "2024-01-18" },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Muted Accounts</h1>
      </header>

      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search muted accounts..." className="pl-10" />
        </div>

        {mutedAccounts.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You have muted {mutedAccounts.length} account{mutedAccounts.length !== 1 ? "s" : ""}.
            </p>

            <div className="space-y-3">
              {mutedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                      <VolumeX className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-muted-foreground">@{account.username}</p>
                      <p className="text-xs text-muted-foreground">Muted on {account.mutedDate}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Unmute
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <VolumeX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No muted accounts</p>
            <p className="text-sm text-muted-foreground mt-2">Accounts you mute will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
