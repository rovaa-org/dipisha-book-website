'use client';

import BooksShowcase from "../app/components/BooksShowcase";
import Footer from "../app/components/Footer";
import HeroShowcase from "../app/components/HeroShowCase";

export default function Home() {




    return (
      <>
        <div id="home">
        <HeroShowcase />
        </div>
        <div id="books">
        <BooksShowcase   />
        </div>
        <Footer />
      </>
    );
}
