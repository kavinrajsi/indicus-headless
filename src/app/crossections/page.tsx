import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crossections",
  description:
    "A platform where creativity, design and heritage come together. Exploring timeless craftsmanship, cultural narratives and artistic expressions through a modern outlook.",
};

export default function CrossectionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="text-5xl font-black uppercase tracking-wider md:text-7xl">
            Crossections
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            A platform where creativity, design and heritage come together.
            Exploring timeless craftsmanship, cultural narratives and artistic
            expressions through a modern outlook.
          </p>
        </div>
      </section>

      {/* Featured: Drishti Bommai */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <div className="text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-teal">
              Featured Film
            </span>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Drishti Bommai
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
              An exploration of the intersection of psychology, folklore, and
              art. This ancient Indian protective art tradition examines how a
              centuries-old tradition is vanishing as artists face unemployment
              and generational knowledge fades.
            </p>
          </div>

          {/* Video embed placeholder */}
          <div className="mt-10 aspect-video overflow-hidden rounded-2xl bg-gray-100">
            <div className="flex h-full items-center justify-center text-gray-400">
              <div className="text-center">
                <svg
                  className="mx-auto mb-3 h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Platform */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="mb-6 text-3xl font-bold">
            Where Culture Meets Colour
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Crossections by Indicus is a multimedia editorial platform that
            explores the rich intersection of Indian cultural heritage and
            modern artistic expression. Through documentary film, visual art,
            and storytelling, we connect the timeless traditions of our land
            with the colours that bring them to life.
          </p>
        </div>
      </section>
    </>
  );
}
