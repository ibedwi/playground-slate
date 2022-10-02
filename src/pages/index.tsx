import { Container, Heading, Stack } from "@chakra-ui/react";
import { AddElementButton } from "@components/AddElementButton";
import { ElementEditor } from "@components/ElementEditor";
import { ElementRenderer } from "@components/ElementRenderer";
import { LeafRenderer } from "@components/LeafRenderer";

import { useCallback, useState } from "react";
import { createEditor, Descendant } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  useFocused,
  useSlateSelection,
} from "slate-react";

// Add the initial value.
const initialValue: Descendant[] = [
  {
    type: "heading",
    level: 1,
    children: [{ text: "Test" }],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "Test", bold: true }],
  },
  {
    type: "paragraph",
    children: [
      { text: "A line of text in a paragraph.", bold: true },
      { text: "haahah" },
      { text: "asdfasdf" },
    ],
  },
];

function BasicPage() {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback(
    (props: RenderElementProps) => <ElementRenderer {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafRenderer {...props} />,
    []
  );

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }
      }}
    >
      <Stack direction={"row"} h={"100vh"} overflow="hidden">
        <Container pt={4}>
          <Stack>
            <Heading>Rich but not so rich editor</Heading>
            {/* <FocusedBar /> */}
            <Stack
              borderWidth={1}
              borderRadius="lg"
              borderColor="gray.200"
              p={4}
            >
              <Editable renderLeaf={renderLeaf} renderElement={renderElement} />
            </Stack>
          </Stack>
        </Container>
        <Stack
          borderLeftWidth={1}
          borderColor={"gray.300"}
          overflow="auto"
          w={600}
          justifyContent="space-between"
        >
          <ElementEditor />
          <Stack borderTopWidth={1} borderBottomWidth={1} py={2} px={3}>
            <Stack direction={"row"}>
              <AddElementButton element="heading" label="Add H1" />
              <AddElementButton element="paragraph" label="Add P" />
              <AddElementButton element="button" label="Add Button" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Slate>
  );
}

// Use this to view the editor focused and selected state
const FocusedBar = () => {
  const focused = useFocused();
  const selected = useSlateSelection();

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
  );
};

export default BasicPage;
