import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Spray Tan Tips, Guides & Expert Advice — ${SITE_NAME}`,
  description:
    "Expert spray tan guides, pricing tips, preparation checklists, and aftercare advice. Everything you need for your best glow.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-peach/20 to-sand section-padding">
        <div className="container-narrow">
          <h1 className="font-display text-3xl text-espresso sm:text-4xl">
            Spray Tan Tips & Guides
          </h1>
          <p className="mt-3 max-w-xl text-espresso/60">
            Expert advice, pricing guides, and everything you need to know
            about getting the perfect spray tan.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card group overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-peach/30 to-bronzed-gold/10" />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-peach/20 px-2.5 py-0.5 text-xs text-espresso/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 font-display text-lg text-espresso group-hover:text-bronzed-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-espresso/60 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-espresso/40">
                    <span>{post.author}</span>
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
