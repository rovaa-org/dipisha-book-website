
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { newPostContent } from "@/lib/content";

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {

	// We can use the unique ID from the URL later to save/load content.
	const id = (await params).id

	console.log("Editing post with ID:", id);

	return <TailwindAdvancedEditor initialContent={newPostContent} postId={id}/>;
}
