import WelcomeEmail from "@/email/WelcomeEmail";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await prisma.subscriber.create({
      data: {
        email: email,
        name: name,
      },
    });

    // Saving the subscriber in resend audience for brodcasting emails

    const { data, error } = await resend.contacts.create({
      email: email,
      firstName: name,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });
    console.log(data, error);

    // 2. Send Welcome Email
    await resend.emails.send({
      from: "Sameer from The Orb <sameer@theorbearth.in>",
      to: email,
      subject: "Welcome to The Orb | NewsLetter",
      react: WelcomeEmail({ name: name }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
