"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post, TaxonomyNode } from "@/types/wordpress";

interface Props {
  initialPosts: Post[];
  initialHasMore: boolean;
  initialEndCursor: string;
  categories: TaxonomyNode[];
}

export default function BlogArchive({
  initialPosts,
  initialHasMore,
  initialEndCursor,
  categories,
}: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [endCursor, setEndCursor] = useState(initialEndCursor);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const loadMore = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/posts?after=${endCursor}&first=6${activeCategory ? `&category=${activeCategory}` : ""}`
      );
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.nodes]);
      setHasMore(data.pageInfo.hasNextPage);
      setEndCursor(data.pageInfo.endCursor);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (slug: string) => {
    setActiveCategory(slug);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/posts?first=6${slug ? `&category=${slug}` : ""}`
      );
      const data = await res.json();
      setPosts(data.nodes);
      setHasMore(data.pageInfo.hasNextPage);
      setEndCursor(data.pageInfo.endCursor);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => filterByCategory("")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !activeCategory
                ? "bg-teal text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories
            .filter((c) => c.name !== "All" && c.name !== "Uncategorized")
            .map((cat) => (
              <button
                key={cat.slug}
                onClick={() => filterByCategory(cat.slug)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-teal text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const category =
              post.categories?.nodes?.find(
                (c) => c.name !== "All" && c.name !== "Uncategorized"
              )?.name ?? "";

            return (
              <Link
                key={post.id}
                href={`/inspirations/${post.slug}`}
                className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                {post.featuredImage && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  {category && (
                    <span className="mb-2 inline-block text-xs font-medium uppercase text-teal">
                      {category}
                    </span>
                  )}
                  <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <div
                      className="mt-2 line-clamp-2 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  )}
                  <time className="mt-3 block text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            );
          })}
        </div>

        {posts.length === 0 && !loading && (
          <div className="py-16 text-center text-gray-400">
            No posts found.
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="rounded-full border-2 border-teal px-8 py-3 font-medium text-teal transition-colors hover:bg-teal hover:text-white disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
