"use client";

import { useState } from "react";
import { ShieldCheck, CheckCircle } from "lucide-react";

export default function ClaimListingPage() {
  const [form, setForm] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "claim_request", ...form }),
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
            Claim Request Submitted!
          </h1>
          <p className="mt-3 text-espresso/60">
            Your claim request has been submitted. We&apos;ll verify and connect
            you within 48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-b from-peach/20 to-sand section-padding">
        <div className="container-narrow max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-bronzed-gold/10">
            <ShieldCheck className="h-6 w-6 text-bronzed-gold" />
          </div>
          <h1 className="font-display text-3xl text-espresso sm:text-4xl">
            Claim Your Listing
          </h1>
          <p className="mt-3 text-espresso/60">
            We&apos;ve already listed your business based on public information.
            Claim your listing to update your description, add photos, and
            respond to reviews.
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
              Claim Details
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
                  placeholder="Search for your business name as it appears on our site"
                />
                <p className="mt-1 text-xs text-espresso/40">
                  Enter your business name exactly as it appears in our directory
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-espresso">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.contact_name}
                    onChange={(e) =>
                      setForm({ ...form, contact_name: e.target.value })
                    }
                    className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-espresso">
                    Your Role *
                  </label>
                  <select
                    required
                    value={form.role}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value })
                    }
                    className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
                  >
                    <option value="">Select your role...</option>
                    <option value="owner">Owner</option>
                    <option value="manager">Manager</option>
                    <option value="authorized_rep">Authorized Representative</option>
                  </select>
                </div>
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
                  What would you like to update?
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold resize-none"
                  placeholder="Tell us what information you'd like to correct or add — updated description, photos, services, etc."
                />
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
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Submit Claim Request
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
