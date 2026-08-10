import { Link } from "react-router-dom";
import darkLogo from "../../assets/Vector.svg";
import lightLogo from "../../assets/logo-white.svg";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const logo = variant === "dark" ? darkLogo : lightLogo;
  return (
    <Link to={"/"}>
      <img src={logo} alt="Zapato" className={className} />
    </Link>
  );
}
