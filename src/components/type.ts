import { PatchEvent } from "sanity";

export interface TableInputProps {
  schemaType?: any; // Schema type definition
  value?: string; // The raw STL string value stored in Sanity
  onChange: (patch: PatchEvent) => void;
  // Sanity v3 injects these
  elementProps?: any;
  readOnly?: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export type ReactRenderer = {
  Table: React.ComponentType<any>;
};
