import type { Metadata } from "next";
import "./globals.css";

const basePath = import.meta.env.VITE_BASE_PATH ?? "";
const siteUrl = "https://noodledragon.studio";

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Noodle Dragon Studio",
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/logo-square-apps-games-800.webp`,
        width: 800,
        height: 800,
      },
      description:
        "An independent app and game studio in Aotearoa New Zealand, creating useful software and playful experiences.",
      email: "tony@noodledragon.studio",
      address: { "@type": "PostalAddress", addressCountry: "NZ" },
      knowsAbout: [
        "macOS app development",
        "mobile app development",
        "mobile game development",
        "UX and UI design",
        "game design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteUrl}/`,
      name: "Noodle Dragon Studio",
      inLanguage: "en-NZ",
      publisher: { "@id": organizationId },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Noodle Dragon Studio | Macaroni & Munch Monsters",
  description:
    "Independent New Zealand app and game studio behind Macaroni, a Markdown viewer for Mac, and Munch Monsters, a healthy-eating game for kids.",
  alternates: { canonical: `${siteUrl}/` },
  authors: [{ name: "Noodle Dragon Studio", url: `${siteUrl}/` }],
  creator: "Noodle Dragon Studio",
  publisher: "Noodle Dragon Studio",
  applicationName: "Noodle Dragon Studio",
  category: "Software and game development",
  manifest: `${basePath}/site.webmanifest`,
  icons: {
    icon: `${basePath}/favicon-180.png`,
    shortcut: `${basePath}/favicon-180.png`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Noodle Dragon Studio | Macaroni & Munch Monsters",
    description:
      "Independent New Zealand studio making thoughtful apps and playful games, including Macaroni and Munch Monsters.",
    type: "website",
    url: `${siteUrl}/`,
    siteName: "Noodle Dragon Studio",
    locale: "en_NZ",
    images: [
      {
        url: `${siteUrl}/og.jpg`,
        width: 1536,
        height: 1024,
        alt: "Noodle Dragon Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noodle Dragon Studio | Macaroni & Munch Monsters",
    description:
      "Independent New Zealand studio making thoughtful apps and playful games, including Macaroni and Munch Monsters.",
    images: [`${siteUrl}/og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
