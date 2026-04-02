import { NextResponse } from "next/server";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import { solutions } from "@/data/solutions";
import { cities } from "@/data/cities";

export async function GET() {
  const metroCities = cities.filter((c) => c.tier === "metro").slice(0, 20);

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## About
${SITE_NAME} is the premier directory for finding mobile spray tan artists across the United States. We help clients discover, compare, and connect with verified spray tan professionals in 200+ cities.

## Services Covered
${solutions.map((s) => `- ${s.title}: ${s.metaDescription}`).join("\n")}

## Top Cities
${metroCities.map((c) => `- ${c.name}, ${c.stateAbbr}: ${SITE_URL}/${c.slug}`).join("\n")}

## Key Pages
- Homepage: ${SITE_URL}
- Blog: ${SITE_URL}/blog
- Add Listing: ${SITE_URL}/add-listing

## Contact
- Website: ${SITE_URL}
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
