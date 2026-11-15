// src/app/products/page.tsx
// مسیر /products فاقد صفحه مستقل است — به سکشن محصولات صفحه اصلی هدایت می‌شود
// (جلوگیری از 404 و حفظ جریان کاربر)
import { redirect } from "next/navigation";

export default function ProductsIndexPage() {
  redirect("/#products");
}
