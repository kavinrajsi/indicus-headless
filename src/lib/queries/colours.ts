import { fetchGraphQL } from "../wordpress";
import type { Color, ColourCategory, TaxonomyNode } from "@/types/wordpress";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

// ─── Get All Colours via REST API ─────────────────────
// The "color" CPT needs the mu-plugin to be registered in GraphQL.
// Until then, we use REST API + AJAX fallback for color values.
// After installing the mu-plugin, the GraphQL path will work.
export async function getColours(): Promise<Color[]> {
  try {
    // Try GraphQL first (works after mu-plugin is installed)
    const data = await fetchGraphQL<{
      colours: { nodes: (Omit<Color, "colorFields"> & { colorCode?: string })[] };
    }>(
      `query { colours(first: 500, where: { status: PUBLISH }) { nodes { id databaseId title slug colorCode colourCategories { nodes { name slug } } temperatures { nodes { name slug } } tonalities { nodes { name slug } } } } }`,
      {},
      { tags: ["colours"] }
    );
    // GraphQL returns colorCode as top-level field, nest it under colorFields
    return data.colours.nodes.map((c) => ({
      ...c,
      colorFields: { colorCode: c.colorCode || "" },
    }));
  } catch {
    // Fallback to REST API + AJAX for color values
    return getColoursREST();
  }
}

// ─── Fetch colour RGB values from WP AJAX endpoint ───
// The REST API doesn't expose color_code meta. The WP theme's
// AJAX handler renders HTML with inline rgb() styles, so we
// parse that to build a name→hex lookup.
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")
  );
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

async function fetchColourRGBMap(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  try {
    const res = await fetch(`${WP_URL}/wp-admin/admin-ajax.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "action=indicus_color_filter",
      next: { revalidate: 3600, tags: ["colours"] },
    });
    if (!res.ok) return map;

    const html = await res.text();
    // Match each <li> block: extract rgb values and color name
    // Using [\s\S] instead of . with /s flag for ES2017 compat
    const itemRegex =
      /background-color:\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)[\s\S]*?<span class="color-name">(.*?)<\/span>/g;
    let match;
    while ((match = itemRegex.exec(html)) !== null) {
      const hex = rgbToHex(+match[1], +match[2], +match[3]);
      const name = decodeHtmlEntities(match[4]).trim();
      map.set(name.toLowerCase(), hex);
    }
  } catch (e) {
    console.error("Failed to fetch colour RGB from AJAX:", e);
  }
  return map;
}

// Fetch all terms for a WP taxonomy, keyed by term ID
async function fetchTaxonomyTerms(
  taxonomy: string
): Promise<Map<number, TaxonomyNode>> {
  const map = new Map<number, TaxonomyNode>();
  try {
    let page = 1;
    let hasMore = true;
    while (hasMore) {
      const res = await fetch(
        `${WP_URL}/wp-json/wp/v2/${taxonomy}?per_page=100&page=${page}&_fields=id,name,slug`,
        { next: { revalidate: 3600, tags: ["colours"] } }
      );
      if (!res.ok) break;
      const terms = await res.json();
      if (!terms.length) break;
      for (const t of terms) {
        map.set(t.id, { name: t.name, slug: t.slug });
      }
      const total = parseInt(res.headers.get("X-WP-TotalPages") || "1");
      hasMore = page < total;
      page++;
    }
  } catch (e) {
    console.error(`Failed to fetch taxonomy "${taxonomy}":`, e);
  }
  return map;
}

async function getColoursREST(): Promise<Color[]> {
  try {
    // Fetch taxonomy terms + color RGB values in parallel
    const [categoryTerms, temperatureTerms, tonalityTerms, rgbMap] =
      await Promise.all([
        fetchTaxonomyTerms("colour-category"),
        fetchTaxonomyTerms("temperature"),
        fetchTaxonomyTerms("tonality"),
        fetchColourRGBMap(),
      ]);

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
        const catIds: number[] = p["colour-category"] || [];
        const tempIds: number[] = p["temperature"] || [];
        const tonIds: number[] = p["tonality"] || [];
        const title = decodeHtmlEntities(p.title?.rendered || "");
        const hex = rgbMap.get(title.toLowerCase()) || "";

        allColors.push({
          id: String(p.id),
          databaseId: p.id,
          title,
          slug: p.slug,
          colorFields: {
            colorCode: hex,
          },
          colourCategories: {
            nodes: catIds
              .map((id) => categoryTerms.get(id))
              .filter((t): t is TaxonomyNode => !!t),
          },
          temperatures: {
            nodes: tempIds
              .map((id) => temperatureTerms.get(id))
              .filter((t): t is TaxonomyNode => !!t),
          },
          tonalities: {
            nodes: tonIds
              .map((id) => tonalityTerms.get(id))
              .filter((t): t is TaxonomyNode => !!t),
          },
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
