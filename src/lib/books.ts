import fs from "fs";
import path from "path";
import matter from "gray-matter";

const booksDirectory = path.join(process.cwd(), "src/content/books");

export type Book = {
  slug: string;
  title: string;
  author: string;
  releaseDate: string;
  description: string;
  genre: string[];
  status: "complete" | "ongoing";
  pages: number;
  coverImage: string;
};

export function getAllBooks(): Book[] {
  const fileNames = fs.readdirSync(booksDirectory);
  const allBooksData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(booksDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...(data as { title: string; author: string; releaseDate: string; genre: string[]; status: "complete" | "ongoing"; pages: number; coverImage: string; }),
      description: content,
    } as Book;
  });

  return allBooksData.sort((a, b) => {
    if (a.releaseDate < b.releaseDate) {
      return 1;
    }
    if (a.releaseDate > b.releaseDate) {
      return -1;
    }
    return 0;
  });
}
