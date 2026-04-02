import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/constants";

export async function GET() {
  let listings: any[] = [];
  try {
    const { data } = await supabase
      .from("st_listings")
      .select("slug, updated_at")
      .order("updated_at", { ascending: false });
    listings = data || [];
  } catch {
    // empty
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${listings
    .map(
      (l) => `<url>
    <loc>${SITE_URL}/listing/${l.slug}</loc>
    <lastmod>${l.updated_at ? new Date(l.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
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
