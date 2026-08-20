import ContactForm from "../../components/ui/ContactForm/ContactForm";

export default function Contact() {
  return (
    <main className="px-4 py-10 md:px-8 xl:px-10 flex flex-col items-center gap-16">
      <div className="mx-auto w-full max-w-7xl flex flex-col items-center gap-3">
        <h1 className="text-3xl text-neutral-950 font-bold text-center">
          Contact Us
        </h1>
        <p className="max-w-2xl text-base text-neutral-600 text-center">
          Have a question about our products, orders, or services? We&apos;re
          here to help. Get in touch with our team and we&apos;ll be happy to
          assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:gap-15 lg:grid-cols-2 max-w-7xl justify-center">
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-neutral-950">Get in Touch</h2>
          <p className="max-w-2xl text-base text-neutral-600 w-120">
            Whether you need help with an order, have a question about our
            products, or simply want to reach out, we&apos;re here to help.
          </p>
          <div className="border border-neutral-300 p-5 w-full max-w-90">
            <h3 className="font-semibold text-neutral-950">Phone</h3>
            <p className="mt-2 text-neutral-600">(804) 6623-9999</p>
          </div>
          <div className="border border-neutral-300 p-5 w-full max-w-90">
            <h3 className="font-semibold text-neutral-950">Email</h3>
            <p className="mt-2 text-neutral-600">
              supportoursmallbusiness@g.com
            </p>
          </div>
          <div className="border border-neutral-300 p-5 w-full max-w-90">
            <h3 className="font-semibold text-neutral-950">Working Hours</h3>
            <p className="mt-2 text-neutral-600">
              Monday - Saturday: 9:00 AM - 9:00 PM
            </p>
          </div>
        </section>
        <ContactForm />
      </div>
    </main>
  );
}
