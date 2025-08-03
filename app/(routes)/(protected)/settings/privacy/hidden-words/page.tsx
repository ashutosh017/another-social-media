"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HiddenWordsPage() {
  const [hiddenWords, setHiddenWords] = useState(["spam", "promotion", "advertisement", "fake", "scam"])
  const [newWord, setNewWord] = useState("")

  const addWord = () => {
    if (newWord.trim() && !hiddenWords.includes(newWord.trim().toLowerCase())) {
      setHiddenWords([...hiddenWords, newWord.trim().toLowerCase()])
      setNewWord("")
    }
  }

  const removeWord = (word: string) => {
    setHiddenWords(hiddenWords.filter((w) => w !== word))
  }

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Hidden Words</h1>
      </header>

      <div className="p-4 space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Hide comments and messages that contain these words. This won't affect posts from accounts you follow.
          </p>

          <div className="flex space-x-2">
            <Input
              placeholder="Add a word or phrase..."
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addWord()}
            />
            <Button onClick={addWord} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {hiddenWords.length > 0 && (
          <div>
            <h3 className="font-medium mb-3">Hidden Words ({hiddenWords.length})</h3>
            <div className="flex flex-wrap gap-2">
              {hiddenWords.map((word) => (
                <Badge key={word} variant="secondary" className="flex items-center space-x-1">
                  <span>{word}</span>
                  <button onClick={() => removeWord(word)} className="ml-1 hover:bg-muted rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">Manage for</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Comments</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Message requests</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
