import { Post } from "@/app/types/post";
import BlogCard from "../components/BlogCard";


async function getPublishedPosts(): Promise<Post[]> {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
    console.log( process.env.NEXT_PUBLIC_API_URL)
    try {
        const res = await fetch(`${apiUrl}/api/published-posts`);
        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPublishedPosts();

    return (
        <main className="min-h-screen bg-[#FDF7F7] py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                        From My Journal
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A collection of stories, poems, and thoughts from my writing journey.
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full mt-4" />
                </div>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-16">
                        <p>No published posts found. Please check back later!</p>
                    </div>
                )}
            </div>
        </main>
    );
}