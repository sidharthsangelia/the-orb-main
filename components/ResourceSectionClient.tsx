"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type ResourceItem = {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
  type?: string;
  category?: string;
  image?: string;
};

interface ResourceSectionClientProps {
  id: string;
  title: string;
  description: string;
  items: ResourceItem[];
  type: string;
  href?: string;
  icon?: React.ReactNode;
}

export default function ResourceSectionClient({
  id,
  title,
  description,
  items,
  type,
  href,
  icon,
}: ResourceSectionClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          {icon}
          <h2 className="ml-3 text-2xl font-bold text-[#eae4d2]">{title}</h2>
        </div>
        <p className="text-[#eae4d2]/70 mb-12">{description}</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items?.map((item) => (
            <a
              key={item._id}
              href={`/${type}/${item.slug?.current}`}
              className="flex flex-col bg-[#1a1b1b] border border-[#575846]/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-[#487052]/50 transition-all duration-200"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-semibold text-[#eae4d2] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#eae4d2]/70 line-clamp-3 mb-4">
                  {item.description || ""}
                </p>
                <div className="mt-auto flex items-center justify-between text-xs text-[#eae4d2]/60">
                  {item.type && <span>{item.type}</span>}
                  {item.category && (
                    <span className="px-2 py-0.5 rounded-full bg-[#487052]/20 text-[#8fd6a9]">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
