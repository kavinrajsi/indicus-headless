import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for contacting Indicus Paints.",
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="mb-6 text-6xl text-teal">&#10003;</div>
          <h1 className="mb-4 text-3xl font-bold">Thank You!</h1>
          <p className="mb-8 text-lg text-gray-600">
            Your submission has been received. Our team will get in touch with
            you shortly.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-teal px-8 py-3 font-medium text-white transition-colors hover:bg-teal-dark"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
