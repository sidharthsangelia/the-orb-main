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
        toast.success("You’re subscribed. See you in your inbox 👋");
      } else {
        setStatusMessage(data.error || "Something went wrong.");
        toast.error("We hit a snag. Try again!");
      }
    } catch (error) {
      setStatusMessage("Failed to subscribe. Please try again.");
      toast.error("Network issue — please retry in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Newspaper,
      title: "Curated Reads",
     
      color: "primary",
    },
    {
      icon: Globe,
      title: "Global Perspectives",
     
      color: "secondary",
    },
    {
      icon: Heart,
      title: "Human Stories",
     
      color: "primary",
    },
    {
      icon: Sparkles,
      title: "Exclusive Drops",
      
      color: "secondary",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground flex items-center justify-center overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[26rem] h-[26rem] bg-gradient-to-tr from-secondary/15 to-primary/15 rounded-full blur-3xl opacity-60 animate-pulse-slow" />
      </div>

      {/* Main container */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl px-6 md:px-10 py-24 md:py-28 gap-12 md:gap-20">
        {/* Left content */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Stay in the Loop
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
            Subscribe to our newsletter and get insights, updates, and stories
            from the creative world. Expect thoughtfully crafted content — never
            spam.
          </p>

          {/* 2x2 Grid Features */}
          {/* 2x2 Grid Features */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 max-w-lg mx-auto md:mx-0">
  {features.map((feature, idx) => (
    <div
      key={idx}
      className="flex items-center justify-center sm:justify-start flex-col sm:flex-row text-center sm:text-left bg-card/30 border border-border/30 rounded-2xl p-4 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300"
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-xl bg-${feature.color}/10 mb-3 sm:mb-0 sm:mr-3`}
      >
        <feature.icon
          className={`w-5 h-5 text-${feature.color} flex-shrink-0`}
        />
      </div>
      <div>
        <h3 className="font-medium text-foreground">{feature.title}</h3>
      </div>
    </div>
  ))}
</div>

        </div>

        {/* Right side — Subscribe card */}
        <div className="flex-1 w-full max-w-md bg-card/40 backdrop-blur-xl border border-border/30 rounded-3xl shadow-xl p-8 md:p-10 space-y-6 text-center">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-medium">Subscribe to the Newsletter</h2>
              <p className="text-sm text-muted-foreground">
                Join thousands of readers who receive our latest updates every month.
              </p>

              <div className="flex flex-col gap-3 mt-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:bg-card/60 outline-none transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
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
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground rounded-xl font-medium hover:from-primary hover:to-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

              <Button className="w-52 mt-4 px-4 py-3 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground rounded-xl font-medium hover:from-primary hover:to-secondary transition-all duration-300">
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
