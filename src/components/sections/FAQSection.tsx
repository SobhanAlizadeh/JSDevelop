// src/components/sections/FAQSection.tsx
// Server Component — بدون JS سمت کلاینت
// آکاردئون با <details>/<summary> بومی HTML: بدون فایل JS اضافه و متن‌ها
// همیشه در DOM برای خزندگان گوگل قابل ایندکس هستند.
// اسکیمای FAQPage فرصت نمایش Rich Result (پرسش‌های بازشو در SERP) می‌دهد.

import { siteConfig } from "@/lib/metadata";

const faqs = [
  {
    question: "آژانس دیجیتال JSDevelop چه خدماتی ارائه می‌دهد؟",
    answer:
      "JSDevelop از سال ۲۰۰۹ به‌عنوان یک آژانس دیجیتال در تهران، طیف کاملی از خدمات را زیر یک سقف ارائه می‌کند: طراحی وب‌سایت حرفه‌ای و فروشگاه اینترنتی، سئو و بهینه‌سازی وب‌سایت برای صدر نتایج گوگل، مدیریت کمپین‌های تبلیغات گوگل (Google Ads)، اتوماسیون کسب‌وکار با n8n، طراحی وب‌سایت سه‌بعدی با Three.js، مدیریت شبکه‌های اجتماعی، تولید محتوا، طراحی UI/UX، توسعه نرم‌افزار سفارشی و اپلیکیشن موبایل. تا امروز بیش از ۵۰۰ پروژه موفق برای کسب‌وکارهای ایرانی اجرا کرده‌ایم.",
  },
  {
    question: "هزینه طراحی وب‌سایت در JSDevelop چقدر است؟",
    answer:
      "هزینه طراحی سایت به نوع پروژه بستگی دارد: یک وب‌سایت شرکتی، فروشگاه اینترنتی یا وب‌سایت سه‌بعدی اختصاصی هر کدام دامنه کاری و امکانات متفاوتی دارند. برای همین ابتدا در یک جلسه مشاوره رایگان، نیازهای شما را بررسی می‌کنیم و بر اساس آن، پیشنهاد شفاف و بدون هزینه پنهان ارائه می‌دهیم. برای دریافت برآورد دقیق، از طریق واتساپ یا تلفن با ما در تماس باشید.",
  },
  {
    question: "سئو چقدر طول می‌کشد تا نتیجه بدهد و به صفحه اول گوگل برسیم؟",
    answer:
      "سئو یک سرمایه‌گذاری میان‌مدت است؛ معمولاً نشانه‌های اولیه رشد بین ۲ تا ۳ ماه و نتایج پایدار بین ۴ تا ۶ ماه قابل مشاهده است. مدت دقیق به رقابت کلیدواژه‌های هدف، سابقه دامنه و وضعیت فنی سایت شما بستگی دارد. تیم سئو ما کار را با ممیزی تکنیکال کامل، تحقیق کلیدواژه و رفع مشکلات سرعت و Core Web Vitals شروع می‌کند و گزارش ماهانه شفاف از جایگاه کلیدواژه‌ها و ترافیک ارگانیک ارائه می‌دهد.",
  },
  {
    question: "اتوماسیون n8n چیست و چه مزایایی برای کسب‌وکار من دارد؟",
    answer:
      "n8n یک پلتفرم متن‌باز اتوماسیون گردش کار است که بیش از ۴۰۰ اپلیکیشن — از CRM و ایمیل تا تلگرام، واتساپ و پایگاه داده — را بدون کدنویسی به هم متصل می‌کند. با اتوماسیون n8n، کارهای تکراری مثل ثبت لید، پیگیری مشتری، ارسال فاکتور و گزارش‌گیری به‌صورت خودکار و بدون خطای انسانی انجام می‌شود. نتیجه: صرفه‌جویی در ساعت‌های کاری تیم، کاهش هزینه‌ها و پاسخگویی سریع‌تر به مشتریان. ما طراحی، پیاده‌سازی و نگهداری ورک‌فلوهای n8n را به‌صورت تخصصی انجام می‌دهیم.",
  },
  {
    question: "وب‌سایت سه‌بعدی با Three.js چه تفاوتی با سایت‌های معمولی دارد؟",
    answer:
      "وب‌سایت سه‌بعدی با Three.js و WebGL، تجربه‌ای غوطه‌ور و تعاملی برای بازدیدکننده می‌سازد — از نمایش ۳۶۰ درجه محصول تا انیمیشن‌های سه‌بعدی منحصربه‌فرد — که برند شما را از رقبا متمایز می‌کند و زمان ماندگاری کاربر را افزایش می‌دهد. نکته مهم این است که این تجربه‌ها نباید سرعت سایت را قربانی کنند؛ ما همین سایت jsdevelop.ir را با Next.js و Three.js به‌گونه‌ای بهینه کرده‌ایم که نمره PageSpeed موبایل آن بالاست و امتیاز Core Web Vitals آن سبز است.",
  },
  {
    question: "آیا JSDevelop مدیریت تبلیغات گوگل (Google Ads) را هم انجام می‌دهد؟",
    answer:
      "بله. تیم ما مدیریت کامل کمپین‌های گوگل ادز را از صفر تا صد انجام می‌دهد: تحقیق کلیدواژه، ساخت کمپین جستجو و نمایشی، نگارش متن تبلیغات، بهینه‌سازی روزانه بودجه و مزایده، تست A/B خلاقیت‌ها و رهگیری تبدیل‌ها با داشبورد لحظه‌ای. هدف ما بیشترین بازگشت سرمایه (ROI) از بودجه تبلیغاتی شماست، نه صرفاً کلیک بیشتر.",
  },
  {
    question: "پس از تحویل پروژه، پشتیبانی و نگهداری چگونه انجام می‌شود؟",
    answer:
      "همه پروژه‌های ما شامل دوره پشتیبانی رایگان پس از تحویل هستند: رفع باگ، به‌روزرسانی‌های امنیتی و پشتیبان‌گیری منظم. پس از آن، قرارداد نگهداری ماهانه با SLA مشخص ارائه می‌دهیم که شامل مانیتورینگ سرعت و دسترس‌پذیری سایت، به‌روزرسانی محتوا و بهبودهای مستمر سئو است. پشتیبانی ما در روزهای کاری شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر پاسخگوست و میانگین زمان پاسخ کمتر از ۲ ساعت است.",
  },
  {
    question: "چگونه می‌توانم پروژه خود را با JSDevelop شروع کنم؟",
    answer:
      "شروع کار ساده است: از طریق واتساپ، تلفن یا ایمیل با ما در تماس بگیرید و در چند جمله بگویید چه هدفی دارید. در کمتر از ۲ ساعت کاری پاسخ می‌گیرید و یک جلسه مشاوره رایگان ۳۰ دقیقه‌ای تنظیم می‌شود. پس از تحلیل نیازها، پیشنهاد فنی و مالی شفاف دریافت می‌کنید و با تأیید شما، فاز طراحی آغاز می‌شود. آدرس دفتر ما تهران، خیابان شریعتی، میرداماد، پلاک ۹۱۱ است و جلسات حضوری با هماهنگی قبلی انجام می‌شود.",
  },
];

