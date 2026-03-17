import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Indicus Paints. Call 1800 599 3939 (toll-free) or visit our offices in Karur and Chennai.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-3 text-gray-300">
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="mb-8 text-2xl font-bold">Get in Touch</h2>

              {/* Phone */}
              <div className="mb-8">
                <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">
                  Toll-Free
                </h3>
                <a
                  href="tel:18005993939"
                  className="text-2xl font-bold text-teal hover:underline"
                >
                  1800 599 3939
                </a>
              </div>

              {/* WhatsApp */}
              <div className="mb-8">
                <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">
                  WhatsApp
                </h3>
                <a
                  href="https://wa.me/919843005719"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-teal hover:underline"
                >
                  +91 98430 05719
                </a>
              </div>

              {/* Email */}
              <div className="mb-8">
                <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">
                  Email
                </h3>
                <a
                  href="mailto:indicus@vncgroup.com"
                  className="text-lg font-medium text-teal hover:underline"
                >
                  indicus@vncgroup.com
                </a>
              </div>

              {/* Offices */}
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">
                    Registered Office
                  </h3>
                  <p className="text-gray-600">
                    VNC Electrodes, Industrial Estate, S.Vellalapatti,
                    <br />
                    Karur 639004, Tamil Nadu, India
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">
                    Chennai Office
                  </h3>
                  <p className="text-gray-600">
                    VNC Electrodes, 11/4, Janaki Avenue, MRC Nagar,
                    <br />
                    Raja Annamalai Puram, Chennai – 600028
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="rounded-2xl bg-gray-50 p-8">
                <h2 className="mb-6 text-2xl font-bold">
                  Get in Touch With Us
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
