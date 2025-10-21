import { NextRequest, NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY!);
const secret = process.env.SANITY_WEBHOOK_SECRET!;

// Helper: read raw request body
async function readBody(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const total = chunks.reduce((acc, chunk) => {
    const tmp = new Uint8Array(acc.length + chunk.length);
    tmp.set(acc);
    tmp.set(chunk, acc.length);
    return tmp;
  }, new Uint8Array());
  return Buffer.from(total).toString("utf8");
}

export async function POST(req: NextRequest) {
  try {
    // Read body as string for signature verification
    const body = await readBody(req.body!);
    const signature = req.headers.get(SIGNATURE_HEADER_NAME) || "";

    // ✅ Verify signature using Sanity secret
    const isValid = await isValidSignature(body, signature, secret);
    if (!isValid) {
      console.warn("⚠️ Invalid webhook signature");
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 401 });
    }

    // Parse the verified JSON payload
    const payload = JSON.parse(body);
    const { _id, subject, content, title, status } = payload;

    if (!subject || !content || !status) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    console.log(`📨 Received verified newsletter "${title}" (${_id}) from Sanity`);

    // Fetch all subscribers
    const subscribers = await prisma.subscriber.findMany();
    if (!subscribers.length) {
      console.log("⚠️ No subscribers found — skipping send.");
      return NextResponse.json({ message: "No subscribers to send." });
    }

    // Render HTML body
    const htmlBody = renderEmailHTML(content);

    // Send emails
    for (const sub of subscribers) {
      await resend.emails.send({
        from: "The Orb Weekly <sameer@theorbearth.in>",
        to: sub.email,
        subject,
        html: htmlBody,
      });
    }

    console.log(`✅ Newsletter "${title}" sent to ${subscribers.length} subscribers.`);

    return NextResponse.json({ success: true, sent: subscribers.length });
  } catch (error) {
    console.error("❌ Newsletter webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** Convert Sanity Portable Text blocks into minimal HTML */
function renderEmailHTML(content: any[]): string {
  const textBlocks = content
    .map((block) =>
      block?.children?.map((child: any) => child.text).join(" ")
    )
    .join("<br/><br/>");

  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        ${textBlocks}
      </body>
    </html>
  `;
}
