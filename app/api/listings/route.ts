import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { getResend } from "@/lib/resend";
import { SITE_NAME } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      business_name,
      email,
      phone,
      website,
      city,
      state,
      zip,
      description,
      solutions,
      price_range,
    } = body;

    if (!business_name || !email || !city || !state || !description) {
      return NextResponse.json(
        { error: "Required fields: business_name, email, city, state, description" },
        { status: 400 }
      );
    }

    const slug = slugify(`${business_name}-${city}-${state}`);

    const { data, error } = await supabase.from("st_listings").insert([
      {
        slug,
        business_name,
        email,
        phone: phone || null,
        website: website || null,
        city,
        state: state.toUpperCase(),
        zip: zip || null,
        description,
        solutions: solutions || [],
        price_range: price_range || null,
        image_url: null,
        rating: 0,
        review_count: 0,
        featured: false,
        verified: false,
        latitude: 0,
        longitude: 0,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create listing" },
        { status: 500 }
      );
    }

    // Send notification
    try {
      const resend = getResend();
      await resend.emails.send({
        from: `${SITE_NAME} <noreply@spraytan.com>`,
        to: ["admin@spraytan.com"],
        subject: `New Listing Submission: ${business_name}`,
        html: `
          <h2>New Listing Submission</h2>
          <p><strong>Business:</strong> ${business_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Location:</strong> ${city}, ${state} ${zip}</p>
          <p><strong>Services:</strong> ${(solutions || []).join(", ")}</p>
          <p><strong>Price Range:</strong> ${price_range || "Not specified"}</p>
        `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return NextResponse.json({ success: true, slug });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
