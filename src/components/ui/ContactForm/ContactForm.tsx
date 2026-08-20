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
      const resopnse = await contactService(data);
      if (resopnse.success) {
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
    <section className="border border-neutral-300 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-neutral-950 text-center">
        Send Us a Message
      </h2>
      {isSubmitted && (
        <p className="text-lg font-medium text-neutral-800 text-center">
          Your message has been submitted successfully
        </p>
      )}
      {submitError && (
        <p className="text-lg font-medium text-neutral-800 text-center">
          Something went wrong. Please try again.
        </p>
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
            className="border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-950"
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
            className="border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-950"
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
            className="border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-950"
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
            className="border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-950"
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
            className="border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-950"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex items-center justify-center bg-neutral-950 px-5 py-3 font-semibold text-neutral-50 transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </form>
    </section>
  );
}