// اسکیمای FAQPage — مطابق خط‌مشی گوگل: متن کامل هر پاسخ در اسکیما تکرار می‌شود
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative z-10 section-backdrop py-16 md:py-24 lg:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-accent font-semibold tracking-wider text-xs md:text-sm uppercase">
            سوالات متداول
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-custom font-bold mt-3 mb-4">
            پرسش‌های پرتکرار درباره خدمات ما
          </h2>
          <p className="text-muted-custom text-sm md:text-lg max-w-2xl mx-auto px-4">
            پاسخ پرتکرارترین سوالات درباره طراحی وب‌سایت، سئو، تبلیغات گوگل و
            اتوماسیون n8n — اگر پاسخ سوال خود را پیدا نکردید، مشاوره رایگان
            بگیرید.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group glass-panel rounded-2xl border border-custom overflow-hidden transition-colors hover:border-primary/40 open:border-primary/50"
              open={index === 0}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6 text-right select-none">
                <h3 className="text-sm md:text-lg font-bold text-heading leading-relaxed">
                  {faq.question}
                </h3>
                <span
                  className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6">
                <p className="text-xs md:text-base text-muted-custom leading-relaxed border-t border-custom pt-4">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* CTA پایین FAQ */}
        <div className="text-center mt-10 md:mt-12">
          <a
            href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}?text=سلام،%20سوال%20داشتم%20درباره%20خدمات%20JSDevelop`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold text-sm md:text-base hover:bg-primary/20 transition-colors"
          >
            سوال خود را در واتساپ بپرسید
          </a>
        </div>
      </div>
    </section>
  );
}
