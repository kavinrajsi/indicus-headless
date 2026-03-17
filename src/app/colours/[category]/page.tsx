import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getColoursByCategory,
  getColourCategories,
  getColourTaxonomies,
  getColourCategorySlugs,
} from "@/lib/queries/colours";
import ColourPalette from "@/components/colours/ColourPalette";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const slugs = await getColourCategorySlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = await getColourCategories();
  const cat = categories.find((c) => c.slug === category);

  return {
    title: cat ? `${cat.name} Colours` : "Colours",
    description: cat
      ? `Explore ${cat.name} paint colours from Indicus Paints.`
      : "Explore our colour palette.",
  };
}

export default async function ColourCategoryPage({ params }: Props) {
  const { category } = await params;
  const [colours, categories, taxonomies] = await Promise.all([
    getColoursByCategory(category),
    getColourCategories(),
    getColourTaxonomies(),
  ]);

  const currentCategory = categories.find((c) => c.slug === category);
  if (!currentCategory) notFound();

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold">{currentCategory.name} Colours</h1>
          <p className="mt-3 text-gray-300">
            {colours.length} shades in {currentCategory.name}
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
