import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Button from "../Button";
import { users } from "../../../data/users";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setUser } from "../../../app/slices/userSlice";

import type { SubmitEvent } from "react";

interface LoginProps {
  onClose: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setError("");

    const user = users.find((user) => {
      return user.email === email && user.password === password;
    });

    if (user) {
      dispatch(setUser(user));
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <main className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center p-6">
      <div className="relative flex max-h-[calc(100dvh-3rem)] w-full max-w-125 flex-col gap-4 overflow-y-auto bg-white p-6 md:gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-7 text-neutral-950">
            SIGN IN
          </h2>
          <Button
            type="button"
            onClick={onClose}
            aria-label="Close login"
            className="bg-transparent text-neutral-950"
          >
            <X size={24} />
          </Button>
        </div>
        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 accent-neutral-950"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm leading-5 text-neutral-950"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm leading-5 text-neutral-950 underline-offset-2 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </form>
        <Button
          type="submit"
          form="login-form"
          className="bg-neutral-950 text-neutral-50 w-full h-10 hover:bg-neutral-50 hover:text-neutral-950 hover:border hover:border-neutral-950"
        >
          SIGN IN
        </Button>
        <div className="flex flex-col gap-4">
          <span>Doesn’t have an account?</span>
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
        <Button
          type="button"
          className="border border-neutral-950 text-neutral-950 w-full h-10 hover:bg-neutral-950 hover:text-neutral-50"
        >
          REGISTER
        </Button>
      </div>
    </main>
  );
}
