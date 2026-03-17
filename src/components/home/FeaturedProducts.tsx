import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/wordpress";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="section-heading">Unique All Around</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500">
          Explore our unique products and their outstanding performance that
          will give your home a magical experience
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl bg-purple-light"
            >
              {/* Product Image */}
              <div className="flex items-center justify-center px-6 pt-8">
                {product.featuredImage && (
                  <Image
                    src={product.featuredImage.node.sourceUrl}
                    alt={product.featuredImage.node.altText || product.title}
                    width={200}
                    height={200}
                    className="h-44 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                )}
              </div>

              {/* Info */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold uppercase">{product.title}</h3>
                {product.productFields?.subHeading && (
                  <p className="mt-1 text-xs text-gray-500">
                    {product.productFields.subHeading}
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="px-5 pb-5 text-center">
                <Link
                  href={`/products/${product.slug}`}
                  className="btn-purple text-xs uppercase"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/products" className="btn-outline-purple text-xs uppercase">
            See all products
          </Link>
        </div>
      </div>
    </section>
  );
}
