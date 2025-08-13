import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section
} from "@react-email/components";

interface WelcomeEmailProps {
  name?: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome aboard — the countdown has begun! 🚀</Preview>
    <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", padding: "20px" }}>
      <Container style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px", maxWidth: "600px" }}>
        <Heading style={{ color: "#111", fontSize: "24px" }}>
          Hey {name || "there"} 🎉
        </Heading>
        <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#333" }}>
          We’re absolutely thrilled you’ve joined our waitlist!  
          Consider yourself part of an exclusive club — you’re in the front row for the big reveal on <strong>March 24th, 2026</strong>.
        </Text>
        <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#333" }}>
          Until then, keep your eyes peeled, your curiosity ready,  
          and maybe set a reminder (because what’s coming will be unforgettable).
        </Text>
        <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#333" }}>
          We promise it’ll be worth the wait. And if it’s not, we’ll… well, we’ll still think it’s amazing.
        </Text>
        <Hr />
        <Text style={{ fontSize: "14px", color: "#777" }}>
          See you on launch day — The Orb 🌱
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;
