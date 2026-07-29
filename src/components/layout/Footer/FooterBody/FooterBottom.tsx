import { SiMastercard, SiVisa, SiAfterpay, SiPaypal } from "react-icons/si";
function FooterBottom() {
  return (
    <div className="flex flex-col items-center px-4 py-8 gap-4.75 bg-neutral-900 md:flex-row md:px-6 md:justify-between lg:justify-center lg:gap-4.75 lg:p-8">
      <div>
        <p className="font-bold text-white text-xs leading-4 lg:text-sm lg:leading-6">
          © {new Date().getFullYear()} Zapatos. Store by Aftab
        </p>
      </div>
      <div className="flex gap-6 items-center">
        <SiMastercard className="text-white h-4.5 w-auto" />
        <SiVisa className="text-white h-4.5 w-auto" />
        <SiAfterpay className="text-white h-4.5 w-auto" />
        <SiPaypal className="text-white h-4.5 w-auto" />
      </div>
    </div>
  );
}

export default FooterBottom;
