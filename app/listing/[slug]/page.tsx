import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { formatRating } from "@/lib/utils";
import LeadForm from "@/components/LeadForm";
import MvAdBox from "@/components/MvAdBox";

interface PageProps {
  params: { slug: string };
}

async function getListing(slug: string) {
  try {
    const { data } = await supabase
      .from("st_listings")
      .select("*")
      .eq("slug", slug)
      .single();
    return data;
  } catch {
    return null;
  }
}

async function getReviews(listingId: string) {
  try {
    const { data } = await supabase
      .from("st_reviews")
      .select("*")
      .eq("listing_id", listingId)
      .order("created_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const listing = await getListing(params.slug);
  if (!listing) return {};
  return {
    title: `${listing.business_name} — Spray Tan in ${listing.city}, ${listing.state}`,
    description: `${listing.business_name} offers professional spray tan services in ${listing.city}, ${listing.state}. ${listing.rating} stars from ${listing.review_count} reviews.`,
    openGraph: {
      title: `${listing.business_name} — Spray Tan in ${listing.city}, ${listing.state}`,
      description: listing.description?.slice(0, 160),
      url: `${SITE_URL}/listing/${params.slug}`,
    },
  };
}

export default async function ListingPage({ params }: PageProps) {
  const listing = await getListing(params.slug);
  if (!listing) notFound();

  const reviews = await getReviews(listing.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: listing.business_name,
    description: listing.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip,
    },
    telephone: listing.phone,
    email: listing.email,
    url: listing.website,
    aggregateRating:
      listing.review_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: listing.rating,
            reviewCount: listing.review_count,
          }
        : undefined,
    review: reviews.slice(0, 5).map((r: any) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author_name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
      },
      reviewBody: r.comment,
      datePublished: r.created_at,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section-padding bg-gradient-to-b from-peach/20 to-sand">
        <div className="container-narrow">
          <Link
            href={`/spray-tan-${listing.city.toLowerCase().replace(/\s+/g, "-")}-${listing.state.toLowerCase()}`}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-espresso/50 hover:text-bronzed-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {listing.city} artists
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                {/* Image */}
                <div className="relative mb-6 h-56 overflow-hidden rounded-xl bg-gradient-to-br from-peach/40 to-bronzed-gold/20 sm:h-72">
                  {listing.image_url ? (
                    <img
                      src={listing.image_url}
                      alt={listing.business_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-display text-5xl text-bronzed-gold/30">
                        {listing.business_name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {listing.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-bronzed-gold px-4 py-1 text-sm font-semibold text-white shadow-md">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-display text-2xl text-espresso sm:text-3xl">
                      {listing.business_name}
                    </h1>
                    <div className="mt-2 flex items-center gap-2 text-sm text-espresso/60">
                      <MapPin className="h-4 w-4" />
                      {listing.city}, {listing.state} {listing.zip}
                    </div>
                  </div>
                  {listing.verified && (
                    <div className="flex items-center gap-1 rounded-full bg-bronzed-gold/10 px-3 py-1">
                      <CheckCircle className="h-4 w-4 text-bronzed-gold" />
                      <span className="text-xs font-medium text-bronzed-gold">
                        Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(listing.rating)
                            ? "fill-bronzed-gold text-bronzed-gold"
                            : "fill-none text-espresso/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-espresso">
                    {formatRating(listing.rating)}
                  </span>
                  <span className="text-sm text-espresso/50">
                    ({listing.review_count} reviews)
                  </span>
                </div>

                {/* Price */}
                {listing.price_range && (
                  <div className="mt-3 text-lg font-semibold text-bronzed-gold">
                    {listing.price_range}
                  </div>
                )}

                {/* Description */}
                <p className="mt-6 leading-relaxed text-espresso/70">
                  {listing.description}
                </p>

                {/* Solutions */}
                {listing.solutions && listing.solutions.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold text-espresso">
                      Services Offered
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.solutions.map((s: string) => (
                        <span
                          key={s}
                          className="rounded-full bg-peach/30 px-3 py-1 text-sm text-espresso/70"
                        >
                          {s.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact */}
                <div className="mt-8 grid gap-3 border-t border-peach/20 pt-6 sm:grid-cols-2">
                  {listing.phone && (
                    <a
                      href={`tel:${listing.phone}`}
                      className="flex items-center gap-2 rounded-lg border border-peach/30 p-3 text-sm text-espresso transition-colors hover:border-bronzed-gold"
                    >
                      <Phone className="h-4 w-4 text-bronzed-gold" />
                      {listing.phone}
                    </a>
                  )}
                  {listing.email && (
                    <a
                      href={`mailto:${listing.email}`}
                      className="flex items-center gap-2 rounded-lg border border-peach/30 p-3 text-sm text-espresso transition-colors hover:border-bronzed-gold"
                    >
                      <Mail className="h-4 w-4 text-bronzed-gold" />
                      {listing.email}
                    </a>
                  )}
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-peach/30 p-3 text-sm text-espresso transition-colors hover:border-bronzed-gold"
                    >
                      <Globe className="h-4 w-4 text-bronzed-gold" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="font-display text-xl text-espresso">
                  Reviews ({reviews.length})
                </h2>
                {reviews.length > 0 ? (
                  <div className="mt-6 space-y-6">
                    {reviews.map((review: any) => (
                      <div
                        key={review.id}
                        className="border-b border-peach/20 pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-espresso">
                            {review.author_name}
                          </span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3.5 w-3.5 ${
                                  star <= review.rating
                                    ? "fill-bronzed-gold text-bronzed-gold"
                                    : "fill-none text-espresso/20"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-espresso/70">
                          {review.comment}
                        </p>
                        <span className="mt-2 flex items-center gap-1 text-xs text-espresso/40">
                          <Clock className="h-3 w-3" />
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-espresso/50">
                    No reviews yet. Be the first to leave a review!
                  </p>
                )}
              </div>

              <div className="mt-8">
                <MvAdBox slot="listing-bottom" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <LeadForm
                city={listing.city}
                state={listing.state}
                listingId={listing.id}
              />
              <MvAdBox slot="listing-sidebar" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
