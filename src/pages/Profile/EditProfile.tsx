import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateUser } from "../../app/slices/userSlice";
import Button from "../../components/ui/Button";
import { X, User } from "lucide-react";

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
  const [profilePicture, setProfilePicture] = useState(
    currentUser?.profilePicture ?? "",
  );

  const [previewUrl, setPreviewUrl] = useState(
    currentUser?.profilePicture ?? "",
  );

  // useEffect(() => {
  //   return () => {
  //     if (previewUrl.startsWith("blob:")) {
  //       URL.revokeObjectURL(previewUrl);
  //     }
  //   };
  // }, [previewUrl]);

  // if (!currentUser) {
  //   return null;
  // }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") return;

      setProfilePicture(result);
      setPreviewUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      updateUser({
        name,
        email,
        phoneNumber,
        profilePicture,
      }),
    );
    onClose();
  };

  return (
    <main className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex max-h[90dvh] w-full max-w-125 flex-col gap-8 overflow-y-auto bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-7 text-neutral-950">
            EDIT PROFILE
          </h2>
          <Button
            type="button"
            onClick={onClose}
            aria-label="Close edit profile"
            className="bg-transparent text-neutral-950"
          >
            <X size={24} />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-28 w-28 overflow-hidden rounded-full">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={name}
                  className="h-full w-full object-cover"
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
          {/* Name */}
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
          {/* Email */}
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
          </div>
          {/* Phone */}
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
          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="h-10 w-full border border-neutral-950 text-neutral-950 hover:bg-neutral-950 hover:text-neutral-50"
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              className="h-10 w-full bg-neutral-950 text-neutral-50 hover:border hover:border-neutral-950 hover:bg-transparent hover:text-neutral-950"
            >
              SAVE CHANGES
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
