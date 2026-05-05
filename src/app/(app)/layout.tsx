import type { Metadata } from "next";
import { headers } from "next/headers";
import "../globals.css";
import { getAlternates } from "@/lib/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  return {
    metadataBase: new URL("https://blogtec.io"),
    title: {
      template: "%s | Blogtec",
      default: "Blogtec",
    },
    openGraph: {
      siteName: "Blogtec",
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: getAlternates(pathname),
  };
}

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
