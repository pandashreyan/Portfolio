"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactFormInput = z.infer<typeof formSchema>;

export async function submitContactForm(formData: ContactFormInput) {
  // Validate the form data on the server
  const validationResult = formSchema.safeParse(formData);

  if (!validationResult.success) {
    console.error("Server-side validation failed:", validationResult.error.flatten());
    throw new Error("Invalid form data submitted.");
  }

  const { name, email, message } = validationResult.data;

  // Simulate sending the data (e.g., to an email, database, or external API)
  console.log("Received contact form submission:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // In a real application, you would integrate with an email service (like SendGrid, Resend)
  // or save the message to a database here.
  // Example: await sendEmail({ to: 'your-email@example.com', from: email, subject: `Contact Form Submission from ${name}`, text: message });
  // Example: await db.collection('messages').add({ name, email, message, timestamp: new Date() });

  // Simulate a delay to mimic network latency
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Indicate success
  return { success: true, message: "Message sent successfully!" };

  // If an error occurred during processing (e.g., email sending failed):
  // throw new Error("Failed to send message. Please try again later.");
}
