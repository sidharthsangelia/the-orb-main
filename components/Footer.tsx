'use client';
import React from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Youtube,
  MessageCircle, // Threads
  PenTool,
  ReceiptText, // Pinterest/Dribbble
} from "lucide-react";
import { usePathname } from "next/navigation";
import {motion} from "framer-motion";

interface SocialLink {
  platform?: string;
  url?: string;
}

export interface SiteSettings {
  title?: string;
  description?: string;
  socialLinks?: SocialLink[];
  contactEmail?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  googleMapsLink?: string;
}

interface FooterProps {
  siteSettings: SiteSettings;
}

const getSocialIcon = (platform: string) => {
  const iconProps = { size: 20, className: "transition-colors duration-200" };

  switch (platform) {
    case "instagram":
      return <Instagram {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "github":
      return <Github {...iconProps} />;
    case "twitter":
      return <Twitter {...iconProps} />;
    case "facebook":
      return <Facebook {...iconProps} />;
    case "youtube":
      return <Youtube {...iconProps} />;
    case "threads":
      return <MessageCircle {...iconProps} />;
    case "pinterest":
    case "dribbble":
      return <PenTool {...iconProps} />;
    default:
      return <ExternalLink {...iconProps} />;
  }
};

const footerNav = [
  { name: "Home", href: "/" },
  { name: "Posts", href: "/posts" },
  { name: "Resources", href: "/resources" },
  { name: "Community", href: "/community" },
  { name: "About", href: "/about" },
  { name: "Subscribe", href: "/subscribe" },
];

const getPlatformName = (platform: string) => {
  const names: { [key: string]: string } = {
    instagram: "Instagram",
    linkedin: "LinkedIn",
    github: "GitHub",
    twitter: "Twitter / X",
    facebook: "Facebook",
    youtube: "YouTube",
    threads: "Threads",
    pinterest: "Pinterest",
    dribbble: "Dribbble",
  };
  return names[platform] || platform;
};

export default function Footer({ siteSettings }: FooterProps) {
  const {
    title,
    description,
    socialLinks,
    contactEmail,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    country,
    googleMapsLink,
  } = siteSettings;

  const formatAddress = () => {
    const parts = [
      addressLine1,
      addressLine2,
      city && state ? `${city}, ${state}` : city || state,
      zipCode,
      country,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const issubscribePage = pathname === "/subscribe";

  return (
    <footer className="mt-auto border-t border-white/10 bg-ink text-ink-foreground">
      <div className="container py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            {title && <h2 className="text-2xl font-bold">{title}</h2>}

            {description && Array.isArray(description) ? (
              <div className="mt-4 max-w-md leading-relaxed text-ink-foreground/75">
                <PortableText
                  value={description}
                  components={{
                    block: { normal: ({ children }) => <p>{children}</p> },
                  }}
                />
              </div>
            ) : (
              <p className="mt-4 max-w-md leading-relaxed text-ink-foreground/75">
                {description}
              </p>
            )}

            {!issubscribePage && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 inline-block"
              >
                <Link
                  href="/subscribe"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand to-brand-accent px-6 py-2.5 font-semibold text-brand-foreground transition-shadow duration-200 hover:shadow-lg hover:shadow-brand/25"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="relative">Join Our Newsletter</span>
                  <ReceiptText aria-hidden className="relative h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </div>

          {/*
            Site navigation. The footer previously offered no way to move
            around the site at all — only contact details and socials.
          */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-foreground/50">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-foreground/80 transition-colors hover:text-brand-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-foreground/50">
              Contact
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              {contactEmail && (
                <div className="flex items-start gap-3">
                  <Mail
                    aria-hidden
                    className="mt-0.5 shrink-0 text-brand-accent"
                    size={16}
                  />
                  <Link
                    href={`mailto:${contactEmail}`}
                    className="break-all text-ink-foreground/80 transition-colors hover:text-brand-accent"
                  >
                    {contactEmail}
                  </Link>
                </div>
              )}
              {phoneNumber && (
                <div className="flex items-start gap-3">
                  <Phone
                    aria-hidden
                    className="mt-0.5 shrink-0 text-brand-accent"
                    size={16}
                  />
                  <Link
                    href={`tel:${phoneNumber}`}
                    className="text-ink-foreground/80 transition-colors hover:text-brand-accent"
                  >
                    {phoneNumber}
                  </Link>
                </div>
              )}
              {(addressLine1 || city) && (
                <div className="flex items-start gap-3">
                  <MapPin
                    aria-hidden
                    className="mt-0.5 shrink-0 text-brand-accent"
                    size={16}
                  />
                  {googleMapsLink ? (
                    <Link
                      href={googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-foreground/80 transition-colors hover:text-brand-accent"
                    >
                      {formatAddress()}
                    </Link>
                  ) : (
                    <span className="text-ink-foreground/80">
                      {formatAddress()}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Social */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-foreground/50">
                Follow Us
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-ink-foreground/80 transition-colors hover:text-brand-accent"
                    >
                      <span className="text-brand-accent">
                        {getSocialIcon(link.platform!)}
                      </span>
                      {getPlatformName(link.platform!)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-ink-foreground/55 md:flex-row">
          <p>
            © {currentYear} {title ? `${title}. ` : ""}All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-1 text-xs">
            <span>Site built with care for the environment by</span>
            <Link
              href="https://sidharth-sangelia.vercel.app/"
              target="_blank"
              className="text-ink-foreground/75 underline-offset-2 hover:text-brand-accent hover:underline"
            >
              Sidharth
            </Link>
            <span>&</span>
            <Link
              href="https://www.linkedin.com/in/ashmit-tripathi/"
              target="_blank"
              className="text-ink-foreground/75 underline-offset-2 hover:text-brand-accent hover:underline"
            >
              Ashmit
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
