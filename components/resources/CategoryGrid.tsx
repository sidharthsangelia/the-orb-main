"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (id: string) => void;
}

export default function CategoryGrid({ categories, onCategoryClick }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ delay: 0.1 * index, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center w-full h-44 sm:h-56 bg-card border border-border rounded-lg cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 p-6 aspect-square"
          onClick={() => onCategoryClick(category.id)}
        >
          <div className="mb-3">{category.icon}</div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground text-center">{category.title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground text-center">{category.count} items</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 text-primary hover:text-primary hover:bg-primary/10"
          >
            View →
          </Button>
        </motion.div>
      ))}
    </div>
  );
}   