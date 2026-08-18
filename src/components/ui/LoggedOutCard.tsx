import { ArrowRight } from "lucide-react";
import Button from "./Button";
import { useState } from "react";
import AuthModal from "./Auth/AuthModal";

export default function LoggedOutCard() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="flex flex-col gap-5 p-4 items-center">
      <div className="flex flex-col gap-1 items-center">
        <span className="text-center text-sm text-neutral-950">
          You are currently logged out.
        </span>

        <Button
          type="button"
          onClick={() => setShowAuth(true)}
          className="bg-neutral-950 text-neutral-50 w-30 h-10"
        >
          Login
        </Button>
      </div>

      <div className="flex flex-col gap-1 items-center">
        <span className="text-center text-sm text-neutral-950">
          Don't have an existing account?
        </span>

        <Button
          type="button"
          onClick={() => setShowAuth(true)}
          className="text-neutral-950"
        >
          Register
          <ArrowRight size={16} />
        </Button>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
