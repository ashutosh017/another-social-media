"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SavedPage() {
  const savedPosts = [
    {
      id: 1,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "photographer_jane",
    },
    {
      id: 2,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "foodie_mike",
    },
    {
      id: 3,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "travel_guru",
    },
    {
      id: 4,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "nature_lover",
    },
    {
      id: 5,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "coffee_artist",
    },
    {
      id: 6,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "street_artist",
    },
    {
      id: 7,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "fitness_coach",
    },
    {
      id: 8,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "book_lover",
    },
    {
      id: 9,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "design_studio",
    },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Saved Posts</h1>
      </header>

      <div className="p-1">
        <div className="grid grid-cols-3 gap-1">
          {savedPosts.map((post) => (
            <div key={post.id} className="aspect-square relative group cursor-pointer">
              <Image
                src={post.imageUrl || "/placeholder.svg"}
                alt={`Post by ${post.username}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>

        {savedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No saved posts yet</p>
            <p className="text-sm text-muted-foreground mt-2">Posts you save will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
