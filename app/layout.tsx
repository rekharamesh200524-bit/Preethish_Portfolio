import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://preethishdp.com"),
  title: "Preethish D P | Graphic Designer, Digital Marketer & Visual Storyteller",
  description:
    "Official cinematic creative portfolio of Preethish D P — Graphic Designer, Digital Marketing Professional, Video Editor, and Visual Communication specialist based in Chennai.",
  keywords: [
    "Preethish D P",
    "Graphic Designer Chennai",
    "Digital Marketing Specialist",
    "Video Editor",
    "Visual Storyteller",
    "Cinematography",
    "Creative Director Portfolio",
    "Adobe Creative Suite",
    "DaVinci Resolve",
    "SEO Strategy",
  ],
  authors: [{ name: "Preethish D P" }],
  creator: "Preethish D P",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preethishdp.com",
    title: "Preethish D P | Graphic Designer, Digital Marketer & Visual Storyteller",
    description:
      "Creating visual identities, digital experiences, and stories that connect brands with people.",
    siteName: "Preethish D P Portfolio",
    images: [
      {
        url: "/images/preethish-hero.jpg",
        width: 1920,
        height: 1080,
        alt: "Preethish D P — Graphic Designer & Visual Storyteller",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preethish D P | Graphic Designer & Visual Storyteller",
    description:
      "Creating visual identities, digital experiences, and stories that connect brands with people.",
    images: ["/images/preethish-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark`}>
      <body className="bg-[#07080a] text-[#f3f4f6] font-body selection:bg-[#e11d48] selection:text-white antialiased overflow-x-clip min-h-screen">
        {/* Subtle persistent film grain overlay */}
        <div className="film-grain fixed inset-0 z-50 pointer-events-none" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
