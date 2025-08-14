//  /src/app/admin/editor/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateBlockNote } from "@blocknote/react";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/style.css";
import "@blocknote/shadcn/style.css";

// Dynamically import the editor view to prevent SSR issues
const BlockNoteView = dynamic(() => import("@blocknote/shadcn").then((mod) => mod.BlockNoteView), {
  ssr: false,
});

const AdminEditorPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("Standalone Blog Post");
  const [bookTitle, setBookTitle] = useState("");

  const editor = useCreateBlockNote();

  const handlePublish = async () => {
    if (!editor) {
      return;
    }

    const markdownContent = await editor.blocksToMarkdownLossy(editor.topLevelBlocks as PartialBlock[]);

    const payload = {
      title,
      contentType,
      bookTitle: contentType === "Book Chapter" ? bookTitle : undefined,
      markdownContent,
    };

    const response = await fetch("/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Content Editor</h1>
      <div className="mt-8 space-y-6">
        <Input
          placeholder="Content Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select onValueChange={setContentType} defaultValue={contentType}>
          <SelectTrigger>
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Standalone Blog Post">Standalone Blog Post</SelectItem>
            <SelectItem value="Book Chapter">Book Chapter</SelectItem>
          </SelectContent>
        </Select>
        {contentType === "Book Chapter" && (
          <Input
            placeholder="Book Title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        )}
        <div className="p-4 border rounded-lg">
          {editor ? <BlockNoteView editor={editor} /> : "Loading Editor..."}
        </div>
        <Button onClick={handlePublish}>Publish</Button>
      </div>
    </div>
  );
};

export default AdminEditorPage;