import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { ElementRenderer } from "@components/ElementRenderer";
import { LeafRenderer } from "@components/LeafRenderer";
import { TextFormattingButton } from "@components/TextFormattingButton";
import { CustomElement } from "@modules/slate/slateEntity";
import { useCallback, useState } from "react";
import { createEditor, Descendant, Transforms } from "slate";
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps, useSlate, useFocused, useSlateSelection } from "slate-react";

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

const AddElementButton = () => {
  const editor = useSlate();
  const H1Element: CustomElement = {
    type: 'heading',
    level: 1,
    children: [{ text: "New H1" }]
  }
  const addElement = () => {
    Transforms.insertNodes(editor, H1Element)
  }

  return (
    <Button onClick={addElement}>Add H1</Button>
  )
}

function BasicPage() {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: RenderElementProps) => <ElementRenderer {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <LeafRenderer {...props} />, [])

  return (
    <Container pt={4}>
      <Slate editor={editor} value={initialValue}>
        <Stack >
          <Heading>Rich but not so rich editor</Heading>
          <Stack borderTopWidth={1} borderBottomWidth={1} py={3}>
            <Text>Element Toolbar</Text>
            <Stack direction={"row"}>
              <AddElementButton />
            </Stack>
          </Stack>
          <Stack borderTopWidth={1} borderBottomWidth={1} py={3}>
            <Text>Text Format</Text>
            <Stack direction={"row"}>
              <TextFormattingButton format="bold" />
              <TextFormattingButton format="underlined" />
              <TextFormattingButton format="italic" />
            </Stack>
          </Stack>

          {/* <FocusedBar /> */}
          <Stack borderWidth={1} borderRadius="lg" borderColor="gray.200" p={4}>
            <Editable
              renderLeaf={renderLeaf}
              renderElement={renderElement}
            />
          </Stack>
        </Stack>
      </Slate>
    </Container >
  );
}

// Use this to view the editor focused and selected state
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
