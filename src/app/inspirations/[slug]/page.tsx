import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/queries/posts";
import { sanitizeHTML, stripHTML } from "@/lib/sanitize";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: stripHTML(post.excerpt ?? "").slice(0, 160),
    openGraph: {
      title: post.title,
      type: "article",
      publishedTime: post.date,
      images: post.featuredImage
        ? [{ url: post.featuredImage.node.sourceUrl }]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const category =
    post.categories?.nodes?.find(
      (c) => c.name !== "All" && c.name !== "Uncategorized"
    )?.name ?? "";

  return (
    <article className="pb-16">
      {/* Hero */}
      {post.featuredImage && (
        <div className="relative h-64 md:h-96">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <div className={post.featuredImage ? "-mt-20 relative" : "pt-8"}>
          {category && (
            <span className="mb-3 inline-block rounded-full bg-teal px-3 py-1 text-xs font-medium text-white">
              {category}
            </span>
          )}
          <h1 className={`text-3xl font-bold md:text-4xl ${post.featuredImage ? "text-white" : ""}`}>
            {post.title}
          </h1>
          <time className={`mt-2 block text-sm ${post.featuredImage ? "text-white/70" : "text-gray-500"}`}>
            {new Date(post.date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        {/* Content */}
        <div
          className="wp-content prose mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.content) }}
        />

        {/* Tags */}
        {post.tags?.nodes && post.tags.nodes.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.nodes.map((tag) => (
              <span
                key={tag.slug}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10">
          <Link
            href="/inspirations"
            className="text-sm text-teal hover:underline"
          >
            &larr; Back to all inspirations
          </Link>
        </div>
      </div>
    </article>
  );
}
