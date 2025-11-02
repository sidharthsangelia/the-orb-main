"use client";

import React, { useState } from "react";
import { Mail, User, Sparkles, Send, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { WhatsappIcon } from "react-share";

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
    <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch w-[90%] mx-auto mb-16 mt-8">
      {/* Newsletter Card (80%) */}
      <div className="relative w-full md:w-[62%] bg-gradient-to-br from-card/60 to-background/50 backdrop-blur-xl border border-border/40 rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br from-primary/15 to-secondary/15 rounded-full blur-3xl opacity-60 animate-pulse-slow" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl opacity-60" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-5">
          <div className="flex items-center justify-center gap-2 text-primary/80">
            <Sparkles className="w-5 h-5" />
            <span className="uppercase tracking-wide text-xs font-semibold">
              The Órb Newsletter
            </span>
          </div>

          <span className="flex">
            <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              The Climate Stories That Actually Matter. Delivered to You.
            </h2>
            {/* <h2 className="text-2xl sm:text-3xl font-semibold bg-clip-text">🌍</h2> */}
          </span>

          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            <span className="font-medium text-foreground">
              Subscribe to The Órb
            </span>{" "}
            for powerful voices from the Global South, grassroots changemakers
            rewriting the future, and real opportunities to make an impact not
            just read about it
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md flex flex-col gap-3 mt-4"
            >
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
            <p className="text-xs text-muted-foreground mt-1">
              {statusMessage}
            </p>
          )}

          <p className="pt-3 text-[0.7rem] text-muted-foreground">
            We respect your privacy — unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Socials Card (20%) */}
      <div className="relative w-full md:w-[25%] bg-gradient-to-br from-emerald-50/90 via-teal-50/80 to-green-50/90 dark:from-emerald-900/20 dark:via-teal-900/15 dark:to-green-900/20 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/30 rounded-3xl p-7 shadow-lg overflow-hidden flex flex-col items-center justify-center text-center space-y-5 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:border-emerald-300/60 dark:hover:border-emerald-600/40">
        {/* Decorative soft green glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-300/30 to-teal-300/30 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-gradient-to-tr from-green-300/25 to-emerald-300/25 dark:from-green-500/15 dark:to-emerald-500/15 rounded-full blur-3xl" />

        {/* Subtle leaf pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c5 0 10 5 10 10s-5 10-10 10-10-5-10-10 5-10 10-10z' fill='%2310b981' fill-opacity='0.4'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 space-y-4">
          {/* Icon with subtle animation */}
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800/40 dark:to-teal-800/40 rounded-2xl shadow-sm">
            <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Join Our Community
            </h3>
            <p className="text-xs leading-relaxed text-emerald-800/70 dark:text-emerald-200/70 px-2">
              Connect with changemakers and stay updated on climate action
              stories
            </p>
          </div>

          {/* Social buttons with enhanced styling */}
          <div className="flex justify-center gap-3 pt-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/theorb.official/?theme=dark"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3.5 bg-white/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/60 dark:border-emerald-700/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Instagram className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/the-orb-cloud/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3.5 bg-white/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/60 dark:border-emerald-700/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Linkedin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
            </a>

            {/* WhatsApp */}
            <a
              href="https://whatsapp.com/channel/0029VbAtD317j6gAIbcpgB3X" // <-- replace with your actual number or link
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3.5 bg-white/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/60 dark:border-emerald-700/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <img
                src="/whatsapp.svg"
                alt="WhatsApp"
                className="w-5 h-5 opacity-90 group-hover:scale-110 transition-transform duration-300"
              />
            </a>

            {/* Discord */}
            {/* <a
              href="https://discord.gg/4hgUBy4vV" // <-- replace with your Discord invite link
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3.5 bg-white/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/60 dark:border-emerald-700/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <img
                src="/discord.svg"
                alt="Discord"
                className="w-5 h-5 opacity-90 group-hover:scale-110 transition-transform duration-300"
              />
            </a> */}
          </div>

          {/* Subtle call to action */}
          <div className="pt-2">
            <p className="text-[0.65rem] text-emerald-700/60 dark:text-emerald-300/50 font-medium tracking-wide">
              Follow for daily insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
