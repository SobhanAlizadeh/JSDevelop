"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass-panel rounded-2xl overflow-hidden hover:border-secondary/50 transition-all duration-500"
    >
      <div className="h-40 md:h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
        {IconComponent && (
          <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-slate-700 group-hover:text-primary/50 transition-colors duration-500" />
        )}
      </div>
      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
            {category}
          </span>
          <span className="text-slate-500 text-xs md:text-sm">{year}</span>
        </div>
        <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}