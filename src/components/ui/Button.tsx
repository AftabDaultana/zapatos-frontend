import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = "" }: ButtonProps) {
  return (
    <button className={`flex items-center justify-center ${className}`}>
      {children}
    </button>
  );
}
