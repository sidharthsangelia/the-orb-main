"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Leaf, Globe, BookOpen, Camera, Users } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as demo from "@/sanity/lib/demo";
import Image from "next/image";
import ThemeToggleButton from "../ui/theme-toggle-button";
import { ThemeToggler } from "../ThemeToggler";

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string; description?: string; icon?: React.ReactNode }[];
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { 
    name: "Stories", 
    href: "/stories",
    hasDropdown: true,
    dropdownItems: [
      {
        name: "Climate Stories",
        href: "/stories/climate",
        description: "Real stories from the ground",
        icon: <Globe className="h-4 w-4" />,
      },
      {
        name: "Youth Voices",
        href: "/stories/youth",
        description: "Authentic youth perspectives",
        icon: <Users className="h-4 w-4" />,
      },
      { 
        name: "Visual Content", 
        href: "/stories/visual", 
        description: "Engaging visual narratives",
        icon: <Camera className="h-4 w-4" />,
      },
    ],
  },
  {
    name: "Resources",
    href: "/resources",
    hasDropdown: true,
    dropdownItems: [
      {
        name: "Guides & Handbooks",
        href: "/resources/guides",
        description: "DIY sustainability guides",
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        name: "Educational Content",
        href: "/resources/education",
        description: "Learn about climate action",
        icon: <Leaf className="h-4 w-4" />,
      },
      { 
        name: "Community Tools", 
        href: "/resources/tools", 
        description: "Tools for climate action",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },
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
  const { theme } = useTheme();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  // Dynamic background styles based on scroll and theme
  const getHeaderStyles = () => {
  // Don't render dynamic styles until mounted
    if (isScrolled) {
      return {
        backdropFilter: "blur(20px)",
        backgroundColor: theme === "dark" 
          ? "rgba(12, 13, 13, 0.9)" // #0c0d0d with opacity
          : "rgba(234, 228, 210, 0.9)", // #eae4d2 with opacity
        borderBottom: theme === "dark"
          ? "1px solid rgba(87, 88, 70, 0.2)" // #575846 with opacity
          : "1px solid rgba(87, 88, 70, 0.1)",
        boxShadow: theme === "dark"
          ? "0 8px 32px rgba(12, 13, 13, 0.3)"
          : "0 8px 32px rgba(87, 88, 70, 0.1)",
      };
    }
    return {
      backgroundColor: "transparent",
      backdropFilter: "none",
    };
  };

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      variants={headerVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={getHeaderStyles()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              {props.logo && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#487052] to-[#509e8e] rounded-xl blur opacity-20"></div>
                  <Image
                    src={props.logo}
                    alt="The Órb Logo"
                    height={48}
                    width={48}
                    className="relative rounded-xl"
                  /> 
                </div>
              )}

              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-[#487052] to-[#509e8e] bg-clip-text text-xl font-bold text-transparent">
                  {props.title || "The Órb"}
                </span>
                
                <span className="text-[#575846] dark:text-[#eae4d2]/60 text-xs font-medium -mt-1">
                  Planet Conscious Youth
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 lg:flex">
            {navItems.map((item) => (
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
                  className="text-[#0c0d0d] dark:text-[#eae4d2] flex items-center space-x-1 font-medium transition-all duration-200 hover:text-[#487052] dark:hover:text-[#509e8e] relative group"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                  
                  {/* Hover underline effect */}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#487052] to-[#509e8e] transition-all duration-300 group-hover:w-full"></div>
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        className="absolute top-full left-0 mt-3 w-72 overflow-hidden rounded-2xl border border-[#575846]/20 bg-[#eae4d2]/95 dark:bg-[#0c0d0d]/95 shadow-2xl backdrop-blur-lg"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-2">
                          {item.dropdownItems?.map((dropdownItem, index) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="flex items-start space-x-3 rounded-xl p-4 transition-all duration-200 hover:bg-[#487052]/10 dark:hover:bg-[#509e8e]/10 group"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#487052] to-[#509e8e] text-white group-hover:scale-110 transition-transform duration-200">
                                {dropdownItem.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-[#0c0d0d] dark:text-[#eae4d2] group-hover:text-[#487052] dark:group-hover:text-[#509e8e] transition-colors duration-200">
                                  {dropdownItem.name}
                                </div>
                                {dropdownItem.description && (
                                  <div className="text-sm text-[#575846] dark:text-[#eae4d2]/70 mt-1">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden items-center space-x-4 lg:flex">
                <ThemeToggleButton/>
            <Link
              href="/login"
              className="text-[#575846] dark:text-[#eae4d2]/80 font-medium transition-colors duration-200 hover:text-[#487052] dark:hover:text-[#509e8e]"
            >
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/join"
                className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-[#487052] to-[#509e8e] px-6 py-2.5 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#487052]/25 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#509e8e] to-[#487052] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">Join Movement</span>
                <Leaf className="h-4 w-4 relative" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="rounded-lg p-2 text-[#0c0d0d] dark:text-[#eae4d2] hover:bg-[#575846]/10 dark:hover:bg-[#eae4d2]/10 transition-colors duration-200 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="overflow-hidden lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mt-4 space-y-2 rounded-2xl border border-[#575846]/20 bg-[#eae4d2]/95 dark:bg-[#0c0d0d]/95 py-4 shadow-2xl backdrop-blur-lg">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[#0c0d0d] dark:text-[#eae4d2] hover:bg-[#487052]/10 dark:hover:bg-[#509e8e]/10 flex items-center justify-between px-6 py-3 font-medium transition-colors duration-200"
                      onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Link>
                    
                    {/* Mobile Dropdown Items */}
                    {item.hasDropdown && item.dropdownItems && (
                      <div className="ml-4 space-y-1 border-l-2 border-[#487052]/20 pl-4">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="flex items-center space-x-3 rounded-lg px-4 py-2 text-[#575846] dark:text-[#eae4d2]/80 hover:bg-[#487052]/5 dark:hover:bg-[#509e8e]/5 transition-colors duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-[#487052] to-[#509e8e] text-white text-xs">
                              {dropdownItem.icon}
                            </div>
                            <span className="text-sm font-medium">{dropdownItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="space-y-3 px-6 py-4 border-t border-[#575846]/10">
                 <ThemeToggleButton/>
                  <Link
                    href="/login"
                    className="text-[#575846] dark:text-[#eae4d2]/80 hover:bg-[#575846]/10 dark:hover:bg-[#eae4d2]/10 block w-full rounded-xl py-3 text-center font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/join"
                    className="flex items-center justify-center space-x-2 w-full rounded-xl bg-gradient-to-r from-[#487052] to-[#509e8e] py-3 text-center font-semibold text-white transition-all duration-200 hover:shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Join Movement</span>
                    <Leaf className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}