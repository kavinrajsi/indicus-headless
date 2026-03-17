import Link from "next/link";

export default function PaintingServicesCTA() {
  return (
    <section className="bg-purple py-14 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="text-2xl font-black uppercase md:text-3xl">
          Perfectly Painted Walls, Every Time
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
          Our only goal with Indicus Colourcraft Painting Service is to ensure
          that your experience with us is a pleasant one. Our painting
          contractors have decades of experience and best equipment that creates
          stunning results.
        </p>
        <Link
          href="/colourcraft"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase text-purple transition-colors hover:bg-gray-100"
        >
          Book a site visit
        </Link>
      </div>
    </section>
  );
}
