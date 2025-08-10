"use client";

import React, { useEffect, useState } from "react";

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  count?: number;
}

interface CategoryCarouselProps {
  categories: Category[];
  onCategoryClick: (id: string) => void;
}

export default function CategoryCarousel({ categories, onCategoryClick }: CategoryCarouselProps) {
  const labelMap: Record<string, string> = {
    guides: "guides",
    education: "articles",
    "climate-stories": "stories",
    "youth-voices": "blogs",
  };

  // Animated counts state
  const [animatedCounts, setAnimatedCounts] = useState<number[]>(() =>
    categories.map(() => 0)
  );

  useEffect(() => {
    categories.forEach((category, index) => {
      const target = category.count ?? 0;
      let start = 0;
      const duration = 800; // ms
      const startTime = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        setAnimatedCounts((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    });
  }, [categories]);

  return (
    <div className="w-full flex justify-center">
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 justify-center">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="flex-shrink-0 w-48 p-6 rounded-xl bg-[#1a1a1a] hover:bg-[#242424] transition-colors duration-300 text-center"
          >
            <div className="flex justify-center mb-4 text-[#8fd6a9]">{category.icon}</div>
            <h3 className="text-lg font-semibold text-[#eae4d2]">{category.title}</h3>
            <p className="mt-1 text-sm text-[#eae4d2]/70">
              {animatedCounts[index]} {labelMap[category.id] || "articles"}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
