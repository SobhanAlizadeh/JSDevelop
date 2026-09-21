"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contactFormSchema, type ContactFormData } from "@/lib/form-schema";

const services = [
  "سئو و بهینه‌سازی",
  "تبلیغات گوگل",
  "شبکه‌های اجتماعی",
  "فروش آنلاین",
  "طراحی وب‌سایت",
  "توسعه نرم‌افزار",
  "اپلیکیشن موبایل",
  "طراحی UI/UX",
  "تولید محتوا",
  "هویت بصری",
  "اتوماسیون n8n",
  "وب‌سایت سه‌بعدی (Three.js)",
];

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // شبیه‌سازی ارسال به API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-400 mb-2">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white placeholder-slate-600"
            placeholder="نام شما"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-400 mb-2">
            ایمیل یا موبایل
          </label>
          <input
            type="text"
            {...register("contact")}
            dir="ltr"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white placeholder-slate-600"
            placeholder="you@example.com"
          />
          {errors.contact && (
            <p className="text-red-400 text-xs mt-1">{errors.contact.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium text-slate-400 mb-2">
          خدمت موردنظر
        </label>
        <select
          {...register("service")}
          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white appearance-none cursor-pointer"
        >
          <option value="" disabled>
            انتخاب کنید...
          </option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium text-slate-400 mb-2">
          پیام شما
        </label>
        <textarea
          rows={4}
          {...register("message")}
          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white placeholder-slate-600 resize-none"
          placeholder="پروژه‌تان را کوتاه توضیح دهید…"
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 md:py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-white hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            در حال ارسال...
          </>
        ) : (
          <>
            <span>ارسال درخواست مشاوره رایگان</span>
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </>
        )}
      </button>

      <AnimatePresence>
        {!isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-center text-sm md:text-base font-medium flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            ✓ پیام شما با موفقیت ثبت شد. به‌زودی با شما تماس می‌گیریم.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}