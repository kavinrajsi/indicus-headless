import type { Metadata } from "next";
import AppointmentForm from "@/components/ui/AppointmentForm";

export const metadata: Metadata = {
  title: "Painting Services - ColourCraft",
  description:
    "Professional residential painting services by Indicus ColourCraft. Interior, exterior painting and waterproofing. Call 1800 599 3939.",
};

const SERVICES = [
  {
    title: "Interior Painting",
    desc: "A fresh coat of paint can completely transform the interior of your home, giving it a new and cosy look.",
    icon: "🏠",
  },
  {
    title: "Exterior Painting",
    desc: "Give your home a new outlook with weather resistant protection that instantly stands out and increases the value of your home.",
    icon: "🏗️",
  },
  {
    title: "Waterproofing",
    desc: "Address water seepage problems with our special and robust waterproofing products and solutions.",
    icon: "💧",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Call Us",
    desc: "Contact 1800 599 3939 for a free site inspection",
  },
  {
    step: "02",
    title: "Site Evaluation",
    desc: "Our contractors assess conditions and provide consultation",
  },
  {
    step: "03",
    title: "Colour Selection",
    desc: "Expert guidance from our thoughtfully curated collection",
  },
  {
    step: "04",
    title: "Quotation",
    desc: "Receive a proposal based on your site conditions",
  },
  {
    step: "05",
    title: "Site Execution",
    desc: "Professional painting ensuring high-quality results",
  },
];

export default function ColourCraftPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-800 py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Perfectly Painted Walls, Everytime.
              </h1>
              <p className="mt-4 max-w-lg text-lg text-purple-200">
                The best residential painting services with exceptional service
                and experience. Professional contractors with decades of
                experience, best equipment and training.
              </p>
              <a
                href="tel:18005993939"
                className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-medium text-purple-900 transition-colors hover:bg-gray-100"
              >
                Call 1800 599 3939
              </a>
            </div>
            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur">
              <h2 className="mb-4 text-xl font-bold">Book an Appointment</h2>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold">Our Services</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-gray-100 p-8 text-center shadow-sm"
              >
                <div className="mb-4 text-4xl">{s.icon}</div>
                <h3 className="mb-3 text-xl font-bold">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">
            How It Works
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-lg font-bold text-purple-800">
                  {s.step}
                </div>
                <h3 className="mb-2 font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-purple-900 py-16 text-center text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Transform Your Space?
          </h2>
          <p className="mb-8 text-purple-200">
            By proceeding, you are authorizing Indicus and its contractors to get
            in touch with you through calls, messages, or email.
          </p>
          <a
            href="tel:18005993939"
            className="inline-block rounded-full bg-white px-8 py-3 font-medium text-purple-900 transition-colors hover:bg-gray-100"
          >
            Call 1800 599 3939
          </a>
        </div>
      </section>
    </>
  );
}
