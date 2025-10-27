"use client";

import React, { useState } from "react";
import { Mail, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function NewsletterHomepageCard() {
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
    <div className="w-[92%] max-w-5xl mx-auto my-16 p-6 md:p-8 rounded-2xl border border-border/30 bg-card/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Subscribe to The Órb
          </h2>
          <p className="text-sm text-muted-foreground">
            Fresh climate insights, changemaker stories, and sustainability updates — straight to your inbox.
          </p>
        </div>

        {/* Form Section */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto"
          >
            <div className="relative flex-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border/30 bg-background/70 text-sm placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-primary/40 outline-none transition-all"
              />
            </div>
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border/30 bg-background/70 text-sm placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-primary/40 outline-none transition-all"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 hover:from-primary hover:to-secondary transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        ) : (
          <div className="text-center md:text-right flex-1 text-primary font-medium">
            🎉 You’re subscribed! Check your inbox soon.
          </div>
        )}
      </div>
    </div>
  );
}
