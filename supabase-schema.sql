-- ==========================================================================
-- SprayTan.com Database Schema
-- ==========================================================================

-- Listings table
create table st_listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  business_name text not null,
  owner_name text,
  email text,
  phone text,
  website text,
  instagram text,
  description text,
  city text not null,
  state text not null,
  state_abbr text not null,
  zip_codes text[],
  cities_served text[],
  solutions text[],
  price_range text,
  is_mobile boolean default true,
  featured boolean default false,
  status text default 'pending',
  rating numeric(3,2),
  review_count integer default 0,
  photos text[],
  created_at timestamptz default now()
);

-- Reviews table
create table st_reviews (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references st_listings(id) on delete cascade,
  reviewer_name text,
  rating integer check (rating between 1 and 5),
  body text,
  created_at timestamptz default now()
);

-- Leads table
create table st_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  city text,
  state text,
  occasion text,
  desired_shade text,
  preferred_date text,
  created_at timestamptz default now()
);

-- ==========================================================================
-- Indexes
-- ==========================================================================

create index idx_listings_city_state on st_listings (city, state_abbr);
create index idx_listings_status on st_listings (status);
create index idx_listings_featured on st_listings (featured) where featured = true;
create index idx_listings_slug on st_listings (slug);
create index idx_listings_solutions on st_listings using gin (solutions);
create index idx_listings_rating on st_listings (rating desc nulls last);
create index idx_reviews_listing_id on st_reviews (listing_id);
create index idx_reviews_rating on st_reviews (rating);
create index idx_leads_city_state on st_leads (city, state);
create index idx_leads_created_at on st_leads (created_at desc);

-- ==========================================================================
-- Row-Level Security (RLS)
-- ==========================================================================

alter table st_listings enable row level security;
alter table st_reviews enable row level security;
alter table st_leads enable row level security;

-- Listings: public can read approved listings
create policy "Public can read approved listings"
  on st_listings for select
  using (status = 'approved');

-- Listings: anyone can insert pending listings (new submissions)
create policy "Anyone can submit a listing"
  on st_listings for insert
  with check (status = 'pending');

-- Reviews: public can read all reviews
create policy "Public can read reviews"
  on st_reviews for select
  using (true);

-- Reviews: anyone can insert reviews
create policy "Anyone can submit a review"
  on st_reviews for insert
  with check (true);

-- Leads: anyone can insert leads
create policy "Anyone can submit a lead"
  on st_leads for insert
  with check (true);

-- Leads: no public read (admin only via service role key)
-- No select policy = no public reads
