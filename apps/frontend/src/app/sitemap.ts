import { MetadataRoute } from "next";
import { Post } from "./types/post";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dipishakalura.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/books/in-your-memories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
    const res = await fetch(`${apiUrl}/api/published-posts`);
    if (res.ok) {
      const posts: Post[] = await res.json();
      const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
      return [...staticPages, ...blogPages];
    }
  } catch {
    // Return static pages only on error
  }

  return staticPages;
}