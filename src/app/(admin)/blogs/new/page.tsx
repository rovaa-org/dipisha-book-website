'use client'
import Editor from "@/app/(admin)/components/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    const response = await fetch("/api/content/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, status, content }),
    });

    if (response.ok) {
      alert("Blog post saved successfully!");
    } else {
      alert("Failed to save blog post.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">New Blog Post</h1>
      <div className="grid gap-4">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Select onValueChange={setStatus} defaultValue={status}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
        <Editor />
        <Button onClick={handleSave}>Save Post</Button>
      </div>
    </div>
  );
}
