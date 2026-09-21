"use client";

interface Partner {
  name: string;
  latin: boolean;
}

const partners: Partner[] = [
  { name: "Digi Alpha", latin: true },
  { name: "Daap App", latin: true },
  { name: "Mega Card", latin: true },
  { name: "niasa", latin: true },
  { name: "دانشگاه شریف", latin: false },
  { name: "دانشگاه ری", latin: false },
];

export function PartnerMarquee() {
  return (
    // تکنیک w-screen و منفی کردن مارجین‌ها برای شکستن قالب Container و تمام‌عرض شدن واقعی
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-6 bg-transparent">
      {/* هاله محو شونده سمت راست */}
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* هاله محو شونده سمت چپ */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

      <div className="marquee-container flex">
        {/* تِرک اول */}
        <div className="marquee-track gap-12 md:gap-16 pr-12 md:pr-16">
          {partners.map((partner, index) => (
            <div
              key={`track1-${index}`}
              className="flex items-center gap-3 md:gap-4 shrink-0"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/40 shrink-0" />
              <span
                dir={partner.latin ? "ltr" : "rtl"}
                className={`
                  text-lg md:text-2xl font-bold whitespace-nowrap
                  text-muted-custom hover:text-primary transition-colors duration-300
                  ${partner.latin ? "font-latin tracking-tight" : ""}
                `}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* تِرک دوم (کپی برابر اصل جهت تضمین حلقه بی‌نهایت و بدون پرش) */}
        <div className="marquee-track gap-12 md:gap-16 pr-12 md:pr-16" aria-hidden="true">
          {partners.map((partner, index) => (
            <div
              key={`track2-${index}`}
              className="flex items-center gap-3 md:gap-4 shrink-0"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/40 shrink-0" />
              <span
                dir={partner.latin ? "ltr" : "rtl"}
                className={`
                  text-lg md:text-2xl font-bold whitespace-nowrap
                  text-muted-custom hover:text-primary transition-colors duration-300
                  ${partner.latin ? "font-latin tracking-tight" : ""}
                `}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}