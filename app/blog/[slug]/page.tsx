import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { blogPosts, getBlogPostBySlug } from "@/data/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import MvAdBox from "@/components/MvAdBox";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${SITE_NAME}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${params.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function getMdxContent(slug: string): string | null {
  try {
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
    const source = fs.readFileSync(filePath, "utf8");
    const { content } = matter(source);
    return content;
  } catch {
    return null;
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const content = getMdxContent(params.slug);
  if (!content) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="section-padding">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-espresso/50 hover:text-bronzed-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-peach/20 px-2.5 py-0.5 text-xs text-espresso/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl text-espresso sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-espresso/50">
            <span>{post.author}</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <MvAdBox slot="blog-top" className="my-8" />

          <div className="prose mt-8">
            <MDXRemote source={content} />
          </div>

          <MvAdBox slot="blog-bottom" className="my-8" />

          <div className="mt-12 rounded-2xl bg-gradient-to-br from-peach/20 to-bronzed-gold/10 p-8 text-center">
            <h3 className="font-display text-xl text-espresso">
              Ready to Find Your Perfect Spray Tan Artist?
            </h3>
            <p className="mt-2 text-sm text-espresso/60">
              Browse top-rated artists in your area and book your glow today.
            </p>
            <Link href="/" className="btn-primary mt-6">
              Search Artists Near You
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
