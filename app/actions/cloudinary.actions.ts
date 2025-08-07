// 'use server'
import { extractPublicId } from "cloudinary-build-url";
import {
  cloudinary_cloud_name,
  cloudinary_key,
  cloudinary_secret,
} from "@/lib/config";
import axios from "axios";
import crypto from "crypto";

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

export const deleteImageFromCloudinary = async (iamgeUrl: string) => {
  const public_id = extractPublicId(iamgeUrl);
  if (!cloudinary_key || !cloudinary_secret || !cloudinary_cloud_name) {
    console.log("not found ");
    return;
  }
  // console.log(cloudinary_cloud_name)
  // console.log(cloudinary_secret)
  // console.log(cloudinary_key)
  // console.log(public_id)
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = crypto
    .createHash("sha1")
    .update(`public_id=${public_id}&timestamp=${timestamp}${cloudinary_secret}`)
    .digest("hex");

  // console.log(assetId);
  const payload = {
    signature,
    public_id:public_id,
    // asset_id,
    api_key: cloudinary_key,
    timestamp,
  };

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/image/destroy`,
      payload
    );
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.error("Cloudinary deletion failed", error.response?.data || error);
  }
};
