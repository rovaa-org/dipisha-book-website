import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BubbleMenu } from '@tiptap/react'
import BubbleMenuExtension from '@tiptap/extension-bubble-menu'
import { Toggle } from '../../../components/ui/toggle'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BubbleMenuExtension.configure(),
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div>
      {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Toggle onPressedChange={() => editor.chain().focus().toggleBold().run()} pressed={editor.isActive('bold')}>Bold</Toggle>
        <Toggle onPressedChange={() => editor.chain().focus().toggleItalic().run()} pressed={editor.isActive('italic')}>Italic</Toggle>
        <Toggle onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} pressed={editor.isActive('heading', { level: 1 })}>H1</Toggle>
        <Toggle onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} pressed={editor.isActive('heading', { level: 2 })}>H2</Toggle>
        <Toggle onPressedChange={() => editor.chain().focus().toggleBulletList().run()} pressed={editor.isActive('bulletList')}>Bullet List</Toggle>
      </BubbleMenu>}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
