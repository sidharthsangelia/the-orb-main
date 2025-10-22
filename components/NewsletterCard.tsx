"use client";

import React, { useState } from "react";
import { Mail, User, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function NewsletterHorizontalCard() {
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

  return (
    <div className="relative w-[90%] my-16 max-w-6xl mx-auto bg-card/50 backdrop-blur-xl border border-border/30 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-stretch">
      
      {/* Left section: Text & background image */}
      <div
        className="flex-1 relative px-6 py-8 md:px-10 md:py-14 flex flex-col justify-center rounded-3xl space-y-5 text-white"
        style={{
          backgroundImage: "url('/abstractbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/90 md:bg-black/80 rounded-3xl"></div>

        {/* Content */}
        <div className="relative z-10 max-w-full md:max-w-md">
          <span className="flex items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Stay in the Loop
            </h2>
            <span className="text-2xl sm:text-3xl ml-2">🌱</span>
          </span>
          <p className="text-sm sm:text-base md:text-base leading-relaxed mt-2 max-w-full">
            Subscribe to our newsletter for curated stories, insights, and creative updates.
            Or connect with us on social media to never miss the latest.
          </p>
        </div>
      </div>

      {/* Right section: Form + socials */}
      <div className="flex-1 px-6 py-8 md:px-10 md:py-14 flex flex-col justify-center space-y-5 bg-card/60">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full pl-10 pr-4 py-3 bg-card/70 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-card/70 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-1 px-6 py-3 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground rounded-xl font-semibold hover:from-primary hover:to-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </Button>

            {statusMessage && (
              <p className="text-sm text-muted-foreground mt-1">
                {statusMessage}
              </p>
            )}
          </form>
        ) : (
          <div className="py-6 text-center">
            <p className="text-primary font-medium">
              You’re subscribed! Check your inbox soon. 👋
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center py-2">
          <span className="absolute inset-x-0 h-px bg-border/30"></span>
          <span className="relative px-3 text-xs text-muted-foreground bg-card/60">
            or connect with us
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4">
          {[ 
            { Icon: Instagram, href: "https://www.instagram.com/theorb.official?theme=dark", label: "Instagram" },
            { Icon: Linkedin, href: "https://www.linkedin.com/company/the-orb-cloud", label: "LinkedIn" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-xl bg-card/70 border border-border/30 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
            >
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300" />
            </a>
          ))}
        </div>

        <p className="pt-2 text-xs text-muted-foreground text-center">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
