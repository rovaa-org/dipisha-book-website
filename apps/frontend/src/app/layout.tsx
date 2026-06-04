import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Crafty_Girls } from "next/font/google";
import "@dipisha/styles/tailwind-base.css";
import "@dipisha/styles/prosemirror.css";
import { cal, inter } from "./fonts"; // <-- Import our new fonts
// import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const craftyGirls = Crafty_Girls({
  variable: "--font-crafty-girls",
  subsets: ["latin"],
  weight: "400",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9d174d",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dipishakalura.com",
  ),
  title: {
    default: "Dipisha Kalura | Author, Poet & Storyteller",
    template: "%s | Dipisha Kalura",
  },
  description:
    "Dipisha Kalura is an author and poet. Read her debut poetry collection 'In Your Memories' - heartfelt poems about love, loss, and the courage to let go.",
  keywords: [
    "poetry",
    "poems",
    "books",
    "author",
    "Dipisha Kalura",
    "In Your Memories",
    "love poems",
    "creative writing",
    "stories",
  ],
  authors: [{ name: "Dipisha Kalura" }],
  creator: "Dipisha Kalura",
  publisher: "Dipisha Books",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url:     process.env.NEXT_PUBLIC_SITE_URL || "https://dipishakalura.com",
    siteName: "Dipisha Kalura",
    title: "Dipisha Kalura | Author, Poet & Storyteller",
    description:
      "Dipisha Kalura is an author and poet. Read her debut poetry collection 'In Your Memories' - heartfelt poems about love, loss, and the courage to let go.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Dipisha Kalura - Author and Poet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dipisha Kalura | Author, Poet & Storyteller",
    description:
      "Dipisha Kalura is an author and poet. Read her debut poetry collection.",
    images: ["/logo.png"],
    creator: "@dipishakalura",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://dipishakalura.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="any" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${craftyGirls.variable} ${cal.variable} ${inter.variable} antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
