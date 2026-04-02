"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { solutions } from "@/data/solutions";

interface FilterDrawerProps {
  onFilter: (filters: {
    solution: string;
    priceRange: string;
    rating: string;
  }) => void;
  activeFilters: {
    solution: string;
    priceRange: string;
    rating: string;
  };
}

const priceRanges = [
  { label: "All Prices", value: "" },
  { label: "Under $50", value: "under-50" },
  { label: "$50 - $75", value: "50-75" },
  { label: "$75 - $100", value: "75-100" },
  { label: "$100+", value: "100-plus" },
];

const ratingOptions = [
  { label: "Any Rating", value: "" },
  { label: "4+ Stars", value: "4" },
  { label: "4.5+ Stars", value: "4.5" },
];

export default function FilterDrawer({
  onFilter,
  activeFilters,
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: string, value: string) => {
    onFilter({ ...activeFilters, [key]: value });
  };

  const clearFilters = () => {
    onFilter({ solution: "", priceRange: "", rating: "" });
  };

  const hasActive =
    activeFilters.solution || activeFilters.priceRange || activeFilters.rating;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-peach/50 bg-white px-4 py-2.5 text-sm text-espresso transition-colors hover:border-bronzed-gold"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {hasActive && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bronzed-gold text-xs text-white">
            !
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transform rounded-t-3xl bg-white p-6 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-xl text-espresso">Filters</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 hover:bg-sand"
          >
            <X className="h-5 w-5 text-espresso/50" />
          </button>
        </div>

        {/* Service Type */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-espresso">
            Service Type
          </label>
          <select
            value={activeFilters.solution}
            onChange={(e) => handleChange("solution", e.target.value)}
            className="w-full rounded-lg border border-peach/50 bg-sand px-3 py-2.5 text-sm text-espresso outline-none focus:border-bronzed-gold"
          >
            <option value="">All Services</option>
            {solutions.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-espresso">
            Price Range
          </label>
          <select
            value={activeFilters.priceRange}
            onChange={(e) => handleChange("priceRange", e.target.value)}
            className="w-full rounded-lg border border-peach/50 bg-sand px-3 py-2.5 text-sm text-espresso outline-none focus:border-bronzed-gold"
          >
            {priceRanges.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-espresso">
            Minimum Rating
          </label>
          <select
            value={activeFilters.rating}
            onChange={(e) => handleChange("rating", e.target.value)}
            className="w-full rounded-lg border border-peach/50 bg-sand px-3 py-2.5 text-sm text-espresso outline-none focus:border-bronzed-gold"
          >
            {ratingOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          {hasActive && (
            <button
              onClick={clearFilters}
              className="btn-secondary flex-1"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="btn-primary flex-1"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}
