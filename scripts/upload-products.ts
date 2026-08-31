import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";

const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.VITE_CLOUDINARY_UPLOAD_PRESET;

if (!cloudName || !uploadPreset) {
  throw new Error("Cloudinary environment variables are missing.");
}

const uploadToCloudinary = async (
  imagePath: string,
  publicId: string,
): Promise<string> => {
  const imageBuffer = await fs.readFile(imagePath);

  const formData = new FormData();

  const extension = path.extname(imagePath).toLowerCase();

  const mimeType =
    extension === ".jpg" || extension === ".jpeg"
      ? "image/jpeg"
      : extension === ".webp"
        ? "image/webp"
        : "image/png";

  formData.append(
    "file",
    new Blob([imageBuffer], {
      type: mimeType,
    }),
  );

  formData.append("upload_preset", uploadPreset);
  formData.append("public_id", publicId);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Cloudinary upload failed: ${error}`);
  }

  const data = await response.json();

  return data.secure_url;
};

const imagePath = path.resolve("src/assets/product-images/adfadf 1_1.png");

const imageUrl = await uploadToCloudinary(imagePath, "adfadf-1-1");

console.log("Uploaded to Cloudinary:");
console.log(imageUrl);
