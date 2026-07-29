import newsletterImg from "../../../../assets/Frame 1261153404.png";
import NewsletterForm from "./NewsletterForm";
import NewsletterContent from "./NewsletterContent";

function Newsletter() {
  return (
    <section
      className="relative flex flex-col w-full h-99.75 gap-6 items-center justify-center bg-cover bg-center bg-no-repeat sm:h-94.75 lg:h-127.75 lg:px-6.25"
      style={{ backgroundImage: `url(${newsletterImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.49)]" />
      {/* Content */}
      <NewsletterContent />
      {/* Form */}
      <NewsletterForm />
    </section>
  );
}

export default Newsletter;
