import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function rand(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function slug(business: string, city: string, state: string): string {
  return `${business}-${city}-${state}`
    .toLowerCase()
    .replace(/[&']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const allSolutions = [
  "mobile",
  "bridal",
  "event",
  "self_tan_coaching",
  "competition",
  "men",
  "airbrush",
  "maintenance",
];

interface CityDef {
  city: string;
  state: string;
  stateAbbr: string;
  zips: string[];
  citiesServed: string[];
  businesses: {
    name: string;
    owner: string;
    instagram: string;
    website: string;
    email: string;
    phone: string;
    description: string;
    solutions: string[];
    priceRange: string;
    featured: boolean;
    rating: number;
    reviewCount: number;
  }[];
}

const cities: CityDef[] = [
  // -----------------------------------------------------------------------
  // 1. Miami, FL
  // -----------------------------------------------------------------------
  {
    city: "Miami",
    state: "Florida",
    stateAbbr: "FL",
    zips: ["33101", "33109", "33125", "33130", "33131", "33132", "33133"],
    citiesServed: ["Miami", "Miami Beach", "Coral Gables", "Brickell", "Coconut Grove", "Doral"],
    businesses: [
      {
        name: "Golden Hour Spray Tans",
        owner: "Sofia Martinez",
        instagram: "@goldenhourmiami",
        website: "https://goldenhourmiami.com",
        email: "hello@goldenhourmiami.com",
        phone: "(305) 555-0112",
        description:
          "Golden Hour Spray Tans delivers luxury mobile spray tanning across Miami-Dade County. Owner Sofia Martinez uses Aviva Labs organic solutions and specializes in bridal parties, editorial shoots, and natural sun-kissed glows. Every session includes a custom color consultation and barrier cream application for flawless, even results.",
        solutions: ["mobile", "bridal", "event", "airbrush"],
        priceRange: "$85–$140",
        featured: true,
        rating: 4.95,
        reviewCount: 87,
      },
      {
        name: "Bronze & Glow Studio",
        owner: "Isabella Torres",
        instagram: "@bronzeandglowmia",
        website: "https://bronzeandglowstudio.com",
        email: "book@bronzeandglowstudio.com",
        phone: "(305) 555-0234",
        description:
          "Bronze & Glow Studio brings the salon experience to your door. Isabella Torres is a certified spray tan artist with over 6 years of experience specializing in competition tans, event prep, and men's tanning. She uses Norvell Venetian solutions for a warm, natural bronze that photographs beautifully.",
        solutions: ["mobile", "competition", "event", "men"],
        priceRange: "$75–$130",
        featured: true,
        rating: 4.88,
        reviewCount: 62,
      },
      {
        name: "Sun-Kissed Mobile Tans",
        owner: "Camila Reyes",
        instagram: "@sunkissedmobile",
        website: "https://sunkissedmobiletans.com",
        email: "camila@sunkissedmobiletans.com",
        phone: "(305) 555-0356",
        description:
          "Sun-Kissed Mobile Tans provides affordable yet premium spray tanning services throughout Miami. Camila Reyes focuses on creating natural-looking, buildable color using SunFX organic solutions. Perfect for first-time tanners and maintenance clients alike.",
        solutions: ["mobile", "maintenance", "self_tan_coaching"],
        priceRange: "$65–$100",
        featured: false,
        rating: 4.72,
        reviewCount: 41,
      },
      {
        name: "Cocoa Beach Glow",
        owner: "Daniela Vega",
        instagram: "@cocoabeachglow",
        website: "https://cocoabeachglow.com",
        email: "info@cocoabeachglow.com",
        phone: "(305) 555-0478",
        description:
          "Cocoa Beach Glow is a mobile spray tan service specializing in bridal and event tanning in the Miami area. Daniela Vega has tanned over 500 brides and offers custom shade matching, trial sessions, and bridal party packages at competitive rates.",
        solutions: ["mobile", "bridal", "event"],
        priceRange: "$80–$150",
        featured: false,
        rating: 4.81,
        reviewCount: 55,
      },
      {
        name: "Tropicana Tan Co.",
        owner: "Maria Gonzalez",
        instagram: "@tropicanatanco",
        website: "https://tropicanatanco.com",
        email: "maria@tropicanatanco.com",
        phone: "(305) 555-0590",
        description:
          "Tropicana Tan Co. offers airbrush spray tanning and self-tan coaching throughout Miami-Dade County. Maria Gonzalez is passionate about teaching clients how to maintain their glow at home while offering professional sessions for when you want the expert touch.",
        solutions: ["mobile", "airbrush", "self_tan_coaching", "maintenance"],
        priceRange: "$70–$120",
        featured: false,
        rating: 4.65,
        reviewCount: 33,
      },
    ],
  },
  // -----------------------------------------------------------------------
  // 2. Los Angeles, CA
  // -----------------------------------------------------------------------
  {
    city: "Los Angeles",
    state: "California",
    stateAbbr: "CA",
    zips: ["90001", "90012", "90024", "90036", "90046", "90048", "90210"],
    citiesServed: ["Los Angeles", "West Hollywood", "Beverly Hills", "Santa Monica", "Brentwood", "Studio City"],
    businesses: [
      {
        name: "Sunset Bronze LA",
        owner: "Megan Park",
        instagram: "@sunsetbronzela",
        website: "https://sunsetbronzela.com",
        email: "megan@sunsetbronzela.com",
        phone: "(310) 555-0112",
        description:
          "Sunset Bronze LA is the go-to mobile spray tan service for celebrities, influencers, and everyday clients across Los Angeles County. Megan Park uses Dolce Glow and Aviva Labs solutions to create customized, camera-ready tans. Specializing in editorial, bridal, and red-carpet prep.",
        solutions: ["mobile", "bridal", "event", "airbrush"],
        priceRange: "$100–$175",
        featured: true,
        rating: 4.97,
        reviewCount: 95,
      },
      {
        name: "Glow Getter Studio",
        owner: "Ashley Chen",
        instagram: "@glowgetterla",
        website: "https://glowgetterla.com",
        email: "ashley@glowgetterla.com",
        phone: "(310) 555-0234",
        description:
          "Glow Getter Studio provides luxury mobile spray tanning throughout LA. Ashley Chen focuses on contouring and color-matching for all skin tones, using organic SunFX solutions. Known for her work with fitness competitors and bridal clients who demand perfection.",
        solutions: ["mobile", "bridal", "competition", "men"],
        priceRange: "$90–$160",
        featured: true,
        rating: 4.91,
        reviewCount: 78,
      },
      {
        name: "Pacific Glow Tanning",
        owner: "Jordan Williams",
        instagram: "@pacificglowtan",
        website: "https://pacificglowtanning.com",
        email: "jordan@pacificglowtanning.com",
        phone: "(310) 555-0356",
        description:
          "Pacific Glow Tanning delivers natural-looking spray tans across the Westside and South Bay. Jordan Williams has been spray tanning for 8 years and is known for creating the perfect 'just came back from Hawaii' glow using Norvell and Bondi Sands professional solutions.",
        solutions: ["mobile", "event", "maintenance", "self_tan_coaching"],
        priceRange: "$80–$130",
        featured: false,
        rating: 4.78,
        reviewCount: 52,
      },
      {
        name: "Beverly Bronze",
        owner: "Nicole Adams",
        instagram: "@beverlybronze",
        website: "https://beverlybronze.com",
        email: "nicole@beverlybronze.com",
        phone: "(310) 555-0478",
        description:
          "Beverly Bronze offers premium airbrush spray tanning to clients in Beverly Hills, Bel Air, and surrounding neighborhoods. Nicole Adams uses St. Tropez Professional solutions and specializes in subtle, elegant tans that enhance your natural beauty without looking overdone.",
        solutions: ["mobile", "airbrush", "bridal", "event"],
        priceRange: "$95–$165",
        featured: false,
        rating: 4.85,
        reviewCount: 47,
      },
      {
        name: "LA Tan Collective",
        owner: "Brittany Foster",
        instagram: "@latancollective",
        website: "https://latancollective.com",
        email: "hello@latancollective.com",
        phone: "(310) 555-0590",
        description:
          "LA Tan Collective is a team of three mobile spray tan artists covering all of Los Angeles County. They specialize in group events, bachelorette parties, and corporate wellness events. Using a mix of Loving Tan and Aviva Labs solutions, they deliver consistent, beautiful results every time.",
        solutions: ["mobile", "event", "bridal", "men", "maintenance"],
        priceRange: "$85–$150",
        featured: false,
        rating: 4.7,
        reviewCount: 39,
      },
    ],
  },
  // -----------------------------------------------------------------------
  // 3. New York, NY
  // -----------------------------------------------------------------------
  {
    city: "New York",
    state: "New York",
    stateAbbr: "NY",
    zips: ["10001", "10011", "10014", "10021", "10028", "10036", "10065"],
    citiesServed: ["Manhattan", "Brooklyn", "Queens", "Hoboken", "Jersey City", "Williamsburg"],
    businesses: [
      {
        name: "Manhattan Glow Co.",
        owner: "Rachel Kim",
        instagram: "@manhattanglowco",
        website: "https://manhattanglowco.com",
        email: "rachel@manhattanglowco.com",
        phone: "(212) 555-0112",
        description:
          "Manhattan Glow Co. is New York City's premier mobile spray tan service. Rachel Kim brings 10 years of experience and Aviva Labs solutions directly to your apartment, office, or hotel. Specializing in bridal, editorial, and fashion week prep. Known for flawless color matching across all skin tones.",
        solutions: ["mobile", "bridal", "event", "airbrush"],
        priceRange: "$95–$175",
        featured: true,
        rating: 4.93,
        reviewCount: 91,
      },
      {
        name: "Brooklyn Bronze Bar",
        owner: "Jasmine Okafor",
        instagram: "@bkbronzebar",
        website: "https://brooklynbronzebar.com",
        email: "jasmine@brooklynbronzebar.com",
        phone: "(718) 555-0234",
        description:
          "Brooklyn Bronze Bar brings inclusive, skin-positive spray tanning to Brooklyn and beyond. Jasmine Okafor is passionate about creating beautiful tans for all skin tones — from fair to deep. Using SunFX organic solutions and custom blending, she delivers results that enhance every complexion.",
        solutions: ["mobile", "bridal", "event", "men"],
        priceRange: "$85–$150",
        featured: true,
        rating: 4.89,
        reviewCount: 68,
      },
      {
        name: "Fifth Ave Tan",
        owner: "Samantha Cole",
        instagram: "@fifthavetan",
        website: "https://fifthavetan.com",
        email: "sam@fifthavetan.com",
        phone: "(212) 555-0356",
        description:
          "Fifth Ave Tan delivers luxury spray tanning to Manhattan's most discerning clientele. Samantha Cole uses St. Tropez Professional and Dolce Glow solutions for a sophisticated, natural-looking result. Popular with executives, socialites, and brides who want understated elegance.",
        solutions: ["mobile", "bridal", "airbrush", "maintenance"],
        priceRange: "$100–$175",
        featured: false,
        rating: 4.82,
        reviewCount: 44,
      },
      {
        name: "City Glow NYC",
        owner: "Priya Patel",
        instagram: "@cityglownyc",
        website: "https://cityglownyc.com",
        email: "priya@cityglownyc.com",
        phone: "(212) 555-0478",
        description:
          "City Glow NYC offers affordable mobile spray tanning across all five boroughs. Priya Patel makes professional spray tanning accessible with competitive pricing and flexible scheduling. Using Norvell Venetian solutions for a natural, warm bronze that works on all skin types.",
        solutions: ["mobile", "event", "self_tan_coaching", "maintenance"],
        priceRange: "$75–$120",
        featured: false,
        rating: 4.68,
        reviewCount: 37,
      },
      {
        name: "Gilded Glow Studio",
        owner: "Taylor Brooks",
        instagram: "@gildedglownyc",
        website: "https://gildedglowstudio.com",
        email: "taylor@gildedglowstudio.com",
        phone: "(212) 555-0590",
        description:
          "Gilded Glow Studio specializes in competition spray tans and fitness event prep across the NYC metro area. Taylor Brooks has worked with NPC, IFBB, and bikini competitors for over 5 years. Multi-coat applications, stage-ready formulas, and federation-approved color guaranteed.",
        solutions: ["mobile", "competition", "men", "event"],
        priceRange: "$110–$250",
        featured: false,
        rating: 4.76,
        reviewCount: 29,
      },
    ],
  },
  // -----------------------------------------------------------------------
  // 4. Nashville, TN
  // -----------------------------------------------------------------------
  {
    city: "Nashville",
    state: "Tennessee",
    stateAbbr: "TN",
    zips: ["37201", "37203", "37205", "37206", "37209", "37212", "37215"],
    citiesServed: ["Nashville", "Franklin", "Brentwood", "Murfreesboro", "Hendersonville", "Mt. Juliet"],
    businesses: [
      {
        name: "Music City Glow",
        owner: "Hannah Davis",
        instagram: "@musiccityglow",
        website: "https://musiccityglow.com",
        email: "hannah@musiccityglow.com",
        phone: "(615) 555-0112",
        description:
          "Music City Glow is Nashville's top-rated mobile spray tan service. Hannah Davis specializes in bridal tanning, bachelorette party packages, and natural everyday glows. Using Aviva Labs solutions with custom color matching for that perfect Nashville glow.",
        solutions: ["mobile", "bridal", "event", "airbrush"],
        priceRange: "$75–$125",
        featured: true,
        rating: 4.92,
        reviewCount: 74,
      },
      {
        name: "Southern Bronze Co.",
        owner: "Kayla Bennett",
        instagram: "@southernbronzeco",
        website: "https://southernbronzeco.com",
        email: "kayla@southernbronzeco.com",
        phone: "(615) 555-0234",
        description:
          "Southern Bronze Co. brings warm, sun-kissed spray tans to the Nashville metro area. Kayla Bennett is known for her natural-looking results that never look orange. She uses Norvell and SunFX solutions and offers maintenance packages for year-round glow.",
        solutions: ["mobile", "maintenance", "event", "self_tan_coaching"],
        priceRange: "$65–$110",
        featured: true,
        rating: 4.86,
        reviewCount: 58,
      },
      {
        name: "Glow Bar Nashville",
        owner: "Madison Turner",
        instagram: "@glowbarnash",
        website: "https://glowbarnashville.com",
        email: "madison@glowbarnashville.com",
        phone: "(615) 555-0356",
        description:
          "Glow Bar Nashville is a mobile spray tan service focused on clean, organic tanning. Madison Turner uses only vegan and cruelty-free solutions and offers customized sessions for brides, events, and everyday maintenance. Serving Nashville and surrounding suburbs.",
        solutions: ["mobile", "bridal", "event", "maintenance"],
        priceRange: "$70–$115",
        featured: false,
        rating: 4.74,
        reviewCount: 42,
      },
      {
        name: "Honey Dipped Tans",
        owner: "Lauren Mitchell",
        instagram: "@honeydippedtans",
        website: "https://honeydippedtans.com",
        email: "lauren@honeydippedtans.com",
        phone: "(615) 555-0478",
        description:
          "Honey Dipped Tans delivers rich, golden spray tans with a focus on even application and smooth fading. Lauren Mitchell serves Nashville bachelorette parties, country music events, and competition prep with professional Loving Tan solutions.",
        solutions: ["mobile", "event", "competition", "men"],
        priceRange: "$70–$130",
        featured: false,
        rating: 4.69,
        reviewCount: 35,
      },
      {
        name: "Luxe Tan Nashville",
        owner: "Emily Clark",
        instagram: "@luxetannash",
        website: "https://luxetannashville.com",
        email: "emily@luxetannashville.com",
        phone: "(615) 555-0590",
        description:
          "Luxe Tan Nashville provides high-end mobile spray tanning for clients who want the very best. Emily Clark offers airbrush contouring, custom blending, and premium St. Tropez Professional solutions. Popular with Nashville's music industry professionals and influencers.",
        solutions: ["mobile", "airbrush", "bridal", "event"],
        priceRange: "$80–$140",
        featured: false,
        rating: 4.77,
        reviewCount: 31,
      },
    ],
  },
  // -----------------------------------------------------------------------
  // 5. Dallas, TX
  // -----------------------------------------------------------------------
  {
    city: "Dallas",
    state: "Texas",
    stateAbbr: "TX",
    zips: ["75201", "75204", "75205", "75209", "75214", "75219", "75225"],
    citiesServed: ["Dallas", "Plano", "Frisco", "Highland Park", "University Park", "Richardson"],
    businesses: [
      {
        name: "Lone Star Glow",
        owner: "Jessica Harper",
        instagram: "@lonestarglow",
        website: "https://lonestarglow.com",
        email: "jessica@lonestarglow.com",
        phone: "(214) 555-0112",
        description:
          "Lone Star Glow provides luxury mobile spray tanning throughout the DFW metroplex. Jessica Harper has been tanning for 7 years and uses Aviva Labs solutions for a warm, natural bronze. Specializing in bridal parties, sorority events, and corporate wellness.",
        solutions: ["mobile", "bridal", "event", "airbrush"],
        priceRange: "$70–$125",
        featured: true,
        rating: 4.9,
        reviewCount: 71,
      },
      {
        name: "DFW Bronze Babes",
        owner: "Megan Torres",
        instagram: "@dfwbronzebabes",
        website: "https://dfwbronzebabes.com",
        email: "megan@dfwbronzebabes.com",
        phone: "(214) 555-0234",
        description:
          "DFW Bronze Babes is a team of mobile spray tan artists covering Dallas, Fort Worth, and all surrounding suburbs. They specialize in group bookings, bachelorette parties, and prom season. Using Norvell and Bondi Sands professional solutions for consistently gorgeous results.",
        solutions: ["mobile", "event", "bridal", "maintenance"],
        priceRange: "$60–$110",
        featured: true,
        rating: 4.84,
        reviewCount: 63,
      },
      {
        name: "Highland Tan Co.",
        owner: "Sarah Phillips",
        instagram: "@highlandtanco",
        website: "https://highlandtanco.com",
        email: "sarah@highlandtanco.com",
        phone: "(214) 555-0356",
        description:
          "Highland Tan Co. serves the Park Cities and North Dallas with premium mobile spray tanning. Sarah Phillips uses St. Tropez Professional solutions and focuses on creating sophisticated, natural-looking tans for her Highland Park and University Park clientele.",
        solutions: ["mobile", "bridal", "airbrush", "maintenance"],
        priceRange: "$75–$130",
        featured: false,
        rating: 4.79,
        reviewCount: 38,
      },
      {
        name: "Texas Tan Queen",
        owner: "Amanda Rodriguez",
        instagram: "@texastanqueen",
        website: "https://texastanqueen.com",
        email: "amanda@texastanqueen.com",
        phone: "(214) 555-0478",
        description:
          "Texas Tan Queen offers competition-ready spray tans and everyday glows across the Dallas metro area. Amanda Rodriguez works with NPC and IFBB competitors as well as regular clients who want a flawless, streak-free tan. Using Loving Tan and Mine Tan professional formulas.",
        solutions: ["mobile", "competition", "men", "event"],
        priceRange: "$70–$200",
        featured: false,
        rating: 4.73,
        reviewCount: 28,
      },
      {
        name: "Radiant Glow Dallas",
        owner: "Courtney Lee",
        instagram: "@radiantglowdallas",
        website: "https://radiantglowdallas.com",
        email: "courtney@radiantglowdallas.com",
        phone: "(214) 555-0590",
        description:
          "Radiant Glow Dallas focuses on self-tan education and maintenance tanning. Courtney Lee offers coaching sessions to teach you how to self-tan like a pro, along with professional mobile sessions for when you want the full treatment. SunFX organic solutions for sensitive skin.",
        solutions: ["mobile", "self_tan_coaching", "maintenance", "event"],
        priceRange: "$60–$100",
        featured: false,
        rating: 4.62,
        reviewCount: 24,
      },
    ],
  },
  // -----------------------------------------------------------------------
  // 6. Austin, TX
  // -----------------------------------------------------------------------
  {
    city: "Austin",
    state: "Texas",
    stateAbbr: "TX",
    zips: ["73301", "78701", "78702", "78703", "78704", "78741", "78745"],
    citiesServed: ["Austin", "Round Rock", "Cedar Park", "Lakeway", "Bee Cave", "Pflugerville"],
    businesses: [
      {
        name: "ATX Glow",
        owner: "Brooke Anderson",
        instagram: "@atxglow",
        website: "https://atxglow.com",
        email: "brooke@atxglow.com",
        phone: "(512) 555-0112",
        description:
          "ATX Glow is Austin's most-booked mobile spray tan service. Brooke Anderson delivers customized spray tans using Aviva Labs organic solutions. Known for her work with Austin's music and festival scene, brides, and fitness competitors. Available 7 days a week.",
        solutions: ["mobile", "bridal", "event", "competition"],
        priceRange: "$70–$120",
        featured: true,
        rating: 4.94,
        reviewCount: 82,
      },
      {
        name: "Keep Austin Bronzed",
        owner: "Natalie Wright",
        instagram: "@keepaustinbronzed",
        website: "https://keepaustinbronzed.com",
        email: "natalie@keepaustinbronzed.com",
        phone: "(512) 555-0234",
        description:
          "Keep Austin Bronzed provides eco-friendly mobile spray tanning throughout the Austin metro. Natalie Wright uses only organic, vegan, and cruelty-free solutions. Specializing in natural, buildable color that looks like you spent a weekend at the lake.",
        solutions: ["mobile", "maintenance", "self_tan_coaching", "event"],
        priceRange: "$60–$100",
        featured: true,
        rating: 4.87,
        reviewCount: 56,
      },
      {
        name: "South Congress Spray Tans",
        owner: "Jamie Foster",
        instagram: "@socospraytans",
        website: "https://southcongressspraytans.com",
        email: "jamie@southcongressspraytans.com",
        phone: "(512) 555-0356",
        description:
          "South Congress Spray Tans brings the fun, eclectic energy of SoCo to your tanning experience. Jamie Foster specializes in airbrush tanning with custom contouring and offers group party packages for bachelorettes and birthdays visiting Austin.",
        solutions: ["mobile", "airbrush", "event", "bridal"],
        priceRange: "$65–$115",
        featured: false,
        rating: 4.71,
        reviewCount: 43,
      },
      {
        name: "Hill Country Bronze",
        owner: "Kaitlyn Perez",
        instagram: "@hillcountrybronze",
        website: "https://hillcountrybronze.com",
        email: "kaitlyn@hillcountrybronze.com",
        phone: "(512) 555-0478",
        description:
          "Hill Country Bronze offers mobile spray tanning services to Austin and the surrounding Hill Country communities. Kaitlyn Perez uses Norvell Venetian solutions and specializes in bridal tanning for the many weddings hosted at Hill Country venues.",
        solutions: ["mobile", "bridal", "event", "maintenance"],
        priceRange: "$65–$120",
        featured: false,
        rating: 4.75,
        reviewCount: 36,
      },
      {
        name: "Glow Up ATX",
        owner: "Danielle Morgan",
        instagram: "@glowupatx",
        website: "https://glowupatx.com",
        email: "danielle@glowupatx.com",
        phone: "(512) 555-0590",
        description:
          "Glow Up ATX is a mobile spray tan service catering to men, fitness enthusiasts, and everyday clients across Austin. Danielle Morgan creates natural-looking tans for all genders and body types using SunFX organic solutions. Judgment-free, inclusive environment.",
        solutions: ["mobile", "men", "competition", "maintenance"],
        priceRange: "$60–$110",
        featured: false,
        rating: 4.67,
        reviewCount: 27,
      },
    ],
  },
  // -----------------------------------------------------------------------
  // 7. Phoenix, AZ
  // -----------------------------------------------------------------------
  {
    city: "Phoenix",
    state: "Arizona",
    stateAbbr: "AZ",
    zips: ["85001", "85003", "85004", "85006", "85008", "85012", "85016"],
    citiesServed: ["Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler", "Gilbert"],
    businesses: [
      {
        name: "Desert Glow Spray Tans",
        owner: "Alexis Moreno",
        instagram: "@desertglowaz",
        website: "https://desertglowspraytans.com",
        email: "alexis@desertglowspraytans.com",
        phone: "(480) 555-0112",
        description:
          "Desert Glow Spray Tans is the Phoenix metro's most popular mobile spray tan service. Alexis Moreno specializes in creating natural, sun-kissed tans that look at home in the Arizona sun. Using Aviva Labs solutions with custom blending for every skin tone.",
        solutions: ["mobile", "bridal", "event", "airbrush"],
        priceRange: "$65–$115",
        featured: true,
        rating: 4.91,
        reviewCount: 69,
      },
      {
        name: "Scottsdale Tan Lounge",
        owner: "Paige Hamilton",
        instagram: "@scottsdaletanlounge",
        website: "https://scottsdaletanlounge.com",
        email: "paige@scottsdaletanlounge.com",
        phone: "(480) 555-0234",
        description:
          "Scottsdale Tan Lounge provides premium mobile spray tanning to Scottsdale, Paradise Valley, and North Phoenix. Paige Hamilton uses St. Tropez Professional and Dolce Glow solutions and is the go-to artist for Scottsdale brides and resort events.",
        solutions: ["mobile", "bridal", "event", "maintenance"],
        priceRange: "$75–$130",
        featured: true,
        rating: 4.88,
        reviewCount: 54,
      },
      {
        name: "Copper & Sun Tanning",
        owner: "Victoria Stone",
        instagram: "@copperandsun",
        website: "https://copperandsuntanning.com",
        email: "victoria@copperandsuntanning.com",
        phone: "(480) 555-0356",
        description:
          "Copper & Sun Tanning offers affordable mobile spray tanning across the East Valley. Victoria Stone uses Bondi Sands and Norvell solutions to deliver warm, golden tans at accessible prices. Perfect for students, regular tanners, and anyone on a budget.",
        solutions: ["mobile", "maintenance", "event", "self_tan_coaching"],
        priceRange: "$55–$90",
        featured: false,
        rating: 4.63,
        reviewCount: 31,
      },
      {
        name: "Cactus Bloom Glow",
        owner: "Andrea Walsh",
        instagram: "@cactusbloomglow",
        website: "https://cactusbloomglow.com",
        email: "andrea@cactusbloomglow.com",
        phone: "(480) 555-0478",
        description:
          "Cactus Bloom Glow brings organic, eco-friendly spray tanning to the Phoenix metro. Andrea Walsh uses SunFX certified organic solutions and focuses on sustainability and clean beauty. Offering mobile sessions, bridal packages, and self-tan workshops.",
        solutions: ["mobile", "bridal", "self_tan_coaching", "airbrush"],
        priceRange: "$65–$115",
        featured: false,
        rating: 4.72,
        reviewCount: 37,
      },
      {
        name: "Valley Tan Pros",
        owner: "Rachel Nguyen",
        instagram: "@valleytanpros",
        website: "https://valleytanpros.com",
        email: "rachel@valleytanpros.com",
        phone: "(480) 555-0590",
        description:
          "Valley Tan Pros is a team of mobile spray tan artists covering the entire Phoenix metro area. They specialize in competition tans, men's tanning, and large group events. Using Mine Tan rapid-develop and Loving Tan professional solutions for versatile, reliable results.",
        solutions: ["mobile", "competition", "men", "event"],
        priceRange: "$60–$175",
        featured: false,
        rating: 4.58,
        reviewCount: 22,
      },
    ],
  },
  // -----------------------------------------------------------------------
  // 8. Atlanta, GA
  // -----------------------------------------------------------------------
  {
    city: "Atlanta",
    state: "Georgia",
    stateAbbr: "GA",
    zips: ["30301", "30305", "30306", "30308", "30309", "30318", "30324"],
    citiesServed: ["Atlanta", "Buckhead", "Midtown", "Decatur", "Sandy Springs", "Marietta"],
    businesses: [
      {
        name: "Peach State Glow",
        owner: "Taylor James",
        instagram: "@peachstateglow",
        website: "https://peachstateglow.com",
        email: "taylor@peachstateglow.com",
        phone: "(404) 555-0112",
        description:
          "Peach State Glow delivers premium mobile spray tanning across metro Atlanta. Taylor James is a Sunless Association-certified artist using Aviva Labs solutions. Specializing in bridal tanning, event prep, and natural everyday glows for clients of all skin tones.",
        solutions: ["mobile", "bridal", "event", "airbrush"],
        priceRange: "$70–$120",
        featured: true,
        rating: 4.9,
        reviewCount: 66,
      },
      {
        name: "Buckhead Bronze",
        owner: "Morgan Stewart",
        instagram: "@buckheadbronze",
        website: "https://buckheadbronze.com",
        email: "morgan@buckheadbronze.com",
        phone: "(404) 555-0234",
        description:
          "Buckhead Bronze is Atlanta's luxury mobile spray tan service, specializing in high-end clientele in Buckhead, Midtown, and Vinings. Morgan Stewart uses St. Tropez Professional and Dolce Glow solutions for an elegant, sophisticated tan that fades beautifully.",
        solutions: ["mobile", "bridal", "airbrush", "maintenance"],
        priceRange: "$80–$140",
        featured: true,
        rating: 4.86,
        reviewCount: 51,
      },
      {
        name: "Hotlanta Tans",
        owner: "Destiny Brown",
        instagram: "@hotlantatans",
        website: "https://hotlantatans.com",
        email: "destiny@hotlantatans.com",
        phone: "(404) 555-0356",
        description:
          "Hotlanta Tans makes spray tanning fun and accessible for everyone in the Atlanta metro area. Destiny Brown focuses on inclusive tanning for all skin tones and body types, using custom-blended Norvell solutions. Group bookings, parties, and bachelorette packages available.",
        solutions: ["mobile", "event", "men", "self_tan_coaching"],
        priceRange: "$60–$100",
        featured: false,
        rating: 4.71,
        reviewCount: 40,
      },
      {
        name: "ATL Glow Lab",
        owner: "Chelsea Park",
        instagram: "@atlglowlab",
        website: "https://atlglowlab.com",
        email: "chelsea@atlglowlab.com",
        phone: "(404) 555-0478",
        description:
          "ATL Glow Lab offers science-backed spray tanning using the latest organic formulations. Chelsea Park combines SunFX organic solutions with precise airbrush technique for a tan that develops evenly and fades gracefully. Serving Atlanta ITP and close-in OTP neighborhoods.",
        solutions: ["mobile", "airbrush", "bridal", "maintenance"],
        priceRange: "$70–$120",
        featured: false,
        rating: 4.75,
        reviewCount: 34,
      },
      {
        name: "Southern Shimmer Spray Tans",
        owner: "Amber Collins",
        instagram: "@southernshimmer",
        website: "https://southernshimmertans.com",
        email: "amber@southernshimmertans.com",
        phone: "(404) 555-0590",
        description:
          "Southern Shimmer Spray Tans provides competition-ready and everyday spray tans throughout the Atlanta metro. Amber Collins has worked with fitness competitors across the Southeast and offers multi-coat stage tans alongside her regular mobile spray tan service.",
        solutions: ["mobile", "competition", "event", "men"],
        priceRange: "$65–$185",
        featured: false,
        rating: 4.6,
        reviewCount: 25,
      },
    ],
  },
  // -----------------------------------------------------------------------
  // 9. Denver, CO
  // -----------------------------------------------------------------------
  {
    city: "Denver",
    state: "Colorado",
    stateAbbr: "CO",
    zips: ["80202", "80205", "80206", "80209", "80210", "80211", "80218"],
    citiesServed: ["Denver", "Lakewood", "Aurora", "Littleton", "Highlands Ranch", "Cherry Creek"],
    businesses: [
      {
        name: "Mile High Glow",
        owner: "Kelsey Burke",
        instagram: "@milehighglow",
        website: "https://milehighglow.com",
        email: "kelsey@milehighglow.com",
        phone: "(303) 555-0112",
        description:
          "Mile High Glow is Denver's leading mobile spray tan service. Kelsey Burke specializes in hydrating spray tan formulas that combat Colorado's dry climate. Using Aviva Labs solutions enriched with hyaluronic acid, she delivers tans that last longer in high-altitude, low-humidity conditions.",
        solutions: ["mobile", "bridal", "event", "airbrush"],
        priceRange: "$70–$120",
        featured: true,
        rating: 4.93,
        reviewCount: 73,
      },
      {
        name: "Rocky Mountain Bronze",
        owner: "Lindsey Hawkins",
        instagram: "@rockymtnbronze",
        website: "https://rockymountainbronze.com",
        email: "lindsey@rockymountainbronze.com",
        phone: "(303) 555-0234",
        description:
          "Rocky Mountain Bronze provides natural-looking mobile spray tans across the Denver metro area. Lindsey Hawkins is known for creating the perfect 'just skied in the sun' glow that looks at home in Colorado. Using Norvell and SunFX solutions with custom blending.",
        solutions: ["mobile", "maintenance", "event", "self_tan_coaching"],
        priceRange: "$60–$105",
        featured: true,
        rating: 4.85,
        reviewCount: 49,
      },
      {
        name: "Cherry Creek Tanning Co.",
        owner: "Allison Grant",
        instagram: "@cherrycreektan",
        website: "https://cherrycreektanning.com",
        email: "allison@cherrycreektanning.com",
        phone: "(303) 555-0356",
        description:
          "Cherry Creek Tanning Co. serves Denver's upscale Cherry Creek neighborhood and surrounding areas with premium mobile spray tanning. Allison Grant uses Dolce Glow and St. Tropez Professional solutions for a polished, elegant result.",
        solutions: ["mobile", "bridal", "airbrush", "event"],
        priceRange: "$75–$130",
        featured: false,
        rating: 4.78,
        reviewCount: 41,
      },
      {
        name: "Denver Tan Collective",
        owner: "Mia Richardson",
        instagram: "@denvertancollective",
        website: "https://denvertancollective.com",
        email: "mia@denvertancollective.com",
        phone: "(303) 555-0478",
        description:
          "Denver Tan Collective is a group of three mobile spray tan artists covering the greater Denver metro. They specialize in accessible, affordable spray tanning for regular clients, offering weekly and monthly maintenance packages that keep you glowing year-round.",
        solutions: ["mobile", "maintenance", "men", "event"],
        priceRange: "$55–$95",
        featured: false,
        rating: 4.64,
        reviewCount: 30,
      },
      {
        name: "Alpine Glow Spray Tans",
        owner: "Sierra Bennett",
        instagram: "@alpineglowtan",
        website: "https://alpineglowspraytans.com",
        email: "sierra@alpineglowspraytans.com",
        phone: "(303) 555-0590",
        description:
          "Alpine Glow Spray Tans offers organic, eco-conscious mobile spray tanning in Denver and the foothills. Sierra Bennett uses SunFX certified organic solutions and focuses on clean, sustainable beauty. Perfect for active Colorado clients who want a healthy glow without UV damage.",
        solutions: ["mobile", "bridal", "self_tan_coaching", "maintenance"],
        priceRange: "$65–$110",
        featured: false,
        rating: 4.7,
        reviewCount: 26,
      },
    ],
  },
  // -----------------------------------------------------------------------
  // 10. Tampa, FL
  // -----------------------------------------------------------------------
  {
    city: "Tampa",
    state: "Florida",
    stateAbbr: "FL",
    zips: ["33601", "33602", "33606", "33609", "33611", "33614", "33629"],
    citiesServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Wesley Chapel", "South Tampa"],
    businesses: [
      {
        name: "Bay Area Bronze",
        owner: "Christina Ramirez",
        instagram: "@bayareabronze",
        website: "https://bayareabronze.com",
        email: "christina@bayareabronze.com",
        phone: "(813) 555-0112",
        description:
          "Bay Area Bronze is Tampa Bay's premier mobile spray tan service. Christina Ramirez has been tanning Tampa Bay clients for over 8 years and is known for her flawless blending technique. Using Aviva Labs and Norvell solutions for a natural Florida glow.",
        solutions: ["mobile", "bridal", "event", "airbrush"],
        priceRange: "$65–$115",
        featured: true,
        rating: 4.92,
        reviewCount: 76,
      },
      {
        name: "Sunshine State Glow",
        owner: "Brittney Hall",
        instagram: "@sunshinestateglow",
        website: "https://sunshinestateglow.com",
        email: "brittney@sunshinestateglow.com",
        phone: "(813) 555-0234",
        description:
          "Sunshine State Glow provides mobile spray tanning across Tampa, St. Pete, and Clearwater. Brittney Hall specializes in bridal tanning and beach wedding prep, ensuring your glow looks natural against the Gulf Coast backdrop. Using SunFX organic solutions.",
        solutions: ["mobile", "bridal", "event", "maintenance"],
        priceRange: "$60–$110",
        featured: true,
        rating: 4.87,
        reviewCount: 59,
      },
      {
        name: "SoHo Spray Tans",
        owner: "Jessica Lane",
        instagram: "@sohospraytans",
        website: "https://sohospraytans.com",
        email: "jessica@sohospraytans.com",
        phone: "(813) 555-0356",
        description:
          "SoHo Spray Tans serves South Tampa and the SoHo district with premium mobile spray tanning. Jessica Lane uses Dolce Glow solutions for a clean, luxurious tanning experience. Known for her attention to detail and personalized color consultations.",
        solutions: ["mobile", "airbrush", "bridal", "self_tan_coaching"],
        priceRange: "$70–$120",
        featured: false,
        rating: 4.74,
        reviewCount: 38,
      },
      {
        name: "Gulf Coast Glow",
        owner: "Samantha Rivera",
        instagram: "@gulfcoastglow",
        website: "https://gulfcoastglow.com",
        email: "samantha@gulfcoastglow.com",
        phone: "(813) 555-0478",
        description:
          "Gulf Coast Glow offers affordable mobile spray tanning across the Tampa Bay area. Samantha Rivera makes professional spray tanning accessible with competitive pricing and flexible scheduling. Using Bondi Sands and Norvell solutions for a warm, beachy bronze.",
        solutions: ["mobile", "event", "maintenance", "men"],
        priceRange: "$55–$95",
        featured: false,
        rating: 4.66,
        reviewCount: 32,
      },
      {
        name: "Tampa Tan Studio",
        owner: "Nicole Green",
        instagram: "@tampatanstudio",
        website: "https://tampatanstudio.com",
        email: "nicole@tampatanstudio.com",
        phone: "(813) 555-0590",
        description:
          "Tampa Tan Studio provides competition spray tans and fitness event prep across Tampa Bay. Nicole Green works with bodybuilding, bikini, and figure competitors for NPC and IFBB shows. Multi-coat applications and federation-approved formulas available.",
        solutions: ["mobile", "competition", "event", "men"],
        priceRange: "$65–$200",
        featured: false,
        rating: 4.59,
        reviewCount: 21,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Review templates
// ---------------------------------------------------------------------------

const reviewTemplates = [
  {
    names: ["Sarah M.", "Jessica L.", "Amanda K.", "Brittany R.", "Lauren P.", "Megan T.", "Ashley W.", "Courtney D."],
    fiveStarBodies: [
      "Absolutely loved my spray tan! The color was natural and even, and it lasted over a week. My artist was professional, on time, and made the whole experience so comfortable. Will definitely be booking again!",
      "Best spray tan I have ever had. The custom color matching was perfect for my skin tone — no orange, no streaks, just a beautiful golden glow. My friends all thought I had just come back from vacation.",
      "I was nervous about my first spray tan but my artist put me completely at ease. She explained every step, applied barrier cream perfectly, and the result was absolutely stunning. I looked amazing at my event!",
      "This was my third time booking and the results are consistently incredible. Even application, beautiful fade, and it lasts 9-10 days with proper care. I recommend them to everyone I know.",
      "Got a spray tan for my wedding and it was perfection. The trial session helped us find the exact right shade, and the final tan on wedding day was flawless. Every photo looked incredible.",
      "I have been going to this artist for six months now and every single tan is perfect. She uses amazing solution that smells great and develops into the most natural color. Worth every penny.",
      "Got a group spray tan for my bachelorette party and it was such a fun experience! All five of us looked incredible and the group discount made it super affordable. Highly recommend!",
      "My artist was amazing — she contoured my abs and collar bones and the result looked so natural. The solution dried quickly and I barely noticed the spray tan smell. Will be a regular client now.",
    ],
    fourStarBodies: [
      "Really nice spray tan — even color and lasted about a week. Only reason for 4 stars instead of 5 is the slightly earlier fade on my hands, but that is pretty normal. Would definitely book again.",
      "Great experience overall. My artist was friendly and professional, the color was beautiful, and the application was quick. Just wish the solution had a bit less scent during development. Still a great tan!",
    ],
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

async function seed() {
  console.log("Starting seed...\n");

  for (const city of cities) {
    console.log(`Seeding ${city.city}, ${city.stateAbbr}...`);

    for (const biz of city.businesses) {
      const listingSlug = slug(biz.name, city.city, city.stateAbbr);

      // Upsert listing
      const { data: listing, error: listingErr } = await supabase
        .from("st_listings")
        .upsert(
          {
            slug: listingSlug,
            business_name: biz.name,
            owner_name: biz.owner,
            email: biz.email,
            phone: biz.phone,
            website: biz.website,
            instagram: biz.instagram,
            description: biz.description,
            city: city.city,
            state: city.state,
            state_abbr: city.stateAbbr,
            zip_codes: city.zips,
            cities_served: city.citiesServed,
            solutions: biz.solutions,
            price_range: biz.priceRange,
            is_mobile: true,
            featured: biz.featured,
            status: "approved",
            rating: biz.rating,
            review_count: biz.reviewCount,
          },
          { onConflict: "slug" }
        )
        .select("id")
        .single();

      if (listingErr) {
        console.error(`  Error upserting ${biz.name}:`, listingErr.message);
        continue;
      }

      console.log(`  ✓ ${biz.name} (${listingSlug})`);

      // Insert 2 reviews per listing
      const names = reviewTemplates[0].names;
      const fiveStar = reviewTemplates[0].fiveStarBodies;
      const fourStar = reviewTemplates[0].fourStarBodies;

      const reviews = [
        {
          listing_id: listing.id,
          reviewer_name: pick(names),
          rating: 5,
          body: pick(fiveStar),
        },
        {
          listing_id: listing.id,
          reviewer_name: pick(names),
          rating: Math.random() > 0.3 ? 5 : 4,
          body: Math.random() > 0.3 ? pick(fiveStar) : pick(fourStar),
        },
      ];

      const { error: reviewErr } = await supabase
        .from("st_reviews")
        .upsert(reviews, { onConflict: "id" });

      if (reviewErr) {
        console.error(`  Error inserting reviews for ${biz.name}:`, reviewErr.message);
      } else {
        console.log(`    + 2 reviews`);
      }
    }
  }

  console.log("\nSeed complete! 50 listings across 10 cities with 100 reviews.");
}

seed().catch(console.error);
