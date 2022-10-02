import { Button, Heading, Stack, Text } from "@chakra-ui/react"
import { RenderElementProps, useSelected } from "slate-react"

const ElementRenderer = ({ attributes, children, element }: RenderElementProps) => {
  const selected = useSelected();

  switch (element.type) {
    case 'paragraph': {
      return <Text as="p" {...attributes}>{children}</Text>
    }

    case 'heading': {
      if (element.level === 1) {
        return <Heading as="h1" fontSize="4xl" {...attributes}>{children}</Heading>
      }
      if (element.level === 2) {
        return <Heading as="h2" fontSize={"3xl"} {...attributes}>{children}</Heading>
      }
      return <Text {...attributes}>{children}</Text>
    }

    case 'button': {
      return <Button variant={element.variant} {...attributes}>{children}</Button>
    }
    case 'stack': {
      return (
        <Stack
          borderWidth={1}
          padding={2}
          borderColor={selected ? "blue.400" : "white"}
          _hover={{ borderColor: "blue.200" }}
        >
          {children}
        </Stack>
      )
    }
    default:
      return <Text as="p" {...attributes}>{children}</Text>
  }
}

export { ElementRenderer }