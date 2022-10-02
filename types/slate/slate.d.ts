// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { CustomEditor, CustomElement, FormattedText } from '@modules/slate/slateEntity'

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: FormattedText
  }
}
