import axios from "axios";
import { backend_url } from "@/lib/config";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

export default async function FollowersPage({params}:{params:{
  username:string
}}) {
 const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const username = params.username;
  const me = await axios.get(`${backend_url}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const myUsername = me.data.username;
  // if(myUsername!==username)notFound();
  
  const followers = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    username: `user${i + 1}`,
    name: `User ${i + 1}`,
    isFollowing: i % 3 === 0,
  }))

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="/feed" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Followers</h1>
      </header>

      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9 bg-muted" />
        </div>
      </div>

      <div className="divide-y">
        {followers.map((follower) => (
          <div key={follower.id} className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage
                  src={``}
                  alt={follower.username}
                />
                <AvatarFallback>{follower.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{follower.username}</p>
                <p className="text-sm text-muted-foreground">{follower.name}</p>
              </div>
            </div>
            {follower.isFollowing ? (
              <Button variant="outline" size="sm" className="rounded-lg">
                Following
              </Button>
            ) : (
              <Button size="sm" className="rounded-lg">
                Follow
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
