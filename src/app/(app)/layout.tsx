import type { Metadata } from "next";
import { headers } from "next/headers";
import "../globals.css";
import { getAlternates } from "@/lib/alternates";

function getSiteBase(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const isDE = pathname.startsWith("/de");
  return {
    metadataBase: new URL(getSiteBase()),
    title: {
      template: "%s | Blogtec",
      default: "Blogtec",
    },
    openGraph: {
      siteName: "Blogtec",
      locale: isDE ? "de_DE" : "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: getAlternates(pathname),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const lang = pathname.startsWith("/de") ? "de" : "en";
  return (
    <html lang={lang}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
