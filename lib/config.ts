export const jwt_secret = process.env.JWT_SECRET ?? "jwt_secret";
export const backend_url =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000/api/";
export const cloudinary_cloud_name =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const cloudinary_key = process.env.CLOUDINARY_KEY
export const cloudinary_secret = process.env.CLOUDINARY_SECRET