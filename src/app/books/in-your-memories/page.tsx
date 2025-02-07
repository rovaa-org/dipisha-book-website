'use client';

import React from 'react';

import Head from 'next/head'; 
import { Book } from '@/app/types/book';
import cover from '@/assets/In Your Memories.jpg';
import { PDFViewer } from './components/PDFViewer';

const BookDetailsPage = () => {

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
          
      <div className="min-h-screen">
          <PDFViewer pdfUrl={"/in-your-memories.pdf"}  bookDetails={bookDetails}/>
        </div>
    </>
  );
};

export default BookDetailsPage;
