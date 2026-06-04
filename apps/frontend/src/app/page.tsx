import BooksShowcase from "../app/components/BooksShowcase";
import Footer from "../app/components/Footer";
import HeroShowCase from "../app/components/HeroShowCase";
import BlogShowCase from "./components/BlogShowCase";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://dipishakalura.com/#website",
      url: "https://dipishakalura.com",
      name: "Dipisha Kalura",
      description:
        "Author, poet and storyteller. Read poems and stories by Dipisha Kalura.",
      publisher: { "@id": "https://dipishakalura.com/#author" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://dipishakalura.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Person",
      "@id": "https://dipishakalura.com/#author",
      name: "Dipisha Kalura",
      url: "https://dipishakalura.com",
      jobTitle: "Author & Poet",
      sameAs: [
        "https://instagram.com/dipishakalura",
        "https://www.linkedin.com/in/dipisha-kalura91304/",
        "https://www.youtube.com/@itsmelupa",
      ],
    },
    {
      "@type": "Book",
      "@id": "https://dipishakalura.com/books/in-your-memories#book",
      name: "In Your Memories",
      author: { "@id": "https://dipishakalura.com/#author" },
      url: "https://dipishakalura.com/books/in-your-memories",
      genre: ["Poetry", "Romance", "Fantasy Fiction"],
      description:
        "A collection of poems expressing the journey of always being the lover but never loved.",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div id="home">
        <HeroShowCase />
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