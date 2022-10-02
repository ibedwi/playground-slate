import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

type TextFormat = "bold" | "italic" | "underlined";

type CustomEditor = BaseEditor & ReactEditor

type ParagraphElement = {
  type: 'paragraph',
  isBold?: boolean,
  isItalic?: boolean,
  isUnderlined?: boolean,
  children: CustomText[]
}

type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

type CustomElement = ParagraphElement | HeadingElement

type FormattedText = { text: string; bold?: true, italic?: true, underlined?: true }

type CustomText = FormattedText


export type { TextFormat, CustomElement, FormattedText, CustomText, CustomEditor, ParagraphElement, HeadingElement }