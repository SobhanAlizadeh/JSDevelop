"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export function ServiceCard({ icon, title, description, index }: ServiceCardProps) {
  const IconComponent = getIcon(icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group glass-panel p-5 md:p-6 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        {IconComponent ? (
          <IconComponent className="w-6 h-6 text-primary" />
        ) : (
          <div className="w-6 h-6 bg-primary/20 rounded" />
        )}
      </div>
      <h3 className="text-base md:text-lg font-bold mb-2 text-heading">{title}</h3>
      <p className="text-xs md:text-sm text-muted-custom leading-relaxed mb-4">
        {description}
      </p>
      <Link
        href="#contact"
        className="inline-flex items-center gap-1 text-xs md:text-sm text-primary font-semibold hover:gap-2 transition-all"
      >
        درخواست مشاوره
        <ArrowLeft className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}