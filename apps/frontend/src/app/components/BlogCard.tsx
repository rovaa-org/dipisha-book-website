// File: apps/frontend/src/app/components/BlogCard.tsx
"use client";

import { Post } from "@/app/types/post";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { type JSONContent } from "novel";

interface BlogCardProps {
  post: Post;
}

// Helper function to extract a simple text preview from Novel's JSON content


const getPreview = (content: JSONContent): string => {
  if (!content || !content.content) return "Click to read more...";

  let previewText = "";
  // Iterate through the top-level nodes of the document
  for (const node of content.content) {
    if (node.type === 'paragraph' && node.content) {
      // Extract text from the paragraph's content
      const text = node.content.map((textNode) => textNode.text || "").join('');
      previewText += text + " ";
    }
    // Stop once we have enough text for a preview
    if (previewText.length > 150) break;
  }
  
  if (previewText.length === 0) return "Click to read more...";

  const trimmedText = previewText.trim();
  return trimmedText.substring(0, 150) + (trimmedText.length > 150 ? "..." : "");
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.id}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
      prefetch
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-pink-100 flex flex-col h-full"
      >
        <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
        <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-pink-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 mb-6 flex-grow">
          {getPreview(post.content)}
        </p>
        <div className="mt-auto flex items-center justify-end">
          <span
            className="flex items-center gap-1.5 text-pink-600 font-medium text-sm"
          >
            Read More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;