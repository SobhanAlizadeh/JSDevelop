// استخراج متن کامل گزارش seositecheckup با Playwright
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  });
  await page.goto("https://seositecheckup.com/seo-audit/jsdevelop.ir", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(4000);

  const text = await page.evaluate(() => document.body.innerText);
  require("fs").writeFileSync("/tmp/report-full.txt", text);
  console.log("saved", text.length, "chars");

  // استخراج تست‌های Failed و Warning
  const lines = text.split("\n").map((l) => l.trim());
  const results = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "Failed:" || lines[i] === "Warning:") {
      const kind = lines[i];
      // عنوان تست: اولین خط غیر عددی/امتیاز قبل از این خط
      let j = i - 1;
      while (j >= 0 && /^\d+$/.test(lines[j])) j--;
      const title = lines[j] || "?";
      const count = lines[i + 1] || "?";
      results.push(`${kind} [${count}] :: ${title}`);
    }
  }
  console.log(results.join("\n"));
  await browser.close();
})();
