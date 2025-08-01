"use client";
import { Award, Lightbulb, TrendingUp, Users2 } from "lucide-react";
import { motion, useInView } from 'framer-motion';

export const Achievements = () => {
  const achievements = [
    { 
      icon: Award, 
      title: "Featured in National Media", 
      desc: "Coverage by leading publications" 
    },
    { 
      icon: TrendingUp, 
      title: "Fastest Growing Community", 
      desc: "300% growth in 2024" 
    },
    { 
      icon: Users2, 
      title: "Multi-City Presence", 
      desc: "Active in 25+ cities" 
    },
    { 
      icon: Lightbulb, 
      title: "Innovation Award Winner", 
      desc: "Best Youth Initiative 2024" 
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Recognition & Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our community's achievements speak louder than words
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index} 
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                    <achievement.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};