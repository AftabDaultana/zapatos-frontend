console.log(
  "Cloudinary env:",
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
);

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary.");
  }

  const data = await response.json();

  return data.secure_url;
};

const getFileHash = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();

  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const uploadUniqueFilesToCloudinary = async (
  files: File[],
): Promise<string[]> => {
  const uploadedImageUrls = new Map<string, string>();
  const imageUrls: string[] = [];

  for (const file of files) {
    const fileHash = await getFileHash(file);

    const existingUrl = uploadedImageUrls.get(fileHash);

    if (existingUrl) {
      imageUrls.push(existingUrl);
      continue;
    }

    const url = await uploadToCloudinary(file);

    uploadedImageUrls.set(fileHash, url);
    imageUrls.push(url);
  }

  return imageUrls;
};
