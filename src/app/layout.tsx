import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { HADES_SITE_CONFIG } from "@/config/site.config";
import { IconLoading } from "@/icons/loading";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { generateWebsiteJsonLd } from "@/utils/jsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = HADES_SITE_CONFIG.metaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = generateWebsiteJsonLd({
    name: HADES_SITE_CONFIG.metaData.title?.toString() || "",
    description: HADES_SITE_CONFIG.metaData.description?.toString() || "",
    siteUrl: process.env.SITE_URL || "",
  });

  return (
    <html lang="en">
      <head>
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <ThemeProvider> */}
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <IconLoading size={30} classNames="animate-spin" />
            </div>
          }
        >
          {children}
        </Suspense>

        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
