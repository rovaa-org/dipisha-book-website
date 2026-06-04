import Link from "next/link";
import { PenSquare } from "lucide-react";
import { Post } from "@/app/types/post";
import BlogCardSeo from "./BlogCardSeo";

async function getPublishedPosts(): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
  try {
    const res = await fetch(`${apiUrl}/api/published-posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data: Post[] = await res.json();
    return data.map((post) => ({
      ...post,
      coverImageUrl: post.coverImageUrl || `https://picsum.photos/seed/${post.id}/400/300`,
    }));
  } catch {
    return [];
  }
}

const BlogShowcase = async () => {
  const posts = await getPublishedPosts();

  if (posts.length === 0) return null;

  return (
    <section className="w-full py-20 bg-white" id="blogs" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 px-4">
          <h2 id="blog-heading" className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
            From The Journal
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full" />
        </div>

        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 md:px-8 scrollbar-hide">
            {posts.map((post) => (
              <BlogCardSeo key={post.id} post={post} />
            ))}
            <Link href="/blog" className="block w-80 flex-shrink-0 snap-center" aria-label="View all blog posts">
              <div className="w-full h-full flex flex-col items-center justify-center bg-pink-50/50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 border-2 border-dashed border-pink-200 text-pink-700">
                <PenSquare className="w-10 h-10 mb-4" aria-hidden="true" />
                <h3 className="text-lg font-bold">View All Posts</h3>
                <p className="text-sm">Explore the archive</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogShowcase;