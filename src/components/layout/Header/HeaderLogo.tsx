import darkLogo from "../../../assets/Vector.svg";
import lightLogo from "../../../assets/logo-white.svg";

interface HeaderLogoProps {
  varient?: "dark" | "light";
  classname?: string;
}

export default function HeaderLogo({
  varient = "dark",
  classname = "",
}: HeaderLogoProps) {
  const logo = varient === "dark" ? lightLogo : darkLogo;
  return <img src={logo} alt="Zapato" className={classname} />;
}
