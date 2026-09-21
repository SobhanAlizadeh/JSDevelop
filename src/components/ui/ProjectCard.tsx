"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";

interface ProjectCardProps {
  name: string;
  category: string;
  year: string;
  description: string;
  icon: string;
  index: number;
}

export function ProjectCard({
  name,
  category,
  year,
  description,
  icon,
  index,
}: ProjectCardProps) {
  const IconComponent = getIcon(icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass-panel rounded-2xl overflow-hidden hover:border-secondary/50 transition-all duration-500"
    >
      <div className="h-40 md:h-48 bg-card-custom flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
        {IconComponent ? (
          <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-muted-custom group-hover:text-primary/50 transition-colors duration-500 relative z-10" />
        ) : (
          <div className="w-16 h-16 bg-muted/20 rounded-full relative z-10" />
        )}
      </div>
      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
            {category}
          </span>
          <span className="text-muted-custom text-xs md:text-sm">{year}</span>
        </div>
        <h3 className="text-lg md:text-xl font-bold mb-2 text-heading group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-muted-custom leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}