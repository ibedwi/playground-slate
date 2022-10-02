import { Button } from "@chakra-ui/react";
import { CustomElement } from "@modules/slate/slateEntity";
import { Transforms } from "slate";
import { useSlate } from "slate-react";

type AddElementButtonProps = {
  label: string;
  element: CustomElement['type']
}

const AddElementButton = (props: AddElementButtonProps) => {
  const editor = useSlate();

  const resolveElement = (): CustomElement => {
    switch (props.element) {
      case 'heading': {
        return (
          {
            type: 'heading',
            level: 1,
            children: [{ text: "New H1" }]
          }
        )
      }

      case 'button': {
        return {
          type: 'button',
          variant: 'solid',
          label: 'New Button',
          children: [{ text: "test" }]
        }
      }

      case 'paragraph':
      default:
        return (
          {
            type: 'paragraph',
            children: [{ text: "New Paragraph" }]
          }
        )
    }
  }

  const addElement = () => {
    Transforms.insertNodes(editor, resolveElement())
  }

  return (
    <Button onClick={addElement}>{props.label}</Button>
  )
}

export { AddElementButton }