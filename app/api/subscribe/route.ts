import WelcomeEmail from "@/email/WelcomeEmail";
import { writeClient } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Store subscriber in Sanity
    await writeClient.create({
      _type: "subscriber",
      name,
      email,
    });

    // 2. Send Welcome Email
    await resend.emails.send({
      from: "The Orb <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to The Orb",
      react: WelcomeEmail({ name: name }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
