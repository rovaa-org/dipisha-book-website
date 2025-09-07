"use client";

import {
  EditorContent,
  EditorRoot,
  JSONContent,
} from "novel";
import { defaultExtensions } from "../lib/extensions";
import { cal, inter } from "../lib/fonts";

interface PostViewerProps {
  content: JSONContent;
}

export function PostViewer({ content }: PostViewerProps) {
  return (
    <div className={`${cal.variable} ${inter.variable}`}>
        <EditorRoot immediatelyRender={false}>
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