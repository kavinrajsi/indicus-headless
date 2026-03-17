import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/wordpress";

const BG_CLASSES = ["bg-sky-50", "bg-pink-50", "bg-amber-50"];

export default function InspirationSection({ posts }: { posts: Post[] }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="section-heading">Inspiration &amp; Ideas</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500">
          You will find inspiring colour stories, our experts&apos; tips, colour
          inspirations, and lot more all at one place.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.slice(0, 8).map((post, i) => {
            const category =
              post.categories?.nodes?.find(
                (c) => c.name !== "All" && c.name !== "Uncategorized"
              )?.name ?? "";
            const bgClass = BG_CLASSES[i % BG_CLASSES.length];

            return (
              <Link
                key={post.id}
                href={`/inspirations/${post.slug}`}
                className="group overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-lg"
              >
                {post.featuredImage && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                )}
                <div className={`p-4 ${bgClass}`}>
                  {category && (
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                      {category}
                    </p>
                  )}
                  <h5 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900">
                    {post.title}
                  </h5>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
