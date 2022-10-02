import { Container, Heading, Select, Stack, Text } from "@chakra-ui/react";
import { AddElementButton } from "@components/AddElementButton";
import { ElementRenderer } from "@components/ElementRenderer";
import { LeafRenderer } from "@components/LeafRenderer";
import { TextFormattingButton } from "@components/TextFormattingButton";
import { CustomElement } from "@modules/slate/slateEntity";
import { useCallback, useState } from "react";
import { createEditor, Descendant, Editor, Node, Transforms } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
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
          <ElementEditor editor={editor} />
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

const isButton = (editor: Editor, node: Node) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n?.type === "button",
  });

  return !!match;
};

const ElementEditor = (props: { editor: Editor }) => {
  const editor = useSlate();
  const [match] = Editor.nodes(editor, {
    match: (n: Node) => {
      return n?.hasOwnProperty("type");
    },
  });

  const getElementType = () => {
    // Not sure if this the correct way to retrieve Element type
    const [match] = Editor.nodes(editor, {
      match: (n: Node) => {
        return n?.hasOwnProperty("type");
      },
    });

    console.log("match", match);
    const t = match ? (match[0] as CustomElement) : null;

    return t;
  };

  const changeButtonVariant = (variant: "solid" | "outline" | "ghost") => {
    Transforms.setNodes(
      editor,
      { variant: variant },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  };

  const changeHeadingLevel = (level: 1 | 2) => {
    Transforms.setNodes(
      editor,
      { level: level },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  };

  return (
    <Stack px={2} py={2}>
      <Heading fontSize={"2xl"}>Element Editor</Heading>
      {getElementType()?.type === "heading" && (
        <>
          <Stack px={2}>
            <Select
              onChange={(e) =>
                changeHeadingLevel(Number(e.target.value) as 1 | 2)
              }
              // can't type narrowing to heading
              // @ts-ignore
              value={getElementType()?.level}
            >
              <option value={1}>Heading 1</option>
              <option value={2}>Heading 2</option>
            </Select>
          </Stack>
          <Stack borderTopWidth={1} borderBottomWidth={1} py={3} px={2}>
            <Text>Text Format</Text>
            <Stack direction={"row"}>
              <TextFormattingButton format="bold" />
              <TextFormattingButton format="underlined" />
              <TextFormattingButton format="italic" />
            </Stack>
          </Stack>
        </>
      )}
      {getElementType()?.type === "paragraph" && (
        <Stack borderTopWidth={1} borderBottomWidth={1} py={3} px={2}>
          <Text>Text Format</Text>
          <Stack direction={"row"}>
            <TextFormattingButton format="bold" />
            <TextFormattingButton format="underlined" />
            <TextFormattingButton format="italic" />
          </Stack>
        </Stack>
      )}

      {getElementType()?.type === "button" && (
        <Stack px={2}>
          <Select
            onChange={(e) =>
              changeButtonVariant(
                e.target.value as "solid" | "outline" | "ghost"
              )
            }
            // the Can't type narrowing to ButtonElement
            // @ts-ignore
            value={getElementType()?.variant}
          >
            <option value={"solid"}>Solid</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
          </Select>
        </Stack>
      )}
    </Stack>
  );
};

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
