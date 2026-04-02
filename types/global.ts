export interface Listing {
  id: string;
  slug: string;
  business_name: string;
  owner_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  description: string | null;
  city: string;
  state: string;
  state_abbr: string;
  zip_codes: string[];
  cities_served: string[];
  solutions: string[];
  price_range: string | null;
  is_mobile: boolean;
  featured: boolean;
  status: string;
  rating: number | null;
  review_count: number;
  photos: string[];
  image_url: string | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  listing_id: string;
  reviewer_name: string | null;
  rating: number;
  body: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  occasion: string | null;
  desired_shade: string | null;
  preferred_date: string | null;
  created_at: string;
}

export interface City {
  name: string;
  state: string;
  stateAbbr: string;
  slug: string;
  tier: "metro" | "mid" | "small";
  latitude?: number;
  longitude?: number;
  population?: number;
}

export interface Solution {
  name: string;
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  avgCostLow: number;
  avgCostHigh: number;
  icon?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}
