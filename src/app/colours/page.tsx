import type { Metadata } from "next";
import { getColours, getColourCategories, getColourTaxonomies } from "@/lib/queries/colours";
import ColourPalette from "@/components/colours/ColourPalette";

export const metadata: Metadata = {
  title: "Colours",
  description:
    "Explore our complete colour palette — find the perfect shade for your space.",
};

export default async function ColoursPage() {
  const [colours, categories, taxonomies] = await Promise.all([
    getColours(),
    getColourCategories(),
    getColourTaxonomies(),
  ]);

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold">Colours</h1>
          <p className="mt-3 max-w-xl text-gray-300">
            Discover the perfect colour for every room and surface.
          </p>
        </div>
      </section>

      <ColourPalette
        colours={colours}
        categories={categories}
        taxonomies={taxonomies}
      />
    </>
  );
}
