import {
  RiFacebookCircleFill,
  RiTwitterXFill,
  RiInstagramFill,
  RiYoutubeFill,
} from "react-icons/ri";
import Logo from "../../../shared/Logo";
import { Mail, Phone } from "lucide-react";
import FooterLinks from "./FooterLinks";

const footerLinks = [
  {
    heading: "shop",
    links: ["Men", "Kids", "Women"],
  },
  {
    heading: "brands",
    links: ["Adidas", "Nike", "fila", "Brooks", "Mizuna", "Salomon"],
  },
  {
    heading: "quick links",
    links: ["Return", "Shipping", "Terms & Conditions", "Privacy Policy"],
  },
  {
    heading: "Support",
    links: ["About Us", "FAQ's", "Contact Us"],
  },
];

function FooterContent() {
  return (
    <section className="flex flex-col px-4 py-12 gap-12 md:gap-10 md:p-8 lg:flex-row lg:justify-between lg:px-16 lg:py-20">
      <div className="flex flex-col gap-12 md:gap-8 lg:gap-8">
        <div className="flex flex-col gap-6">
          <Logo variant="dark" className="w-45.75 h-[73.26px]" link="/" />
          <p>
            Not Just Shoes, but a Statement.
            <br /> Kicks Designed to Keep You One Step Ahead
          </p>
        </div>
        <div>
          <ul className="flex gap-4">
            <li className="flex w-14 h-14 bg-neutral-200 rounded-full items-center justify-center">
              <RiFacebookCircleFill size={32} />
            </li>
            <li className="flex w-14 h-14 bg-neutral-200 rounded-full items-center justify-center">
              <RiTwitterXFill size={32} />
            </li>
            <li className="flex w-14 h-14 bg-neutral-200 rounded-full items-center justify-center">
              <RiInstagramFill size={32} />
            </li>
            <li className="flex w-14 h-14 bg-neutral-200 rounded-full items-center justify-center">
              <RiYoutubeFill size={32} />
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex h-9.5 items-center">
            <Phone size={24} />
            <div className="p-3">
              <p>08978978789</p>
            </div>
          </div>
          <div className="flex h-9.5 items-center">
            <Mail size={24} />
            <div className="p-3">
              <p>supportoursmallbusiness@g.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-10 md:flex-row md:justify-between">
        {footerLinks.map((footerLink) => {
          return <FooterLinks {...footerLink} />;
        })}
      </div>
    </section>
  );
}

export default FooterContent;
