import { fetchGraphQL } from "../wordpress";
import type { Color, ColourCategory, TaxonomyNode } from "@/types/wordpress";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

// ─── Get All Colours via REST API ─────────────────────
// The "color" CPT needs the mu-plugin to be registered in GraphQL.
// Until then, we use REST API. After installing the mu-plugin,
// switch to the GraphQL queries below.
export async function getColours(): Promise<Color[]> {
  try {
    // Try GraphQL first (works after mu-plugin is installed)
    const data = await fetchGraphQL<{
      colours: { nodes: Color[] };
    }>(
      `query { colours(first: 500, where: { status: PUBLISH }) { nodes { id databaseId title slug colorCode colourCategories { nodes { name slug } } temperatures { nodes { name slug } } tonalities { nodes { name slug } } } } }`,
      {},
      { tags: ["colours"] }
    );
    return data.colours.nodes;
  } catch {
    // Fallback to REST API
    return getColoursREST();
  }
}

async function getColoursREST(): Promise<Color[]> {
  try {
    const allColors: Color[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await fetch(
        `${WP_URL}/wp-json/wp/v2/color?per_page=100&page=${page}&_fields=id,title,slug,meta,colour-category,temperature,tonality`,
        { next: { revalidate: 3600, tags: ["colours"] } }
      );

      if (!res.ok) break;

      const posts = await res.json();
      if (!posts.length) break;

      for (const p of posts) {
        allColors.push({
          id: String(p.id),
          databaseId: p.id,
          title: p.title?.rendered || "",
          slug: p.slug,
          colorFields: {
            colorCode: p.meta?.color_code || "",
          },
          colourCategories: { nodes: [] },
          temperatures: { nodes: [] },
          tonalities: { nodes: [] },
        });
      }

      const total = parseInt(res.headers.get("X-WP-TotalPages") || "1");
      hasMore = page < total;
      page++;
    }

    return allColors;
  } catch (e) {
    console.error("Failed to fetch colours from REST:", e);
    return [];
  }
}

// ─── Get Colour Categories ────────────────────────────
const GET_COLOUR_CATEGORIES = `
  query GetColourCategories {
    colourCategories(first: 100) {
      nodes {
        name
        slug
        termTaxonomyId
        count
        coloursCategoryFields {
          categoryColour
        }
      }
    }
  }
`;

export async function getColourCategories(): Promise<ColourCategory[]> {
  try {
    const data = await fetchGraphQL<{
      colourCategories: {
        nodes: (TaxonomyNode & {
          coloursCategoryFields?: { categoryColour?: string };
        })[];
      };
    }>(GET_COLOUR_CATEGORIES, {}, { tags: ["colour-categories"] });

    // Transform hex string to the ColourCategory format
    return data.colourCategories.nodes.map((cat) => ({
      ...cat,
      colourCategoryFields: {
        categoryColourHex: cat.coloursCategoryFields?.categoryColour || "",
      },
    }));
  } catch (e) {
    console.error("Failed to fetch colour categories:", e);
    return [];
  }
}

// ─── Get Colour Filter Taxonomies ─────────────────────
const GET_COLOUR_TAXONOMIES = `
  query GetColourTaxonomies {
    allTemperature(first: 100) {
      nodes { name slug count }
    }
    allTonality(first: 100) {
      nodes { name slug count }
    }
  }
`;

export async function getColourTaxonomies() {
  try {
    const data = await fetchGraphQL<{
      allTemperature: { nodes: TaxonomyNode[] };
      allTonality: { nodes: TaxonomyNode[] };
    }>(GET_COLOUR_TAXONOMIES, {}, { tags: ["colour-taxonomies"] });
    return {
      temperatures: data.allTemperature,
      tonalities: data.allTonality,
    };
  } catch (e) {
    console.error("Failed to fetch colour taxonomies:", e);
    return {
      temperatures: { nodes: [] as TaxonomyNode[] },
      tonalities: { nodes: [] as TaxonomyNode[] },
    };
  }
}

// ─── Get Colours by Category ──────────────────────────
export async function getColoursByCategory(categorySlug: string): Promise<Color[]> {
  // Get all colours and filter client-side until GraphQL is fully set up
  const all = await getColours();
  if (!categorySlug) return all;
  return all.filter((c) =>
    c.colourCategories?.nodes?.some((cat) => cat.slug === categorySlug)
  );
}

// ─── Get Category Slugs (for static generation) ──────
export async function getColourCategorySlugs(): Promise<string[]> {
  const categories = await getColourCategories();
  return categories.map((c) => c.slug);
}
