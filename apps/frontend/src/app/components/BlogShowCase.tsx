"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PenSquare, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Post } from "@/app/types/post";

const getPreview = (content: any): string => {
  if (!content || !content.content) return "Click to read more...";
  const paragraph = content.content.find((node: any) => node.type === 'paragraph');
  if (paragraph && paragraph.content) {
    const text = paragraph.content.map((textNode: any) => textNode.text || '').join('');
    return text.substring(0, 120) + (text.length > 120 ? '...' : '');
  }
  return "Click to read more...";
};

export const BlogCard = ({ post }: { post: Post }) => (
  <Link href={`/blog/${post.id}`} className="block w-80 flex-shrink-0 snap-center">
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden"
    >
      <div className="relative h-48 bg-gray-100">
        <img
          src={post.coverImageUrl!} // We ensure this exists in the fetch effect
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 flex-grow line-clamp-3">
          {getPreview(post.content)}
        </p>
        <div className="mt-4 text-pink-600 font-semibold text-sm flex items-center">
          Read More <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </motion.div>
  </Link>
);

const BlogShowcase = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
      try {
        const res = await fetch(`${apiUrl}/api/published-posts`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        let data: Post[] = await res.json();
        
        data = data.map((post) => ({
          ...post,
          coverImageUrl: post.coverImageUrl || `https://picsum.photos/seed/${post.id}/400/300`,
        }));
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="text-center py-20 text-gray-500">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-20 bg-white" id="blogs">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
            From The Journal
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full" />
        </div>

        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 md:px-8 scrollbar-hide">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
            <Link href="/blog" className="block w-80 flex-shrink-0 snap-center">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="w-full h-full flex flex-col items-center justify-center bg-pink-50/50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 border-2 border-dashed border-pink-200 text-pink-700"
                >
                    <PenSquare className="w-10 h-10 mb-4" />
                    <h3 className="text-lg font-bold">View All Posts</h3>
                    <p className="text-sm">Explore the archive</p>
                </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogShowcase;