"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { newPostContent } from "@/lib/content";
import { type JSONContent } from "novel";

export default function EditorPage() {
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

				if (res.status === 404) {
					// Post not found, it's a new post
					setContent(newPostContent);
				} else if (res.ok) {
					const data = await res.json();
					setContent(data.content);
				} else {
					throw new Error("Failed to fetch post content");
				}
			} catch (error) {
				console.error(error);
				// Optionally, set an error state here to show in the UI
			} finally {
				setIsLoading(false);
			}
		};

		fetchPostContent();
	}, [id]);

	if (isLoading || !content) {
		return <div>Loading editor...</div>;
	}

	return <TailwindAdvancedEditor postId={id} initialContent={content} />;
}