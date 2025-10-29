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
    <footer className="bg-[#0c0d0d] text-[#eae4d2] border-t border-[#575846]/20">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            {title && <h3 className="text-2xl font-bold mb-4">{title}</h3>}
            {description && Array.isArray(description) ? (
              <div className="text-[#eae4d2]/80 mb-6 max-w-md leading-relaxed">
                <PortableText
                  value={description}
                  components={{
                    block: {
                      normal: ({ children }) => <p>{children}</p>,
                    },
                  }}
                />
              </div>
            ) : (
              <p className="text-[#eae4d2]/80 mb-6 max-w-md leading-relaxed">
                {description}
              </p>
            )}
          
            <div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              { !issubscribePage && (
                <Link
                href="/subscribe"
                className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-[#487052] to-[#509e8e] px-6 py-2.5 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#487052]/25 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#509e8e] to-[#487052] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">Join Our Newsletter</span>
                <ReceiptText className="h-4 w-4 relative" />
              </Link>
              )}
              
            </motion.div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              {contactEmail && (
                <div className="flex items-start">
                  <Mail className="mr-3 mt-1 text-[#509e8e]" size={16} />
                  <Link
                    href={`mailto:${contactEmail}`}
                    className="hover:text-[#509e8e] transition-colors"
                  >
                    {contactEmail}
                  </Link>
                </div>
              )}
              {phoneNumber && (
                <div className="flex items-start">
                  <Phone className="mr-3 mt-1 text-[#509e8e]" size={16} />
                  <Link
                    href={`tel:${phoneNumber}`}
                    className="hover:text-[#509e8e] transition-colors"
                  >
                    {phoneNumber}
                  </Link>
                </div>
              )}
              {(addressLine1 || city) && (
                <div className="flex items-start">
                  <MapPin className="mr-3 mt-1 text-[#509e8e]" size={16} />
                  <div>
                    {googleMapsLink ? (
                      <Link
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#509e8e] transition-colors"
                      >
                        {formatAddress()}
                      </Link>
                    ) : (
                      <span>{formatAddress()}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            {socialLinks && socialLinks.length > 0 && (
              <div className="space-y-3 text-sm">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    <span className="mr-3 text-[#509e8e] group-hover:text-[#487052]">
                      {getSocialIcon(link.platform!)}
                    </span>
                    {getPlatformName(link.platform!)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#575846]/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#eae4d2]/60">
          <div className="mb-4 md:mb-0">
            © {currentYear} {title ? `${title}. ` : ""}All rights reserved.
          </div>
          <div className="flex items-center text-xs space-x-1">
            <span>Site built with care for the environment by</span>
            <Link
              href="https://sidharth-sangelia.vercel.app/"
              target="_blank"
              className=" hover:underline"
            >
              Sidharth
            </Link>
            <span>&</span>
            <Link
              href="https://www.linkedin.com/in/ashmit-tripathi/"
              target="_blank"
              className="  hover:underline"
            >
              Ashmit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
