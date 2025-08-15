import LaunchDayEmail from "@/email/LaunchDayEmail";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";
 

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const subscribers = await client.fetch(
      `*[_type == "subscriber"]{name, email}`
    );

    for (const sub of subscribers) {
      await resend.emails.send({
        from: "Launch Team <no-reply@yourdomain.com>",
        to: sub.email,
        subject: "🚀 The Wait is Over!",
        react: LaunchDayEmail({ name: sub.name, url: "https://sidharth-sangelia.vercel.app" }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending launch emails:", error);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
