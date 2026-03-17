import Link from "next/link";

export default function VisualizerCTA() {
  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-50 py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center md:flex-row md:text-left lg:px-8">
        <div className="flex-1">
          <h2 className="text-2xl font-black uppercase leading-tight md:text-3xl">
            Visualise 1,000+ Colours With a Touch of a Button
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-600">
            Explore what different colours look like in your space with a touch
            of a button. Our Colourcast mobile app makes choosing your shades
            easier like never before.
          </p>
          <Link href="/visualizer" className="btn-purple mt-6 uppercase">
            Get Started
          </Link>
        </div>
        {/* Phone mockup placeholder — replace with actual app screenshot */}
        <div className="relative h-64 w-40 rounded-3xl bg-gradient-to-b from-teal to-teal-dark p-2 shadow-xl md:h-80 md:w-48">
          <div className="flex h-full items-center justify-center rounded-2xl bg-white text-center text-xs text-gray-400">
            Colourcast App
          </div>
        </div>
      </div>
    </section>
  );
}
