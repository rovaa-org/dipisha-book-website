import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dipishakalura.com";

export const metadata: Metadata = {
  title: "Blog | From My Journal",
  description:
    "Stories, poems, and thoughts from Dipisha Kalura's writing journey. Personal essays, poetry, and creative writing from an emerging voice in modern literature.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "Blog | From My Journal - Dipisha Kalura",
    description:
      "Stories, poems, and thoughts from Dipisha Kalura's writing journey.",
    type: "website",
    url: `${baseUrl}/blog`,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FDF7F7]">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-start items-center h-16">
                     <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </header>
        <main className="min-h-screen pt-16">
            {children}
        </main>
        <Footer />
    </div>
  );
}