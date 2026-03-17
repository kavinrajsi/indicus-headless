import { fetchGraphQL } from "../wordpress";
import type { Product, Color } from "@/types/wordpress";

const SEARCH_PRODUCTS = `
  query SearchProducts($search: String!) {
    allProduct(first: 5, where: { search: $search, status: PUBLISH }) {
      nodes {
        id
        title
        slug
        featuredImage {
          node { sourceUrl altText }
        }
      }
    }
  }
`;

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export async function searchAll(search: string) {
  // Search products via GraphQL
  let products: Product[] = [];
  try {
    const data = await fetchGraphQL<{
      allProduct: { nodes: Product[] };
    }>(SEARCH_PRODUCTS, { search }, { revalidate: false });
    products = data.allProduct.nodes;
  } catch {
    // silent fail
  }

  // Search colours via REST API (since color CPT may not be in GraphQL yet)
  let colors: Color[] = [];
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/color?search=${encodeURIComponent(search)}&per_page=10&_fields=id,title,slug,meta`
    );
    if (res.ok) {
      const posts = await res.json();
      colors = posts.map((p: Record<string, unknown>) => ({
        id: String(p.id),
        title: (p.title as Record<string, string>)?.rendered || "",
        slug: p.slug as string,
        colorFields: {
          colorCode: ((p.meta as Record<string, string>)?.color_code) || "",
        },
      }));
    }
  } catch {
    // silent fail
  }

  return { products, colors };
}
