import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { HADES_SITE_CONFIG } from "@/config/site.config";

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
        {children}

        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
