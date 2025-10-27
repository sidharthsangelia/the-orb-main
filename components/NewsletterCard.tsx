"use client";

import React, { useState } from "react";
import { Mail, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function HomepageNewsletterCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setStatusMessage("Please fill in both fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        toast.success("You’re subscribed! 👋");
        setName("");
        setEmail("");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch {
      toast.error("Network issue — please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative w-[92%] max-w-6xl mx-auto my-20 overflow-hidden rounded-3xl border border-border/40
      bg-gradient-to-br from-background/80 via-card/70 to-background/90 backdrop-blur-xl
      shadow-[0_8px_40px_-10px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_50px_-8px_rgba(0,0,0,0.35)]
      transition-all duration-500 group"
    >
      {/* Subtle gradient border ring */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none border border-transparent bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

      {/* Light texture tint behind content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.05),transparent_70%)]" />

      {/* Faint accent glows */}
      <div className="absolute -top-12 -right-12 w-52 h-52 bg-gradient-to-tr from-primary/25 to-secondary/25 blur-3xl rounded-full opacity-50" />
      <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-gradient-to-tr from-secondary/20 to-primary/20 blur-3xl rounded-full opacity-50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 px-8 md:px-12 py-14 md:py-16">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <p className="text-xs uppercase tracking-wider text-primary font-medium">
            The Órb Newsletter
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
            Go beyond the headlines.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground/90 max-w-md mx-auto md:mx-0 leading-relaxed">
            Subscribe for deep climate stories, bold perspectives, and changemakers driving sustainability across the Global South.
          </p>
          <p className="text-xs text-muted-foreground/80 italic">
            Be part of the conversation shaping our planet’s future 🌍
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="flex-1 w-full max-w-md">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-9 pr-4 py-3 bg-card/60 border border-border/30 rounded-lg text-sm placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                </div>
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-4 py-3 bg-card/60 border border-border/30 rounded-lg text-sm placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/20 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-1 px-6 py-3 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 hover:from-primary hover:to-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_-5px_rgba(var(--primary-rgb),0.4)]"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </Button>

              {statusMessage && (
                <p className="text-xs text-muted-foreground mt-1">
                  {statusMessage}
                </p>
              )}
            </form>
          ) : (
            <div className="text-center py-8 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-primary font-medium">
                🎉 You’re subscribed! Check your inbox soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
