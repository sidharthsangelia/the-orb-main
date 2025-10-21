import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

// Optional: Verify webhook secret to prevent abuse
function verifySanitySecret(req: NextRequest): boolean {
  const secret = req.headers.get("x-sanity-webhook-signature");
  return secret === process.env.SANITY_WEBHOOK_SECRET;
}

export async function POST(req: NextRequest) {
  try {
    if (!verifySanitySecret(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await req.json();

    const { _id, subject, content, title, status } = payload;
    if (!subject || !content || !status) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    console.log(`📨 Received newsletter "${title}" (${_id}) from Sanity`);

    // Fetch all subscribers
    const subscribers = await prisma.subscriber.findMany();

    if (!subscribers.length) {
      console.log("⚠️ No subscribers found — skipping send.");
      return NextResponse.json({ message: "No subscribers to send." });
    }

    // Render the HTML email (for now, simple text; replace with your template)
    const htmlBody = renderEmailHTML(content);

    // Send to all subscribers (Resend handles rate limiting internally)
    for (const sub of subscribers) {
      await resend.emails.send({
        from: "The Orb Weekly <sameer@theorbearth.in>",
        to: sub.email,
        subject,
        html: htmlBody,
      });
    }

    // Optionally, mark newsletter as sent in Sanity
    // await markAsSentInSanity(_id);

    console.log(
      `✅ Newsletter "${title}" sent to ${subscribers.length} subscribers.`
    );

    return NextResponse.json({ success: true, sent: subscribers.length });
  } catch (error) {
    console.error("❌ Newsletter webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/** Convert Sanity Portable Text blocks into minimal HTML */
function renderEmailHTML(content: any[]): string {
  // For a simple version, just render plain text; use @portabletext/to-html for production
  const textBlocks = content
    .map((block) => block?.children?.map((child: any) => child.text).join(" "))
    .join("<br/><br/>");

  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        ${textBlocks}
      </body>
    </html>
  `;
}

/** Update newsletter status in Sanity to "sent" */
// async function markAsSentInSanity(documentId: string) {
//   try {
//     const response = await fetch(
//       `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2023-08-01/data/mutate/${process.env.SANITY_DATASET}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.SANITY_WRITE_TOKEN}`,
//         },
//         body: JSON.stringify({
//           mutations: [{ patch: { id: documentId, set: { status: "sent" } } }],
//         }),
//       }
//     );

//     if (!response.ok) {
//       console.error("⚠️ Failed to update status in Sanity");
//     }
//   } catch (err) {
//     console.error("Error updating Sanity status:", err);
//   }
// }
