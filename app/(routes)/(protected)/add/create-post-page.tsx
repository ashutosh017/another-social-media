"use client";

import type React from "react";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Camera, ImageIcon, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { uploadImageToCloudinary } from "@/app/actions/cloudinary.actions";
import { createNewPost } from "@/app/actions/posts.actions";
import { MeContext } from "@/components/me-context";

const Loading = ({ isShow }: { isShow: boolean }) => {
  // console.log("Loading mounted");
  if (!isShow) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black opacity-80 backdrop-blur-lg">
      <div className="px-4 py-2 z-50 text-white bg-black  border border-white rounded-md">
        Uploading...
      </div>
    </div>
  );
};

export default function CreatePostPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const me = useContext(MeContext);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async () => {
    setIsLoading(true);
    // console.log("Sharing post:", { image: selectedImage, caption, location });
    if (!selectedImage) return;
    const res = await uploadImageToCloudinary(selectedImage);
    // console.log(res.data.secure_url);
    try {
      await createNewPost(res.data.secure_url, caption);
    } catch (error) {
      // console.log(error);
    }
    setSelectedImage(null);
    setCaption("");
    setIsLoading(false);
  };

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center justify-between">
        <button onClick={() => window.history.back()}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold">New post</h1>
        <Button
          onClick={handleShare}
          disabled={!selectedImage || !caption.trim()}
          className="text-sm px-4"
        >
          Share
        </Button>
      </header>

      <div className="p-4 space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-4">
          {selectedImage ? (
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Selected image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setSelectedImage(null)}
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Share a photo</h3>
                  <p className="text-muted-foreground">
                    Choose a photo from your device
                  </p>
                </div>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button asChild className="cursor-pointer">
                      <span>Select from device</span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Post Details */}
        {selectedImage && (
          <div className="space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/user.png" alt="Your profile" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{me?.username}</span>
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Caption</label>
              <Textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <div className="text-xs text-muted-foreground text-right">
                {caption.length}/2,200
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Add location
              </label>
              <Input
                placeholder="Search for a location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Tag People */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Tag people
              </label>
              <Input placeholder="Search for people to tag..." />
            </div>

            {/* Advanced Settings */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-semibold">Advanced settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hide like and view counts</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Turn off commenting</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Loading isShow={isLoading} />
    </div>
  );
}
