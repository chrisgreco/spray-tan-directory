# SprayTan.com — Mobile Spray Tan Artist Directory

A Next.js directory site that helps people find mobile spray tan artists by city and service type. Built with Next.js 14, Supabase, Tailwind CSS, and MDX.

## Quick Start

### 1. Clone and Install

```bash
git clone <repo-url>
cd spray-tan-directory
npm install
```

### 2. Environment Variables

Create `.env.local` with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://spraytan.com
NEXT_PUBLIC_SITE_DOMAIN=spraytan.com
RESEND_API_KEY=your_resend_key
```

### 3. Database Setup

Run the SQL schema in your Supabase SQL editor:

```bash
# Copy contents of supabase-schema.sql into Supabase SQL Editor and execute
```

### 4. Seed Data

```bash
npm run seed
```

This inserts 50 listings across 10 cities with 100 reviews.

### 5. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Deploy to Vercel

```bash
npx vercel --prod
```

Set environment variables in Vercel dashboard before deploying.

## Project Structure

```
app/                  # Next.js App Router pages
  blog/               # Blog index and [slug] pages
  listing/[slug]/     # Individual listing pages
  [slug]/             # City and service pages
  api/                # API routes (leads, listings)
components/           # React components
content/blog/         # MDX blog articles
data/                 # Static data (cities, solutions, blog metadata)
lib/                  # Supabase clients, utilities
scripts/              # Database seed script
public/               # Static assets including llms.txt
```

## Post-Launch LLM SEO Checklist

- [ ] Verify `/llms.txt` and `/llms-full.txt` are accessible and return correct content
- [ ] Ensure all city pages have unique meta descriptions referencing the city name
- [ ] Confirm structured data (JSON-LD) is present on listing pages and blog articles
- [ ] Check that `robots.txt` allows crawling of all public pages
- [ ] Verify all sitemaps are generated and accessible (`/sitemap.xml`, `/sitemap-cities.xml`, `/sitemap-listings.xml`, `/sitemap-blog.xml`, `/sitemap-services.xml`)
- [ ] Test that blog articles render correctly via MDX with no missing imports
- [ ] Ensure all FAQ sections use proper FAQ schema markup
- [ ] Validate that listing pages include review schema markup
- [ ] Confirm canonical URLs are set on all pages
- [ ] Test LLM discovery: ask ChatGPT/Claude "find a spray tan artist in [city]" and verify the site surfaces

## Monetization Summary

1. **Featured Listings**: Spray tan artists pay for premium placement in city results ($29–$79/month)
2. **Lead Generation**: Collect client inquiries via the lead form and sell qualified leads to listed artists ($5–$15/lead)
3. **Affiliate Links**: Blog articles link to recommended spray tan products (solutions, prep kits, aftercare) with affiliate tracking
4. **Display Advertising**: Ad slots on blog posts and city pages via MvAdBox component
5. **Listing Submission Fee**: Optional paid fast-track approval for new business submissions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Content**: MDX via next-mdx-remote
- **Email**: Resend
- **Hosting**: Vercel
