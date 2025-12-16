import TableInput from "../components/TableInput";
import { TablePreview } from "../components/TablePreview";

export default {
  // Use a unique name for this block type
  name: "stlTableBlock",
  title: "Structured Table Block",
  type: "object",
  icon: () => "📊", // A simple icon for the editor's insert menu
  fields: [
    {
      title: "Table Data (STL Format)",
      name: "stlString",
      type: "string",
      description: "Enter your Structured Table Language (STL) here.",
      // This is the field that will use custom input component
      components: {
        input: TableInput,
      },
    },
    {
      name: "caption",
      title: "Table Caption",
      type: "string",
    },
  ],
  components: {
    preview: TablePreview,
  },
  // A preview for how it looks *inside* the text editor.
  preview: {
    select: {
      title: "caption",
      subtitle: "stlString",
    },
  },
};
