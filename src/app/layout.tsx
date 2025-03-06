import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { HADES_SITE_CONFIG } from "@/config/site.config";
import { IconLoading } from "@/icons/loading";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: HADES_SITE_CONFIG.title,
  description: HADES_SITE_CONFIG.description,
  icons: HADES_SITE_CONFIG.icons,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
