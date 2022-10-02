import { TextFormat } from "@modules/slate/slateEntity"
import { Editor } from "slate"

/**
 * Utility to check if the selected mark is active.
 * @param editor current Slate's editor instance
 * @param format checked mark
 * @returns true | false
 */
const isMarkActive = (editor: Editor, format: TextFormat): boolean => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

/**
 * Utility to add or remove mark from the current editor.
 * @param editor current Slate's editor instance
 * @param format editor's mark
 */
const toggleMark = ((editor: Editor, format: TextFormat) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
})

export { isMarkActive, toggleMark }