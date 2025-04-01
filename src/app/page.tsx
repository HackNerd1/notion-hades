import { LandingBackground } from "@/components/landing/landingBackground";
import { HADES_SITE_CONFIG } from "@/config/site.config";
import { Metadata } from "next";
import { lazy } from "react";
const LandingMain = lazy(() => import("@/components/landing/landingMain"));

export default async function Home() {
  return (
    <>
      <div className="relative h-full min-h-screen">
        <LandingBackground />
      </div>
      <div className="m-auto max-w-6xl p-6 md:p-12">
        <LandingMain />
      </div>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const title = HADES_SITE_CONFIG.metaData.title || "Notion Hades";
  const description = HADES_SITE_CONFIG.metaData.description || "";
  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: `/opengraph-image`,
      title,
      description,
      images: [
        {
          url: `/opengraph-image`,
          alt: title.toString(),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/opengraph-image`],
    },
  };
}
