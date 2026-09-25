import { ImageResponse } from "next/og";

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
          backgroundColor: "#030712", // سرمه‌ای تیره برند شما
          fontFamily: "sans-serif", // استفاده از فونت سیستمی ساده
        }}
      >
        {/* ═══════════════════════════════════════
            لوگوی متنی JSD (بدون پیچیدگی فونت)
            ═══════════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "140px",
            fontWeight: 900,
            letterSpacing: "-5px",
            marginBottom: "30px",
            textShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
          }}
        >
          <span style={{ color: "#ffffff" }}>JS</span>
          <span style={{ color: "#3b82f6" }}>D</span>
        </div>

        {/* ═══════════════════════════════════════
            خط جداکننده گرادیانت
            ═══════════════════════════════════════ */}
        <div
          style={{
            width: "200px",
            height: "4px",
            background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
            borderRadius: "2px",
            marginBottom: "30px",
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
          }}
        />

        {/* ═══════════════════════════════════════
            عنوان اصلی (انگلیسی برای جلوگیری از خطا)
            ═══════════════════════════════════════ */}
        <h1
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#f8fafc",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          JSDevelop Digital Agency
        </h1>

        {/* ═══════════════════════════════════════
            توضیحات خدمات (انگلیسی)
            ═══════════════════════════════════════ */}
        <p
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            marginTop: "20px",
            marginBottom: "40px",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          SEO • 3D Web • n8n Automation • Google Ads
        </p>

        {/* ═══════════════════════════════════════
            بج دامنه پایین صفحه
            ═══════════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 24px",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            border: "2px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "50px",
          }}
        >
          {/* نقطه آبی روشن */}
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)",
            }}
          />
          
          {/* متن دامنه */}
          <span
            style={{
              fontSize: "22px",
              color: "#3b82f6",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            jsdevelop.ir
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}