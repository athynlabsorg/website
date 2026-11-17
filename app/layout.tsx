import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { home } from "@/content/home";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://athynlabs.com"),
  title: "Athyn Labs | Software that pays attention",
  description: home.hero.intro,
  openGraph: {
    title: "Athyn Labs | Software that pays attention",
    description: home.hero.intro,
    url: "/",
    siteName: "Athyn Labs",
    locale: "en_CA",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrumentSerif.variable} ${instrumentSans.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
