import { Post } from "@/app/types/post";
import Image from "next/image";
import Link from "next/link";

interface BlogCardSeoProps {
  post: Post;
}

const BlogCardSeo = ({ post }: BlogCardSeoProps) => (
  <Link
    href={`/blog/${post.id}`}
    className="block w-80 flex-shrink-0 snap-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
    prefetch
  >
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={post.coverImageUrl || `https://picsum.photos/seed/${post.id}/400/300`}
          alt={`Cover image for ${post.title}`}
          fill
          className="object-cover"
          sizes="320px"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 flex-grow line-clamp-3">
          Read more about this post
        </p>
        <div className="mt-4 text-pink-600 font-semibold text-sm flex items-center">
          Read More
        </div>
      </div>
    </div>
  </Link>
);

export default BlogCardSeo;