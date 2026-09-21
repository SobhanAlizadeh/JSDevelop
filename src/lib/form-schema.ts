import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام نباید بیشتر از ۵۰ کاراکتر باشد"),
  contact: z
    .string()
    .min(5, "ایمیل یا موبایل معتبر نیست")
    .refine(
      (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+98|0)?9\d{9}$/;
        return emailRegex.test(val) || phoneRegex.test(val.replace(/\s/g, ""));
      },
      { message: "فرمت ایمیل یا موبایل صحیح نیست" }
    ),
  service: z.string().min(1, "لطفاً یک خدمت انتخاب کنید"),
  message: z
    .string()
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(1000, "پیام نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;