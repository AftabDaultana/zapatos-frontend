import { useState } from "react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { addUser, getStoredUsers } from "../../../app/slices/userSlice";
import Button from "../Button";
import { Eye, EyeOff, X } from "lucide-react";
import type { SubmitEvent } from "react";

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

    const newUser = {
      id: Math.max(...storedUsers.map((user) => user.id), 0) + 1,
      name: name.trim(),
      email: email.trim(),
      password,
      phoneNumber: "",
      profilePicture: "",
      role: "user" as const,
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
  };

  return (
    <main className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center p-6">
      <div className="relative flex max-h-[calc(100dvh-3rem)] w-full max-w-125 flex-col gap-4 overflow-y-auto bg-white p-6 md:gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-7 text-neutral-950">
            JOIN US
          </h2>
          <Button
            type="button"
            onClick={onClose}
            aria-label="Close register"
            className="bg-transparent text-neutral-950"
          >
            <X size={24} />
          </Button>
        </div>
        <form
          id="register-form"
          onSubmit={handleRegister}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-lg text-neutral-900">
              Name *
            </label>
            <input
              id="name"
              name="name"
              type="string"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="h-12 w-full p-4 border border-[#e7e7e7] text-sm text-neutral-700 outline-none placeholder:text-neutral-500 focus:border-neutral-950"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-lg text-neutral-900">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="h-12 w-full p-4 border border-[#e7e7e7] text-sm text-neutral-700 outline-none placeholder:text-neutral-500 focus:border-neutral-950"
            />
          </div>
          <div className="flex flex-col gap-1.5 items-start">
            <label htmlFor="password" className="text-lg text-neutral-900">
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
                className="h-12 w-full border border-[#e7e7e7] px-4 pr-12 text-sm text-neutral-700 outline-none placeholder:text-neutral-500 focus:border-neutral-950"
              />
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-neutral-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </form>
        <Button
          type="submit"
          form="register-form"
          className="bg-neutral-950 text-neutral-50 w-full h-10 hover:bg-neutral-50 hover:text-neutral-950 hover:border hover:border-neutral-950"
        >
          REGISTER
        </Button>
        <div className="flex flex-col gap-4">
          <span className="text-neutral-950 text-lg leading-7.5 font-light">
            Create an account and you will get:
            <span>
              <ul>
                <li className="text-neutral-950 text-sm leading-7.5 font-light">
                  Sale promotions!
                </li>
                <li className="text-neutral-950 text-sm leading-7.5 font-light">
                  Bonus offers!
                </li>
                <li className="text-neutral-950 text-sm leading-7.5 font-light">
                  Update for all new product releases!
                </li>
              </ul>
            </span>
          </span>
        </div>
        <span>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onLogin}
            className="text-neutral-950 underline underline-offset-2"
          >
            LOGIN
          </button>
        </span>
      </div>
    </main>
  );
}
