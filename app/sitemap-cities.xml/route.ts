import { NextResponse } from "next/server";
import { cities } from "@/data/cities";
import { SITE_URL } from "@/lib/constants";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${cities
    .map(
      (city) => `<url>
    <loc>${SITE_URL}/${city.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>${city.tier === "metro" ? "0.8" : city.tier === "mid" ? "0.6" : "0.5"}</priority>
  </url>`
    )
    .join("\n  ")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
