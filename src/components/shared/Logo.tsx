import { Link } from "react-router-dom";
import darkLogo from "../../assets/Vector.svg";
import lightLogo from "../../assets/logo-white.svg";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  link: string;
}

export default function Logo({
  variant = "dark",
  className = "",
  link,
}: LogoProps) {
  const logo = variant === "dark" ? darkLogo : lightLogo;
  return (
    <Link to={link}>
      <img src={logo} alt="Zapato" className={className} loading="eager" />
    </Link>
  );
}
