"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const navLinks = [
    { href: "#services", label: "خدمات" },
    { href: "#portfolio", label: "نمونه‌کارها" },
    { href: "#about", label: "درباره ما" },
    { href: "#contact", label: "تماس" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-panel border-b border-white/5 py-3"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              JS
            </div>
            <span className="text-xl font-bold tracking-tight">JSDevelop</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="تغییر حالت شب و روز"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-300" />
              )}
            </button>
            <Link
              href="#contact"
              className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all text-sm"
            >
              شروع پروژه
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="منو"
            >
              <Menu className="w-6 h-6 text-slate-300" />
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
            className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 text-xl font-medium md:hidden"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 left-6 p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="بستن منو"
            >
              <X className="w-8 h-8" />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-300 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-8 py-3 rounded-full bg-primary text-white font-bold"
            >
              شروع پروژه
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}