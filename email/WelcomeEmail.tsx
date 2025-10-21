import * as React from "react";
import { Html, Head, Preview, Body, Container, Text } from "@react-email/components";

interface WelcomeEmailProps {
  name?: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to The Orb 🌍</Preview>
    <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#ffffff", padding: "16px" }}>
      <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#333" }}>
          Hey {name || "there"},
        </Text>

        <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#333" }}>
          Thanks for subscribing to <strong>The Orb</strong>!  
          We’re excited to have you here.
        </Text>

        <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#333" }}>
          You’ll start getting our latest thoughts, updates, and stories soon.
          In the meantime, feel free to reply and say hi — we actually read every message.
        </Text>

        <Text style={{ fontSize: "14px", color: "#555", marginTop: "24px" }}>
          Cheers,  
          <br />
          Sameer from The Orb 🌱
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;
