"use client";

import React, { useState } from "react";
import { Mail, User, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function NewsletterArticleCard() {
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
    <div className="relative w-[90%] max-w-3xl mx-auto mb-16 mt-8 bg-gradient-to-br from-card/60 to-background/50 backdrop-blur-xl border border-border/40 rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br from-primary/15 to-secondary/15 rounded-full blur-3xl opacity-60 animate-pulse-slow" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl opacity-60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-5">
        {/* Badge */}
        <div className="flex items-center justify-center gap-2 text-primary/80">
          <Sparkles className="w-5 h-5" />
          <span className="uppercase tracking-wide text-xs font-semibold">
            The Órb Newsletter
          </span>
        </div>

        {/* Headline */}
        <span className="flex">
            <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Subscribe for deeper climate insights
        </h2>
        <h2 className="text-2xl sm:text-3xl font-semibold  bg-clip-text ">
          🌍
        </h2>
        </span>

        <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
          Join{" "}
          <span className="font-medium text-foreground">
            The Órb Newsletter
          </span>{" "}
          — your weekly dose of stories on climate justice, sustainability, and
          changemakers from the Global South.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col gap-3 mt-4"
          >
            {/* Inputs side by side */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-10 pr-4 py-3 bg-card/60 border border-border/40 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                />
              </div>

              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-card/60 border border-border/40 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Subscribe Button under inputs */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:from-primary hover:to-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        ) : (
          <div className="pt-4">
            <p className="text-primary font-medium text-sm">
              You’re subscribed! Check your inbox soon. 💌
            </p>
          </div>
        )}

        {statusMessage && (
          <p className="text-xs text-muted-foreground mt-1">{statusMessage}</p>
        )}

        <p className="pt-3 text-[0.7rem] text-muted-foreground">
          We respect your privacy — unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
