interface FooterLinksProps {
  heading: string;
  links: string[];
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
            <li key={link} className="py-3 text-lg leading-3.5 md:text-base">
              {link}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
