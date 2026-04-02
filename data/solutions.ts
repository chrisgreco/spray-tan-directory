import { Solution } from "@/types/global";

export const solutions: Solution[] = [
  {
    slug: "mobile-spray-tan",
    name: "Mobile",
    title: "Mobile Spray Tan Artists",
    description:
      "Skip the salon and get a flawless spray tan in the comfort of your own home. Our mobile spray tan artists bring professional equipment, premium solutions, and expert technique right to your door. Perfect for busy schedules, parties, or anyone who values convenience and privacy.",
    metaDescription:
      "Find mobile spray tan artists who come to you. Book an in-home spray tan with top-rated professionals in your area.",
    icon: "Truck",
  },
  {
    slug: "bridal-spray-tan",
    name: "Bridal",
    title: "Bridal Spray Tan Artists",
    description:
      "Your wedding day glow starts here. Bridal spray tan specialists understand the nuances of photography-ready color, dress-friendly application, and timeline planning. Many offer trial sessions, bridal party packages, and day-of touch-ups to ensure you look radiant walking down the aisle.",
    metaDescription:
      "Find bridal spray tan artists for your wedding day. Specialist artists offering trials, bridal party packages, and photo-ready results.",
    icon: "Heart",
  },
  {
    slug: "event-spray-tan",
    name: "Event",
    title: "Event Spray Tan Services",
    description:
      "Whether it's prom, a gala, vacation prep, or a milestone birthday, event spray tans give you that red-carpet confidence. Event-focused artists understand quick-developing formulas, color matching for specific outfits, and working within tight timelines.",
    metaDescription:
      "Book event spray tans for prom, galas, vacations, and special occasions. Quick-developing formulas and expert color matching.",
    icon: "PartyPopper",
  },
  {
    slug: "self-tan-coaching-spray-tan",
    name: "Self-Tan Coaching",
    title: "Self-Tan Coaching & Lessons",
    description:
      "Learn to achieve a salon-quality tan at home with personalized coaching from spray tan professionals. Self-tan coaches teach you product selection, application techniques, prep routines, and aftercare secrets so you can maintain your glow between professional sessions.",
    metaDescription:
      "Learn professional self-tanning techniques with expert coaching. Product recommendations, application tips, and aftercare guidance.",
    icon: "GraduationCap",
  },
  {
    slug: "competition-spray-tan",
    name: "Competition",
    title: "Competition Spray Tan Artists",
    description:
      "Bodybuilding, fitness, bikini, and figure competitions demand a specific kind of tan — ultra-dark, stage-ready, and perfectly even. Competition spray tan artists use specialized formulas designed for stage lighting, know the rules of each federation, and understand the multi-coat process required for competition day.",
    metaDescription:
      "Find competition spray tan artists for bodybuilding, bikini, and figure shows. Stage-ready formulas and federation-approved results.",
    icon: "Trophy",
  },
  {
    slug: "mens-spray-tan",
    name: "Men's",
    title: "Men's Spray Tan Services",
    description:
      "More men than ever are discovering the confidence boost of a natural-looking spray tan. Men's spray tan specialists understand masculine color preferences, body hair considerations, and creating a subtle, undetectable enhancement that looks like you just got back from vacation.",
    metaDescription:
      "Find men's spray tan artists offering natural-looking results. Subtle, undetectable color tailored for men.",
    icon: "User",
  },
  {
    slug: "airbrush-spray-tan",
    name: "Airbrush",
    title: "Airbrush Spray Tan Artists",
    description:
      "Airbrush spray tanning offers the most customizable and precise application available. Using a handheld airbrush gun, artists can contour, highlight, and create perfectly even coverage with complete control over color intensity. Ideal for those who want a truly bespoke tan experience.",
    metaDescription:
      "Find airbrush spray tan artists for precision application. Custom contouring, even coverage, and bespoke color matching.",
    icon: "Paintbrush",
  },
  {
    slug: "maintenance-spray-tan",
    name: "Maintenance",
    title: "Spray Tan Maintenance Plans",
    description:
      "Keep your glow year-round with spray tan maintenance plans. Many artists offer subscription packages, monthly memberships, or loyalty pricing for regular clients. Maintenance plans ensure consistent color, simplified scheduling, and savings over individual sessions.",
    metaDescription:
      "Find spray tan artists offering maintenance plans and memberships. Keep your glow year-round with regular sessions and loyalty pricing.",
    icon: "RefreshCw",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
