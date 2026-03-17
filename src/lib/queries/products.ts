import { fetchGraphQL } from "../wordpress";
import type { Product, TaxonomyNode } from "@/types/wordpress";

// ─── Get All Products ─────────────────────────────────
const GET_PRODUCTS = `
  query GetProducts($first: Int = 100, $after: String) {
    allProduct(first: $first, after: $after, where: { status: PUBLISH }) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        productType {
          nodes { name slug }
        }
        applicationArea {
          nodes { name slug }
        }
        applicationSurface {
          nodes { name slug }
        }
        finish {
          nodes { name slug }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fetchGraphQL<{
      allProduct: { nodes: Product[] };
    }>(GET_PRODUCTS, {}, { tags: ["products"] });
    return data.allProduct.nodes;
  } catch (e) {
    console.error("Failed to fetch products:", e);
    return [];
  }
}

// ─── Get Single Product ───────────────────────────────
const GET_PRODUCT_BY_SLUG = `
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      content
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails { width height }
        }
      }
      productType {
        nodes { name slug }
      }
      applicationArea {
        nodes { name slug }
      }
      applicationSurface {
        nodes { name slug }
      }
      finish {
        nodes { name slug }
      }
    }
  }
`;

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await fetchGraphQL<{
      product: Product;
    }>(GET_PRODUCT_BY_SLUG, { slug }, { tags: ["products", `product-${slug}`] });
    return data.product;
  } catch (e) {
    console.error(`Failed to fetch product ${slug}:`, e);
    return null;
  }
}

// ─── Get Product ACF Fields via REST API ──────────────
// Until ACF fields are exposed in GraphQL, we use REST API as fallback
const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export async function getProductACFFields(slug: string) {
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/product?slug=${slug}&_fields=acf`,
      { next: { revalidate: 3600, tags: [`product-${slug}`] } }
    );
    if (!res.ok) return null;
    const posts = await res.json();
    return posts[0]?.acf ?? null;
  } catch {
    return null;
  }
}

// ─── Get Product Slugs (for static generation) ───────
const GET_PRODUCT_SLUGS = `
  query GetProductSlugs {
    allProduct(first: 100, where: { status: PUBLISH }) {
      nodes { slug }
    }
  }
`;

export async function getProductSlugs(): Promise<string[]> {
  try {
    const data = await fetchGraphQL<{
      allProduct: { nodes: { slug: string }[] };
    }>(GET_PRODUCT_SLUGS);
    return data.allProduct.nodes.map((p) => p.slug);
  } catch (e) {
    console.error("Failed to fetch product slugs:", e);
    return [];
  }
}

// ─── Get Product Filter Taxonomies ────────────────────
const GET_PRODUCT_TAXONOMIES = `
  query GetProductTaxonomies {
    allApplicationArea(first: 100) {
      nodes { name slug count }
    }
    allProductType(first: 100) {
      nodes { name slug count }
    }
    allApplicationSurface(first: 100) {
      nodes { name slug count }
    }
    allFinish(first: 100) {
      nodes { name slug count }
    }
  }
`;

export async function getProductTaxonomies() {
  try {
    const data = await fetchGraphQL<{
      allApplicationArea: { nodes: TaxonomyNode[] };
      allProductType: { nodes: TaxonomyNode[] };
      allApplicationSurface: { nodes: TaxonomyNode[] };
      allFinish: { nodes: TaxonomyNode[] };
    }>(GET_PRODUCT_TAXONOMIES, {}, { tags: ["taxonomies"] });
    return {
      applicationAreas: data.allApplicationArea,
      productTypes: data.allProductType,
      applicationSurfaces: data.allApplicationSurface,
      finishes: data.allFinish,
    };
  } catch (e) {
    console.error("Failed to fetch taxonomies:", e);
    return {
      applicationAreas: { nodes: [] as TaxonomyNode[] },
      productTypes: { nodes: [] as TaxonomyNode[] },
      applicationSurfaces: { nodes: [] as TaxonomyNode[] },
      finishes: { nodes: [] as TaxonomyNode[] },
    };
  }
}
