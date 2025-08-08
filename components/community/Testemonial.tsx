"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TestimonialsSectionData } from '@/types/community';

interface TestimonialsSectionProps {
  data: TestimonialsSectionData;
}

// Testimonial Card Component
type TestimonialCardProps = {
  name: string;
  role: string;
  content: string;
  avatar: React.ReactNode;
  delay?: number;
};

const TestimonialCard = ({ name, role, content, avatar, delay = 0 }: TestimonialCardProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
   
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:scale-105"
    >
      <Quote className="w-8 h-8 text-primary/40 mb-4" />
      <p className="text-muted-foreground mb-4 leading-relaxed">{content}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
          {avatar}
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = ({ data }: TestimonialsSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{data.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              avatar={testimonial.avatar}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};