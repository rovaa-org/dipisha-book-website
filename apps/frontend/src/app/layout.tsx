import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Dipisha Books",

  description:
    "Dipisha Kalura is a writer which writes amazing books which should be read by everyone.",
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
        {children}
      </body>
    </html>
  );
}
