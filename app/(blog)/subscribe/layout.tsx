import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "...",
};

export default function SubscibeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
