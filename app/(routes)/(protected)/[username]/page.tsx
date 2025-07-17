import { getMe } from "@/app/actions/auth.actions";
import { User as PrismaUser } from "@/app/generated/prisma";
import { EditProfileDialog } from "@/components/edit-profile-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/db";
import { Bookmark, Divide, Grid, Lock, Settings } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type User = PrismaUser & {
  posts: string[];
  followers: string[];
  following: string[];
};

export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    redirect("/signin");
  }
  const me = await getMe();
  const isMe: boolean = me?.username === username;
  const iFollow: boolean = !!(await prisma.follow.findFirst({
    where: {
      follower: {
        username: me?.username,
      },
      following: {
        username,
      },
    },
  }));

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      followers: {
        select: {
          id: true,
        },
      },
      following: {
        select: {
          id: true,
        },
      },
      posts: {
        select: {
          id: true,
          url: true,
          caption: true,
        },
      },
    },
  });
  if (!user) {
    notFound();
  }
  const posts = user.posts;
  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <h1 className="text-xl font-semibold flex-1 text-center">username</h1>
        <Link href={`/${user?.username}/settings`} className="absolute right-4">
          <Settings className="h-5 w-5" />
        </Link>
      </header>
      <div className="p-4 border-b">
        <div className="flex items-center gap-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.profilePicUrl ?? undefined} alt="Profile" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>

          <div className="flex gap-4 text-center">
            <Link href="#" className="block">
              <div className="font-semibold">{user?.posts.length}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </Link>
            <Link href={`/${user?.username}/followers `} className="block">
              <div className="font-semibold">{user?.followers.length}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </Link>
            <Link href={`/${user?.username}/following`} className="block">
              <div className="font-semibold">{user?.following.length}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold">{user?.name}</h2>
          <p className="text-sm mt-1">{user?.bio}</p>
        </div>

        <div>
          {isMe ? (
            <div className="mt-4 flex gap-2">
              <EditProfileDialog />
              <Button variant="outline" className="flex-1">
                Share Profile
              </Button>
            </div>
          ) : !iFollow ? (
            <Button className="follow-btn-style">Follow</Button>
          ) : (
            <Button className="follow-btn-style">Following</Button>
          )}

          {/* Story Highlights */}
          {user.public && (
            <div className="mt-6">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center space-y-1">
                    <div className="rounded-full border p-0.5">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={``} alt={`Highlight ${i + 1}`} />
                        <AvatarFallback>{`H${i + 1}`}</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-xs">Highlight {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div></div>
      </div>

      {user.public ? (
        <Tabs defaultValue="posts" className="">
          <TabsList className="w-full grid grid-cols-2  ">
            <TabsTrigger value="posts" className="py-3">
              <Grid className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="saved" className="py-3">
              <Bookmark className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-0  ">
            <div className="grid grid-cols-3 gap-0.5">
              {posts.map((post, i) => (
                <Link
                  href={`/posts/${post.id}`}
                  key={i}
                  className="aspect-square relative"
                >
                  <Image
                    src={post.url}
                    alt={`Post ${i + 1}`}
                    fill
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="saved" className="mt-0">
            <div className="grid grid-cols-3 gap-0.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square relative">
                  <Image
                    src="https://media.newyorker.com/photos/665f65409ad64d9e7a494208/4:3/w_1003,h_752,c_limit/Chayka-screenshot-06-05-24.png"
                    alt={`Saved post ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-24 h-24 rounded-full border-2 border-muted flex items-center justify-center mb-6">
            <Lock className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            This Account is Private
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Follow this account to see their photos and videos.
          </p>
          {/* {user.hasRequestPending && (
            <p className="text-sm text-muted-foreground">Your follow request is pending approval.</p>
          )} */}
        </div>
      )}

      <div></div>
    </div>
  );
}
