// Rationale: This is the final version of the editor component with auto-saving to the backend.
// 1. It now accepts a `postId` prop, which is essential for the API endpoint.
// 2. The `debouncedUpdates` function is completely replaced with logic that performs a `fetch` call to our Hono API.
// 3. The save status indicator now provides real-time feedback ("Saving...", "Saved", "Error").
// 4. The initial content logic is updated to correctly handle being passed a new, empty post.

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

const TailwindAdvancedEditor = ({ postId, initialContent: initialContentProp }: { postId: string, initialContent?: JSONContent }) => {
	const [initialContent, setInitialContent] = useState<null | JSONContent>(null);
	const [saveStatus, setSaveStatus] = useState("Saved");
	const [charsCount, setCharsCount] = useState();

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
			const response = await fetch(`${apiUrl}/api/posts/${postId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(json),
			});

			if (!response.ok) {
				throw new Error("Failed to save post.");
			}
			setSaveStatus("Saved");
		} catch (error) {
			console.error(error);
			setSaveStatus("Error");
		}
	}, 1000);

	useEffect(() => {
		if (initialContentProp) {
			setInitialContent(initialContentProp);
			return;
		}
		const content = window.localStorage.getItem("novel-content");
		if (content) setInitialContent(JSON.parse(content));
		else setInitialContent(defaultEditorContent);
	}, [initialContentProp]);

	if (!initialContent) return null;

	return (
		<div className="relative w-full max-w-screen-lg mx-auto">
			<div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
				<div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">{saveStatus}</div>
				<div className={charsCount ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground" : "hidden"}>
					{charsCount} Words
				</div>
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
					}}
					slotAfter={<ImageResizer />}
				>
					<EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
						<EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
						<EditorCommandList>
							{suggestionItems.map((item) => (
								<EditorCommandItem
									value={item.title}
									onCommand={(val) => item.command(val)}
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