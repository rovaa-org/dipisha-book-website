'use client';

import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head'; // Import Head for SEO optimization
import { Book } from '@/app/types/book';
import cover from '@/assets/In Your Memories.jpg';
import logo from '@/app/logo.png';
import PDFViewer from './components/RenderPdfComponents';
import Feedback from './components/Feebdack';

const BookDetailsPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Book details with proper typing
  const bookDetails: Book = {
    id: "1",
    title: "In Your Memories",
    description: `"In Your Memories" is a collection of poems expressing the journey of always being the lover but never loved.
     Every single sentiment, from love to realization to letting go, is encapsulated and conveyed through words, honoring the unspoken feelings of many.`,
    genre: ["Love", "Poetry", "Romance", "Fantasy Fiction"],
    releaseDate: "2025",
    status: 'complete',
    coverImage: cover, 
    author: 'Dipisha Kalura',
    pages: 31,
  };

  return (
    <>
      {/* SEO Head Tags */}
      <Head>
        <title>{bookDetails.title} by {bookDetails.author} - Book Details</title>
        <meta name="description" content={`${bookDetails.description} Discover more about the book "${bookDetails.title}" by ${bookDetails.author}, including release details, genre, and more.`} />
        <meta name="keywords" content={`${bookDetails.genre.join(", ")}, ${bookDetails.author}, ${bookDetails.title}, poetry, romance books`} />
        <meta name="author" content={bookDetails.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${bookDetails.title} by ${bookDetails.author}`} />
        <meta property="og:description" content={bookDetails.description} />
        <meta property="og:image" content="/assets/In Your Memories.jpg" />
        <meta property="og:type" content="book" />
      </Head>


      {/* Page Content */}
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[#FDF7F7]">
        <div className="max-w-6xl mx-auto">
          {/* Book Info Card */}
          <Card className="mb-6 overflow-hidden shadow-xl bg-white/90">
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <h1 className="text-xl font-semibold text-[#9D6B6B]">{bookDetails.title}</h1>
              </div>
              {isCollapsed ? (
                <ChevronDown className="w-5 h-5 text-[#D4A5A5]" />
              ) : (
                <ChevronUp className="w-5 h-5 text-[#D4A5A5]" />
              )}
            </div>

            <div className={`transition-all duration-300 ${isCollapsed ? 'hidden' : 'block'}`}>
              <div className="md:flex p-6">
                {/* Book Cover */}
                <div className="md:w-1/4 mb-6 md:mb-0">
                  <div className="relative h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={bookDetails.coverImage}
                      alt={`Cover of ${bookDetails.title}`}
                      fill
                      priority
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {/* Book Details */}
                <div className="md:w-3/4 md:pl-8">
                  <p className="text-lg text-[#9D6B6B] mb-4">by {bookDetails.author}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {bookDetails.genre.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-sm bg-[#FFE9E9] text-[#9D6B6B]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6">{bookDetails.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-[#D4A5A5]">Status</p>
                      <p className="font-semibold capitalize text-[#9D6B6B]">
                        {bookDetails.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#D4A5A5]">Release Date</p>
                      <p className="font-semibold text-[#9D6B6B]">
                        {bookDetails.releaseDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#D4A5A5]">Pages</p>
                      <p className="font-semibold text-[#9D6B6B]">
                        {bookDetails.pages}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <PDFViewer pdfUrl="/in-your-memories.pdf" />
          <Feedback />
        </div>
      </div>
    </>
  );
};

export default BookDetailsPage;
