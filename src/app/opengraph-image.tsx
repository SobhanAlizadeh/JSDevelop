import { ImageResponse } from "next/og";

// ابعاد استاندارد OG Image
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* گرادیان پس‌زمینه */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
          }}
        />

        {/* خطوط تزئینی مورب */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            backgroundImage:
              "linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.1) 49%, rgba(59, 130, 246, 0.1) 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, rgba(139, 92, 246, 0.1) 49%, rgba(139, 92, 246, 0.1) 51%, transparent 52%)",
            backgroundSize: "60px 60px",
            transform: "rotate(15deg)",
          }}
        />

        {/* کانتینر مرکزی */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            gap: "40px",
          }}
        >
          {/* لوگو - شبیه‌سازی با CSS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "180px",
              fontWeight: 900,
              letterSpacing: "-8px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 0 60px rgba(59, 130, 246, 0.5)",
            }}
          >
            <span style={{ color: "#ffffff" }}>JS</span>
            <span
              style={{
                color: "#3b82f6",
                textShadow: "0 0 80px rgba(59, 130, 246, 0.8)",
              }}
            >
              D
            </span>
          </div>

          {/* خط جداکننده */}
          <div
            style={{
              width: "200px",
              height: "4px",
              background:
                "linear-gradient(to right, #3b82f6, #8b5cf6, #06b6d4)",
              borderRadius: "2px",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
          />

          {/* عنوان اصلی */}
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#f8fafc",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.2,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            آژانس دیجیتال JSDevelop
          </h1>

          {/* زیرعنوان */}
          <p
            style={{
              fontSize: "32px",
              color: "#94a3b8",
              margin: 0,
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            سئو • وب سه‌بعدی • اتوماسیون n8n • تبلیغات گوگل
          </p>

          {/* بج پایین */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 24px",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              border: "2px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "50px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                color: "#3b82f6",
                fontWeight: 600,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              jsdevelop.ir
            </span>
          </div>
        </div>

        {/* گوشه‌های تزئینی */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            width: "80px",
            height: "80px",
            borderTop: "4px solid rgba(59, 130, 246, 0.4)",
            borderLeft: "4px solid rgba(59, 130, 246, 0.4)",
            borderRadius: "8px 0 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            width: "80px",
            height: "80px",
            borderBottom: "4px solid rgba(139, 92, 246, 0.4)",
            borderRight: "4px solid rgba(139, 92, 246, 0.4)",
            borderRadius: "0 0 8px 0",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}