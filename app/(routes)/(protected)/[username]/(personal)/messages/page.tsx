import { getMe } from "@/app/actions/auth.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { backend_url } from "@/lib/config";
import axios from "axios";
import { ArrowLeft, Edit, Search } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MessagesPage({
  params,
}: {
  params: {
    username: string;
  };
}) {
  const username = (await params).username;
  const me = await getMe();
  const myUsername = me?.username;
  if (myUsername !== username) notFound();
  console.log("my username: ", myUsername);
  console.log("username: ", username);

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="/feed" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">username</h1>
        <Link href="#" className="ml-auto">
          <Edit className="h-5 w-5" />
        </Link>
      </header>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9 bg-muted" />
        </div>
      </div>

      {/* Messages list */}
      <div className="divide-y">
        {Array.from({ length: 10 }).map((_, i) => (
          <Link
            href={`/${username}/messages/${i + 1}`}
            key={i}
            className="flex items-center p-4 hover:bg-muted/50"
          >
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={``} alt={`User ${i + 1}`} />
              <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p className="font-medium truncate">user{i + 1}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {i === 0 ? "Just now" : i === 1 ? "5m ago" : `${i}h ago`}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {i % 3 === 0
                  ? "Hey, how are you doing?"
                  : i % 3 === 1
                  ? "Check out this new post!"
                  : "Liked your photo 👍"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
