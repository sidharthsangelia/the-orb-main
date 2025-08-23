import AllPostsPage from "@/components/blog/AllPostsPageComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "All Posts",
  description:
    "Empowering India's youth with authentic stories and actionable knowledge to drive sustainable change in our evolving green economy.",
};

export default function page() {
  return (
    <>
      <AllPostsPage />
    </>
  );
}
