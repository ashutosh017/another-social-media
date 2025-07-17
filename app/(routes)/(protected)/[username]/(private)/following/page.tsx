import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/db";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default async function FollowingPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const following = await prisma.follow.findMany({
    where: {
      follower: {
        username: username,
      },
    },
    select: {
      following: true,
    },
  });
  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="./" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Following</h1>
      </header>

      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9 bg-muted" />
        </div>
      </div>

      <div className="divide-y">
        {following.map(({ following: user }) => (
          <div key={user.id} className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={``} alt={user.username} />
                <AvatarFallback>
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-lg">
              Following
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
