import { Mail, Phone, Clock3 } from "lucide-react";
import ContactForm from "../../components/ui/ContactForm/ContactForm";

export default function Contact() {
  return (
    <main className="flex flex-col items-center gap-16 px-4 py-10 md:px-8 xl:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3">
        <h1 className="text-center text-3xl font-bold text-neutral-950">
          Contact Us
        </h1>

        <p className="max-w-2xl text-center text-base text-neutral-600">
          Have a question about our products, orders, or services? We&apos;re
          here to help. Get in touch with our team and we&apos;ll be happy to
          assist you.
        </p>
      </div>

      <div className="grid w-full max-w-7xl grid-cols-1 justify-center gap-8 lg:grid-cols-2 lg:gap-15">
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-neutral-950">
              Get in Touch
            </h2>

            <p className="max-w-2xl text-base text-neutral-600 lg:max-w-120">
              Whether you need help with an order, have a question about our
              products, or simply want to reach out, we&apos;re here to help.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="tel:+180466239999"
              className="group flex w-full max-w-90 items-center gap-4 border border-neutral-300 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 transition-all duration-300 group-hover:bg-neutral-950 group-hover:text-neutral-50">
                <Phone
                  size={20}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div>
                <h3 className="font-semibold text-neutral-950">Phone</h3>
                <p className="mt-1 text-neutral-600 transition-colors duration-300 group-hover:text-neutral-950">
                  (804) 6623-9999
                </p>
              </div>
            </a>

            <a
              href="mailto:supportoursmallbusiness@g.com"
              className="group flex w-full max-w-90 items-center gap-4 border border-neutral-300 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 transition-all duration-300 group-hover:bg-neutral-950 group-hover:text-neutral-50">
                <Mail
                  size={20}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-neutral-950">Email</h3>
                <p className="mt-1 break-all text-neutral-600 transition-colors duration-300 group-hover:text-neutral-950">
                  supportoursmallbusiness@g.com
                </p>
              </div>
            </a>

            <div className="group flex w-full max-w-90 items-center gap-4 border border-neutral-300 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-950 hover:shadow-md">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 transition-all duration-300 group-hover:bg-neutral-950 group-hover:text-neutral-50">
                <Clock3
                  size={20}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div>
                <h3 className="font-semibold text-neutral-950">
                  Working Hours
                </h3>
                <p className="mt-1 text-neutral-600">
                  Monday - Saturday: 9:00 AM - 9:00 PM
                </p>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </div>
    </main>
  );
}
