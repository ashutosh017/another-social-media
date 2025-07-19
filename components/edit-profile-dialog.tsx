"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import axios from "axios";
import { editProfile } from "@/app/actions/profile.actions";
import { User } from "@/app/generated/prisma";
import { MeContext } from "./me-context";
import { uploadImageToCloudinary } from "@/app/actions/cloudinary.actions";

export function EditProfileDialog() {
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useContext(MeContext);
  if (!user) {
    return <div>Your profile does not exist.</div>;
  }
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let profilePicUrl;
      if (profilePic) {
        profilePicUrl = (await uploadImageToCloudinary(profilePic)).data
          .secure_url;
      }
      await editProfile({
        profilePicUrl,
        bio: bio !== "" ? bio : undefined,
        username: username !== "" ? username : undefined,
        name: name !== "" ? name : undefined,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user.profilePicUrl || "./user.png"}
                  alt="Profile"
                />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleProfilePicChange}
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change profile picture</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Name</Label>
            <Input
              id="username"
              defaultValue={user?.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              defaultValue={user?.username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              defaultValue={user?.bio ? user?.bio : ""}
              rows={3}
              onChange={handleBioChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              let profilePicUrl;
              if (profilePic) {
                profilePicUrl = (await uploadImageToCloudinary(profilePic)).data
                  .secure_url;
              }
              await editProfile({
                profilePicUrl,
                bio: bio !== "" ? bio : undefined,
                username: username !== "" ? username : undefined,
                name: name !== "" ? name : undefined,
              });
              setLoading(false);
              setOpen(false);
            }}
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
