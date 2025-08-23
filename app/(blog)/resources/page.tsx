import ResourcesPageComponent from "@/components/resources/ResourcesPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "The Órb Resources Hub brings you sustainable living guides, eco-friendly tips, climate tools, and resources to empower youth-driven change.",
};

export default function page() {
  return (
    <>
      <ResourcesPageComponent />
    </>
  );
}
