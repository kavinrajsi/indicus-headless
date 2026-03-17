import { fetchGraphQL } from "../wordpress";

export interface WPPage {
  title: string;
  slug: string;
  content: string;
  featuredImage?: {
    node: { sourceUrl: string; altText: string };
  };
}

const GET_PAGE_BY_SLUG = `
  query GetPage($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      slug
      content
      featuredImage {
        node { sourceUrl altText }
      }
    }
  }
`;

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const data = await fetchGraphQL<{ page: WPPage }>(
      GET_PAGE_BY_SLUG,
      { slug },
      { tags: ["pages", `page-${slug}`], revalidate: 3600 }
    );
    return data.page;
  } catch (e) {
    console.error(`Failed to fetch page ${slug}:`, e);
    return null;
  }
}

// Fetch page ACF fields via REST API
const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export async function getPageACF(slug: string) {
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/pages?slug=${slug}&_fields=acf`,
      { next: { revalidate: 3600, tags: [`page-${slug}`] } }
    );
    if (!res.ok) return null;
    const pages = await res.json();
    return pages[0]?.acf ?? null;
  } catch {
    return null;
  }
}
