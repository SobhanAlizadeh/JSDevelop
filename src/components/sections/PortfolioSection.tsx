import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";

const projects = [
  {
    name: "Papachi Kids",
    category: "توسعه",
    year: "۲۰۲۵",
    description: "پلتفرم هوشمند تغذیه و رشد کودک با هوش مصنوعی (Flutter + Laravel)",
    icon: "layers",
  },
  {
    name: "LuxeWatch 3D",
    category: "سه‌بعدی",
    year: "۰۲۴",
    description: "کانفیگوراتور سه‌بعدی محصول با رندر فوتورئالیستیک در مرورگر",
    icon: "box",
  },
  {
    name: "n8n CRM Hub",
    category: "اتوماسیون",
    year: "۲۰۲۴",
    description: "یکپارچه‌سازی Salesforce و HubSpot — صرفه‌جویی ۰+ ساعت در هفته",
    icon: "workflow",
  },
  {
    name: "MegaCard",
    category: "تبلیغات",
    year: "۲۰۲۴",
    description: "کمپین تبلیغاتی داده‌محور برای حداکثر ROI و تبدیل سرنخ",
    icon: "megaphone",
  },
  {
    name: "Virtual Hospital",
    category: "توسعه",
    year: "۲۰۲۴",
    description: "وب‌اپ تعامل مجازی بیمار با سئو تخصصی حوزه سلامت",
    icon: "heart-pulse",
  },
  {
    name: "Bootimar",
    category: "توسعه",
    year: "۲۰۲۰",
    description: "پلتفرم بلیط با مقایسه لحظه‌ای قیمت و رزرو یکپارچه",
    icon: "ticket",
  },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="relative z-10 py-16 md:py-24 lg:py-32 bg-slate-900/30">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="نمونه‌کارها"
          title="پروژه‌های منتخب"
          subtitle="گزیده‌ای از پروژه‌های اخیر ما در حوزه‌های توسعه، تبلیغات و اتوماسیون"
          kickerColor="text-secondary"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}