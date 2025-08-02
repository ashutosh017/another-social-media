"use client";

import { LogOut } from "@/app/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          name: "Personal Information",
          link: "settings/account/personal-information",
        },
        { name: "Saved", link: "settings/account/saved" },
        { name: "Liked", link: "settings/account/liked" },
        { name: "Close Friends", link: "settings/account/close-friends" },
        { name: "Language", link: "settings/account/language" },
      ],
    },
    {
      title: "Privacy",
      items: [
        { name: "Account Privacy", link: "settings/privacy/account-privacy" },
        {
          name: "Blocked Accounts",
          link: "settings/privacy/blocked-accounts",
        },
        { name: "Muted Accounts", link: "settings/privacy/muted-accounts" },
        { name: "Hidden Words", link: "settings/privacy/hidden-words" },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          name: "Posts, Stories and Comments",
          link: "settings/notifications/posts-stories-comments",
        },
        {
          name: "Following and Followers",
          link: "settings/notifications/following-followers",
        },
        { name: "Messages", link: "settings/notifications/messages" },
      ],
    },
    {
      title: "Help",
      items: [
        { name: "Report a Problem", link: "settings/help/report-problem" },
        { name: "Help Center", link: "settings/help/help-center" },
        {
          name: "Privacy and Security Help",
          link: "settings/help/privacy-security",
        },
      ],
    },
    {
      title: "About",
      items: [
        { name: "Terms of Use", link: "settings/about/terms" },
        { name: "Privacy Policy", link: "settings/about/privacy-policy" },
        { name: "Cookies Policy", link: "settings/about/cookies-policy" },
      ],
    },
  ];

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="./" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Settings</h1>
      </header>

      <div className="divide-y">
        {settingsSections.map((section) => (
          <div key={section.title} className="py-2">
            <h2 className="px-4 py-2 font-semibold text-lg">{section.title}</h2>
            <div className="divide-y">
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted/50"
                >
                  <span>{item.name}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 mt-4 flex flex-col gap-4">
        <Button
          onClick={() => LogOut()}
          variant="outline"
          className="w-full text-blue-500 hover:text-blue-600"
        >
          Log Out
        </Button>
        <Button
          onClick={() => router.push("/signin")}
          variant="outline"
          className="w-full text-blue-500 hover:text-blue-600"
        >
          Add Another Account
        </Button>
      </div>
    </div>
  );
}
