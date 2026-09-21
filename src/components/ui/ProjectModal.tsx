"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  name: string;
  image: string;
  link: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  projects: Project[];
}

export function ProjectModal({ isOpen, onClose, serviceTitle, projects }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // قفل اسکرول body و بستن با ESC
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEscape);
      
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // کلیک روی backdrop برای بستن
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* محتوای مودال */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden glass-panel rounded-2xl md:rounded-3xl border border-custom shadow-2xl"
          >
            {/* هدر مودال */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 md:p-6 border-b border-custom bg-background/90 backdrop-blur-md">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ArrowLeft className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h2
                    id="modal-title"
                    className="text-lg md:text-xl font-bold text-heading truncate"
                  >
                    {serviceTitle}
                  </h2>
                  <p className="text-xs md:text-sm text-muted-custom">
                    نمونه‌کارهای مرتبط با این خدمت
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-card-custom transition-colors shrink-0"
                aria-label="بستن"
              >
                <X className="w-5 h-5 text-heading" />
              </button>
            </div>

            {/* بدنه مودال - قابل اسکرول */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-5 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    {project.link === "#" ? (
                      <div className="group block glass-panel rounded-xl overflow-hidden cursor-not-allowed opacity-50">
                        <div className="relative w-full aspect-video bg-muted overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-base md:text-lg font-bold text-heading">
                            {project.name}
                          </h3>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-custom mt-2">
                            در حال ساخت
                          </span>
                        </div>
                      </div>
                    ) : ( 
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block glass-panel rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* کانتینر تصویر با aspect-ratio ثابت برای جلوگیری از CLS */}
                      <div className="relative w-full aspect-video bg-muted overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay هنگام hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-semibold">
                            مشاهده پروژه
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                      {/* اطلاعات پروژه */}
                      <div className="p-4">
                        <h3 className="text-base md:text-lg font-bold text-heading group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-custom mt-2 group-hover:text-primary transition-colors">
                          مشاهده جزئیات
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                     )}
                  </motion.div>
                  
                ))}
              </div>

              {/* CTA پایین مودال */}
              <div className="mt-8 pt-6 border-t border-custom text-center">
                <p className="text-muted-custom text-sm mb-4">
                  پروژه مشابهی مد نظرتان است؟
                </p>
                <Link
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-white hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  درخواست مشاوره رایگان
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}