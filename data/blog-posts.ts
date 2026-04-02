import { BlogPost } from "@/types/global";

export const blogPosts: BlogPost[] = [
  {
    slug: "how-much-does-spray-tan-cost",
    title: "How Much Does a Spray Tan Cost in 2026? Complete Pricing Guide",
    description:
      "Discover spray tan pricing by type, location, and experience level. Includes cost comparison tables for mobile, salon, and airbrush spray tans.",
    date: "2026-03-15",
    author: "SprayTan.com Editorial",
    image: "/images/blog/spray-tan-cost.jpg",
    tags: ["pricing", "guide"],
  },
  {
    slug: "mobile-vs-salon-spray-tan",
    title: "Mobile vs. Salon Spray Tan: Which Is Right for You?",
    description:
      "Compare mobile and salon spray tans side by side. Pros, cons, pricing, and convenience factors to help you decide.",
    date: "2026-03-10",
    author: "SprayTan.com Editorial",
    image: "/images/blog/mobile-vs-salon.jpg",
    tags: ["comparison", "mobile", "salon"],
  },
  {
    slug: "how-to-prepare-for-spray-tan",
    title: "How to Prepare for a Spray Tan: Your Complete Prep Checklist",
    description:
      "Follow this step-by-step spray tan preparation guide for the best results. Exfoliation, shaving, clothing tips, and more.",
    date: "2026-03-05",
    author: "SprayTan.com Editorial",
    image: "/images/blog/spray-tan-prep.jpg",
    tags: ["preparation", "tips"],
  },
  {
    slug: "best-spray-tan-solutions",
    title: "Best Spray Tan Solutions in 2026: Professional & At-Home Picks",
    description:
      "Compare the top spray tan solutions including St. Tropez, Bondi Sands, Loving Tan, and more. Professional and at-home options reviewed.",
    date: "2026-02-28",
    author: "SprayTan.com Editorial",
    image: "/images/blog/best-solutions.jpg",
    tags: ["products", "reviews"],
  },
  {
    slug: "spray-tan-for-wedding-day",
    title: "Spray Tan for Your Wedding Day: The Complete Bridal Timeline",
    description:
      "Plan your perfect bridal spray tan with our week-by-week timeline. Trial sessions, timing tips, and what to tell your artist.",
    date: "2026-02-20",
    author: "SprayTan.com Editorial",
    image: "/images/blog/bridal-spray-tan.jpg",
    tags: ["bridal", "wedding", "timeline"],
  },
  {
    slug: "how-long-does-spray-tan-last",
    title: "How Long Does a Spray Tan Last? Aftercare Tips for Maximum Glow",
    description:
      "Learn how long spray tans last and get expert aftercare tips to extend your glow. Moisturizing, showering, and maintenance advice.",
    date: "2026-02-15",
    author: "SprayTan.com Editorial",
    image: "/images/blog/spray-tan-aftercare.jpg",
    tags: ["aftercare", "maintenance"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
