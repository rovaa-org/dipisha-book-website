"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PenTool } from "lucide-react";
import cover from "@/assets/In Your Memories.jpg";
import { Book } from "../types/book";
import BookCard from "./BookCard";

// Book Data
const booksData: Book[] = [
  {
    id: "1",
    title: "In Your Memories",
    description: `"In Your Memories" is a collection of poems expressing the journey of always being the lover but never loved.
     Every single sentiment, from love to realization to letting go, is encapsulated and conveyed through words, honoring the unspoken feelings of many.`,
    genre: ["Love", "Poetry", "Romance", "Fantasy Fiction"],
    releaseDate: "2025",
    coverImage: cover,
    status: "complete",
    author: "Dipisha Kalura",
    pages: 35,
  },
];

// EmptyState Component
const EmptyState: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="col-span-full min-h-[600px] flex flex-col items-center justify-center p-12 text-center  rounded-lg"
  >
    <PenTool className="w-16 h-16 text-pink-300 mb-4" />
    <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
      Work in Progress
    </h3>
    <p className="text-gray-600 max-w-md">
      New stories are currently being crafted with love and dedication. Check
      back soon for upcoming literary adventures!
    </p>
  </motion.div>
);

// BooksShowcase Component
const BooksShowcase: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full py-16 px-4 md:px-6 bg-[#FDF7F7]"
      id="books"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
            My Literary Works
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full" />
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {booksData.length > 0 ? (
              booksData.map((book) => <BookCard key={book.id} book={book} />)
            ) : (
              <EmptyState />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BooksShowcase;
