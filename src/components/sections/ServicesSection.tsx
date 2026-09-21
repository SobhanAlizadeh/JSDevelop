import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";

const services = [
   {
    icon: "workflow",
    title: "اتوماسیون هوشمند n8n",
    description: "اتصال CRM، ایمیل و بیش از ۴۰۰ اپلیکیشن با ورک‌فلوهای هوشمند و خطای صفر.",
  },
  {
    icon: "box",
    title: "وب سه‌بعدی (Three.js)",
    description: "تجربه‌های غوطه‌ور با WebGL و شیدرهای سفارشی، ۶۰ فریم روان روی همه دستگاه‌ها.",
  },
  {
    icon: "search",
    title: "سئو و بهینه‌سازی وب‌سایت",
    description: "تحلیل تکنیکال کامل، کلیدواژه‌های هدفمند با ابزارهای حرفه‌ای و لینک‌سازی استراتژیک برای صدر نتایج گوگل.",
  },
  {
    icon: "bar-chart-3",
    title: "مدیریت تبلیغات گوگل",
    description: "بهینه‌سازی روزانه بودجه و کلیدواژه، تست A/B خلاقیت‌ها و داشبورد لحظه‌ای برای بیشترین ROI.",
  },
  {
    icon: "share-2",
    title: "مدیریت شبکه‌های اجتماعی",
    description: "استراتژی اختصاصی، تولید محتوای بصری و مدیریت تعامل در اینستاگرام و لینکدین.",
  },
  {
    icon: "trending-up",
    title: "ارتقای فروش آنلاین",
    description: "بهینه‌سازی قیف فروش، لندینگ‌های اعتمادساز و اتوماسیون ایمیل برای افزایش نرخ تبدیل.",
  },
  {
    icon: "globe",
    title: "طراحی وب‌سایت",
    description: "وب‌سایت‌های سریع، امن و واکنش‌گرا با UI/UX سفارشی و بهترین شیوه‌های سئو.",
  },
  {
    icon: "code-2",
    title: "توسعه نرم‌افزار",
    description: "نرم‌افزارهای سفارشی با معماری ماژولار، API امن و پشتیبانی و به‌روزرسانی مستمر.",
  },
  {
    icon: "smartphone",
    title: "اپلیکیشن موبایل",
    description: "طراحی و توسعه اپلیکیشن‌های موبایل برای ارتقای کسب‌وکار آنلاین شما با تست رایگان.",
  },
  {
    icon: "pen-tool",
    title: "طراحی UI/UX",
    description: "تحقیق پرسونا، وایرفریم و پروتوتایپ تا رابط نهایی با تست دسترسی‌پذیری.",
  },
  {
    icon: "file-text",
    title: "تولید محتوا",
    description: "مقالات، کپشن‌ها و تقویم محتوای منظم با ویرایش حرفه‌ای برای ماندگاری برند.",
  },
  {
    icon: "palette",
    title: "هویت بصری",
    description: "طراحی لوگو، پالت رنگ و سند کامل راهنمای برند برای هویتی منسجم و یکتا.",
  },
 
];

export function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="خدمات ما"
          title="راهکارهای جامع برای نیازهای کسب‌وکار شما"
          subtitle="از سئو و تبلیغات تا وب‌سه‌بعدی و اتوماسیون — همه‌چیز زیر یک سقف"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}