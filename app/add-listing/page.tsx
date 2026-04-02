"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { solutions } from "@/data/solutions";

export default function AddListingPage() {
  const [form, setForm] = useState({
    business_name: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    state: "",
    zip: "",
    description: "",
    solutions: [] as string[],
    price_range: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSolutionToggle = (slug: string) => {
    setForm((prev) => ({
      ...prev,
      solutions: prev.solutions.includes(slug)
        ? prev.solutions.filter((s) => s !== slug)
        : [...prev.solutions, slug],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="section-padding">
        <div className="container-narrow max-w-xl text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-bronzed-gold" />
          <h1 className="mt-6 font-display text-3xl text-espresso">
            Listing Submitted!
          </h1>
          <p className="mt-3 text-espresso/60">
            Thank you for submitting your listing. Our team will review it and
            get it published within 24-48 hours. You&apos;ll receive a
            confirmation email once your listing is live.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-b from-peach/20 to-sand section-padding">
        <div className="container-narrow max-w-2xl text-center">
          <h1 className="font-display text-3xl text-espresso sm:text-4xl">
            List Your Spray Tan Business
          </h1>
          <p className="mt-3 text-espresso/60">
            Get discovered by thousands of clients searching for spray tan
            artists in your area. Listing is free and takes just a few minutes.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="font-display text-xl text-espresso">
              Business Details
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-espresso">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.business_name}
                  onChange={(e) =>
                    setForm({ ...form, business_name: e.target.value })
                  }
                  className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
                  placeholder="e.g., Golden Hour Spray Tans"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-espresso">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-espresso">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-espresso">
                  Website
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
                  placeholder="https://"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-espresso">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-espresso">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
                    placeholder="e.g., FL"
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-espresso">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={(e) =>
                      setForm({ ...form, zip: e.target.value })
                    }
                    className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
                    maxLength={5}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-espresso">
                  Price Range
                </label>
                <select
                  value={form.price_range}
                  onChange={(e) =>
                    setForm({ ...form, price_range: e.target.value })
                  }
                  className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
                >
                  <option value="">Select price range</option>
                  <option value="$25-$50">$25-$50</option>
                  <option value="$50-$75">$50-$75</option>
                  <option value="$75-$100">$75-$100</option>
                  <option value="$100-$150">$100-$150</option>
                  <option value="$150+">$150+</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-espresso">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold resize-none"
                  placeholder="Tell clients about your services, experience, and what makes you unique..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-espresso">
                  Services Offered
                </label>
                <div className="flex flex-wrap gap-2">
                  {solutions.map((s) => (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() =>
                        handleSolutionToggle(
                          s.slug.replace("-spray-tan", "").replace(/-/g, "_")
                        )
                      }
                      className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                        form.solutions.includes(
                          s.slug.replace("-spray-tan", "").replace(/-/g, "_")
                        )
                          ? "bg-bronzed-gold text-white"
                          : "border border-peach/50 bg-sand text-espresso/70 hover:border-bronzed-gold"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary mt-8 w-full disabled:opacity-60"
            >
              {status === "loading" ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Listing
                </>
              )}
            </button>

            {status === "error" && (
              <p className="mt-3 text-center text-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
