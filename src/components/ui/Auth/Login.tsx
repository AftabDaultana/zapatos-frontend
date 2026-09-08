import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Button from "../Button";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import type { SubmitEvent } from "react";
import { loginUser } from "../../../services/authServices";
import { setUser } from "../../../app/slices/userSlice";

interface LoginProps {
  onClose: () => void;
  onRegister: () => void;
  onForgotPassword: () => void;
}

export default function Login({
  onClose,
  onRegister,
  onForgotPassword,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser({
        email: email.trim(),
        password,
        rememberMe,
      });

      console.log("Login response: ", response);
      console.log("Login user: ", response.user);

      dispatch(setUser(response.user));
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <main className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-y-auto rounded-xl bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h2 className="text-xl font-semibold leading-6 text-neutral-950">
            SIGN IN
          </h2>

          <Button
            type="button"
            variant="none"
            onClick={onClose}
            aria-label="Close login"
            className="flex h-8 w-8 items-center justify-center p-0 text-neutral-950 transition-colors duration-200 hover:bg-gray-300"
          >
            <X size={20} />
          </Button>
        </div>

        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4"
        >
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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                type="checkbox"
                className="h-3.5 w-3.5 accent-neutral-950"
              />

              <label htmlFor="rememberMe" className="text-xs text-neutral-700">
                Remember me
              </label>
            </div>

            <Button
              type="button"
              onClick={onForgotPassword}
              className="text-xs text-neutral-700 underline-offset-2 transition-colors duration-200 hover:text-neutral-950 hover:underline"
            >
              Forgot password?
            </Button>
          </div>
        </form>

        <Button
          type="submit"
          variant="dark"
          form="login-form"
          className="mt-4 w-full px-4 py-2 text-sm font-medium transition-all duration-200  hover:ring-1 hover:ring-neutral-950"
        >
          SIGN IN
        </Button>

        <div className="mt-5 border-t border-neutral-100 pt-4">
          <p className="text-sm font-medium text-neutral-950">
            Don't have an account?
          </p>

          <p className="mt-1 text-xs leading-5 text-neutral-500">
            Create an account and get:
          </p>

          <ul className="mt-2 space-y-1 pl-4 text-xs leading-4 text-neutral-600">
            <li className="list-disc">Sale promotions!</li>
            <li className="list-disc">Bonus offers!</li>
            <li className="list-disc">Updates for all new product releases!</li>
          </ul>
        </div>

        <Button
          type="button"
          variant="light"
          onClick={onRegister}
          className="mt-4 w-full px-4 py-2 text-sm font-medium transition-all duration-200"
        >
          REGISTER
        </Button>
      </div>
    </main>
  );
}
