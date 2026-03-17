import type { Metadata } from "next";
import { getProducts } from "@/lib/queries/products";
import WarrantyActivationForm from "@/components/ui/WarrantyActivationForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Warranty Guide",
  description:
    "Download warranty guides and activate your product warranty for Indicus Paints products.",
};

const WARRANTY_PRODUCTS = [
  { name: "Forto", warranty: "8 years performance warranty" },
  { name: "Resilio", warranty: "5 years performance warranty" },
  { name: "Calibre", warranty: "3 years performance warranty" },
  { name: "Neotė", warranty: "8 years performance warranty" },
  { name: "Admyra", warranty: "5 years performance warranty" },
  { name: "Draper", warranty: "3 years performance warranty" },
  { name: "Heatseal", warranty: "4 years waterproofing warranty" },
  { name: "Heatseal Advanced", warranty: "8 years performance warranty" },
  { name: "Godry Aquaseal", warranty: "5 years performance warranty" },
];

export default async function WarrantyPage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold">Warranty Guide</h1>
          <p className="mt-3 text-gray-300">
            Download product warranty guides and activate your warranty
          </p>
        </div>
      </section>

      {/* Warranty Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WARRANTY_PRODUCTS.map((wp) => {
              const product = products.find(
                (p) =>
                  p.title.toLowerCase() === wp.name.toLowerCase() ||
                  p.title.toLowerCase().includes(wp.name.toLowerCase())
              );

              return (
                <div
                  key={wp.name}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 p-6 shadow-sm"
                >
                  {product?.featuredImage && (
                    <Image
                      src={product.featuredImage.node.sourceUrl}
                      alt={wp.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 shrink-0 object-contain"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{wp.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{wp.warranty}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Activate Warranty Form */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-2xl px-4 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">Activate Your Warranty</h2>
            <WarrantyActivationForm
              productNames={WARRANTY_PRODUCTS.map((p) => p.name)}
            />
          </div>
        </div>
      </section>
    </>
  );
}
