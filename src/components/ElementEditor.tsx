import { Heading, Select, Stack, Text } from "@chakra-ui/react";
import { CustomElement } from "@modules/slate/slateEntity";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import { TextFormattingButton } from "./TextFormattingButton";

const ElementEditor = () => {
  const editor = useSlate();

  const getElementType = () => {
    // Not sure if this the correct way to retrieve Element type
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n: Node) => {
        return n?.hasOwnProperty("type");
      },
    });
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

export { ElementEditor };
