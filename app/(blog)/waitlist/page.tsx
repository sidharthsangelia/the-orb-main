"use client";

import React, { useState, useEffect } from "react";
import { Mail, Calendar, Clock, Zap, Eye } from "lucide-react";

export default function MysteriousCountdown() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isDark, setIsDark] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0.5);

  // Target date: March 24, 2026
  const targetDate = new Date("2026-03-24T00:00:00").getTime();

  useEffect(() => {
    const darkMode =
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(darkMode);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });

        // Create pulsing effect based on seconds
        setPulseIntensity(0.3 + (timeLeft.seconds % 2) * 0.4);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, timeLeft.seconds]);

  const handleSubmit = async () => {
    if (!email) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isDark ? "dark" : ""}`}
    >
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl transition-all duration-2000"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary)/${pulseIntensity * 0.15}), transparent)`,
            transform: `scale(${0.8 + pulseIntensity * 0.2})`,
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl transition-all duration-2000 delay-1000"
          style={{
            background: `radial-gradient(circle, hsl(var(--secondary)/${pulseIntensity * 0.15}), transparent)`,
            transform: `scale(${0.8 + pulseIntensity * 0.15})`,
          }}
        ></div>

        {/* Minimal floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-primary/10 rounded-full animate-float"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Calendar Display */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl animate-pulse"></div>
            <div className="relative bg-card/30 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 md:p-12 overflow-hidden">
              {/* Live Countdown Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
                {[
                  { value: timeLeft.days, label: "Days", icon: Calendar },
                  { value: timeLeft.hours, label: "Hours", icon: Clock },
                  { value: timeLeft.minutes, label: "Minutes", icon: Zap },
                  { value: timeLeft.seconds, label: "Seconds", icon: Zap },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                      <div className="relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-4 md:p-5 hover:bg-card/40 transition-all duration-300">
                        <Icon className="w-5 h-5 text-primary/80 mx-auto mb-2" />
                        <div
                          className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent mb-1 transition-all duration-300"
                          style={{
                            transform:
                              item.label === "Seconds"
                                ? `scale(${1 + pulseIntensity * 0.05})`
                                : "scale(1)",
                          }}
                        >
                          {item.value.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs text-muted-foreground/70 font-medium uppercase tracking-wide">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtle pulse indicator */}
              <div className="flex items-center justify-center gap-2">
                <div
                  className="w-1.5 h-1.5 bg-primary/60 rounded-full transition-all duration-1000"
                  style={{
                    opacity: pulseIntensity * 0.8,
                    transform: `scale(${0.8 + pulseIntensity * 0.4})`,
                  }}
                ></div>
                <span className="text-xs text-muted-foreground/50">Live</span>
                <div
                  className="w-1.5 h-1.5 bg-secondary/60 rounded-full transition-all duration-1000"
                  style={{
                    opacity: pulseIntensity * 0.8,
                    transform: `scale(${0.8 + pulseIntensity * 0.4})`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Email Subscription - Under Counter */}
          <div className="max-w-md mx-auto">
            {!submitted ? (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Be the first to know....
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-card/40 backdrop-blur-sm border border-border/40 rounded-xl focus:border-primary/60 focus:bg-card/60 focus:outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !email}
                    className="px-6 py-3 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground rounded-xl font-medium hover:from-primary hover:to-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Joining..." : "Notify"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-primary/80">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    You're on the list
                  </span>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
