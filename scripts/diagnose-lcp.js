// تشخیص المان LCP و اینکه آیا صحنه سه‌بعدی بدون تعامل mount می‌شود
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: "/home/z/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({
    viewport: { width: 412, height: 823 }, // موبایل مثل Lighthouse
  });

  await page.addInitScript(() => {
    window.__lcps = [];
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          window.__lcps.push({
            t: Math.round(e.startTime),
            tag: e.element ? e.element.tagName : "?",
            cls: e.element ? (e.element.className || "").toString().slice(0, 60) : "",
            size: e.size,
            url: e.url || "",
          });
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch (err) {}
    window.__interacted = [];
    for (const ev of ["pointerdown", "pointermove", "wheel", "touchstart", "keydown", "scroll"]) {
      window.addEventListener(ev, () => window.__interacted.push(ev), { passive: true, once: true });
    }
  });

  const consoleLogs = [];
  page.on("console", (msg) => consoleLogs.push(msg.text()));

  await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 30000 });
  await page.waitForTimeout(7000);

  const lcps = await page.evaluate(() => window.__lcps);
  const interacted = await page.evaluate(() => window.__interacted);
  const sceneMounted = await page.evaluate(() => !!document.querySelector(".scene-fade"));

  console.log("=== LCP candidates (Playwright, no throttle, no interaction) ===");
  lcps.forEach((l) => console.log(` t=${l.t}ms <${l.tag} class="${l.cls}"> size=${l.size} url=${l.url}`));
  console.log("interacted events:", interacted);
  console.log("scene mounted without interaction:", sceneMounted);

  await browser.close();
})();
