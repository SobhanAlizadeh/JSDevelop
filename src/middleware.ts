import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// سئو — URL Canonicalization:
// https://www.jsdevelop.ir و https://jsdevelop.ir باید به یک URL نهایی برسند.
// درخواست‌های www با ریدایرکت ۳۰۸ (دائمی) به دامنه apex منتقل می‌شوند تا
// اعتبار لینک‌ها بین دو نسخه تقسیم نشود (جلوگیری از محتوای تکراری).
// ⚠️ نکته دیپلوی: در Vercel → Settings → Domains دامنه www.jsdevelop.ir را هم
// به پروژه اضافه کنید تا DNS آن به این اپ برسد و ریدایرکت اجرا شود.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.slice(4); // حذف «www.»
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// همه مسیرها به‌جز فایل‌های داخلی Next (استاتیک‌ها هم ریدایرکت شوند اشکالی ندارد —
// مرورگر بعد از ریدایرکت HTML، دارایی‌ها را از دامنه apex درخواست می‌کند)
export const config = {
  matcher: ["/((?!_next/).*)"],
};
