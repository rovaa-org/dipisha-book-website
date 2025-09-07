// File: apps/frontend/src/app/components/BlogCard.tsx
"use client";

import { Post } from "@/app/types/post";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: Post;
}

// Helper function to extract a simple text preview from Novel's JSON content
const getPreview = (content: any): string => {
  if (!content || !content.content) return "Click to read more...";
  const paragraph = content.content.find((node: any) => node.type === 'paragraph');
  if (paragraph && paragraph.content) {
    const text = paragraph.content.map((textNode: any) => textNode.text).join('');
    return text.substring(0, 150) + (text.length > 150 ? '...' : '');
  }
  return "Click to read more...";
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/blog/${post.id}`);
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handlePostClick}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer p-6 border border-pink-100 flex flex-col h-full"
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
  );
};

export default BlogCard;