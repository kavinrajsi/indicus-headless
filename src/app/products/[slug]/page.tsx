import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProductSlugs, getProductACFFields } from "@/lib/queries/products";
import { sanitizeHTML } from "@/lib/sanitize";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.title,
    description: `${product.title} — premium paint by Indicus Paints`,
    openGraph: {
      title: product.title,
      images: product.featuredImage
        ? [{ url: product.featuredImage.node.sourceUrl }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, acf] = await Promise.all([
    getProductBySlug(slug),
    getProductACFFields(slug),
  ]);

  if (!product) notFound();

  const subHeading = acf?.sub_heading || "";
  const bannerColor = acf?.banner_color || "#1a1a2e";
  const amazonUrl = acf?.amazon_url || "";
  const productDownload = acf?.product_download?.url || "";
  const shadeCard = acf?.shade_card?.url || "";
  const guide = acf?.guide?.url || "";
  const features: { feature: string }[] = acf?.features || [];
  const detailFeatures: { image: { url: string; alt: string }; title: string; description: string }[] =
    acf?.details_feature_icon_text || [];
  const imageWithDesc: { image: { url: string; alt: string } }[] =
    acf?.image_with_description || [];
  const info: string = acf?.info || "";

  return (
    <>
      {/* Hero */}
      <section className="py-16" style={{ backgroundColor: bannerColor }}>
        <div className="container mx-auto flex flex-col items-center gap-8 px-4 md:flex-row lg:px-8">
          {product.featuredImage && (
            <div className="relative h-64 w-64 shrink-0 md:h-80 md:w-80">
              <Image
                src={product.featuredImage.node.sourceUrl}
                alt={product.featuredImage.node.altText || product.title}
                fill
                priority
                className="object-contain"
                sizes="320px"
              />
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-white">{product.title}</h1>
            {subHeading && (
              <p className="mt-2 text-lg text-white/80">{subHeading}</p>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              {productDownload && (
                <a
                  href={productDownload}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
                >
                  Download Datasheet
                </a>
              )}
              {shadeCard && (
                <a
                  href={shadeCard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Shade Card
                </a>
              )}
              {amazonUrl && (
                <a
                  href={amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#FF9900] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#e68a00]"
                >
                  Buy on Amazon
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold">Features</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  <span className="text-sm text-gray-700">{f.feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Detail Features with Icons */}
      {detailFeatures.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {detailFeatures.map((item, i) => (
                <div key={i} className="flex gap-4">
                  {item.image?.url && (
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || item.title}
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 object-contain"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {imageWithDesc.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {imageWithDesc.map((item, i) => (
                <div key={i} className="overflow-hidden rounded-xl">
                  {item.image?.url && (
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || "Product image"}
                      width={600}
                      height={400}
                      className="w-full rounded-xl object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WordPress Content */}
      {product.content && (
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div
              className="wp-content prose max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(product.content) }}
            />
          </div>
        </section>
      )}

      {/* Additional Info */}
      {info && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div
              className="wp-content prose max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(info) }}
            />
          </div>
        </section>
      )}

      {/* Warranty Guide */}
      {guide && (
        <section className="py-12">
          <div className="container mx-auto px-4 text-center lg:px-8">
            <a
              href={guide}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-teal px-8 py-3 font-medium text-white transition-colors hover:bg-teal-dark"
            >
              Download Warranty Guide
            </a>
          </div>
        </section>
      )}

      {/* Back Link */}
      <div className="container mx-auto px-4 pb-12 lg:px-8">
        <Link href="/products" className="text-sm text-teal hover:underline">
          &larr; Back to all products
        </Link>
      </div>
    </>
  );
}
