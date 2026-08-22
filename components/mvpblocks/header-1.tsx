"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ReceiptText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeToggleButton from "../ui/theme-toggle-button";

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    name: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
  }[];
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Posts", href: "/posts", hasDropdown: false },
  { name: "Resources", href: "/resources", hasDropdown: false },
  { name: "Community", href: "/community" },
  { name: "About", href: "/about" },
];

export default function Header(props: {
  title: string | null | undefined;
  description: any;
  logo: any;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const pathname = usePathname();
  const isSubscribePage = pathname === "/subscribe";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Escape closes the menu, and the page behind it shouldn't scroll
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      /*
       * The scrolled treatment is pure CSS. It used to be an inline style
       * derived from `useTheme()`, which is undefined on the server and so
       * flashed / mismatched on hydration.
       */
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        isScrolled || isMobileMenuOpen
          ? "border-b border-border/60 bg-background/85 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container">
        <div className="flex h-header items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${props.title || "The Órb"} — home`}
          >
            {props.logo && (
              <span className="relative shrink-0">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand to-brand-accent opacity-20 blur transition-opacity duration-300 group-hover:opacity-40"
                />
                <Image
                  src={props.logo}
                  alt=""
                  height={44}
                  width={44}
                  priority
                  className="relative h-10 w-10 rounded-xl object-cover lg:h-11 lg:w-11"
                />
              </span>
            )}

            <span className="flex flex-col leading-none">
              <span className="text-gradient-brand text-lg font-bold tracking-tight lg:text-xl">
                {props.title || "The Órb"}
              </span>
              <span className="mt-0.5 text-[0.7rem] font-medium tracking-wide text-muted-foreground">
                Planet Conscious Youth
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-brand-accent"
                        : "text-foreground/80 hover:text-brand-accent"
                    )}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          activeDropdown === item.name && "rotate-180"
                        )}
                      />
                    )}

                    {/* Underline: solid for the current page, grows on hover */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-gradient-to-r from-brand to-brand-accent transition-transform duration-300 ease-out",
                        active ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </Link>

                  {item.hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          className="absolute left-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-border bg-popover/95 shadow-xl backdrop-blur-lg"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-accent/10"
                              >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-accent text-brand-foreground transition-transform duration-200 group-hover:scale-110">
                                  {dropdownItem.icon}
                                </span>
                                <span className="flex-1">
                                  <span className="block font-semibold text-foreground transition-colors group-hover:text-brand-accent">
                                    {dropdownItem.name}
                                  </span>
                                  {dropdownItem.description && (
                                    <span className="mt-1 block text-sm text-muted-foreground">
                                      {dropdownItem.description}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggleButton />

            {!isSubscribePage && (
              <Link
                href="/subscribe"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand to-brand-accent px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-shadow duration-200 hover:shadow-lg hover:shadow-brand/25"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="relative">Join Our Newsletter</span>

              </Link>
            )}
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggleButton />
            <button
              type="button"
              className="rounded-lg p-2 text-foreground transition-colors duration-200 hover:bg-foreground/5"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Primary"
              className="overflow-hidden lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="mb-4 mt-2 overflow-hidden rounded-2xl border border-border bg-popover/95 shadow-xl backdrop-blur-lg">
                <ul className="py-2">
                  {navItems.map((item) => {
                    const active = isActive(item.href);

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between border-l-2 px-5 py-3 text-base font-medium transition-colors duration-200",
                            active
                              ? "border-brand-accent bg-accent/10 text-brand-accent"
                              : "border-transparent text-foreground hover:bg-accent/5"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>{item.name}</span>
                        </Link>

                        {item.hasDropdown && item.dropdownItems && (
                          <ul className="ml-5 space-y-1 border-l border-border py-1 pl-4">
                            {item.dropdownItems.map((dropdownItem) => (
                              <li key={dropdownItem.name}>
                                <Link
                                  href={dropdownItem.href}
                                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-accent/5 hover:text-foreground"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <span className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-brand to-brand-accent text-xs text-brand-foreground">
                                    {dropdownItem.icon}
                                  </span>
                                  <span>{dropdownItem.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {!isSubscribePage && (
                  <div className="border-t border-border p-4">
                    <Link
                      href="/subscribe"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-accent py-3 text-center font-semibold text-brand-foreground transition-shadow duration-200 hover:shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>Join Our Newsletter</span>
                      <ReceiptText aria-hidden className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
