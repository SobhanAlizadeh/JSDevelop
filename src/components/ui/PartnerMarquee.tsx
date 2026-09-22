"use client";

interface Partner {
  name: string;
  latin: boolean;
}

const partners: Partner[] = [
  { name: "Digi Alpha", latin: true },
  { name: "Daap App", latin: true },
  { name: "Mega Card", latin: true },
  { name: "Niasa", latin: true },
  { name: "دانشگاه شریف", latin: false },
  { name: "دانشگاه آزاد اسلامی", latin: false },
];


export function PartnerMarquee() {
  return (
    // استفاده از -mx-4 برای شکستن محدودیت container بدون ایجاد اسکرول افقی (کاملاً امن برای PageSpeed و CLS)
    <div className="relative w-full -mx-4 sm:-mx-6 overflow-hidden py-6">
      
      {/* هاله محو شونده سمت راست */}
      <div className="absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* هاله محو شونده سمت چپ */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

      {/* کانتینر اصلی با w-max برای جلوگیری از شکستن خط (Wrap) */}
      <div className="marquee-container flex w-max">
        
        {/* تِرک اول */}
        <div className="marquee-track flex items-center gap-6 sm:gap-10 md:gap-16 px-6 sm:px-10 md:px-16">
          {partners.map((partner, index) => (
            <div
              key={`track1-${index}`}
              className="flex items-center gap-2 sm:gap-3 shrink-0"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/40 shrink-0" />
              <span
                dir={partner.latin ? "ltr" : "rtl"}
                className={`
                  text-base sm:text-lg md:text-2xl font-bold whitespace-nowrap
                  text-muted-custom hover:text-primary transition-colors duration-300
                  ${partner.latin ? "font-latin tracking-tight" : ""}
                `}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* تِرک دوم (کپی برابر اصل برای حلقه بی‌نهایت) */}
        <div className="marquee-track flex items-center gap-6 sm:gap-10 md:gap-16 px-6 sm:px-10 md:px-16" aria-hidden="true">
          {partners.map((partner, index) => (
            <div
              key={`track2-${index}`}
              className="flex items-center gap-2 sm:gap-3 shrink-0"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/40 shrink-0" />
              <span
                dir={partner.latin ? "ltr" : "rtl"}
                className={`
                  text-base sm:text-lg md:text-2xl font-bold whitespace-nowrap
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