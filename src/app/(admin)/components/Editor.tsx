'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface TiptapProps {
    content: string;
    onChange: (richText: string) => void;
}

const Tiptap = ({ content, onChange }: TiptapProps) => {
  const editor = useEditor({
    // THIS IS THE CRITICAL FIX:
    immediatelyRender: false,
    //
    extensions: [
      StarterKit,
    ],
    content: content,
    editorProps: {
        attributes: {
            class: "rounded-md border min-h-[150px] border-input p-4"
        }
    },
    onUpdate({ editor }) {
        onChange(editor.getHTML());
    },
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default Tiptap