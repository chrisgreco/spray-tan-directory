import { NextResponse } from "next/server";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import { solutions } from "@/data/solutions";
import { cities } from "@/data/cities";
import { blogPosts } from "@/data/blog-posts";

export async function GET() {
  const body = `# ${SITE_NAME} — Full Documentation

> ${SITE_DESCRIPTION}

## About ${SITE_NAME}
${SITE_NAME} is a comprehensive directory platform connecting clients with mobile spray tan artists across the United States. We cover 200+ cities and 8 service categories, providing verified listings, real reviews, and easy booking tools.

## Service Categories

${solutions.map((s) => `### ${s.title}
${s.description}
URL: ${SITE_URL}/${s.slug}
`).join("\n")}

## All Cities Covered

### Metro Cities
${cities.filter((c) => c.tier === "metro").map((c) => `- ${c.name}, ${c.stateAbbr} (${c.slug}): ${SITE_URL}/${c.slug}`).join("\n")}

### Mid-Size Cities
${cities.filter((c) => c.tier === "mid").map((c) => `- ${c.name}, ${c.stateAbbr}: ${SITE_URL}/${c.slug}`).join("\n")}

### Small/Resort Cities
${cities.filter((c) => c.tier === "small").map((c) => `- ${c.name}, ${c.stateAbbr}: ${SITE_URL}/${c.slug}`).join("\n")}

## Blog Articles
${blogPosts.map((p) => `- ${p.title}: ${SITE_URL}/blog/${p.slug}`).join("\n")}

## How It Works
1. Search by city or service type
2. Browse verified spray tan artist listings
3. Read reviews and compare pricing
4. Contact artists directly or request quotes
5. Book your appointment

## For Spray Tan Artists
Artists can list their business for free at ${SITE_URL}/add-listing. Featured listings are available for enhanced visibility.

## Typical Pricing
- Standard spray tan: $35-$75
- Mobile spray tan: $50-$100+
- Bridal spray tan: $75-$150+
- Competition spray tan: $75-$200+
- Package deals vary by artist

## Contact & Links
- Website: ${SITE_URL}
- Add Listing: ${SITE_URL}/add-listing
- Blog: ${SITE_URL}/blog
- Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
