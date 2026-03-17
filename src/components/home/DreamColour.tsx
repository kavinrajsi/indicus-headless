import Image from "next/image";
import Link from "next/link";

export default function DreamColour() {
  return (
    <section className="grid md:grid-cols-2">
      {/* Left — Teal CTA */}
      <div className="flex flex-col items-start justify-center bg-teal px-8 py-14 text-white lg:px-16">
        <h2 className="text-3xl font-black uppercase leading-tight md:text-4xl">
          Find your dream colour for your dream home!
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
          Choosing a colour is an exciting moment of discovery and brings a
          world of newness to your home. We have gathered all the resources you
          need right here to make choosing a new colour effortless for you.
        </p>
        <Link href="/colours" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase text-teal-dark transition-colors hover:bg-gray-100">
          Choose Your Colour
        </Link>
      </div>

      {/* Right — Image */}
      <div className="relative min-h-[300px] md:min-h-[400px]">
        <Image
          src="https://indicus.in/wp-content/uploads/2024/02/indicus-your-dream-home.webp"
          alt="Dream home with Indicus colours"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
