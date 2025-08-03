"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

export default function BlockedAccountsPage() {
  const blockedAccounts = [
    { id: 1, username: "spam_account_1", name: "Spam Account", blockedDate: "2024-01-15" },
    { id: 2, username: "fake_profile", name: "Fake Profile", blockedDate: "2024-01-10" },
    { id: 3, username: "annoying_user", name: "Annoying User", blockedDate: "2023-12-20" },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Blocked Accounts</h1>
      </header>

      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search blocked accounts..." className="pl-10" />
        </div>

        {blockedAccounts.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You have blocked {blockedAccounts.length} account{blockedAccounts.length !== 1 ? "s" : ""}.
            </p>

            <div className="space-y-3">
              {blockedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-muted-foreground">@{account.username}</p>
                      <p className="text-xs text-muted-foreground">Blocked on {account.blockedDate}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Unblock
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blocked accounts</p>
            <p className="text-sm text-muted-foreground mt-2">Accounts you block will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
