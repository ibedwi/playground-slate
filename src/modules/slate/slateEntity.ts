import { BaseEditor, BaseText } from 'slate'
import { ReactEditor } from 'slate-react'

type TextFormat = "bold" | "italic" | "underlined";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type ParagraphElement = {
  type: 'paragraph',
  isBold?: boolean,
  isItalic?: boolean,
  isUnderlined?: boolean,
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type CustomElement = ParagraphElement | HeadingElement

export type FormattedText = { text: string; bold?: true, italic?: true, underlined?: true }

export type CustomText = FormattedText


export type { TextFormat }