import { Button } from "@chakra-ui/react"
import { TextFormat } from "@modules/slate/slateEntity"
import { isMarkActive, toggleMark } from "@utils/slate.utils"
import { useSlate } from "slate-react"

const TextFormattingButton = (props: { format: TextFormat }) => {
  const editor = useSlate()
  return (
    <Button
      size={"sm"}
      onClick={() => toggleMark(editor, props.format)}
      colorScheme={
        isMarkActive(editor, props.format) ? "blue" : "gray"
      }
    >
      {props.format}
    </Button>
  )
}

export { TextFormattingButton }