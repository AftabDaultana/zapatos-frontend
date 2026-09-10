import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Button from "../Button";
import type { SubmitEvent } from "react";
import { changePasswordUser } from "../../../services/userServices";

interface ChangePasswordProps {
  onClose: () => void;
}

export default function ChangePassword({ onClose }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!currentPassword.trim()) {
      setError("Please enter your current password.");
      return;
    }

    if (!newPassword.trim()) {
      setError("Please enter a new password.");
      return;
    }

    if (!confirmNewPassword.trim()) {
      setError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await changePasswordUser({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      onClose();
    } catch (error: any) {
      setError(
        error.response.data.message ||
          "Failed to change password. Please try again later.",
      );
    }
  };

  return (
    <main className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-y-auto rounded-xl bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h2 className="text-xl font-semibold leading-6 text-neutral-950">
            CHANGE PASSWORD
          </h2>

          <Button
            type="button"
            variant="none"
            onClick={onClose}
            aria-label="Close change password"
            className="flex h-8 w-8 items-center justify-center p-0 text-neutral-950 transition-colors duration-200 hover:bg-gray-300"
          >
            <X size={20} />
          </Button>
        </div>

        <form
          id="change-password-form"
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4"
        >
          {/* Current Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="current-password"
              className="text-sm font-medium text-neutral-900"
            >
              Current Password *
            </label>

            <div className="relative w-full">
              <input
                id="current-password"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                className="h-11 w-full rounded-lg border border-neutral-200 px-3 pr-11 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-950"
              />

              <Button
                type="button"
                variant="none"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                aria-label={
                  showCurrentPassword
                    ? "Hide current password"
                    : "Show current password"
                }
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="new-password"
              className="text-sm font-medium text-neutral-900"
            >
              New Password *
            </label>

            <div className="relative w-full">
              <input
                id="new-password"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="h-11 w-full rounded-lg border border-neutral-200 px-3 pr-11 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-950"
              />

              <Button
                type="button"
                variant="none"
                onClick={() => setShowNewPassword((prev) => !prev)}
                aria-label={
                  showNewPassword ? "Hide new password" : "Show new password"
                }
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirm-new-password"
              className="text-sm font-medium text-neutral-900"
            >
              Confirm New Password *
            </label>

            <div className="relative w-full">
              <input
                id="confirm-new-password"
                name="confirmNewPassword"
                type={showConfirmNewPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="h-11 w-full rounded-lg border border-neutral-200 px-3 pr-11 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-950"
              />

              <Button
                type="button"
                variant="none"
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                aria-label={
                  showConfirmNewPassword
                    ? "Hide confirm new password"
                    : "Show confirm new password"
                }
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
              >
                {showConfirmNewPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </Button>
            </div>

            {error && <p className="mt-0.5 text-xs text-red-500">{error}</p>}
          </div>
        </form>

        <div className="mt-4 flex gap-2">
          <Button
            type="submit"
            variant="dark"
            form="change-password-form"
            className="w-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:ring-1 hover:ring-neutral-950"
          >
            CHANGE PASSWORD
          </Button>
        </div>
      </div>
    </main>
  );
}
