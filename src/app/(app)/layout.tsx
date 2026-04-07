import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Blogtec - Marketing Leistungen, einfach ausgelagert.",
  description:
    "SEO, Google-Ads, Design und Entwicklung mit hervorragender Flexibilität und Zuverlässigkeit. Outsorce your marketing with Blogtec.",
  openGraph: {
    title: "Blogtec - Marketing Leistungen, einfach ausgelagert.",
    description: "SEO, Google-Ads, Design und Entwicklung mit hervorragender Flexibilität und Zuverlässigkeit.",
    url: "https://blogtec.io",
    siteName: "Blogtec",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
