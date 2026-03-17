import type { Metadata } from "next";
import { getPosts, getCategories } from "@/lib/queries/posts";
import BlogArchive from "@/components/blog/BlogArchive";

export const metadata: Metadata = {
  title: "Inspirations",
  description: "Get inspired with painting tips, trends, and ideas from Indicus Paints.",
};

export default async function InspirationsPage() {
  const [postsData, categories] = await Promise.all([
    getPosts(6),
    getCategories(),
  ]);

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold">Inspirations</h1>
          <p className="mt-3 max-w-xl text-gray-300">
            Tips, trends, and ideas to transform your spaces.
          </p>
        </div>
      </section>

      <BlogArchive
        initialPosts={postsData.nodes}
        initialHasMore={postsData.pageInfo.hasNextPage}
        initialEndCursor={postsData.pageInfo.endCursor}
        categories={categories}
      />
    </>
  );
}
