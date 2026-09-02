import { useState, type SubmitEventHandler } from "react";
import Button from "../Button";
import { contactService } from "../../../services/contactService";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name")),
      subject: String(formData.get("subject")),
      email: String(formData.get("email")),
      phoneNumber: String(formData.get("phoneNumber")),
      message: String(formData.get("message")),
    };

    setSubmitError(false);
    setIsSubmitting(true);

    try {
      const response = await contactService(data);

      if (response.success) {
        setIsSubmitted(true);
        form.reset();

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Contact form submission failed", error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full border border-neutral-300 p-6 transition-all duration-300 hover:shadow-md md:p-8">
      <h2 className="text-center text-2xl font-bold text-neutral-950">
        Send Us a Message
      </h2>

      {isSubmitted && (
        <div
          role="status"
          className="mt-4 border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700"
        >
          Your message has been submitted successfully.
        </div>
      )}

      {submitError && (
        <div
          role="alert"
          className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700"
        >
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-neutral-950"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter your Full Name"
            className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition-all duration-200 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-neutral-950"
          >
            Subject
          </label>

          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="What can we help you with?"
            className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition-all duration-200 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-neutral-950"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your Email"
            className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition-all duration-200 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="phoneNumber"
            className="text-sm font-medium text-neutral-950"
          >
            Phone Number
          </label>

          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            required
            placeholder="Enter your Phone Number"
            className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition-all duration-200 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-neutral-950"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Write your message..."
            className="resize-y rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition-all duration-200 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
          />
        </div>

        <Button
          type="submit"
          variant="dark"
          disabled={isSubmitting}
          className="mt-2 w-full gap-2 px-5 py-3 font-semibold hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </form>
    </section>
  );
}
