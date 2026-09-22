"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink, ArrowLeft, Workflow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { N8nShowcase } from "./N8nShowcase";
import type { N8nWorkflow } from "@/lib/n8n-workflows";

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
  workflows?: N8nWorkflow[];
}

export function ProjectModal({
  isOpen,
  onClose,
  serviceTitle,
  projects,
  workflows,
}: ProjectModalProps) {
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

  // بررسی اینکه آیا پروژه‌ها فقط placeholder هستند (مثل n8n)
  const hasRealProjects =
    projects.length > 0 &&
    !(projects.length === 1 && (projects[0].link === "/" || projects[0].link === "#"));

  const hasWorkflows = workflows && workflows.length > 0;

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
                    {hasWorkflows && hasRealProjects
                      ? "نمونه‌کارها و گردش‌کارهای اجرایی"
                      : hasWorkflows
                      ? "گردش‌کارهای اجرایی"
                      : "نمونه‌کارهای مرتبط با این خدمت"}
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
            <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-5 md:p-8 space-y-8">
              {/* ═══════════════════════════════════════════
                  ویترین n8n (فقط اگر workflows وجود داشت)
                 ═══════════════════════════════════════════ */}
              {hasWorkflows && (
                <div className={hasRealProjects ? "pb-8 border-b border-custom" : ""}>
                  <h3 className="text-base md:text-lg font-bold text-heading mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Workflow size={16} className="text-primary" />
                    </span>
                    نمونه گردش‌کارهای اجرایی
                  </h3>
                  <N8nShowcase workflows={workflows!} />
                </div>
              )}

              {/* ═══════════════════════════════════════════
                  گرید پروژه‌ها (فقط اگر پروژه واقعی وجود داشت)
                 ═══════════════════════════════════════════ */}
              {hasRealProjects && (
                <div>
                  <h3 className="text-base md:text-lg font-bold text-heading mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <ExternalLink size={16} className="text-secondary" />
                    </span>
                    پروژه‌های انجام‌شده
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                      >
                        <Link
                          href={project.link}
                          target={project.link.startsWith("http") ? "_blank" : undefined}
                          rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
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
                            <h4 className="text-base md:text-lg font-bold text-heading group-hover:text-primary transition-colors">
                              {project.name}
                            </h4>
                            <span className="inline-flex items-center gap-1 text-xs text-muted-custom mt-2 group-hover:text-primary transition-colors">
                              مشاهده جزئیات
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════
                  CTA پایین مودال
                 ═══════════════════════════════════════════ */}
              <div className="pt-6 border-t border-custom text-center">
                <p className="text-muted-custom text-sm mb-4">
                  {hasWorkflows
                    ? "نیاز به اتوماسیون مشابهی دارید؟"
                    : "پروژه مشابهی مد نظرتان است؟"}
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