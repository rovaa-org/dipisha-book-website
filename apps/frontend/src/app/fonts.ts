// apps/frontend/src/app/fonts.ts
import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const cal = localFont({
  src: "../assets/fonts/CalSans-SemiBold.otf", // Correct path
  variable: "--font-title",
});

export const inter = Inter({
  variable: "--font-default",
  subsets: ["latin"],
});
