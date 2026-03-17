import type { Metadata } from "next";
import Image from "next/image";
import { getProducts, getProductTaxonomies } from "@/lib/queries/products";
import ProductArchive from "@/components/products/ProductArchive";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our complete range of premium paints and coatings — interior, exterior, enamel, waterproofing, and more.",
};

export default async function ProductsPage() {
  const [products, taxonomies] = await Promise.all([
    getProducts(),
    getProductTaxonomies(),
  ]);

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-800 to-red-900 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-white lg:px-8">
          <h1 className="text-3xl font-black uppercase md:text-4xl">
            Explore our wide range of products
          </h1>
          <h2 className="mt-2 text-lg font-medium text-white/70">
            From wall paints to waterproof coatings
          </h2>
        </div>
      </section>

      <ProductArchive products={products} taxonomies={taxonomies} />
    </>
  );
}
