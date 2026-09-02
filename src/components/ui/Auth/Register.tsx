import { useState } from "react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import {
  addUser,
  getStoredUsers,
  setUser,
} from "../../../app/slices/userSlice";
import Button from "../Button";
import { Eye, EyeOff, X } from "lucide-react";
import type { SubmitEvent } from "react";
import type { User } from "../../../types/user";

interface RegisterProps {
  onClose: () => void;
  onLogin: () => void;
}

export default function Register({ onClose, onLogin }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  const handleRegister = (e: SubmitEvent) => {
    e.preventDefault();
    setError("");

    const storedUsers = getStoredUsers();

    const existingUser = storedUsers.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (existingUser) {
      setError("User with this email already exists");
      return;
    }

    const newUser: User = {
      id: Math.max(...storedUsers.map((user) => user.id), 0) + 1,
      name: name.trim(),
      email: email.trim(),
      password,
      phoneNumber: "",
      profilePicture: "",
      role: "user",
      isLoggedIn: false,
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      billingAddress: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    };

    dispatch(addUser(newUser));
    dispatch(setUser(newUser));
    onClose();
  };

  return (
    <main className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-y-auto rounded-xl bg-white p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h2 className="text-xl font-semibold leading-6 text-neutral-950">
            JOIN US
          </h2>

          <Button
            type="button"
            variant="none"
            onClick={onClose}
            aria-label="Close register"
            className="flex h-8 w-8 items-center justify-center p-0 text-neutral-950 transition-colors duration-200 hover:bg-gray-300"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Form */}
        <form
          id="register-form"
          onSubmit={handleRegister}
          className="mt-4 flex flex-col gap-4"
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-sm font-medium text-neutral-900"
            >
              Name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-950"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-neutral-900"
            >
              Email *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-950"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-neutral-900"
            >
              Password *
            </label>

            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="h-11 w-full rounded-lg border border-neutral-200 px-3 pr-11 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-950"
              />

              <Button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>

            {error && <p className="mt-0.5 text-xs text-red-500">{error}</p>}
          </div>
        </form>

        {/* Register */}
        <Button
          type="submit"
          variant="dark"
          form="register-form"
          className="mt-4 w-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-neutral-50 hover:text-neutral-950 hover:ring-1 hover:ring-neutral-950"
        >
          REGISTER
        </Button>

        {/* Benefits */}
        <div className="mt-5 border-t border-neutral-100 pt-4">
          <p className="text-sm font-medium text-neutral-950">
            Create an account and get:
          </p>

          <ul className="mt-2 space-y-1 pl-4 text-xs leading-4 text-neutral-600">
            <li className="list-disc">Sale promotions!</li>
            <li className="list-disc">Bonus offers!</li>
            <li className="list-disc">Updates for all new product releases!</li>
          </ul>
        </div>

        {/* Login */}
        <div className="mt-4 text-center text-xs text-neutral-500">
          Already have an account?{" "}
          <Button
            type="button"
            onClick={onLogin}
            className="font-medium text-neutral-950 underline underline-offset-2 transition-colors duration-200 hover:text-neutral-600"
          >
            LOGIN
          </Button>
        </div>
      </div>
    </main>
  );
}
