import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";

export default async function FollowersPage({
  params,
}: {
  params: Promise<{
    username: string;
  }>;
}) {
  const followers = await prisma.user.findFirst({
    where: {
      username: (await params).username,
    },
    select: {
      followers: {
        select: {
          follower: {
            select: {
              name: true,
              username: true,
              profilePicUrl: true,
              followers: {
                where: {
                  follower: {
                    username: (await params).username,
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="./" className="mr-2">
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
        {followers &&
          followers.followers.map(({ follower }) => (
            <div
              key={follower.username}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={``} alt={follower.username} />
                  <AvatarFallback>
                    {follower.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{follower.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {follower.name}
                  </p>
                </div>
              </div>
              {follower.followers.length > 0 ? (
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
  );
}
