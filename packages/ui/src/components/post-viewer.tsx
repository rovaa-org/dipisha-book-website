"use client";

import {
  EditorContent,
  EditorRoot,
  JSONContent,
} from "novel";
import { defaultExtensions } from "../lib/extensions";
import { useMemo } from "react";

interface PostViewerProps {
  content: JSONContent;
}

export function PostViewer({ content }: PostViewerProps) {
  const contentKey = useMemo(() => JSON.stringify(content), [content]);
  return (
    <div>
        <EditorRoot key={contentKey}>
          <EditorContent
            initialContent={content}
            extensions={defaultExtensions}
            editable={false}
            editorProps={{
              attributes: {
                class:
                  "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
              },
            }}
          />
        </EditorRoot>
    </div>
  );
}