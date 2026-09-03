import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { TopBar } from "@/components/sections/TopBar";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/sections/Header";
import { PageLoader } from "@/components/ui/PageLoader";
import { brandAssets } from "@/data/brand";
import { siteConfig } from "@/data/content";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.website),
  title: {
    default: `${siteConfig.name} — ${siteConfig.fullName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "ЛИСАБА — центр когнитивного и сенсорно-поведенческого развития в Екатеринбурге. Сенсорная интеграция, нейропсихология, логопедия, дефектология.",
  keywords: [
    "ЛИСАБА",
    "lisaba",
    "сенсорная интеграция",
    "нейропсихологическая коррекция",
    "логопед",
    "дефектолог",
    "развитие ребёнка",
    "Екатеринбург",
  ],
  icons: {
    icon: [
      { url: brandAssets.favicon32, sizes: "32x32", type: "image/png" },
      { url: brandAssets.favicon192, sizes: "192x192", type: "image/png" },
    ],
    apple: brandAssets.appleTouchIcon,
    shortcut: brandAssets.favicon32,
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.fullName}`,
    description: "Научный подход к развитию вашего ребёнка",
    url: siteConfig.website,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
    images: [{ url: brandAssets.favicon192, width: 192, height: 192, alt: siteConfig.name }],
  },
  alternates: {
    canonical: siteConfig.website,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body className="font-sans">
        <AppProviders>
          <PageLoader />
          <TopBar />
          <Header />
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
