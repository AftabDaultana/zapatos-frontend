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

const CLOUDINARY_IMAGE_CACHE_KEY = "cloudinary-image-cache";

interface CloudinaryImageCache {
  [hash: string]: string;
}

const getCloudinaryImageCache = (): CloudinaryImageCache => {
  const storedCache = localStorage.getItem(CLOUDINARY_IMAGE_CACHE_KEY);

  if (!storedCache) {
    return {};
  }

  try {
    return JSON.parse(storedCache);
  } catch {
    localStorage.removeItem(CLOUDINARY_IMAGE_CACHE_KEY);
    return {};
  }
};

const saveCloudinaryImageCache = (cache: CloudinaryImageCache): void => {
  localStorage.setItem(CLOUDINARY_IMAGE_CACHE_KEY, JSON.stringify(cache));
};

export const uploadUniqueFilesToCloudinary = async (
  files: File[],
): Promise<string[]> => {
  const cache = getCloudinaryImageCache();
  const imageUrls: string[] = [];

  for (const file of files) {
    const fileHash = await getFileHash(file);

    const existingUrl = cache[fileHash];

    if (existingUrl) {
      imageUrls.push(existingUrl);
      continue;
    }

    const url = await uploadToCloudinary(file);

    cache[fileHash] = url;
    saveCloudinaryImageCache(cache);

    imageUrls.push(url);
  }

  return imageUrls;
};
