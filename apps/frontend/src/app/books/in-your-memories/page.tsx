// Page.tsx - Server Component
import React from "react";
import { Book } from "@/app/types/book";
import cover from "@/assets/In Your Memories.jpg";
import { PDFViewer } from "./components/PDFViewer";
import { BookDetailsSheet } from "./components/BookDetailsSheet";
import { HelpSheet } from "./components/HelpSheet";
import Link from "next/link";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dipishakalura.com";

export const metadata: Metadata = {
  title: "In Your Memories | Poetry Collection by Dipisha Kalura",
  description:
    '"In Your Memories" is a collection of poems expressing the journey of always being the lover but never loved. A beautiful poetry collection exploring love, emotions, and the human experience by Dipisha Kalura.',
  keywords: [
    "In Your Memories",
    "poetry",
    "poems",
    "Dipisha Kalura",
    "love poems",
    "poetry collection",
    "romance poetry",
    "fantasy fiction",
  ],
  openGraph: {
    title: "In Your Memories | Poetry Collection",
    description:
      '"In Your Memories" - A collection of poems expressing the journey of love and emotions by Dipisha Kalura.',
    type: "article",
    url: `${baseUrl}/books/in-your-memories`,
    authors: ["Dipisha Kalura"],
    publishedTime: "2025",
    tags: ["Love", "Poetry", "Romance", "Fantasy Fiction"],
    images: [
      {
        url: "/images/in-your-memories-cover.jpg",
        width: 1200,
        height: 1600,
        alt: "In Your Memories - Poetry Collection by Dipisha Kalura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "In Your Memories | Poetry Collection",
    description:
      '"In Your Memories" - A collection of poems expressing the journey of love and emotions.',
    images: ["/images/in-your-memories-cover.jpg"],
  },
  alternates: {
    canonical: `${baseUrl}/books/in-your-memories`,
  },
};

const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "In Your Memories",
  author: {
    "@type": "Person",
    name: "Dipisha Kalura",
  },
  description:
    '"In Your Memories" is a collection of poems expressing the journey of always being the lover but never loved.',
  url: `${baseUrl}/books/in-your-memories`,
  workExample: {
    "@type": "Book",
    bookEdition: "First Edition",
    bookFormat: "https://schema.org/EBook",
  },
  genre: ["Love", "Poetry", "Romance", "Fantasy Fiction"],
  datePublished: "2025",
  numberOfPages: 31,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: "Dipisha Books",
  },
  image: "/images/in-your-memories-cover.jpg",
};

export default function BookDetailsPage() {
  const bookDetails: Book = {
    id: "1",
    title: "In Your Memories",
    description: `"In Your Memories" is a collection of poems expressing the journey of always being the lover but never loved.
     Every single sentiment, from love to realization to letting go, is encapsulated and conveyed through words, honoring the unspoken feelings of many.`,
    genre: ["Love", "Poetry", "Romance", "Fantasy Fiction"],
    releaseDate: "2025",
    status: "complete",
    coverImage: cover,
    author: "Dipisha Kalura",
    pages: 31,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-pink-700 hover:text-pink-900 font-medium"
          >
            <span className="flex items-center gap-2">← Back to Library</span>
          </Link>

          <div className="flex space-x-2">
            <BookDetailsSheet bookDetails={bookDetails} />
            <HelpSheet />
          </div>
        </div>
      </header>

      <main className="min-h-screen pt-16 pb-24">
        <PDFViewer pdfUrl="/in-your-memories.pdf" />
      </main>
    </>
  );
}
