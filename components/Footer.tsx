import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import {
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Youtube,
  MessageCircle, // For Threads
  PenTool, // For Pinterest/Dribbble
} from "lucide-react";
import { Image } from "sanity";

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
    // footerText,
  } = siteSettings;

  // Format address
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

  return (
    <footer className="bg-[#0c0d0d] text-[#eae4d2] border-t border-[#575846]/20 dark:bg-[#0c0d0d] dark:text-[#eae4d2]">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
          
              {title && (
                <h3 className="text-2xl font-bold text-[#eae4d2]">{title}</h3>
              )}
            </div>

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

             
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-[#eae4d2] mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              {contactEmail && (
                <div className="flex items-start">
                  <Mail
                    size={16}
                    className="mr-3 mt-1 text-[#509e8e] flex-shrink-0"
                  />
                  <Link
                    href={`mailto:${contactEmail}`}
                    className="text-[#eae4d2]/80 hover:text-[#509e8e] transition-colors duration-200 text-sm"
                  >
                    {contactEmail}
                  </Link>
                </div>
              )}

              {phoneNumber && (
                <div className="flex items-start">
                  <Phone
                    size={16}
                    className="mr-3 mt-1 text-[#509e8e] flex-shrink-0"
                  />
                  <Link
                    href={`tel:${phoneNumber}`}
                    className="text-[#eae4d2]/80 hover:text-[#509e8e] transition-colors duration-200 text-sm"
                  >
                    {phoneNumber}
                  </Link>
                </div>
              )}

              {(addressLine1 || city) && (
                <div className="flex items-start">
                  <MapPin
                    size={16}
                    className="mr-3 mt-1 text-[#509e8e] flex-shrink-0"
                  />
                  <div className="text-sm">
                    {googleMapsLink ? (
                      <Link
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#eae4d2]/80 hover:text-[#509e8e] transition-colors duration-200"
                      >
                        {formatAddress()}
                      </Link>
                    ) : (
                      <span className="text-[#eae4d2]/80">
                        {formatAddress()}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#eae4d2] mb-4">
              Follow Us
            </h4>
            {socialLinks && socialLinks.length > 0 && (
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[#eae4d2]/80 hover:text-[#509e8e] transition-colors duration-200 group text-sm"
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
        <div className="border-t border-[#575846]/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#eae4d2]/60 text-sm mb-4 md:mb-0">
              © {currentYear} {title ? `${title}. ` : ""}All rights reserved.
            </div>

            {/* Theme Toggle Placeholder */}
            <div className="flex items-center space-x-4">
              {/* ADD THEME TOGGLE COMPONENT HERE */}
              <div className="text-[#eae4d2]/40 text-xs">
                Built with care for the environment by{" "}
                <Link href="https://sidharth-sangelia.vercel.app/">
                  Sidharth Sangelia
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
