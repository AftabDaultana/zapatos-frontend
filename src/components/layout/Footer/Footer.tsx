import FooterBottom from "./FooterBody/FooterBottom";
import FooterContent from "./FooterBody/FooterContent";
import Newsletter from "./Newsletter/Newsletter";

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
