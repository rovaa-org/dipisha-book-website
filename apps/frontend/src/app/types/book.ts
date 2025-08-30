import { StaticImageData } from "next/image";

export interface Book {
  id: string;
  // slug: string;
  title: string;
  description: string;
  genre: string[];
  releaseDate: string;
  coverImage: StaticImageData;
  status: "complete" | "ongoing";
  // excerpt: string;
  author: string;
  pages: number;
}
