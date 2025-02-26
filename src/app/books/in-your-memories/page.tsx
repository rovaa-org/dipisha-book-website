// Page.tsx - Server Component
import React from "react";
import { Book } from "@/app/types/book";
import cover from "@/assets/In Your Memories.jpg";
import { PDFViewer } from "./components/PDFViewer";
import { BookDetailsSheet } from "./components/BookDetailsSheet";
import { HelpSheet } from "./components/HelpSheet";
import Link from "next/link";

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
