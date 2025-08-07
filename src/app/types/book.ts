export interface Book {
  slug: string;
  title: string;
  description: string;
  genre: string[];
  releaseDate: string;
  coverImage: string;
  status: "complete" | "ongoing";
  author: string;
  pages: number;
}
