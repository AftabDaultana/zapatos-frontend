import { Link } from "react-router-dom";

interface FooterLink {
  label: string;
  to: string;
}

interface FooterLinksProps {
  heading: string;
  links: FooterLink[];
}

export default function FooterLinks({ heading, links }: FooterLinksProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-6">
      <p className="font-semibold text-2xl leading-8">
        {heading.toUpperCase()}
      </p>

      <ul className="flex flex-col gap-2">
        {links.map((link) => {
          return (
            <li key={link.label}>
              <Link
                to={link.to}
                onClick={() => window.scrollTo(0, 0)}
                className="group flex w-fit py-3 text-lg leading-3.5 text-neutral-600 transition-all duration-300 hover:translate-x-1 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 md:text-base"
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-neutral-950 transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
