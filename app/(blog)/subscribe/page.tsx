"use client";

import React, { useState } from "react";
import { Mail, User, Newspaper, Globe, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function NewsletterSubscribe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setStatusMessage("Please fill in both fields.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setStatusMessage("You're subscribed!");
        setName("");
        setEmail("");
        // toast.success("You’re subscribed. See you in your inbox 👋");
      } else {
        setStatusMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setStatusMessage("Failed to subscribe. Please try again.");
      // toast.error("We hit a snag. Refresh and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex items-center justify-center overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[26rem] h-[26rem] bg-gradient-to-tr from-secondary/15 to-primary/15 rounded-full blur-3xl opacity-60 animate-pulse-slow" />
      </div>

      {/* Main container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-6 py-12 md:py-20 gap-12 md:gap-20">
        {/* Left content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Stay in the Loop
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
            Subscribe to our newsletter and get insights, updates, and stories
            from the creative world. Expect thoughtfully crafted content — never
            spam.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 max-w-lg">
            <div className="flex items-start gap-3">
              <div className="px-2 bg-primary/10 rounded-xl">
                <Newspaper className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Curated Reads</h3>
                {/* <p className="text-sm text-muted-foreground">
                  Handpicked stories that inspire, inform, and elevate your
                  perspective.
                </p> */}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="px-2 bg-secondary/10 rounded-xl">
                <Globe className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Global Insights</h3>
                {/* <p className="text-sm text-muted-foreground">
                  Perspectives from creators, thinkers, and innovators worldwide.
                </p> */}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="px-2 bg-primary/10 rounded-xl">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Human Stories</h3>
                {/* <p className="text-sm text-muted-foreground">
                  Updates that celebrate creativity, emotion, and authenticity.
                </p> */}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="px-2 bg-secondary/10 rounded-xl">
                <Sparkles className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Exclusive Drops</h3>
                {/* <p className="text-sm text-muted-foreground">
                  Early access to new projects, launches, and creative collabs.
                </p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Right side — Subscribe card */}
        <div className="flex-1 w-full max-w-md bg-card/40 backdrop-blur-xl border border-border/30 rounded-3xl shadow-xl p-8 md:p-10 space-y-6 text-center">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-medium">
                Subscribe to the Newsletter
              </h2>
              <p className="text-sm text-muted-foreground">
                Join thousands of readers who receive our latest updates every
                month.
              </p>

              <div className="flex flex-col gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:bg-card/60 outline-none transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:bg-card/60 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground rounded-xl font-medium hover:from-primary hover:to-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </Button>

              {statusMessage && (
                <p className="text-sm text-muted-foreground mt-2">
                  {statusMessage}
                </p>
              )}
            </form>
          ) : (
            <div className="py-8">
              <div className="inline-flex items-center gap-2 text-primary/80">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                  You’re subscribed! Check your inbox soon.
                </span>
               
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                
              </div>
               <Button className="w-52 mt-2 px-4 py-3 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground rounded-xl font-medium hover:from-primary hover:to-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  Go back to Home
                </Button>
            </div>
          )}

          <p className="pt-4 text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
