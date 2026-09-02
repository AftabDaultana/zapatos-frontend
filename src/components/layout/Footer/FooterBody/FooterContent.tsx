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
    links: [
      { label: "Men", to: "/category/men" },
      { label: "Kids", to: "/category/kids" },
      { label: "Women", to: "/category/women" },
    ],
  },
  {
    heading: "brands",
    links: [
      { label: "Adidas", to: "/category/brands/Adidas" },
      { label: "Nike", to: "/category/brands/Nike" },
      { label: "Fila", to: "/category/brands/Fila" },
      { label: "Brooks", to: "/category/brands/Brooks" },
      { label: "Mizuna", to: "/category/brands/Mizuna" },
      { label: "Salomon", to: "/category/brands/Salomon" },
    ],
  },
  {
    heading: "quick links",
    links: [
      { label: "Return", to: "#" },
      { label: "Shipping", to: "#" },
      { label: "Terms & Conditions", to: "#" },
      { label: "Privacy Policy", to: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "About Us", to: "#" },
      { label: "FAQ's", to: "#" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

function FooterContent() {
  return (
    <section className="flex flex-col gap-12 px-4 py-12 md:gap-10 md:p-8 lg:flex-row lg:justify-between lg:px-16 lg:py-20">
      <div className="flex flex-col gap-12 md:gap-8 lg:gap-8">
        <div className="flex flex-col gap-6">
          <Logo variant="dark" className="h-[73.26px] w-45.75" link="/" />

          <p>
            Not Just Shoes, but a Statement.
            <br />
            Kicks Designed to Keep You One Step Ahead
          </p>
        </div>

        <div>
          <ul className="flex gap-4">
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-neutral-950 hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                <RiFacebookCircleFill
                  size={32}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            </li>

            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-neutral-950 hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                <RiTwitterXFill
                  size={32}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            </li>

            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-neutral-950 hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                <RiInstagramFill
                  size={32}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            </li>

            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-neutral-950 hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                <RiYoutubeFill
                  size={32}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="tel:08978978789"
            className="group flex h-9.5 w-fit items-center rounded-lg transition-all duration-300 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            <Phone
              size={24}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            <div className="p-3">
              <p className="transition-colors duration-300 group-hover:text-neutral-600">
                08978978789
              </p>
            </div>
          </a>

          <a
            href="mailto:supportoursmallbusiness@g.com"
            className="group flex h-9.5 w-fit items-center rounded-lg transition-all duration-300 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            <Mail
              size={24}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            <div className="p-3">
              <p className="transition-colors duration-300 group-hover:text-neutral-600">
                supportoursmallbusiness@g.com
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-10 md:flex-row md:justify-between lg:flex-row lg:justify-between lg:gap-10">
        {footerLinks.map((footerLink) => {
          return <FooterLinks key={footerLink.heading} {...footerLink} />;
        })}
      </div>
    </section>
  );
}

export default FooterContent;
