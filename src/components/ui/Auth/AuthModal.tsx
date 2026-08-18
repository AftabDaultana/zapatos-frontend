import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return (
      <Register onClose={onClose} onLogin={() => setShowRegister(false)} />
    );
  }

  return <Login onClose={onClose} onRegister={() => setShowRegister(true)} />;
}
