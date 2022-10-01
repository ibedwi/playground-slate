import { useCallback, useState } from "react";
import { createEditor, Descendant, Element, Editor } from "slate";
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps, useSlate, useFocused, useSelected, useSlateSelection } from "slate-react";

type CustomElementType = "paragraph" | "spacer"


// Add the initial value.
const initialValue: Descendant[] = [
  {
    type: "heading",
    level: 1,
    children: [{ text: "Test" }]
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "Test", bold: true }]
  },
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph.", bold: true }, { text: "haahah" }, { text: "asdfasdf" }],
  },
];


function BasicPage() {
  const [editor] = useState(() => withReact(createEditor()));

  // function to render element based on its props and types
  // const renderElement = useCallback(props => <Element {...props} />, [])
  const renderElement = useCallback(({ attributes, children, element }: RenderElementProps) => {
    switch (element.type) {
      case 'paragraph': {
        console.log("parapgraph children", children)
        return <p>{children}</p>
      }
      case 'heading': {
        if (element.level === 1) {
          return <h1>{children}</h1>
        }
        if (element.level === 2) {
          return <h2>{children}</h2>
        }
        return <p>{children}</p>
      }
      default:
        return <p {...attributes}>{children}</p>
    }
  }, [])

  const renderLeaf = useCallback(({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }

    if (leaf.italic) {
      children = <em>{children}</em>
    }

    if (leaf.underlined) {
      children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
  }, [])

  const isMarkActive = (editor: Editor, format: "bold" | "italic" | "underlined") => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  const toggleMark = ((editor: Editor, format: "bold" | "italic" | "underlined") => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  })

  return (
    <div>
      <p>Editor: </p>
      <p>{JSON.stringify(Editor.marks(editor), undefined, 2)}</p>
      <div>
        <button onClick={() => toggleMark(editor, "bold")}>bold ({isMarkActive(editor, "bold") ? "active" : "inactive"})</button>
        <button>italic</button>
      </div>
      <Slate editor={editor} value={initialValue}>
        <ToolbarButton />
        <FocusedBar />
        <Editable
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
      </Slate>
    </div>
  );
}

const ToolbarButton = () => {
  const editor = useSlate()

  const isMarkActive = (editor: Editor, format: "bold" | "italic" | "underlined") => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  const toggleMark = ((editor: Editor, format: "bold" | "italic" | "underlined") => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  })
  return (
    <button onClick={() => toggleMark(editor, "bold")}>bold ({isMarkActive(editor, "bold") ? "active" : "inactive"})</button>
  )
}

const FocusedBar = () => {
  const focused = useFocused();
  const selected = useSlateSelection()

  return (
    <>
      <div>
        <p>Focused:</p>
        <pre>{JSON.stringify(focused, undefined, 2)}</pre>
      </div>
      <div>
        <p>Selected:</p>
        <pre>{JSON.stringify(selected, undefined, 2)}</pre>
      </div>
    </>
  )
}

export default BasicPage;
