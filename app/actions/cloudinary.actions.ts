// 'use server'
import { cloudinary_cloud_name } from "@/lib/config";
import axios from "axios";

export async function uploadImageToCloudinary(image: string) {
  const formData = new FormData();

  formData.append("file", image!);
  formData.append("upload_preset", "social-media-app");
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/image/upload`,
    formData
  );
  return res;
}
