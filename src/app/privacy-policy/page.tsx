import type { Metadata } from "next";
import { getPageBySlug } from "@/lib/queries/pages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Indicus Paints website.",
};

export default async function PrivacyPage() {
  const page = await getPageBySlug("privacy-policy");

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-4 lg:px-8">
          {page?.content ? (
            <div
              className="wp-content prose max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <p className="text-gray-500">Content loading...</p>
          )}
        </div>
      </section>
    </>
  );
}
