import { useState } from "react";

import Login from "./Login";
import Register from "./Register";

interface AuthModalProps {
  onClose: () => void;
  initialView?: "login" | "register";
}

export default function AuthModal({
  onClose,
  initialView = "login",
}: AuthModalProps) {
  const [showRegister, setShowRegister] = useState(initialView === "register");

  if (showRegister) {
    return (
      <Register onClose={onClose} onLogin={() => setShowRegister(false)} />
    );
  }

  return <Login onClose={onClose} onRegister={() => setShowRegister(true)} />;
}
