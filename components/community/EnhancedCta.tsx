"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Sprout } from "lucide-react";
import { CTASectionData } from '@/types/community';

interface EnhancedCTAProps {
  data: CTASectionData;
}

export const EnhancedCTA = ({ data }: EnhancedCTAProps) => {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });
   
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div ref={ctaRef} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-primary/20"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              {data.title}
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
              {data.description}
            </p>
                       
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
               <a href="https://docs.google.com/forms/d/1ZSRthPLYMao1a4z1e9aXsNaR-PFQOtZn0UJkOVvnyEo/viewform?edit_requested=true"> {data.primaryButtonText}</a>
                <Sprout className="w-5 h-5" />
              </button>
              <button className="border-2 border-primary/30 bg-transparent hover:bg-primary/5 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <a href="https://docs.google.com/forms/d/1ZSRthPLYMao1a4z1e9aXsNaR-PFQOtZn0UJkOVvnyEo/viewform?edit_requested=true">{data.secondaryButtonText}</a>
              </button>
            </div>
                       
            <p className="text-primary font-semibold text-lg">
              {data.hashtags}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};