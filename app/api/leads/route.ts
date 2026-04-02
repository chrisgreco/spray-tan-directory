import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";
import { SITE_NAME } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, city, state, message, service_type, listing_id } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("st_leads").insert([
      {
        name,
        email,
        phone: phone || null,
        city: city || null,
        state: state || null,
        message: message || null,
        service_type: service_type || null,
        listing_id: listing_id || null,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    // Send notification email
    try {
      const resend = getResend();
      await resend.emails.send({
        from: `${SITE_NAME} <noreply@spraytan.com>`,
        to: ["admin@spraytan.com"],
        subject: `New Lead: ${name} in ${city || "Unknown"}, ${state || ""}`,
        html: `
          <h2>New Lead from ${SITE_NAME}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>City:</strong> ${city || "Not provided"}, ${state || ""}</p>
          <p><strong>Service:</strong> ${service_type || "Not specified"}</p>
          <p><strong>Message:</strong> ${message || "None"}</p>
        `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
