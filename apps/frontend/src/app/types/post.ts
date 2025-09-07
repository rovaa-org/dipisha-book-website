import { JSONContent } from "novel";

export interface Post {
  id: string;
  title: string;
  content: JSONContent;
  coverImageUrl?: string | null;
  status: 'draft' | 'published';
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}