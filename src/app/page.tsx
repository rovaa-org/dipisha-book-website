"use client"

import {  useEffect } from 'react';
import BooksShowcase from "../app/components/BooksShowcase";
import Footer from "../app/components/Footer";
import HeroShowcase from "../app/components/HeroShowCase";


export default function Home() {
    useEffect(() => {

      const timer = setTimeout(() => {
        const booksSection = document.getElementById('books');
        if (booksSection) {
          booksSection.scrollIntoView({ 
            behavior: 'smooth',
          });
        }
      }, 5000);
  
  
      return () => clearTimeout(timer);
    }, []); 
    return (
      <>
        <HeroShowcase />
        <BooksShowcase  />
        <Footer />
      </>
    );
}
