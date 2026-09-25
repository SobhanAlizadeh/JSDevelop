import { ImageResponse } from "next/og";

// تنظیمات ابعاد استاندارد
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030712", // سرمه‌ای تیره
          color: "#ffffff",
          fontFamily: "sans-serif", // استفاده از فونت سیستمی برای جلوگیری از خطای فونت
        }}
      >
        {/* لوگوی متنی ساده */}
        <div
          style={{
            fontSize: "150px",
            fontWeight: "bold",
            marginBottom: "40px",
            letterSpacing: "-5px",
          }}
        >
          <span style={{ color: "#fff" }}>JS</span>
          <span style={{ color: "#3b82f6" }}>D</span>
        </div>

        {/* عنوان */}
        <h1
          style={{
            fontSize: "60px",
            margin: 0,
            textAlign: "center",
          }}
        >
          JSDevelop Agency
        </h1>

        {/* توضیح */}
        <p
          style={{
            fontSize: "30px",
            color: "#94a3b8",
            marginTop: "20px",
          }}
        >
          Digital Presence • SEO • Automation
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}