// src/app/games/[slug]/opengraph-image.tsx
// تصویر اشتراک‌گذاری اختصاصی هر بازی — هم‌سبک با OG اصلی برند
// (متن انگلیسی مطابق قالب تصاویر OG محصولات — بدون نیاز به فونت فارسی در satori)
import { ImageResponse } from "next/og";
import { getGameBySlug } from "@/lib/games";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageProps = { params: Promise<{ slug: string }> };

export default async function OpengraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  const title = game?.ogTitle ?? "JSDevelop Games";
  const subtitle = game?.ogSubtitle ?? "Android Games on Cafe Bazaar";

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
          backgroundColor: "#030712",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "110px",
            fontWeight: 900,
            letterSpacing: "-4px",
            marginBottom: "26px",
            textShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
          }}
        >
          <span style={{ color: "#ffffff" }}>JS</span>
          <span style={{ color: "#3b82f6" }}>D</span>
        </div>

        <div
          style={{
            width: "200px",
            height: "4px",
            background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
            borderRadius: "2px",
            marginBottom: "28px",
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
          }}
        />

        <h1
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#f8fafc",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "950px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            marginTop: "18px",
            marginBottom: "36px",
            textAlign: "center",
            maxWidth: "820px",
          }}
        >
          {subtitle}
        </p>

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
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              color: "#3b82f6",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            cafebazaar.ir &middot; JSDevelop Games
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
