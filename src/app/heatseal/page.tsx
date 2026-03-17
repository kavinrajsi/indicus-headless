import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Indicus Heatseal",
  description:
    "Indicus Heatseal — premium waterproofing and heat-reflective coating. Protects your home from water seepage and heat.",
};

export default function HeatsealPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-black md:text-6xl">
              Indicus Heatseal
            </h1>
            <p className="mt-6 text-xl text-blue-200">
              Premium waterproofing and heat-reflective coating that protects
              your home from water seepage and keeps interiors cool.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/products/heatseal"
                className="rounded-full bg-white px-8 py-3 font-medium text-blue-900 transition-colors hover:bg-gray-100"
              >
                View Product Details
              </Link>
              <a
                href="tel:18005993939"
                className="rounded-full border border-white/30 px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                Call 1800 599 3939
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold">
            Why Heatseal?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Waterproofing",
                desc: "Complete protection against water seepage and dampness.",
              },
              {
                title: "Heat Reflective",
                desc: "Reflects solar heat, keeping interiors up to 5°C cooler.",
              },
              {
                title: "Long Lasting",
                desc: "Up to 8 years warranty with Heatseal Advanced.",
              },
              {
                title: "Crack Bridging",
                desc: "Bridges hairline cracks to prevent water ingress.",
              },
              {
                title: "UV Protection",
                desc: "UV-resistant formula prevents surface deterioration.",
              },
              {
                title: "Easy Application",
                desc: "Can be applied with brush, roller, or spray.",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-xl bg-gray-50 p-6">
                <h3 className="mb-2 font-semibold text-blue-900">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 py-16 text-center text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">
            Protect Your Home Today
          </h2>
          <p className="mb-8 text-blue-200">
            Get in touch for a free consultation and site evaluation.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-3 font-medium text-blue-900 transition-colors hover:bg-gray-100"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
