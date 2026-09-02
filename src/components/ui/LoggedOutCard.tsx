import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import AuthModal from "./Auth/AuthModal";

export default function LoggedOutCard() {
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");

  return (
    <div className="w-72 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
      {/* Header */}
      <div className="border-b border-neutral-100 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          Account
        </p>
      </div>

      <div className="p-4">
        {/* Login Section */}
        <div className="flex flex-col items-center gap-3 rounded-lg bg-neutral-50 px-4 py-5 text-center">
          <div>
            <p className="text-sm font-medium text-neutral-950">Welcome back</p>

            <p className="mt-1 text-xs leading-5 text-neutral-500">
              Log in to access your account and orders.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => {
              setAuthView("login");
              setShowAuth(true);
            }}
            className="h-10 w-full rounded-lg bg-neutral-950 text-sm font-medium text-neutral-50 transition-all duration-200 hover:bg-neutral-800"
          >
            Login
          </Button>
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-[11px] uppercase tracking-wider text-neutral-400">
            New here?
          </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        {/* Register Section */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-neutral-500">
            Don't have an existing account?
          </p>

          <Button
            type="button"
            onClick={() => {
              setAuthView("register");
              setShowAuth(true);
            }}
            className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-950 transition-all duration-200 hover:bg-gray-300"
          >
            <span>Register</span>

            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </div>
      </div>

      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} initialView={authView} />
      )}
    </div>
  );
}
