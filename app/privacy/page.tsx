import type { Metadata } from "next";
import { SiteApp } from "../page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy | Noodle Dragon Studio",
  description:
    "How Noodle Dragon Studio handles personal information across our website, apps and games.",
  alternates: {
    canonical: "https://noodledragon.studio/privacy.html",
  },
  openGraph: {
    title: "Privacy | Noodle Dragon Studio",
    description:
      "How Noodle Dragon Studio handles personal information across our website, apps and games.",
    type: "website",
    url: "https://noodledragon.studio/privacy.html",
    siteName: "Noodle Dragon Studio",
  },
  twitter: {
    card: "summary",
    title: "Privacy | Noodle Dragon Studio",
    description:
      "How Noodle Dragon Studio handles personal information across our website, apps and games.",
  },
};

export default function PrivacyPage() {
  return <SiteApp initialPrivacy />;
}
