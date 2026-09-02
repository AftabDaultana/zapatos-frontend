import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "none" | "dark" | "light";
}

export default function Button({
  children,
  className = "",
  variant = "none",
  ...props
}: ButtonProps) {
  const variantStyles = {
    none: "",
    dark: "bg-neutral-950 text-neutral-50 hover:bg-neutral-800",
    light:
      "border border-neutral-950 bg-neutral-100 text-neutral-950 hover:bg-neutral-950 hover:text-neutral-100",
  };

  return (
    <button
      className={`flex items-center rounded-lg justify-center transition-all duration-200 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
