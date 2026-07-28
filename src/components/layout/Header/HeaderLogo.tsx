import darkLogo from "../../../assets/Vector.svg";
import lightLogo from "../../../assets/logo-white.svg";

interface HeaderLogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function HeaderLogo({
  variant = "dark",
  className = "",
}: HeaderLogoProps) {
  const logo = variant === "dark" ? darkLogo : lightLogo;
  return <img src={logo} alt="Zapato" className={className} />;
}
