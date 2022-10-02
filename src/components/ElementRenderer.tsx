import { Button, Heading, Text } from "@chakra-ui/react"
import { RenderElementProps } from "slate-react"

const ElementRenderer = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case 'paragraph': {
      return <p>{children}</p>
    }
    case 'heading': {
      if (element.level === 1) {
        return <Heading as="h1" fontSize="4xl">{children}</Heading>
      }
      if (element.level === 2) {
        return <Heading as="h2" fontSize={"3xl"}>{children}</Heading>
      }
      return <Text>{children}</Text>
    }
    case 'button': {
      return <Button variant={element.variant}>{children}</Button>
    }
    default:
      return <Text as="p" {...attributes}>{children}</Text>
  }
}

export { ElementRenderer }