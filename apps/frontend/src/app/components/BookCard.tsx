import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Book } from "../types/book";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [, setIsHovered] = useState(false);
  const router = useRouter();

  const handleBookClick = () => {
    router.push(`/books/in-your-memories`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Top Image Section with Gradient Background */}
      <div className="relative p-6 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 rounded-t-xl">
        {/* Improved Date Banner - Glossy ribbon style */}
        <div className="absolute top-4 right-0 z-10">
          <div className="relative">
            <div
              className="bg-gradient-to-r from-pink-400 to-rose-400 text-white py-1 px-6 rounded-l-full shadow-lg
                          before:content-[''] before:absolute before:right-0 before:border-t-[12px] before:border-rose-600
                          before:border-r-[12px] before:border-r-transparent before:bottom-[-12px]"
            >
              <p className="text-sm font-medium">{book.releaseDate}</p>
            </div>
          </div>
        </div>

        {/* Book Cover Container with 3D effect */}
        <motion.div
          className="relative mx-auto w-48 h-64 bg-gradient-to-r from-pink-200 to-rose-200 rounded-lg shadow-lg
                     transform-gpu perspective-1000"
          whileHover={{
            rotateY: 10,
            scale: 1.05,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            priority
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Book spine effect */}
          <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-pink-300/50 to-transparent rounded-l-lg" />
        </motion.div>
      </div>

      {/* Content Section with White Background */}
      <div className="p-6 bg-white rounded-b-xl">
        {/* Genre Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {book.genre.map((g, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-600"
            >
              {g}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl text-center font-bold mb-2 text-gray-800 group-hover:text-pink-600 transition-colors">
          {book.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-center text-gray-600 mb-6 line-clamp-3">
          {book.description}
        </p>

        {/* Footer */}
        <motion.div
          className="flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <button
            className="flex items-center gap-1.5 text-pink-600 font-medium text-sm hover:text-pink-700
                       bg-pink-50 px-4 py-2 rounded-full transition-colors"
            onClick={handleBookClick}
          >
            Read More <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookCard;
