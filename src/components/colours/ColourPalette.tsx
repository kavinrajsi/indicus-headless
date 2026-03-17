"use client";

import { useState, useMemo } from "react";
import type { Color, ColourCategory, TaxonomyNode } from "@/types/wordpress";

interface Props {
  colours: Color[];
  categories: ColourCategory[];
  taxonomies: {
    temperatures: { nodes: TaxonomyNode[] };
    tonalities: { nodes: TaxonomyNode[] };
  };
}

export default function ColourPalette({ colours, categories, taxonomies }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTemp, setSelectedTemp] = useState<string>("");
  const [selectedTonality, setSelectedTonality] = useState<string>("");

  const filtered = useMemo(() => {
    return colours.filter((c) => {
      if (selectedCategory && !c.colourCategories?.nodes?.some((cat) => cat.slug === selectedCategory)) {
        return false;
      }
      if (selectedTemp && !c.temperatures?.nodes?.some((t) => t.slug === selectedTemp)) {
        return false;
      }
      if (selectedTonality && !c.tonalities?.nodes?.some((t) => t.slug === selectedTonality)) {
        return false;
      }
      return true;
    });
  }, [colours, selectedCategory, selectedTemp, selectedTonality]);

  const hasActiveFilters = selectedCategory || selectedTemp || selectedTonality;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Category Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedTemp("");
                setSelectedTonality("");
              }}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                !selectedCategory
                  ? "border-teal bg-teal text-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              All Colours
            </button>
            {categories.map((cat) => {
              const bgColor = cat.colourCategoryFields?.categoryColourHex || "#ccc";

              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(
                    selectedCategory === cat.slug ? "" : cat.slug
                  )}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                    selectedCategory === cat.slug
                      ? "border-teal bg-teal text-white"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <span
                    className="inline-block h-4 w-4 rounded-full border border-black/10"
                    style={{ backgroundColor: bgColor }}
                  />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          {/* Temperature */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">
              Temperature
            </label>
            <select
              value={selectedTemp}
              onChange={(e) => setSelectedTemp(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
            >
              <option value="">All</option>
              {taxonomies.temperatures.nodes.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tonality */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">
              Tonality
            </label>
            <select
              value={selectedTonality}
              onChange={(e) => setSelectedTonality(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
            >
              <option value="">All</option>
              {taxonomies.tonalities.nodes.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedTemp("");
                setSelectedTonality("");
              }}
              className="self-end text-sm text-teal hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <p className="mb-4 text-sm text-gray-500">
          {filtered.length} colour{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Colour Grid */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10">
          {filtered.map((colour) => (
            <div
              key={colour.id}
              className="group cursor-pointer"
              title={colour.title}
            >
              <div
                className="aspect-square rounded-lg border border-black/5 transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: colour.colorFields?.colorCode || "#ccc",
                }}
              />
              <p className="mt-1.5 truncate text-center text-[10px] leading-tight text-gray-600">
                {colour.title}
              </p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            No colours match the selected filters.
          </div>
        )}
      </div>
    </section>
  );
}
