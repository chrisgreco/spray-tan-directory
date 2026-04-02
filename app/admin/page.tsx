"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return createClient("https://placeholder.supabase.co", "placeholder");
  }
  return createClient(url, key);
}

interface DashboardData {
  listings: any[];
  leads: any[];
  reviews: any[];
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<DashboardData>({
    listings: [],
    leads: [],
    reviews: [],
  });
  const [activeTab, setActiveTab] = useState<"listings" | "leads" | "reviews">("listings");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin2026") {
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    const supabase = getAdminSupabase();

    async function fetchData() {
      const [listingsRes, leadsRes, reviewsRes] = await Promise.all([
        supabase
          .from("st_listings")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("st_leads")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("st_reviews")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);
      setData({
        listings: listingsRes.data || [],
        leads: leadsRes.data || [],
        reviews: reviewsRes.data || [],
      });
    }
    fetchData();
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="section-padding">
        <div className="mx-auto max-w-sm">
          <h1 className="mb-6 text-center font-display text-2xl text-espresso">
            Admin Dashboard
          </h1>
          <form onSubmit={handleLogin} className="rounded-2xl bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-espresso">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm outline-none focus:border-bronzed-gold"
            />
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="font-display text-2xl text-espresso">Admin Dashboard</h1>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-espresso/50">Listings</p>
            <p className="mt-1 font-display text-2xl text-espresso">
              {data.listings.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-espresso/50">Leads</p>
            <p className="mt-1 font-display text-2xl text-espresso">
              {data.leads.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-espresso/50">Reviews</p>
            <p className="mt-1 font-display text-2xl text-espresso">
              {data.reviews.length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-4 border-b border-peach/30">
          {(["listings", "leads", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-4 py-2 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "border-bronzed-gold text-bronzed-gold"
                  : "border-transparent text-espresso/50 hover:text-espresso"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
          {activeTab === "listings" && (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-peach/20">
                  <th className="px-4 py-3 font-medium text-espresso/60">Business</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">City</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">Rating</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">Featured</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.listings.map((l) => (
                  <tr key={l.id} className="border-b border-peach/10">
                    <td className="px-4 py-3 font-medium text-espresso">
                      {l.business_name}
                    </td>
                    <td className="px-4 py-3 text-espresso/70">
                      {l.city}, {l.state}
                    </td>
                    <td className="px-4 py-3 text-espresso/70">{l.rating}</td>
                    <td className="px-4 py-3">
                      {l.featured ? (
                        <span className="rounded-full bg-bronzed-gold/10 px-2 py-0.5 text-xs text-bronzed-gold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-espresso/30">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-espresso/50">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "leads" && (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-peach/20">
                  <th className="px-4 py-3 font-medium text-espresso/60">Name</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">Email</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">City</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">Service</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.leads.map((l) => (
                  <tr key={l.id} className="border-b border-peach/10">
                    <td className="px-4 py-3 font-medium text-espresso">{l.name}</td>
                    <td className="px-4 py-3 text-espresso/70">{l.email}</td>
                    <td className="px-4 py-3 text-espresso/70">
                      {l.city}, {l.state}
                    </td>
                    <td className="px-4 py-3 text-espresso/70">
                      {l.service_type || "—"}
                    </td>
                    <td className="px-4 py-3 text-espresso/50">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "reviews" && (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-peach/20">
                  <th className="px-4 py-3 font-medium text-espresso/60">Author</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">Rating</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">Comment</th>
                  <th className="px-4 py-3 font-medium text-espresso/60">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.reviews.map((r) => (
                  <tr key={r.id} className="border-b border-peach/10">
                    <td className="px-4 py-3 font-medium text-espresso">
                      {r.author_name}
                    </td>
                    <td className="px-4 py-3 text-espresso/70">{r.rating}/5</td>
                    <td className="max-w-xs truncate px-4 py-3 text-espresso/70">
                      {r.comment}
                    </td>
                    <td className="px-4 py-3 text-espresso/50">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
