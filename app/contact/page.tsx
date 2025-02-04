import ContactForm from "./contactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Industry Umbrella",
  description: "you can send us an email. ",
};
const Contact = () => {
  return <ContactForm />;
};

export default Contact;
