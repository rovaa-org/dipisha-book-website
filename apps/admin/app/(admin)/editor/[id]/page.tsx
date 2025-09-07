"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { type Post } from "@/lib/content";
import { newPost } from "@/lib/content";

export default function EditorPage() {
	const { id } = useParams<{ id: string }>();
	const [post, setPost] = useState<Post | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!id) return;

		const fetchPost = async () => {
			setIsLoading(true);
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';
				const res = await fetch(`${apiUrl}/api/posts/${id}`);

				if (res.status === 404) {
					// Post not found, it's a new post
					setPost(newPost(id));
				} else if (res.ok) {
					const data = await res.json();
					setPost(data);
				} else {
					throw new Error("Failed to fetch post");
				}
			} catch (error) {
				console.error(error);
				// Optionally, set an error state here to show in the UI
			} finally {
				setIsLoading(false);
			}
		};

		fetchPost();
	}, [id]);

	if (isLoading || !post) {
		return <div>Loading editor...</div>;
	}

	return <TailwindAdvancedEditor initialPost={post} />;
}