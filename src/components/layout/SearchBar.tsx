"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SearchResult {
  products: { id: string; title: string; slug: string; featuredImage?: { node: { sourceUrl: string; altText: string } }; productFields?: { subHeading?: string } }[];
  colors: { id: string; title: string; slug: string; colorFields?: { colorCode: string } }[];
}

export default function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch {
        setResults(null);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products & colours..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-gray-300 px-5 py-3 pr-12 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {loading && (
        <div className="mt-4 text-center text-sm text-gray-500">Searching...</div>
      )}

      {results && (
        <div className="mt-4 max-h-80 overflow-y-auto rounded-lg border bg-white shadow-lg">
          {results.products.length > 0 && (
            <div className="p-3">
              <h4 className="mb-2 text-xs font-semibold uppercase text-gray-400">Products</h4>
              {results.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-50"
                >
                  {product.featuredImage && (
                    <Image
                      src={product.featuredImage.node.sourceUrl}
                      alt={product.featuredImage.node.altText || product.title}
                      width={40}
                      height={40}
                      className="rounded object-cover"
                    />
                  )}
                  <div>
                    <div className="text-sm font-medium">{product.title}</div>
                    {product.productFields?.subHeading && (
                      <div className="text-xs text-gray-500">{product.productFields.subHeading}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {results.colors.length > 0 && (
            <div className="border-t p-3">
              <h4 className="mb-2 text-xs font-semibold uppercase text-gray-400">Colours</h4>
              <div className="grid grid-cols-2 gap-2">
                {results.colors.map((color) => (
                  <Link
                    key={color.id}
                    href={`/colours`}
                    onClick={onClose}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-50"
                  >
                    <span
                      className="inline-block h-6 w-6 rounded-full border"
                      style={{ backgroundColor: color.colorFields?.colorCode || "#ccc" }}
                    />
                    <span className="text-xs">{color.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.products.length === 0 && results.colors.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
