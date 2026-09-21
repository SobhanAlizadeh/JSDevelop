import { MapPin, Phone, Mail } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteConfig } from "@/lib/metadata";

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-16 md:py-24 lg:py-32 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="تماس با ما"
          title="در ارتباط باشید"
          subtitle="برای مشاوره رایگان، فرم را تکمیل کنید یا مستقیم با ما در تماس باشید."
        />

        <div className="max-w-5xl mx-auto glass-panel rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5">
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-2 p-6 md:p-10 lg:p-12 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary/30 rounded-full blur-3xl -mr-20 -mt-20 md:-mr-32 md:-mt-32"></div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 relative z-10">
                اطلاعات تماس
              </h3>
              <div className="space-y-5 md:space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-400 mb-1">آدرس</p>
                    <p className="text-sm md:text-base text-slate-200">{siteConfig.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-400 mb-1">تلفن</p>
                    <p className="text-sm md:text-base text-slate-200" dir="ltr">
                      {siteConfig.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-400 mb-1">ایمیل</p>
                    <p className="text-sm md:text-base text-slate-200" dir="ltr">
                      {siteConfig.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 p-6 md:p-10 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}