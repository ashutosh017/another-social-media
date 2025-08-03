"use client";

import { editProfile, fetchUserDetails } from "@/app/actions/profile.actions";
import { UserType } from "@/app/actions/types";
import { MeContext } from "@/components/me-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export default function PersonalInformationPage() {
  const [personalInfo, setPersonalInfo] = useState<UserType>();
  const [isSavingDetails, setIsSavingDetails] = useState(false);
  const me = useContext(MeContext);
  const username = useParams<{ username: string }>().username;
  const router = useRouter();
  useEffect(() => {
    async function callFetchUserDetails() {
      if (!me || me.username !== username) {
        router.push(`/${me?.username}`);
      }
      const res = await fetchUserDetails(username);
      if (res) {
        valuesRef.current = {
          bio: res.bio ?? "",
          name: res.name,
          username: res.username,
        };
      }
      setPersonalInfo(res);
    }
    callFetchUserDetails();
  }, []);

  const handleSaveChanges = async() => {
    console.log(valuesRef.current);
    setIsSavingDetails(true);
    await editProfile({ ...valuesRef.current });
    setIsSavingDetails(false);
  };
  const valuesRef = useRef<Parameters<typeof editProfile>[0]>(null);

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Personal Information</h1>
      </header>

      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            defaultValue={personalInfo?.name}
            onChange={(e) => {
              if (valuesRef.current) {
                valuesRef.current.name = e.target.value;
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="@username"
            defaultValue={personalInfo?.username}
            onChange={(e) => {
              if (valuesRef.current) {
                valuesRef.current.username = e.target.value;
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Your bio"
            defaultValue={personalInfo?.bio ?? ""}
            className="min-h-[100px]"
            onChange={(e) => {
              if (valuesRef.current) {
                valuesRef.current.bio = e.target.value;
              }
              console.log(valuesRef.current?.bio);
            }}
          />
        </div>

        <Button
          onClick={handleSaveChanges}
          disabled={isSavingDetails}
          className="w-full"
        >
          {isSavingDetails ? "Saving changes..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
