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
import { Camera, Globe, Info, Lock } from "lucide-react";
import { editProfile } from "@/app/actions/profile.actions";
import { uploadImageToCloudinary } from "@/app/actions/cloudinary.actions";
import { UserType } from "@/types/user.types";
import { Switch } from "./ui/switch";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";

export function EditProfileDialog({
  user,
  setUser,
}: {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}) {
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
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
  function handlePrivacyToggle(checked: boolean): void {
    setIsPrivate(checked);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm w-full max-h-4/5 h-full ">
        <DialogHeader className="px-2">
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-full h-full py-2 px-4">
          <div className="grid gap-4 py-4 ">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={profilePic || user.profilePicUrl || "./user.png"}
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

            <Separator className="my-2" />

            {/* Privacy Settings Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Label className="text-base font-medium">
                  Privacy Settings
                </Label>
              </div>

              <div className="space-y-4 pl-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {isPrivate ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Label className="font-medium">Private Account</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isPrivate
                        ? "Only approved followers can see your posts"
                        : "Anyone can see your posts and follow you"}
                    </p>
                  </div>
                  <Switch
                    checked={isPrivate}
                    onCheckedChange={handlePrivacyToggle}
                  />
                </div>

                {/* Privacy Info */}
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {isPrivate
                          ? "Private Account Benefits:"
                          : "Public Account Benefits:"}
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {isPrivate ? (
                          <>
                            <li>• Control who follows you</li>
                            <li>• Approve follow requests manually</li>
                            <li>
                              • Your posts won't appear in hashtag searches
                            </li>
                            <li>• Only followers can see your stories</li>
                          </>
                        ) : (
                          <>
                            <li>• Anyone can follow you instantly</li>
                            <li>• Your posts appear in hashtag searches</li>
                            <li>• Easier to grow your audience</li>
                            <li>• Better for business and creator accounts</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Privacy Change Warning */}
                {/* If you want to show a warning when privacy changes, you need a previous value. 
                  For now, just remove the comparison and use isPrivate directly. */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        {!isPrivate
                          ? "Switching to Private"
                          : "Switching to Public"}
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">
                        {!isPrivate
                          ? "Your existing followers will still be able to see your posts. New followers will need approval."
                          : "Anyone will be able to see your posts and follow you without approval."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex gap-2 px-2">
          <Button
            variant="outline"
            onClick={() => {
              setProfilePic("");
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              let profilePicUrl: string | undefined;
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
              setUser(
                (prev) =>
                  prev && {
                    ...prev,
                    profilePicUrl: profilePicUrl
                      ? profilePicUrl
                      : prev?.profilePicUrl,
                    bio: bio ? bio : prev?.bio,
                    username: username ? username : prev?.username,
                    name: name ? name : prev?.name,
                  }
              );
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
