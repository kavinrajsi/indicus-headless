import { fetchGraphQL } from "../wordpress";
import type { Post, TaxonomyNode } from "@/types/wordpress";

// ─── Get Posts (paginated) ────────────────────────────
const GET_POSTS = `
  query GetPosts($first: Int = 6, $after: String, $categorySlug: String) {
    posts(
      first: $first
      after: $after
      where: {
        status: PUBLISH
        categoryName: $categorySlug
      }
    ) {
      nodes {
        id
        databaseId
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        categories {
          nodes { name slug }
        }
        tags {
          nodes { name slug }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;

export async function getPosts(
  first = 6,
  after?: string,
  categorySlug?: string
) {
  const data = await fetchGraphQL<{
    posts: { nodes: Post[]; pageInfo: { hasNextPage: boolean; endCursor: string } };
  }>(
    GET_POSTS,
    { first, after, categorySlug },
    { tags: ["posts"] }
  );
  return data.posts;
}

// ─── Get Single Post ──────────────────────────────────
const GET_POST_BY_SLUG = `
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      date
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails { width height }
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
`;

export async function getPostBySlug(slug: string) {
  const data = await fetchGraphQL<{
    post: Post;
  }>(GET_POST_BY_SLUG, { slug }, { tags: ["posts", `post-${slug}`] });
  return data.post;
}

// ─── Get Post Slugs (for static generation) ──────────
const GET_POST_SLUGS = `
  query GetPostSlugs {
    posts(first: 100, where: { status: PUBLISH }) {
      nodes { slug }
    }
  }
`;

export async function getPostSlugs() {
  const data = await fetchGraphQL<{
    posts: { nodes: { slug: string }[] };
  }>(GET_POST_SLUGS);
  return data.posts.nodes.map((p) => p.slug);
}

// ─── Get Categories ───────────────────────────────────
const GET_CATEGORIES = `
  query GetCategories {
    categories(first: 100, where: { hideEmpty: true }) {
      nodes { name slug count }
    }
  }
`;

export async function getCategories() {
  const data = await fetchGraphQL<{
    categories: { nodes: TaxonomyNode[] };
  }>(GET_CATEGORIES, {}, { tags: ["categories"] });
  return data.categories.nodes;
}
