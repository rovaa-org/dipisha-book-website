"use client";
import { defaultEditorContent } from "@/lib/content";
import {
	EditorCommand,
	EditorCommandEmpty,
	EditorCommandItem,
	EditorCommandList,
	EditorContent,
	type EditorInstance,
	EditorRoot,
	ImageResizer,
	type JSONContent,
	handleCommandNavigation,
	handleImageDrop,
	handleImagePaste,
} from "novel";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { MathSelector } from "./selectors/math-selector";
import { NodeSelector } from "./selectors/node-selector";
import { Separator } from "./ui/separator";

import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";

const hljs = require("highlight.js");

const extensions = [...defaultExtensions, slashCommand];

import { type Post } from "@/lib/content";
import { Button } from "./ui/button";
import { toast } from "sonner";

const TailwindAdvancedEditor = ({ initialPost }: { initialPost: Post }) => {
	const [initialContent, setInitialContent] = useState<null | JSONContent>(null);
	const [saveStatus, setSaveStatus] = useState("Saved");
	const [charsCount, setCharsCount] = useState();
	const [isDirty, setIsDirty] = useState(false);

	const [openNode, setOpenNode] = useState(false);
	const [openColor, setOpenColor] = useState(false);
	const [openLink, setOpenLink] = useState(false);
	const [openAI, setOpenAI] = useState(false);

	const highlightCodeblocks = (content: string) => {
		const doc = new DOMParser().parseFromString(content, "text/html");
		doc.querySelectorAll("pre code").forEach((el) => {
			// @ts-ignore
			hljs.highlightElement(el);
		});
		return new XMLSerializer().serializeToString(doc);
	};

	const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
		const json = editor.getJSON();
		setCharsCount(editor.storage.characterCount.words());
		setSaveStatus("Saving...");

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';
			const response = await fetch(`${apiUrl}/api/posts/${initialPost.id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(json),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to save post.");
			}
			setSaveStatus("Saved");
		} catch (error) {
			console.error(error);
			setSaveStatus("Error");
		}
	}, 1000);

	const handlePublish = async () => {
		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';
			const res = await fetch(`${apiUrl}/api/posts/${initialPost.id}/status`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: 'published' }),
			});
			if (!res.ok) throw new Error('Failed to publish post');
			toast.success("Post published successfully!");
			console.log('[Editor] Published post:', initialPost.id);
		} catch (err: any) {
			toast.error("Failed to publish the post. Please try again.");
			console.error(err.message);
		}
	};

	useEffect(() => {
		if (initialPost) {
			setInitialContent(initialPost.content as JSONContent);
			return;
		}
		const content = window.localStorage.getItem("novel-content");
		if (content) setInitialContent(JSON.parse(content));
		else setInitialContent(defaultEditorContent);
	}, [initialPost]);

	if (!initialContent) return null;

	return (
		<div className="relative w-full max-w-screen-lg mx-auto">
			<div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
				<div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">{saveStatus}</div>
				<div className={charsCount ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground" : "hidden"}>
					{charsCount} Words
				</div>
				<Button onClick={handlePublish}>Publish</Button>
			</div>
			<EditorRoot>
				<EditorContent
					initialContent={initialContent}
					extensions={extensions}
					className="relative min-h-[500px] w-full max-w-screen-lg mx-auto bg-background sm:mb-[calc(20vh)]"
					editorProps={{
						handleDOMEvents: {
							keydown: (_view, event) => handleCommandNavigation(event),
						},
						handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
						handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, uploadFn),
						attributes: {
							class:
								"prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
						},
					}}
					onUpdate={({ editor }) => {
						debouncedUpdates(editor);
						setSaveStatus("Unsaved");
						if (!isDirty && initialPost.status === 'published') {
							setIsDirty(true);
							try {
								const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';
								fetch(`${apiUrl}/api/posts/${initialPost.id}/status`, {
									method: 'PATCH',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({ status: 'draft' }),
								});
								console.log('[Editor] Auto-setting to draft for post:', initialPost.id);
							} catch (err: any) {
								console.error(err.message);
							}
						}
					}}
					slotAfter={<ImageResizer />}
				>
					<EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
						<EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
						<EditorCommandList>
							{suggestionItems.map((item) => (
								<EditorCommandItem
									value={item.title}
									onCommand={(val) => item.command && item.command(val)}
									className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
									key={item.title}
								>
									<div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
										{item.icon}
									</div>
									<div>
										<p className="font-medium">{item.title}</p>
										<p className="text-xs text-muted-foreground">{item.description}</p>
									</div>
								</EditorCommandItem>
							))}
						</EditorCommandList>
					</EditorCommand>
				</EditorContent>
			</EditorRoot>
		</div>
	);
};

export default TailwindAdvancedEditor;