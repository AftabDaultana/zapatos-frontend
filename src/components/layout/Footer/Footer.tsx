import FooterBottom from "./FooterBottom";
import FooterContent from "./FooterContent";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <>
      <footer>
        <Newsletter />
        <FooterContent />
        <FooterBottom />
      </footer>
    </>
  );
}
