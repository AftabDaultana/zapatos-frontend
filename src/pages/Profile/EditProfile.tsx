import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getStoredUsers, updateUser } from "../../app/slices/userSlice";
import Button from "../../components/ui/Button";
import { X, User } from "lucide-react";
import { uploadToCloudinary } from "../../utils/cloudinary";

interface EditProfileProps {
  onClose: () => void;
}

export default function EditProfile({ onClose }: EditProfileProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [name, setName] = useState(currentUser?.name ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber ?? "",
  );
  const [profilePicture] = useState(currentUser?.profilePicture ?? "");

  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null,
  );

  const [previewUrl, setPreviewUrl] = useState(
    currentUser?.profilePicture ?? "",
  );

  const [error, setError] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Profile picture must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    setProfilePictureFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    event.target.value = "";
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    let profilePictureUrl = profilePicture;

    if (profilePictureFile) {
      try {
        profilePictureUrl = await uploadToCloudinary(profilePictureFile);
      } catch {
        setError("Unable to upload profile picture");
        return;
      }
    }

    const storedUsers = getStoredUsers();

    const emailAlreadyExists = storedUsers.some((user) => {
      return (
        user.id !== currentUser?.id &&
        user.email.trim().toLowerCase() === email.trim().toLowerCase()
      );
    });

    if (emailAlreadyExists) {
      setError("User with this email already exist");
      return;
    }

    dispatch(
      updateUser({
        name: name.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        profilePicture: profilePictureUrl,
      }),
    );
    setProfilePictureFile(null);
    onClose();
  };

  return (
    <main className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex max-h-[90dvh] w-full max-w-125 flex-col gap-8 overflow-y-auto bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-7 text-neutral-950">
            EDIT PROFILE
          </h2>
          <Button
            type="button"
            variant="none"
            onClick={onClose}
            aria-label="Close edit profile"
            className="bg-transparent text-neutral-950"
          >
            <X size={24} />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="h-28 w-28 overflow-hidden rounded-full">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-100">
                  <User size={48} className="text-neutral-500" />
                </div>
              )}
            </div>
            <label
              htmlFor="profilePicture"
              className="cursor-pointer text-sm font-medium text-neutral-950 underline underline-offset-2"
            >
              Change Picture
            </label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-lg text-neutral-900">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 w-full border border-[#e7e7e7] px-4 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 focus:border-neutral-950"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-lg text-neutral-900">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full border border-[#e7e7e7] px-4 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 focus:border-neutral-950"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phoneNumber" className="text-lg text-neutral-900">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className="h-12 w-full border border-[#e7e7e7] px-4 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 focus:border-neutral-950"
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="light"
              onClick={onClose}
              className="h-10 w-full text-neutral-950"
            >
              CANCEL
            </Button>
            <Button type="submit" variant="dark" className="h-10 w-full">
              SAVE CHANGES
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
