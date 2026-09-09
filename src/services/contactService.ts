export interface ContactFormData {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export async function contactService(
  data: ContactFormData,
): Promise<ContactResponse> {
  console.log("Contact form data submitted: ", data);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    success: true,
    message: "Your message has been sent successfully",
  };
}
