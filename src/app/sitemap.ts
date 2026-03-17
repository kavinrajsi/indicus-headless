import type { MetadataRoute } from "next";
import { getProductSlugs } from "@/lib/queries/products";
import { getPostSlugs } from "@/lib/queries/posts";
import { getColourCategorySlugs } from "@/lib/queries/colours";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://indicus.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, postSlugs, categorySlugs] = await Promise.all([
    getProductSlugs(),
    getPostSlugs(),
    getColourCategorySlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/colours`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/inspirations`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/colourcraft`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/warranty`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/visualizer`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/calculator`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/crossections`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postPages: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${BASE_URL}/inspirations/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/colours/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...postPages, ...categoryPages];
}
