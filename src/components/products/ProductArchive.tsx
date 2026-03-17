"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, TaxonomyNode } from "@/types/wordpress";

interface Taxonomies {
  applicationAreas: { nodes: TaxonomyNode[] };
  productTypes: { nodes: TaxonomyNode[] };
  applicationSurfaces: { nodes: TaxonomyNode[] };
  finishes: { nodes: TaxonomyNode[] };
}

const FILTER_GROUPS = [
  { key: "applicationAreas" as const, label: "Application Area", productField: "applicationArea" },
  { key: "productTypes" as const, label: "Product Type", productField: "productType" },
  { key: "applicationSurfaces" as const, label: "Application Surface", productField: "applicationSurface" },
  { key: "finishes" as const, label: "Finish", productField: "finish" },
];

export default function ProductArchive({
  products,
  taxonomies,
}: {
  products: Product[];
  taxonomies: Taxonomies;
}) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      return FILTER_GROUPS.every(({ key, productField }) => {
        const selected = filters[key];
        if (!selected) return true;
        const productTerms =
          product[productField as keyof Product] as { nodes: TaxonomyNode[] } | undefined;
        return productTerms?.nodes?.some((t) => t.slug === selected);
      });
    });
  }, [products, filters]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap items-center gap-3 border-b pb-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-purple hover:text-purple lg:hidden"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {activeCount > 0 && `(${activeCount})`}
          </button>

          <div className={`w-full flex-wrap gap-2 lg:flex ${filtersOpen ? "flex" : "hidden"}`}>
            {FILTER_GROUPS.map(({ key, label }) => {
              const terms = taxonomies[key]?.nodes ?? [];
              if (!terms.length) return null;
              return (
                <select
                  key={key}
                  value={filters[key] || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-purple focus:outline-none"
                >
                  <option value="">{label}</option>
                  {terms.map((t) => (
                    <option key={t.slug} value={t.slug}>{t.name}</option>
                  ))}
                </select>
              );
            })}
            {activeCount > 0 && (
              <button
                onClick={() => setFilters({})}
                className="text-sm text-purple hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Product Grid — 3 columns matching indicus.in */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-center bg-gray-50 px-6 py-8">
                {product.featuredImage && (
                  <Image
                    src={product.featuredImage.node.sourceUrl}
                    alt={product.featuredImage.node.altText || product.title}
                    width={200}
                    height={200}
                    className="h-44 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-5">
                <h4 className="text-lg font-bold uppercase text-gray-900">
                  {product.title}
                </h4>
                {product.productFields?.subHeading && (
                  <p className="mt-0.5 text-sm text-gray-500">
                    {product.productFields.subHeading}
                  </p>
                )}
                {product.productFields?.features &&
                  product.productFields.features.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {product.productFields.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-purple" />
                          {f.feature}
                        </li>
                      ))}
                    </ul>
                  )}
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-4 inline-block text-xs font-bold uppercase tracking-wide text-purple transition-colors hover:text-purple-dark"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            No products match the selected filters.
          </div>
        )}
      </div>
    </section>
  );
}
