"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // بستن منو با کلید Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // قفل/آزاد کردن اسکرول
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { href: "#services", label: "خدمات" },
    { href: "#about", label: "درباره ما" },
    { href: "#contact", label: "تماس" },
  ];

  return (
    <>
      {/* هدر اصلی */}
      <header className="fixed top-0 w-full z-50 glass-panel border-b border-custom">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            
            <span className="text-xl font-bold tracking-tight text-heading">
              JSDevelop
            </span>
            <Image
              src="/logo.webp"
              alt="JSDevelop Logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
          </Link>

          <nav
            className="hidden md:flex items-center gap-8 text-sm font-medium"
            aria-label="منوی اصلی"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-custom hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-card-custom transition-colors"
              aria-label="تغییر حالت شب و روز"
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>

            <Link
              href="#contact"
              className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all text-sm"
            >
              شروع پروژه
            </Link>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-card-custom transition-colors"
              aria-label="منو"
            >
              <Menu className="w-6 h-6 text-heading" />
            </button>
          </div>
        </div>
      </header>

      {/* منوی موبایل */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col md:hidden"
          >
            {/* پس‌زمینه تیره/روشن با متغیر CSS */}
            <div
              className="absolute inset-0 bg-background/98 backdrop-blur-xl"
              onClick={closeMenu}
            />

            {/* محتوای منو */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 space-y-8 px-6">
              {/* دکمه بستن */}
              <button
                onClick={closeMenu}
                className="absolute top-6 left-6 p-3 rounded-full bg-card-custom text-heading hover:bg-primary hover:text-white transition-colors"
                aria-label="بستن منو"
              >
                <X className="w-6 h-6" />
              </button>

              {/* لینک‌ها */}
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="text-2xl font-bold text-heading hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* CTA */}
              <motion.a
                href="#contact"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                شروع پروژه
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}