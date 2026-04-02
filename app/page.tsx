import Link from "next/link";
import { ArrowRight, Star, MapPin, Sparkles, Users, Shield } from "lucide-react";
import CitySearch from "@/components/CitySearch";
import { getFeaturedCities } from "@/data/cities";
import { solutions } from "@/data/solutions";
import { blogPosts } from "@/data/blog-posts";
import { supabase } from "@/lib/supabase";
import ArtistCard from "@/components/ArtistCard";
import LeadForm from "@/components/LeadForm";
import { SITE_NAME } from "@/lib/constants";

async function getFeaturedListings() {
  try {
    const { data } = await supabase
      .from("st_listings")
      .select("*")
      .eq("featured", true)
      .order("rating", { ascending: false })
      .limit(6);
    return data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredListings = await getFeaturedListings();
  const featuredCities = getFeaturedCities();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-peach/20 via-sand to-sand">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,136,58,0.08),transparent_60%)]" />
        <div className="container-narrow section-padding relative text-center">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block rounded-full bg-bronzed-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-bronzed-gold">
              The #1 Spray Tan Directory
            </span>
            <h1 className="mt-6 font-display text-4xl leading-tight text-espresso sm:text-5xl lg:text-6xl">
              Find Your Perfect{" "}
              <span className="gold-gradient">Spray Tan Artist</span>
            </h1>
            <p className="mt-5 text-lg text-espresso/60 sm:text-xl">
              Compare top-rated mobile spray tan artists near you. Read
              reviews, check pricing, and book your sun-kissed glow today.
            </p>
            <div className="mt-8 flex justify-center">
              <CitySearch />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-espresso/50">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-bronzed-gold" />
                Verified Artists
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-bronzed-gold" />
                Real Reviews
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-bronzed-gold" />
                200+ Cities
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      {featuredListings.length > 0 && (
        <section className="section-padding">
          <div className="container-narrow">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl text-espresso sm:text-3xl">
                  Featured Artists
                </h2>
                <p className="mt-2 text-espresso/60">
                  Top-rated spray tan professionals chosen for their exceptional
                  work.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredListings.map((listing: any) => (
                <ArtistCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solutions Grid */}
      <section id="solutions" className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="font-display text-2xl text-espresso sm:text-3xl">
              Spray Tan Services
            </h2>
            <p className="mt-2 text-espresso/60">
              Find the perfect spray tan service for any occasion.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/${solution.slug}`}
                className="group rounded-2xl border border-peach/30 bg-sand p-6 transition-all hover:border-bronzed-gold/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bronzed-gold/10">
                  <Sparkles className="h-5 w-5 text-bronzed-gold" />
                </div>
                <h3 className="mt-4 font-display text-lg text-espresso group-hover:text-bronzed-gold transition-colors">
                  {solution.name}
                </h3>
                <p className="mt-1.5 text-sm text-espresso/60 line-clamp-2">
                  {solution.description.slice(0, 100)}...
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-bronzed-gold">
                  Browse artists <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-espresso sm:text-3xl">
                Get Matched With Top Artists
              </h2>
              <p className="mt-3 text-espresso/60">
                Tell us what you&apos;re looking for, and we&apos;ll connect you
                with up to 3 verified spray tan professionals in your area.
                It&apos;s free and there&apos;s no obligation.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-espresso/70">
                <li className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-bronzed-gold/10">
                    <span className="text-xs font-bold text-bronzed-gold">1</span>
                  </div>
                  Tell us your city and service needs
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-bronzed-gold/10">
                    <span className="text-xs font-bold text-bronzed-gold">2</span>
                  </div>
                  We match you with top-rated local artists
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-bronzed-gold/10">
                    <span className="text-xs font-bold text-bronzed-gold">3</span>
                  </div>
                  Compare quotes and book your perfect tan
                </li>
              </ul>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Cities */}
      <section id="cities" className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="font-display text-2xl text-espresso sm:text-3xl">
              Browse by City
            </h2>
            <p className="mt-2 text-espresso/60">
              Find spray tan artists in major cities across the country.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-peach/20 bg-sand p-4 transition-all hover:border-bronzed-gold/30 hover:shadow-sm"
              >
                <MapPin className="h-4 w-4 flex-shrink-0 text-bronzed-gold" />
                <div>
                  <span className="text-sm font-medium text-espresso group-hover:text-bronzed-gold transition-colors">
                    {city.name}
                  </span>
                  <span className="ml-1.5 text-xs text-espresso/40">
                    {city.stateAbbr}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <span className="text-sm text-espresso/50">
              200+ cities covered nationwide
            </span>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl text-espresso sm:text-3xl">
                Spray Tan Tips & Guides
              </h2>
              <p className="mt-2 text-espresso/60">
                Expert advice for your best glow ever.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden items-center gap-1 text-sm font-medium text-bronzed-gold sm:flex"
            >
              All articles <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card group overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-br from-peach/30 to-bronzed-gold/10" />
                <div className="p-5">
                  <span className="text-xs text-espresso/40">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h3 className="mt-2 font-display text-lg text-espresso group-hover:text-bronzed-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-espresso/60 line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/blog"
              className="text-sm font-medium text-bronzed-gold"
            >
              View all articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-espresso to-espresso/95">
        <div className="container-narrow text-center">
          <h2 className="font-display text-2xl text-white sm:text-3xl">
            Own a Listed Business?
          </h2>
          <p className="mt-3 text-white/60">
            Already listed? Claim your profile to update your info, add photos,
            and respond to reviews.
          </p>
          <Link href="/add-listing" className="btn-primary mt-8">
            Claim Your Listing
          </Link>
        </div>
      </section>
    </>
  );
}
