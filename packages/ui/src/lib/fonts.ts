// packages/ui/src/lib/fonts.ts
import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const cal = localFont({
  src: "../fonts/CalSans-SemiBold.otf",
  variable: "--font-title",
});

export const inter = Inter({
  variable: "--font-default",
  subsets: ["latin"],
})