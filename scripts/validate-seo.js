// اعتبارسنجی JSON-LD های صفحه اصلی با پارسر واقعی + چک رهنمودهای گوگل
const fs = require("fs");
const html = fs.readFileSync("/tmp/rendered.html", "utf8");

const scripts = [...html.matchAll(
  /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
)].map((m) => m[1]);

console.log(`تعداد بلوک JSON-LD: ${scripts.length}\n`);

let allOk = true;
scripts.forEach((s, i) => {
  try {
    const obj = JSON.parse(s);
    console.log(`✅ بلوک ${i + 1}: @type = ${obj["@type"]}`);
    if (obj["@type"] === "FAQPage") {
      console.log(`   تعداد سوالات: ${obj.mainEntity.length}`);
      const bad = obj.mainEntity.filter(
        (q) => !q.name?.trim() || !q.acceptedAnswer?.text?.trim()
      );
      if (bad.length) {
        allOk = false;
        console.log("   ⚠️ سوال/جواب خالی وجود دارد!");
      }
    }
    if (obj["@type"] === "ProfessionalService") {
      const req = ["name", "url", "telephone", "address", "geo", "openingHoursSpecification", "hasOfferCatalog", "sameAs", "priceRange"];
      const missing = req.filter((k) => !obj[k]);
      if (missing.length) {
        allOk = false;
        console.log(`   ⚠️ فیلدهای جاافتاده: ${missing.join(", ")}`);
      } else {
        console.log(`   کاتالوگ: ${obj.hasOfferCatalog.itemListElement.length} خدمت — همه فیلدهای الزامی موجود`);
      }
    }
  } catch (e) {
    allOk = false;
    console.log(`❌ بلوک ${i + 1}: JSON نامعتبر — ${e.message}`);
  }
});

// چک تگ‌های سئوی حیاتی
const checks = {
  "<title>": /<title>[^<]+<\/title>/.test(html),
  "meta description": /<meta name="description" content="[^"]{50,180}"/.test(html),
  "canonical": /<link rel="canonical" href="https:\/\/jsdevelop\.ir\/?"/.test(html),
  "og:image": /<meta property="og:image"/.test(html),
  "robots index": /<meta name="robots" content="index, follow/.test(html),
  "exactly one h1": (html.match(/<h1[\s>]/g) || []).length === 1,
  "h2 count >= 4": (html.match(/<h2[\s>]/g) || []).length >= 4,
  "faq in DOM": html.includes("سوالات متداول"),
  "keyword links footer": html.includes("اتوماسیون n8n") && html.includes("تبلیغات گوگل"),
  "html lang=fa": /<html[^>]*lang="fa"/.test(html),
};

console.log("\n─── چک‌لیست سئوی آن‌پیج ───");
for (const [k, v] of Object.entries(checks)) {
  console.log(`${v ? "✅" : "❌"} ${k}`);
  if (!v) allOk = false;
}

console.log(allOk ? "\n🎉 همه بررسی‌ها موفق" : "\n⚠️ موارد نیازمند رفع وجود دارد");
process.exit(allOk ? 0 : 1);
