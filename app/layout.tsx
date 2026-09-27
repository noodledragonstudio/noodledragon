import type { Metadata } from "next";
import "./globals.css";

const basePath = import.meta.env.VITE_BASE_PATH ?? "";
const siteUrl = "https://noodledragon.studio";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Noodle Dragon Studio",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/brand/logo-square-apps-games-800.png`,
  description:
    "An independent app and game studio in Aotearoa New Zealand, creating useful software and playful experiences.",
  email: "tony@noodledragon.studio",
  address: { "@type": "PostalAddress", addressCountry: "NZ" },
  sameAs: [
    "https://macaroni.noodledragon.studio/",
    "https://munch-monsters.noodledragon.studio/",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      price: "14.99",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      itemOffered: {
        "@type": "SoftwareApplication",
        name: "Macaroni",
        url: "https://macaroni.noodledragon.studio/",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS 15 or later",
        description:
          "A read-only Markdown viewer for Mac that watches project folders and shows what changed while AI agents work.",
      },
    },
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      itemOffered: {
        "@type": "VideoGame",
        name: "Munch Monsters – Food Fun",
        url: "https://munch-monsters.noodledragon.studio/",
        applicationCategory: "GameApplication",
        operatingSystem: "iOS",
        audience: {
          "@type": "PeopleAudience",
          suggestedMinAge: 4,
          suggestedMaxAge: 7,
        },
        description:
          "A gentle, voice-led healthy-eating game for children aged 4–7, with no ads, in-app purchases or data collection.",
      },
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
        url: `${siteUrl}/og.png`,
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
    images: [`${siteUrl}/og.png`],
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
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
