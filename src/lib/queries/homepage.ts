import { fetchGraphQL } from "../wordpress";
import type { HomepageSlide, HomeVideoItem, Post, Product } from "@/types/wordpress";

// ─── Get Homepage Data ────────────────────────────────
// NOTE: Homepage ACF fields need "Show in GraphQL" enabled in WordPress.
// Until then, this fetches via REST API as fallback.
const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export interface HomepageData {
  sliderRepeater: HomepageSlide[];
  inspirationSliderShow: string;
  videoItems: HomeVideoItem[];
}

export async function getHomepage(): Promise<HomepageData | null> {
  try {
    // Try REST API for homepage ACF fields
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/pages?slug=home&_fields=acf`,
      { next: { revalidate: 3600, tags: ["homepage"] } }
    );

    if (!res.ok) return null;

    const pages = await res.json();
    const acf = pages[0]?.acf;

    if (!acf) return null;

    return {
      sliderRepeater: (acf.slider_repeater || []).map((s: Record<string, unknown>) => ({
        sliderImage: {
          sourceUrl: (s.slider_image as Record<string, string>)?.url || "",
          altText: (s.slider_image as Record<string, string>)?.alt || "",
        },
        mobileImage: {
          sourceUrl: (s.mobile_image as Record<string, string>)?.url || "",
          altText: (s.mobile_image as Record<string, string>)?.alt || "",
        },
        sliderTitle: (s.slider_title as string) || "",
        sliderButtonLink: (s.slider_button_link as string) || "",
      })),
      inspirationSliderShow: acf.inspiration_slider_show || "latest",
      videoItems: (acf.video_items || []).map((v: Record<string, string>) => ({
        homePageStoriesVideoId: v.home_page_stories_video_id || "",
      })),
    };
  } catch (e) {
    console.error("Failed to fetch homepage:", e);
    return null;
  }
}

// ─── Get Latest Inspiration Posts ─────────────────────
const GET_LATEST_POSTS = `
  query GetLatestPosts($first: Int = 8) {
    posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes { name slug }
        }
        tags {
          nodes { name slug }
        }
      }
    }
  }
`;

export async function getLatestPosts(first = 8): Promise<Post[]> {
  try {
    const data = await fetchGraphQL<{
      posts: { nodes: Post[] };
    }>(GET_LATEST_POSTS, { first }, { tags: ["posts"] });
    return data.posts.nodes;
  } catch (e) {
    console.error("Failed to fetch latest posts:", e);
    return [];
  }
}

// ─── Get Featured Products ────────────────────────────
const GET_FEATURED_PRODUCTS = `
  query GetFeaturedProducts($first: Int = 8) {
    allProduct(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        databaseId
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export async function getFeaturedProducts(first = 8): Promise<Product[]> {
  try {
    const data = await fetchGraphQL<{
      allProduct: { nodes: Product[] };
    }>(GET_FEATURED_PRODUCTS, { first }, { tags: ["products"] });
    return data.allProduct.nodes;
  } catch (e) {
    console.error("Failed to fetch featured products:", e);
    return [];
  }
}
