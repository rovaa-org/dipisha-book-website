"use client";

import {
  EditorContent,
  EditorRoot,
  JSONContent,
} from "novel";
import { defaultExtensions } from "./extensions";

interface PostViewerProps {
  content: JSONContent;
}

export function PostViewer({ content }: PostViewerProps) {
  return (
    <EditorRoot>
      <EditorContent
        initialContent={content}
        extensions={defaultExtensions}
        editable={false}
        editorProps={{
          attributes: {
            class: "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
          },
        }}
      />
    </EditorRoot>
  );
}