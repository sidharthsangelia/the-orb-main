'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Users, Leaf, Sparkle, SparkleIcon } from 'lucide-react'; // Changed icons to be more thematic
import { Button } from '../ui/button';
 

export default function GradientHero() {
  return (
    <div className="bg-background relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        {/* Radial gradient from primary/20 to background */}
        <div className="from-primary/20 via-background to-background absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"></div>
        {/* Large blurred circle for additional visual effect */}
        <div className="bg-primary/5 absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full blur-3xl"></div>
      </div>
      {/* Grid pattern overlay for subtle texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-15"></div>

      <div className="relative z-10 container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl">
          {/* Badge: Highlights the core message "Youth for Planet" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex justify-center"
          >
            <div className="border-border bg-background/80 inline-flex items-center rounded-full border px-3 py-1 text-sm backdrop-blur-sm">
              <span className="bg-primary mr-2 rounded-full px-2 py-0.5 text-xs font-semibold text-white">
                New
              </span>
              <span className="text-muted-foreground">
              Igniting India's Green Future
              </span>
              <ChevronRight className="text-muted-foreground ml-1 h-4 w-4" />
            </div>
          </motion.div>

          {/* Heading: Combines the organization name with its mission */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="from-primary/10 via-foreground/85 to-foreground/50 bg-gradient-to-tl bg-clip-text text-center text-4xl tracking-tighter text-balance text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
          >
            The Órb: Youth-Led Action for a Sustainable India
          </motion.h1>

          {/* Description: Elaborates on the organization's purpose and belief */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-lg"
          >
          Empowering the next generation to bridge awareness and action in sustainability. We are the narrators, educators, and agents of change, believing that sustainable living is not a luxury, but a necessity for all.
          </motion.p>

          {/* CTA Buttons: Directs users to explore vision and connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground hover:shadow-primary/30 relative overflow-hidden rounded-full px-6 shadow-lg transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Our Vision
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="from-primary via-primary/90 to-primary/80 absolute inset-0 z-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-border bg-background/50 flex items-center gap-2 rounded-full backdrop-blur-sm"
            >
              <SparkleIcon className="h-4 w-4" /> {/* Changed icon to Users */}
              Explore our content
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Placeholder for Button and cn utilities if they are not provided by Shadcn UI directly in this context.
// In a real Shadcn project, these would be imported from your project's components/ui and lib/utils.
// For this example, I'm including simple mockups to make the code runnable in isolation if needed.

// Mock Button component (replace with your actual Shadcn Button)
// function Button({ children, className, variant, size, ...props }) {
//   const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
//   const variantClasses = {
//     default: "bg-primary text-primary-foreground hover:bg-primary/90",
//     outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//     // Add other variants as needed
//   };
//   const sizeClasses = {
//     default: "h-10 px-4 py-2",
//     lg: "h-11 px-8",
//     // Add other sizes as needed
//   };
//   return (
//     <button className={`${baseClasses} ${variantClasses[variant || 'default']} ${sizeClasses[size || 'default']} ${className}`} {...props}>
//       {children}
//     </button>
//   );
// }

// Mock cn utility (replace with your actual lib/utils.ts cn function)
// function cn(...inputs) {
//   return inputs.filter(Boolean).join(' ');
// }
