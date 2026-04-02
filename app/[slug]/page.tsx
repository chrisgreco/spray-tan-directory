import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { cities, getCityBySlug } from "@/data/cities";
import { solutions, getSolutionBySlug } from "@/data/solutions";
import { supabase } from "@/lib/supabase";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import ArtistCard from "@/components/ArtistCard";
import LeadForm from "@/components/LeadForm";
import FAQSection from "@/components/FAQSection";
import MvAdBox from "@/components/MvAdBox";

interface PageProps {
  params: { slug: string };
}

function isCitySlug(slug: string): boolean {
  return slug.startsWith("spray-tan-");
}

function isSolutionSlug(slug: string): boolean {
  return slug.endsWith("-spray-tan");
}

export async function generateStaticParams() {
  const cityParams = cities.map((c) => ({ slug: c.slug }));
  const solutionParams = solutions.map((s) => ({ slug: s.slug }));
  return [...cityParams, ...solutionParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  if (isCitySlug(slug)) {
    const city = getCityBySlug(slug);
    if (!city) return {};
    return {
      title: `Spray Tan Artists in ${city.name}, ${city.stateAbbr} — ${SITE_NAME}`,
      description: `Find top-rated mobile spray tan artists in ${city.name}, ${city.stateAbbr}. Compare prices, read reviews, and book your perfect glow today.`,
      openGraph: {
        title: `Spray Tan Artists in ${city.name}, ${city.stateAbbr}`,
        description: `Find top-rated mobile spray tan artists in ${city.name}, ${city.stateAbbr}.`,
        url: `${SITE_URL}/${slug}`,
      },
    };
  }

  if (isSolutionSlug(slug)) {
    const solution = getSolutionBySlug(slug);
    if (!solution) return {};
    return {
      title: `${solution.title} — ${SITE_NAME}`,
      description: solution.metaDescription,
      openGraph: {
        title: solution.title,
        description: solution.metaDescription,
        url: `${SITE_URL}/${slug}`,
      },
    };
  }

  return {};
}

async function getListings(slug: string) {
  try {
    if (isCitySlug(slug)) {
      const city = getCityBySlug(slug);
      if (!city) return [];
      const { data } = await supabase
        .from("st_listings")
        .select("*")
        .eq("city", city.name)
        .eq("state", city.stateAbbr)
        .order("featured", { ascending: false })
        .order("rating", { ascending: false });
      return data || [];
    }
    if (isSolutionSlug(slug)) {
      const solution = getSolutionBySlug(slug);
      if (!solution) return [];
      const solutionKey = solution.slug.replace("-spray-tan", "").replace(/-/g, "_");
      const { data } = await supabase
        .from("st_listings")
        .select("*")
        .contains("solutions", [solutionKey])
        .order("featured", { ascending: false })
        .order("rating", { ascending: false });
      return data || [];
    }
    return [];
  } catch {
    return [];
  }
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = params;

  const isCity = isCitySlug(slug);
  const isSolution = isSolutionSlug(slug);

  if (!isCity && !isSolution) {
    notFound();
  }

  const city = isCity ? getCityBySlug(slug) : null;
  const solution = isSolution ? getSolutionBySlug(slug) : null;

  if ((isCity && !city) || (isSolution && !solution)) {
    notFound();
  }

  const listings = await getListings(slug);

  const pageTitle = isCity
    ? `Spray Tan Artists in ${city!.name}, ${city!.stateAbbr}`
    : solution!.title;

  const pageDescription = isCity
    ? `Find the best mobile spray tan artists in ${city!.name}, ${city!.state}. Browse verified professionals, read real reviews, and book your perfect tan.`
    : solution!.description;

  const cityFaqs = [
    {
      question: `How much does a spray tan cost in ${city?.name || "my area"}?`,
      answer: `Spray tan prices in ${city?.name || "most areas"} typically range from $35 to $75 for a standard session. Mobile spray tans may cost $50-$100+ as the artist comes to you. Bridal and competition tans can run $75-$150+. Many artists offer package deals for regular clients.`,
    },
    {
      question: "How do I prepare for a spray tan?",
      answer: "Exfoliate your skin 24 hours before your appointment, shave at least 12 hours prior, and avoid moisturizers, deodorant, and makeup on the day of your tan. Wear loose, dark clothing to your appointment and avoid getting wet for 8-10 hours after application.",
    },
    {
      question: "How long does a spray tan last?",
      answer: "A professional spray tan typically lasts 5 to 10 days depending on your skin type, aftercare routine, and the solution used. Moisturizing daily and avoiding long baths or swimming can help extend your tan.",
    },
    {
      question: `Are these spray tan artists in ${city?.name || "my area"} verified?`,
      answer: `Yes, we verify all spray tan artists listed on SprayTan.com. Our verification process includes checking business credentials, insurance, and client reviews to ensure you're connecting with legitimate, professional artists.`,
    },
    {
      question: "What's the difference between mobile and salon spray tans?",
      answer: "Mobile spray tan artists come to your home, office, or event venue with all their equipment. This is more convenient and private, though it may cost slightly more. Salon spray tans are done at a fixed location and may offer more amenities like private rooms and changing areas.",
    },
  ];

  const solutionFaqs = [
    {
      question: `What is a ${solution?.name.toLowerCase() || ""} spray tan?`,
      answer: solution?.description || "A specialized spray tan service tailored to your specific needs.",
    },
    {
      question: "How much does this type of spray tan cost?",
      answer: "Pricing varies by location and artist, but you can expect to pay between $40 and $150 depending on the complexity and specialization required. Use our directory to compare specific prices in your area.",
    },
    {
      question: "How do I book a spray tan artist?",
      answer: "Browse our directory to find artists in your area, read their reviews and check their pricing, then contact them directly through their listing page or use our Get 3 Free Quotes form to be matched with top-rated professionals.",
    },
    {
      question: "Are the artists on SprayTan.com insured?",
      answer: "We encourage all listed artists to carry professional liability insurance. Many of our verified artists are fully insured. Check individual listing pages for specific insurance and certification details.",
    },
  ];

  const faqs = isCity ? cityFaqs : solutionFaqs;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageTitle,
    description: pageDescription,
    numberOfItems: listings.length,
    itemListElement: listings.slice(0, 10).map((listing: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: listing.business_name,
        address: {
          "@type": "PostalAddress",
          addressLocality: listing.city,
          addressRegion: listing.state,
        },
        aggregateRating: listing.review_count > 0
          ? {
              "@type": "AggregateRating",
              ratingValue: listing.rating,
              reviewCount: listing.review_count,
            }
          : undefined,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-peach/20 to-sand section-padding">
        <div className="container-narrow">
          <nav className="mb-6 flex items-center gap-2 text-sm text-espresso/50">
            <Link href="/" className="hover:text-bronzed-gold">
              Home
            </Link>
            <span>/</span>
            {isCity ? (
              <span className="text-espresso">{city!.name}, {city!.stateAbbr}</span>
            ) : (
              <span className="text-espresso">{solution!.name}</span>
            )}
          </nav>

          <h1 className="font-display text-3xl text-espresso sm:text-4xl lg:text-5xl">
            {pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-espresso/60">
            {pageDescription}
          </p>

          {isCity && (
            <div className="mt-4 flex items-center gap-2 text-sm text-espresso/50">
              <MapPin className="h-4 w-4 text-bronzed-gold" />
              <span>
                {city!.name}, {city!.state}
              </span>
              <span className="rounded-full bg-bronzed-gold/10 px-2 py-0.5 text-xs text-bronzed-gold">
                {listings.length} artist{listings.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Listings Grid + Sidebar */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2">
              {listings.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {listings.map((listing: any) => (
                    <ArtistCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-white p-10 text-center">
                  <h3 className="font-display text-xl text-espresso">
                    No artists listed yet
                  </h3>
                  <p className="mt-2 text-sm text-espresso/60">
                    Be the first spray tan artist listed in this area!
                  </p>
                  <Link href="/add-listing" className="btn-primary mt-6">
                    List Your Business
                  </Link>
                </div>
              )}

              {/* Ad space */}
              <div className="mt-8">
                <MvAdBox slot="content-bottom" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <LeadForm
                city={city?.name}
                state={city?.stateAbbr}
                serviceType={solution?.slug}
              />
              <MvAdBox slot="sidebar" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl">
          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* Related links */}
      {isCity && (
        <section className="section-padding">
          <div className="container-narrow">
            <h2 className="font-display text-2xl text-espresso">
              Spray Tan Services in {city!.name}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {solutions.slice(0, 4).map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-peach/30 bg-white p-4 transition-all hover:border-bronzed-gold/30"
                >
                  <span className="text-sm font-medium text-espresso group-hover:text-bronzed-gold">
                    {s.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-bronzed-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
