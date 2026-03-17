import Image from "next/image";
import Link from "next/link";

const SURFACES = [
  { name: "Walls", slug: "walls", img: "https://indicus.in/wp-content/uploads/2024/02/walls.webp" },
  { name: "Metals", slug: "metals", img: "https://indicus.in/wp-content/uploads/2024/02/metals.webp" },
  { name: "Woods", slug: "woods", img: "https://indicus.in/wp-content/uploads/2024/02/woods.webp" },
  { name: "Terraces", slug: "terraces", img: "https://indicus.in/wp-content/uploads/2024/02/terraces.webp" },
];

export default function DiscoverProducts() {
  return (
    <section className="bg-purple py-14 text-white">
      <div className="mx-auto max-w-5xl px-4 text-center lg:px-8">
        <h2 className="section-heading">Discover Our Products</h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/80">
          With our range of high-performance products, we have something for
          every need and application. Whether you&apos;re looking to paint a
          wall with stunning colours or make your ceilings bright or give your
          metal gate a glossy finish, we&apos;ve got it all covered.
        </p>
        <Link href="/products" className="btn-teal mt-6 inline-flex">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          SEE ALL PRODUCTS
        </Link>

        {/* Surface Icons */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SURFACES.map((s) => (
            <Link
              key={s.slug}
              href={`/products?surface=${s.slug}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white/10 transition-transform group-hover:scale-110">
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <span className="text-sm font-medium">{s.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
