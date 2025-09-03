import { type JSONContent } from "novel";

export type Post = {
	id: string;
	title: string;
	content: JSONContent;
	status: 'draft' | 'published';
	createdAt: string;
	updatedAt: string;
};

export const newPost = (id: string): Post => ({
	id,
	title: "Untitled Post",
	content: newPostContent,
	status: "draft",
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
});

export const newPostContent = {
	type: "doc",
	content: [
		{
			type: "heading",
			attrs: { level: 1 },
			content: [],
		},
	],
};

export const defaultEditorContent = {
	type: "doc",
	content: [
		{
			type: "heading",
			attrs: { level: 2 },
			content: [{ type: "text", text: "Introducing Novel" }],
		},
		{
			type: "paragraph",
			content: [
				{
					type: "text",
					marks: [
						{
							type: "link",
							attrs: {
								href: "https://github.com/steven-tey/novel",
								target: "_blank",
							},
						},
					],
					text: "Novel",
				},
				{
					type: "text",
					text: " is a Notion-style WYSIWYG editor with AI-powered autocompletion. Built with ",
				},
				{
					type: "text",
					marks: [
						{
							type: "link",
							attrs: {
								href: "https://tiptap.dev/",
								target: "_blank",
							},
						},
					],
					text: "Tiptap",
				},
				{ type: "text", text: " + " },
				{
					type: "text",
					marks: [
						{
							type: "link",
							attrs: {
								href: "https://sdk.vercel.ai/docs",
								target: "_blank",
							},
						},
					],
					text: "Vercel AI SDK",
				},
				{ type: "text", text: "." },
			],
		},
	],
};
