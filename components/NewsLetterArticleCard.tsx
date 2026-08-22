"use client";

import React, { useId, useState } from "react";
import { Mail, User, Sparkles, Send, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/theorb.official/?theme=dark",
    icon: <Instagram aria-hidden className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/the-orb-cloud/",
    icon: <Linkedin aria-hidden className="h-5 w-5" />,
  },
  {
    name: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VbAtD317j6gAIbcpgB3X",
    icon: (
      <Image
        src="/whatsapp.svg"
        alt=""
        width={20}
        height={20}
        aria-hidden
        className="h-5 w-5"
      />
    ),
  },
];

export default function NewsletterArticleCard() {
  const nameId = useId();
  const emailId = useId();

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
        toast.success("You're subscribed. See you in your inbox 👋");
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
    <section className="container" aria-label="Newsletter and social links">
      {/*
       * A 3/1 grid on the same container as every other band. This used to be
       * `w-[90%]` with `md:w-[62%]` + `md:w-[25%]` children, so it neither
       * filled its row nor lined up with the sections above and below.
       */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Newsletter */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-10">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br from-brand/15 to-brand-accent/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gradient-to-tr from-brand-accent/10 to-brand/10 blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
              {/* <Sparkles aria-hidden className="h-4 w-4" /> */}
              The Órb Newsletter
            </span>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              The climate stories that actually matter, delivered to you
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
             Powerful voices from the Global South, grassroots changemakers rewriting the future, and real opportunities to make an impact not just read about it
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="mt-7 w-full max-w-md text-left"
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    {/* Real labels, visually hidden — placeholders alone are
                        not accessible names. */}
                    <Label htmlFor={nameId} className="sr-only">
                      Your name
                    </Label>
                    <div className="relative">
                      <User
                        aria-hidden
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        id={nameId}
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="h-11 rounded-xl bg-background pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <Label htmlFor={emailId} className="sr-only">
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail
                        aria-hidden
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        id={emailId}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-11 rounded-xl bg-background pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 h-11 w-full rounded-xl bg-gradient-to-r from-brand to-brand-accent text-brand-foreground shadow-sm transition-shadow hover:shadow-md"
                >
                  <Send aria-hidden className="h-4 w-4" />
                  {isSubmitting ? "Subscribing…" : "Subscribe"}
                </Button>
              </form>
            ) : (
              <p className="mt-7 text-sm font-medium text-brand-accent">
                You&rsquo;re subscribed! Check your inbox soon. 💌
              </p>
            )}

            {/* Announced to screen readers when it changes */}
            <p
              role="status"
              aria-live="polite"
              className="mt-3 min-h-[1rem] text-xs text-muted-foreground"
            >
              {statusMessage}
            </p>

            <p className="mt-1 text-xs text-muted-foreground/80">
              We respect your privacy — unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Socials */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-muted p-7 shadow-sm">
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-brand-accent/20 to-brand/20 blur-3xl"
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <span
              aria-hidden
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-accent text-brand-foreground shadow-sm"
            >
              <Sparkles className="h-6 w-6" />
            </span>

            <h2 className="mt-5 text-xl font-bold tracking-tight text-foreground">
              Join our community
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Connect with changemakers and stay close to the stories as they
              happen.
            </p>

            <ul className="mt-6 flex items-center justify-center gap-3">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`The Órb on ${social.name}`}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-brand-accent shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-accent/50 hover:shadow-md"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs font-medium tracking-wide text-muted-foreground/80">
              Follow for daily insights
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
