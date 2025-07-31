"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LikedPostsPage() {
  const likedPosts = [
    {
      id: 1,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "nature_photographer",
    },
    {
      id: 2,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "foodie_adventures",
    },
    {
      id: 3,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "tech_insights",
    },
    {
      id: 4,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "fitness_journey",
    },
    {
      id: 5,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "book_lover",
    },
    {
      id: 6,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "beach_vibes",
    },
    {
      id: 7,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "urban_explorer",
    },
    {
      id: 8,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "garden_life",
    },
    {
      id: 9,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "vintage_collector",
    },
    {
      id: 10,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "abstract_artist",
    },
    {
      id: 11,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "pet_lover",
    },
    {
      id: 12,
      imageUrl: "/placeholder.svg?height=300&width=300",
      username: "hiking_adventures",
    },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Liked Posts</h1>
      </header>

      <div className="p-1">
        <div className="px-3 py-4">
          <p className="text-sm text-muted-foreground">Posts you've liked will appear here. Only you can see this.</p>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {likedPosts.map((post) => (
            <div key={post.id} className="aspect-square relative group cursor-pointer">
              <Image
                src={post.imageUrl || "/placeholder.svg"}
                alt={`Liked post by ${post.username}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>

        {likedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No liked posts yet</p>
            <p className="text-sm text-muted-foreground mt-2">Posts you like will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
