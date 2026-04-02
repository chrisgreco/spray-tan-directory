import Link from "next/link";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Listing } from "@/types/global";
import { formatRating } from "@/lib/utils";

interface ArtistCardProps {
  listing: Listing;
}

export default function ArtistCard({ listing }: ArtistCardProps) {
  return (
    <Link href={`/listing/${listing.slug}`} className="card group block overflow-hidden">
      {/* Image area */}
      <div className="relative h-48 bg-gradient-to-br from-peach/40 to-bronzed-gold/20">
        {listing.image_url ? (
          <img
            src={listing.image_url}
            alt={listing.business_name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-3xl text-bronzed-gold/40">
              {listing.business_name.charAt(0)}
            </span>
          </div>
        )}
        {listing.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-bronzed-gold px-3 py-1 text-xs font-semibold text-white shadow-md">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-lg text-espresso group-hover:text-bronzed-gold transition-colors">
            {listing.business_name}
          </h3>
          {listing.verified && (
            <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-bronzed-gold" />
          )}
        </div>

        <div className="mt-1 flex items-center gap-1 text-sm text-espresso/60">
          <MapPin className="h-3.5 w-3.5" />
          <span>
            {listing.city}, {listing.state}
          </span>
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(listing.rating)
                    ? "fill-bronzed-gold text-bronzed-gold"
                    : "fill-none text-espresso/20"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-espresso">
            {formatRating(listing.rating)}
          </span>
          <span className="text-xs text-espresso/50">
            ({listing.review_count} reviews)
          </span>
        </div>

        {/* Solutions */}
        {listing.solutions && listing.solutions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {listing.solutions.slice(0, 3).map((solution) => (
              <span
                key={solution}
                className="rounded-full bg-peach/30 px-2.5 py-0.5 text-xs text-espresso/70"
              >
                {solution.replace(/_/g, " ")}
              </span>
            ))}
            {listing.solutions.length > 3 && (
              <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs text-espresso/50">
                +{listing.solutions.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        {listing.price_range && (
          <div className="mt-3 text-sm font-medium text-bronzed-gold">
            {listing.price_range}
          </div>
        )}
      </div>
    </Link>
  );
}
