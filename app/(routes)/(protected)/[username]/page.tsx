"use client";

import { sendUnsendFollowRequest } from "@/app/actions/follow.actions";
import { UserType } from "@/app/actions/types";
import { fetchUsertDetails } from "@/app/actions/profile.actions";
import { EditProfileDialog } from "@/components/edit-profile-dialog";
import { MeContext } from "@/components/me-context";
import ProfileSkeleton from "@/components/profile-skeleton";
import { ModeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  Globe,
  Grid,
  Lock,
  Settings,
  SquareUser,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function page() {
  const me = useContext(MeContext);
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [followStatus, setFollowStatus] = useState<
    "Following" | "Requested" | "Follow"
  >();
  if (!me) {
    return <div>The page your are looking does not exist.</div>;
  }

  const handleFollow = async () => {
    if (!user) return;
    followStatus === "Follow"
      ? user.public
        ? setFollowStatus("Following")
        : setFollowStatus("Requested")
      : setFollowStatus("Follow");
    if (user.public && followStatus === "Follow") {
      setUser(
        (prev) =>
          prev && {
            ...prev,
            following: [
              ...prev.following,
              {
                dateCreated: new Date(),
                followerId: me.id,
                followingId: user.id,
                id: "new_follower",
              },
            ],
          }
      );
    } else if (followStatus === "Following") {
      setUser(
        (prev) =>
          prev && {
            ...prev,
            following: prev.following.slice(0, prev.following.length - 1),
          }
      );
    }
    sendUnsendFollowRequest(user.id);
  };

  console.log("username: ", username);

  useEffect(() => {
    async function fetchUserWithUsername() {
      if (!username) {
        console.log("username2: ", username);
        return;
      }
      const currentUser = await fetchUsertDetails(username);
      if (!currentUser) {
        router.push(`${me?.username}`);
      }
      const doIFollowCurrentUser = currentUser?.following.some(
        (following) => following.followerId === me?.id
      );
      console.log("current user: ", currentUser?.username);
      console.log("me: ", me?.username);

      if (doIFollowCurrentUser) {
        setFollowStatus("Following");
      } else {
        const followRequestPending = currentUser?.receivedFollowRequests.some(
          (req) => req.senderId === me?.id
        );
        if (followRequestPending) {
          setFollowStatus("Requested");
        } else {
          setFollowStatus("Follow");
        }
      }

      setUser(currentUser);
      setIsLoading(false);
    }
    fetchUserWithUsername();
  }, []);
  if (isLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <h1 className="text-xl font-semibold flex-1 flex items-center    gap-2">
          {user?.username ?? "username"}
          {user?.public ? (
            <Globe className="w-4 h-4 mb-0.5" />
          ) : (
            <Lock className="w-4 h-4 mb-0.5" />
          )}
        </h1>
        <div className="flex gap-2 justify-end items-center">
          <ModeToggle />

          <Link href={`/${user?.username}/settings`} className="">
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </header>
      <div className="p-4 border-b">
        <div className="flex items-center gap-8">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={user?.profilePicUrl ?? "/user.png"}
              alt="Profile"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>

          <div className="flex gap-4 text-center">
            <Link href="#" className="block">
              <div className="font-semibold">{user?.posts.length}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </Link>
            <Link href={`/${user?.username}/followers `} className="block">
              <div className="font-semibold">{user?.following.length}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </Link>
            <Link href={`/${user?.username}/following`} className="block">
              <div className="font-semibold">{user?.followers.length}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold">{user?.name}</h2>
          <p className="text-sm mt-1">{user?.bio}</p>
        </div>

        <div>
          {user?.id === me?.id ? (
            <div className="mt-4 flex gap-2">
              <EditProfileDialog user={user} setUser={setUser} />
              <Button variant="outline" className="flex-1">
                Share Profile
              </Button>
            </div>
          ) : (
            <div className="flex mt-4 items-center justify-between max-w-sm gap-4">
              <Button
                onClick={handleFollow}
                className={cn(
                  "follow-btn-style flex-1",
                  followStatus === "Follow" &&
                    "bg-blue-700 hover:bg-blue-800 text-white"
                )}
              >
                {followStatus ?? "Follow"}
              </Button>
              <Button
                onClick={() => {
                  router.push(me.username + "/messages/" + user?.username);
                }}
              >
                Message
              </Button>
            </div>
          )}

          {/* Story Highlights */}
          {/* {user?.public && (
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
          )} */}
        </div>

        <div></div>
      </div>

      {user?.public || user?.id === me.id ? (
        <Tabs defaultValue="posts" className="">
          <TabsList className="w-full grid grid-cols-2 bg-transparent mb-4">
            <TabsTrigger
              value="posts"
              className="py-3 border-b-2 border-transparent rounded-b-xs data-[state=active]:border-white"
            >
              <Grid className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger
              value="tagged"
              className="py-3 border-b-2 border-transparent rounded-b-xs data-[state=active]:border-white"
            >
              <SquareUser className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-2 mx-1">
            {user && user.posts.length > 0 ? (
              <div className="grid grid-cols-3 gap-0.5">
                {user?.posts.map((post, i) => (
                  <Link
                    href={`/posts/${post.id}`}
                    key={i}
                    className="aspect-square relative"
                  >
                    <Image
                      src={post.url || "/placeholder.svg"}
                      alt={`Post ${i + 1}`}
                      fill
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                <svg
                  className="w-16 h-16 mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 6.75v10.5a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0019.5 17.25V6.75M4.5 6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25M4.5 6.75h15M8.25 10.5h7.5M8.25 13.5h7.5"
                  />
                </svg>
                <h2 className="text-lg font-semibold">No Posts Yet</h2>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tagged" className="mt-2 mx-1">
            {user && user.tagged?.length > 0 ? (
              <div className="grid grid-cols-3 gap-0.5">
                {user.tagged?.map((post, i) => (
                  <Link
                    href={`/posts/${post.id}`}
                    key={i}
                    className="aspect-square relative"
                  >
                    <Image
                      src={post.url || "/placeholder.svg"}
                      alt={`Tagged post ${i + 1}`}
                      fill
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                <SquareUser className="w-16 h-16 mb-4 text-gray-400" />
                <h2 className="text-lg font-semibold">No Tagged Posts</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Posts {user?.id === me.id ? "you're" : "this user"} tagged in
                  will appear here.
                </p>
              </div>
            )}
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
        </div>
      )}

      <div></div>
    </div>
  );
}
