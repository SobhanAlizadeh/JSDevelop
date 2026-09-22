"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

interface Project {
  name: string;
  image: string;
  link: string;
}

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  relatedProjects?: Project[];
  onViewProjects?: () => void;
}

export function ServiceCard({
  icon,
  title,
  description,
  index,
  relatedProjects,
  onViewProjects,
}: ServiceCardProps) {
  const IconComponent = getIcon(icon);

  return (
    <div className="group glass-panel p-5 md:p-6 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col">
      {/* آیکون خدمت */}
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
      </div>

      {/* عنوان و توضیح */}
      <h3 className="text-base md:text-lg font-bold mb-2 text-heading">{title}</h3>
      <p className="text-xs md:text-sm text-muted-custom leading-relaxed mb-4 flex-1">
        {description}
      </p>

      {/* لینک درخواست مشاوره */}
      <Link
        href="#contact"
        className="inline-flex items-center gap-1 text-xs md:text-sm text-primary font-semibold hover:gap-2 transition-all mb-2"
      >
        درخواست مشاوره
        <ArrowLeft className="w-4 h-4" />
      </Link>

      {/* دکمه مشاهده نمونه‌کارها */}
      {onViewProjects && (
        <button
          onClick={onViewProjects}
          className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs md:text-sm font-semibold transition-all border border-primary/20 hover:border-primary/40"
        >
          <Sparkles className="w-4 h-4" />
          مشاهده نمونه‌کارها
        </button>
      )}
    </div>
  );
}