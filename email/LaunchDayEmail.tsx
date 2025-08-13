import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text
} from "@react-email/components";

interface LaunchDayEmailProps {
  name?: string;
  url: string;
}

export const LaunchDayEmail = ({ name, url }: LaunchDayEmailProps) => (
  <Html>
    <Head />
    <Preview>🚀 It’s here. The wait is over!</Preview>
    <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", padding: "20px" }}>
      <Container style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px", maxWidth: "600px" }}>
        <Heading style={{ color: "#111", fontSize: "24px" }}>
          {name || "Friend"}, the moment has arrived! 🎉
        </Heading>
        <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#333" }}>
          The countdown has hit zero — and what we’ve been building is now live.
        </Text>
        <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#333" }}>
          We can’t wait for you to see it. Click below and dive right in:
        </Text>
        <Text>
          <a
            href={url}
            style={{
              display: "inline-block",
              backgroundColor: "#4F46E5",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            See the Reveal
          </a>
        </Text>
        <Text style={{ fontSize: "14px", color: "#777", marginTop: "20px" }}>
          Thanks for believing in us before anyone else did.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default LaunchDayEmail;
