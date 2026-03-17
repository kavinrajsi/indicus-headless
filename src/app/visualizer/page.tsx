import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colourcast Visualizer",
  description:
    "Visualise 1,000+ colours with a touch of a button. Download the Indicus Colourcast app.",
};

const FEATURES = [
  {
    title: "Browse Colours",
    desc: "Explore the complete Colour Symphony palette and preview colours on your walls.",
  },
  {
    title: "Design Trends",
    desc: "Discover the newest design trends and colour innovations.",
  },
  {
    title: "Gallery Import",
    desc: "Import images directly from your device gallery to visualize colours.",
  },
];

export default function VisualizerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Visualise 1,000+ Colours With a Touch of a Button
            </h1>
            <p className="mt-6 text-lg text-white/80">
              Explore what different colours look like in your space with a touch
              of a button. Our Colourcast mobile app makes choosing your shades
              easier like never before.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=indicus.colourcast"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-black px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.395 12l2.303-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-100 p-8 text-center shadow-sm"
              >
                <h3 className="mb-3 text-xl font-bold">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Explore Colours?
          </h2>
          <p className="mb-8 text-gray-600">
            Download the Colourcast app and start visualizing today.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=indicus.colourcast"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-teal px-8 py-3 font-medium text-white transition-colors hover:bg-teal-dark"
          >
            Download on Google Play
          </a>
        </div>
      </section>
    </>
  );
}
