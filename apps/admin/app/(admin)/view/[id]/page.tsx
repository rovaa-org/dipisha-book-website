"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PostViewer } from "@/components/tailwind/post-viewer";
import { type JSONContent } from "novel";

export default function ViewPostPage() {
	const { id } = useParams<{ id: string }>();
	const [content, setContent] = useState<JSONContent | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!id) return;

		const fetchPostContent = async () => {
			setIsLoading(true);
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';
				const res = await fetch(`${apiUrl}/api/posts/${id}`);

				if (!res.ok) {
					throw new Error("Failed to fetch post content");
				}
                
                const data = await res.json();
                setContent(data.content);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPostContent();
	}, [id]);

	if (isLoading) {
		return <div>Loading post...</div>;
	}
    
    if (!content) {
        return <div>Post not found or failed to load.</div>;
    }

	return <PostViewer content={content} />;
}