import { ArrowLeft, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import Button from "../Button";

import type { SubmitEvent } from "react";

interface ForgotPasswordProps {
  onClose: () => void;
  onResetSuccess: () => void;
}

type ForgotPasswordStep = "email" | "otp" | "reset";

export default function ForgotPassword({
  onClose,
  onResetSuccess,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setForgotPasswordEmail(email.trim());
    setStep("otp");
  };

  const handleOTPSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    setStep("reset");
  };

  const handleResetPasswordSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!newPassword.trim()) {
      setError("Please enter a new password.");
      return;
    }

    if (!confirmPassword.trim()) {
      setError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    onResetSuccess();
  };

  return (
    <main className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-y-auto rounded-xl bg-white p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            {step !== "email" && (
              <Button
                type="button"
                variant="none"
                onClick={() => {
                  if (step === "otp") {
                    setStep("email");
                  } else if (step === "reset") {
                    setStep("otp");
                  }
                }}
                aria-label="Go to previous step"
                className="flex h-8 w-8 items-center justify-center p-0 text-neutral-950 transition-colors duration-200 hover:bg-gray-300"
              >
                <ArrowLeft size={20} />
              </Button>
            )}

            <h2 className="text-xl font-semibold leading-6 text-neutral-950">
              {step === "email" && "FORGOT PASSWORD"}
              {step === "otp" && "VERIFY OTP"}
              {step === "reset" && "RESET PASSWORD"}
            </h2>
          </div>

          <Button
            type="button"
            variant="none"
            onClick={onClose}
            aria-label="Close forgot password"
            className="flex h-8 w-8 items-center justify-center p-0 text-neutral-950 transition-colors duration-200 hover:bg-gray-300"
          >
            <X size={20} />
          </Button>
        </div>
        {step === "email" && (
          <>
            {/* Description */}
            <p className="mt-4 text-sm leading-6 text-neutral-600">
              Enter your email address and we&apos;ll send you an OTP to verify
              your identity and reset your password.
            </p>

            {/* Email Form */}
            <form
              id="forgot-password-form"
              onSubmit={handleSubmit}
              className="mt-4 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="forgot-password-email"
                  className="text-sm font-medium text-neutral-900"
                >
                  Email *
                </label>

                <input
                  id="forgot-password-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-950"
                />

                {error && (
                  <p className="mt-0.5 text-xs text-red-500">{error}</p>
                )}
              </div>
            </form>

            <Button
              type="submit"
              variant="dark"
              form="forgot-password-form"
              className="mt-4 w-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:ring-1 hover:ring-neutral-950"
            >
              SEND OTP
            </Button>
          </>
        )}
        {step === "otp" && (
          <>
            {/* Description */}
            <p className="mt-4 text-sm leading-6 text-neutral-600">
              We&apos;ve sent a verification code to{" "}
              <span className="font-medium text-neutral-950">
                {forgotPasswordEmail}
              </span>
              . Please enter the OTP below to continue.
            </p>

            {/* OTP Form */}
            <form
              id="verify-otp-form"
              onSubmit={handleOTPSubmit}
              className="mt-4 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="otp"
                  className="text-sm font-medium text-neutral-900"
                >
                  OTP *
                </label>

                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-950"
                />

                {error && (
                  <p className="mt-0.5 text-xs text-red-500">{error}</p>
                )}
              </div>
            </form>

            <Button
              type="submit"
              variant="dark"
              form="verify-otp-form"
              className="mt-4 w-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:ring-1 hover:ring-neutral-950"
            >
              VERIFY OTP
            </Button>
          </>
        )}
        {step === "reset" && (
          <>
            {/* Description */}
            <p className="mt-4 text-sm leading-6 text-neutral-600">
              Create a new password for your account. Make sure your password is
              secure and easy for you to remember.
            </p>

            {/* Reset Password Form */}
            <form
              id="reset-password-form"
              onSubmit={handleResetPasswordSubmit}
              className="mt-4 flex flex-col gap-4"
            >
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
                      showNewPassword
                        ? "Hide new password"
                        : "Show new password"
                    }
                    className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-neutral-900"
                >
                  Confirm Password *
                </label>

                <div className="relative w-full">
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="h-11 w-full rounded-lg border border-neutral-200 px-3 pr-11 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-950"
                  />

                  <Button
                    type="button"
                    variant="none"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </Button>
                </div>

                {error && (
                  <p className="mt-0.5 text-xs text-red-500">{error}</p>
                )}
              </div>
            </form>

            {/* Reset Password */}
            <Button
              type="submit"
              variant="dark"
              form="reset-password-form"
              className="mt-4 w-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:ring-1 hover:ring-neutral-950"
            >
              RESET PASSWORD
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
