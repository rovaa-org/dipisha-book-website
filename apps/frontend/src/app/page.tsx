import BooksShowcase from "../app/components/BooksShowcase";
import Footer from "../app/components/Footer";
import HeroShowcase from "../app/components/HeroShowCase";
import BlogShowCase from "./components/BlogShowCase";


export default function HomePage() {
  return (
    <>
      <div id="home">
        <HeroShowcase />
      </div>
      <div id="blogs">
        <BlogShowCase />
      </div>
      <div id="books">
        <BooksShowcase />
      </div>
      <Footer />
    </>
  );
}