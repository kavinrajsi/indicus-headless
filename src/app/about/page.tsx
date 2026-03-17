import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Indicus Paints — inspired by the legendary strength of Bos Taurus Indicus. Robust products for every home decoration by VNC Group, est. 1983.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-20 text-center lg:px-8">
          <p className="mx-auto max-w-2xl text-lg italic leading-relaxed text-gray-300">
            &ldquo;As the sun set on the hunter-gatherers, their fortune in the
            wild was to change soon. The Fire, the Seed, and the mighty Bull,
            ushered the journey of civilization&apos;s bloom.&rdquo;
          </p>
        </div>
      </section>

      {/* The Inspiration */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <h1 className="mb-8 text-center text-4xl font-bold">The Inspiration</h1>
          <div className="space-y-6 text-lg leading-relaxed text-gray-600">
            <p>
              Civilization, they say, began with tilling the land and with the
              bull pulling the first plough that broke the ground. The
              bull&apos;s legendary strength and dependability have been written
              in countless fables throughout history.
            </p>
            <p>
              <strong className="text-gray-900">Indicus</strong> derives from{" "}
              <em>Bos Taurus Indicus</em>, the scientific name of humped cattle
              originating in India, which includes the Indian bull. Our brand
              draws inspiration from the creature&apos;s robustness, reliability,
              and contribution to human advancement.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="mb-6 text-3xl font-bold">
            Robust Products for Every Home
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            We are committed to offering a range of solutions for every home
            decoration and maintenance function with new-age,
            performance-oriented products. From interior walls to exterior
            surfaces, from metals to woods — Indicus delivers premium quality
            you can trust.
          </p>
        </div>
      </section>

      {/* VNC Heritage */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-teal/10 to-teal/5 p-10 text-center">
            <h2 className="mb-4 text-2xl font-bold">Built on Heritage</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Indicus operates under{" "}
              <strong className="text-gray-900">VNC Group</strong>, founded in{" "}
              <strong className="text-gray-900">1983</strong>. VNC leads in
              welding consumables, steel wires, fencing, and waterproofing
              solutions — bringing decades of manufacturing expertise to the
              world of paints and coatings.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Robustness",
                desc: "Products engineered to withstand the test of time and environment.",
              },
              {
                title: "Reliability",
                desc: "Consistent quality backed by decades of manufacturing expertise.",
              },
              {
                title: "Innovation",
                desc: "New-age, performance-oriented solutions for modern living.",
              },
            ].map((v) => (
              <div key={v.title} className="rounded-xl bg-white/5 p-8">
                <h3 className="mb-3 text-xl font-semibold text-teal">
                  {v.title}
                </h3>
                <p className="text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
