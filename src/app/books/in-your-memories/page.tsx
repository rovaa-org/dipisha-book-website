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

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Author's Notes</h2>
          <div className="prose prose-lg text-gray-700">
            <p>
              Welcome, dear readers! "In Your Memories" is a very personal collection for me,
              born from moments of quiet reflection and deep emotion. Each poem is a piece
              of my heart, exploring the nuances of love, loss, and the journey of self-discovery.
              I hope these verses resonate with your own experiences and offer a sense of
              connection. Thank you for embarking on this poetic journey with me.
            </p>
            <p>
              This book was written during a period of significant growth, and I poured
              much of my soul into its creation. It's a testament to the idea that even
              in moments of vulnerability, there is immense strength to be found.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Reader Reviews</h2>
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <p className="text-gray-800 italic">
                "A truly moving collection. The poems are raw, honest, and beautifully crafted.
                I felt every emotion with the author."
              </p>
              <p className="text-right text-sm text-gray-600 mt-2">- A. Reader</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <p className="text-gray-800 italic">
                "Dipisha Kalura has a unique voice that captures the essence of unspoken feelings.
                This book is a must-read for anyone who appreciates profound poetry."
              </p>
              <p className="text-right text-sm text-gray-600 mt-2">- B. Fan</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
