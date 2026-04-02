"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { cities } from "@/data/cities";
import { useRouter } from "next/navigation";

export default function CitySearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered = query.length >= 2
    ? cities
        .filter(
          (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.state.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/${slug}`);
  };

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-espresso/30" />
        <input
          type="text"
          placeholder="Search your city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="w-full rounded-xl border border-peach/50 bg-white py-3.5 pl-12 pr-4 text-sm text-espresso shadow-sm outline-none transition-all focus:border-bronzed-gold focus:shadow-md"
        />
      </div>

      {isOpen && filtered.length > 0 && (
        <div className="absolute top-full z-20 mt-2 w-full rounded-xl border border-peach/30 bg-white py-2 shadow-xl">
          {filtered.map((city) => (
            <button
              key={city.slug}
              onClick={() => handleSelect(city.slug)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-espresso transition-colors hover:bg-peach/10"
            >
              <span className="font-medium">{city.name}</span>
              <span className="text-espresso/40">{city.stateAbbr}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
