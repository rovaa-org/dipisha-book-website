// apps/frontend/src/app/blog/[id]/page.tsx
import { PostViewer } from "@dipisha/ui";
import { Post } from "@/app/types/post";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dipishakalura.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `${baseUrl}/blog/${post.id}`;

  return {
    title: post.title,
    description: `Read "${post.title}" - A blog post by Dipisha Kalura`,
    openGraph: {
      title: post.title,
      description: `Read "${post.title}" - A blog post by Dipisha Kalura`,
      type: "article",
      url: postUrl,
      authors: ["Dipisha Kalura"],
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: `Read "${post.title}" - A blog post by Dipisha Kalura`,
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
  try {
    const res = await fetch(`${apiUrl}/api/published-posts`);
    if (!res.ok) {
      throw new Error("Failed to fetch posts for static generation");
    }
    const posts: Post[] = await res.json();

    // Return an array of objects with the `id` param for each post
    return posts.map((post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error("Could not generate static params:", error);
    // Return an empty array on error to prevent build failure
    return [];
  }
}

async function getPost(id: string): Promise<Post | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
  try {
    // Removed revalidate option to allow for static generation
    const res = await fetch(`${apiUrl}/api/posts/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const post = await getPost((await params).id);

  // Important: Ensure only published posts are publicly visible
  if (!post || post.status !== "published") {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postUrl = `${baseUrl}/blog/${post.id}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: `Read "${post.title}" - A blog post by Dipisha Kalura`,
    url: postUrl,
    author: {
      "@type": "Person",
      name: "Dipisha Kalura",
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Dipisha Books",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    image: post.coverImageUrl || `${baseUrl}/logo.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="py-24 px-4">
        <article className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-md">
          <div className="prose prose-lg dark:prose-invert max-w-full">
            <PostViewer content={post.content} />
            <div className="mb-2 text-center">
              <div className="border-b pb-8"></div>
              <p className="text-gray-500">Published on {formattedDate}</p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
