import { client, writeClient } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
 

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const doc = await writeClient.create({
      _type: "subscriber",
      name,
      email,
    });

    return NextResponse.json(
      { message: "Success", doc },
      { status: 200 }
    );
  } catch (err) {
    console.error("Sanity error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
