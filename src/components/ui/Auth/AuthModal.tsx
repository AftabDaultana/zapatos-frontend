import { useState } from "react";

import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";
import AlertModal from "../AlertModal";

interface AuthModalProps {
  onClose: () => void;
  initialView?: "login" | "register";
}

export default function AuthModal({
  onClose,
  initialView = "login",
}: AuthModalProps) {
  const [showRegister, setShowRegister] = useState(initialView === "register");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  if (showRegister) {
    return (
      <Register onClose={onClose} onLogin={() => setShowRegister(false)} />
    );
  }

  if (showForgotPassword) {
    return (
      <ForgotPassword
        onClose={() => setShowForgotPassword(false)}
        onResetSuccess={() => {
          setShowForgotPassword(false);
          setShowResetSuccess(true);
        }}
      />
    );
  }

  if (showResetSuccess) {
    return (
      <AlertModal
        isOpen={showResetSuccess}
        type="success"
        title="Password Reset Successful"
        message="Your password has been reset successfully. You can now sign in with your new password."
        onClose={() => setShowResetSuccess(false)}
      />
    );
  }

  return (
    <Login
      onClose={onClose}
      onRegister={() => setShowRegister(true)}
      onForgotPassword={() => setShowForgotPassword(true)}
    />
  );
}
