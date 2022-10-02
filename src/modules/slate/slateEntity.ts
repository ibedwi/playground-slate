import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'


type TextFormat = "bold" | "italic" | "underlined";

type FormattedText = { text: string; bold?: true, italic?: true, underlined?: true }

type CustomText = FormattedText

type CustomEditor = BaseEditor & ReactEditor

type ParagraphElement = {
  type: 'paragraph',
  isBold?: boolean,
  isItalic?: boolean,
  isUnderlined?: boolean,
  container?: {
    align: "left" | "right" | "middle"
  }
  children: CustomText[]
}

type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

type ButtonElement = {
  type: 'button',
  variant: 'solid' | 'ghost' | 'outline',
  label: string,
  children: CustomText[]
}

type StackElement = {
  type: 'stack',
  children: Array<CustomText | CustomElement>
}

type CustomElement = ParagraphElement | HeadingElement | ButtonElement | StackElement


export type { TextFormat, CustomElement, FormattedText, CustomText, CustomEditor, ParagraphElement, HeadingElement }