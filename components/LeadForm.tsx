"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

interface LeadFormProps {
  city?: string;
  state?: string;
  listingId?: string;
  serviceType?: string;
}

export default function LeadForm({
  city = "",
  state = "",
  listingId,
  serviceType = "",
}: LeadFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: city,
    state: state,
    message: "",
    service_type: serviceType,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, listing_id: listingId }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", city: "", state: "", message: "", service_type: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <CheckCircle className="mx-auto h-12 w-12 text-bronzed-gold" />
        <h3 className="mt-4 font-display text-xl text-espresso">
          Request Sent!
        </h3>
        <p className="mt-2 text-sm text-espresso/60">
          We&apos;ll connect you with top-rated spray tan artists in your area.
          Expect to hear back within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      <h3 className="font-display text-xl text-espresso">
        Get 3 Free Quotes
      </h3>
      <p className="mt-1 text-sm text-espresso/60">
        Tell us what you need and we&apos;ll match you with top local artists.
      </p>

      <div className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Your name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
        />
        <input
          type="email"
          placeholder="Email address"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
          />
          <input
            type="text"
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold"
          />
        </div>
        <textarea
          placeholder="Tell us about your event or needs (optional)"
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border border-peach/50 bg-sand px-4 py-3 text-sm text-espresso outline-none focus:border-bronzed-gold resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-6 w-full disabled:opacity-60"
      >
        {status === "loading" ? (
          "Sending..."
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Get Free Quotes
          </>
        )}
      </button>

      {status === "error" && (
        <p className="mt-3 text-center text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
