// src/app/games/[slug]/page.tsx
// صفحه اختصاصی هر بازی — به‌صورت استاتیک برای ۴ بازی تولید می‌شود
// (generateStaticParams + dynamicParams=false) تا خروجی SSG و سئو کامل باشد.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameDetailView } from "@/components/sections/GameDetailView";
import {
  games,
  getGameBySlug,
  gamePath,
  gameSchemaJson,
  gameBreadcrumbSchemaJson,
  gameFaqSchemaJson,
} from "@/lib/games";
import { siteConfig } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return {
    title: { absolute: game.seoTitle },
    description: game.seoDescription,
    alternates: {
      canonical: `${siteConfig.url}${gamePath(game)}`,
    },
    openGraph: {
      title: game.seoTitle,
      description: game.seoDescription,
      url: `${siteConfig.url}${gamePath(game)}`,
      type: "website",
    },
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: gameSchemaJson(game) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: gameBreadcrumbSchemaJson(game) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: gameFaqSchemaJson(game) }}
      />
      <GameDetailView game={game} />
    </>
  );
}
