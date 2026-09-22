"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Logo } from "@/components/ui/Logo";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // بستن منو با Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // قفل اسکرول
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

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
      <header className="fixed top-0 w-full z-50 glass-panel border-b border-custom">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Logo size={40} />

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

      {/* منوی موبایل - CSS خالص (بدون framer-motion) */}
      <div
        className={`mobile-menu fixed inset-0 z-[60] flex flex-col md:hidden ${isMenuOpen ? "open" : ""
          }`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/98 backdrop-blur-xl"
          onClick={closeMenu}
        />

        {/* محتوای منو */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 space-y-8 px-6">
          <button
            onClick={closeMenu}
            className="absolute top-6 left-6 p-3 rounded-full bg-card-custom text-heading hover:bg-primary hover:text-white transition-colors"
            aria-label="بستن منو"
          >
            <X className="w-6 h-6" />
          </button>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-2xl font-bold text-heading hover:text-primary transition-colors mobile-menu-item"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all mobile-menu-item"
          >
            شروع پروژه
          </a>
        </div>
      </div>
    </>
  );
}