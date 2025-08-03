import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LikedPostsPage({
  likedPosts,
}: {
  likedPosts: { id: string; url: string }[];
}) {
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
          <p className="text-sm text-muted-foreground">
            Posts you've liked will appear here. Only you can see this.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {likedPosts.map((post) => (
            <div
              key={post.id}
              className="aspect-square relative group cursor-pointer"
            >
              <Link href={`/posts/${post.id}`}>
                <Image
                  src={post.url || "/placeholder.svg"}
                  alt={`Liked post by ${post.id}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </Link>
            </div>
          ))}
        </div>

        {likedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No liked posts yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Posts you like will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
