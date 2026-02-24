# Sanity Plugin: Structured Table (STL)

A Sanity Studio plugin for creating advanced, structured tables using the **Structured Table Language (STL)**.

![STL Banner](https://raw.githubusercontent.com/ameghcoder/sanity-plugin-stl-table/refs/heads/main/asset/integration.webp "STL Banner")

This plugin empowers your content creators to build complex tables with features like row/column spanning, headers, and rich styling, effectively overcoming the limitations of standard portable text tables.

## 🆕 Updates/Changelog

Check our change log file for version base update and more details about a specific version support [Check Change Log File](./CHANGE_LOG.md)

## ✨ Features

- **STL Editor**: A dedicated input component for writing and managing Structured Table Language (STL).
- **Live Preview**: Real-time preview of your table within the Sanity Studio.
- **Advanced Layouts**: Support for colspans, rowspans, and complex header structures.
- **SSR Friendly**: Designed to work seamlessly with Server-Side Rendering (especially Next.js) via the core `structured-table` package.

## 📦 Installation

### 1. Install the Plugin

```bash
npm install sanity-plugin-stl-table
# or
yarn add sanity-plugin-stl-table
# or
pnpm add sanity-plugin-stl-table
```

> **Note**: This plugin requires `react` >= 18 and `sanity` >= 3.0.0 (Supports Sanity v3, v4, and v5).

### 2. Setup Table Render Components (Required for Studio)

To enable the interactive table preview within Sanity Studio, you need to install the CLI and add the React components using `structured-table-cli` package.

First, install the CLI tool:

```bash
npm install structured-table-cli
```

Then, run the following command to download the pre-built React table components:

```bash
npx stl-cli add react
```

**Optional:** You can specify a custom path for the components:

```bash
npx stl-cli add react --path ./schemaTypes/components
```

### 3. Register Components in Sanity Config

After generating the components, you must register them in your `sanity.config.ts`. Import the register file (usually found in the folder where components were installed) at the top of your config.

For example, if installed in `schemaTypes/components`:

```typescript
// sanity.config.ts
import './schemaTypes/components/register' // Base path depends on where you installed it
import { defineConfig } from 'sanity'
import { stlTableBlock } from 'sanity-plugin-stl-table'

export default defineConfig({
  // ... configuration
})
```

## 🚀 Sanity Studio Implementation

### 1. Import the Schema

Import the `stlTableBlock` schema definition and add it to your Sanity Studio configuration `types` array.

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { stlTableBlock } from 'sanity-plugin-stl-table'

export default defineConfig({
  // ...
  schema: {
    types: [
      // ... other types
      stlTableBlock,
    ],
  },
})
```

### 2. Use in Portable Text or as a Field

You can now use the `stlTableBlock` type in your portable text editors or as a standalone field in your documents.

**In Portable Text:**

```typescript
// schemas/blockContent.ts (or similar)
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    { type: 'block' },
    // Add the table block
    { type: 'stlTableBlock' }, 
  ],
}
```

**As a Field:**

```typescript
export default {
  name: 'productSpecification',
  title: 'Product Specification',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'specsTable',
      title: 'Specifications Table',
      type: 'stlTableBlock',
    },
  ],
}
```

### 3. Studio Usage

Restart your Sanity dev server. You will now see an input field where you can paste or write your `STL` code.

Check following video to Learn how to use block inside Sanity Studio.

[![How to use block inside Sanity Studio](https://img.youtube.com/vi/VDj2CrNHuTA/maxresdefault.jpg)](https://youtu.be/VDj2CrNHuTA)

The table preview will update automatically below user input as you type, giving you immediate response on your table structure and content.

### 4. Create Table in STL Language

You can use our interactive live table editor at [/playground](https://stl.fysk.dev/playground) where you can create your entire table and then export that in the STL format.

Use this link if above link won't work - [STL Table Editor](https://stl-table.vercel.app/playground)

## 💻 Frontend Implementation

To render the structured tables on your frontend (e.g., Next.js, Remix), follow these steps:

### 1. Install Dependencies

Install the core package and the CLI (if you haven't already on the frontend repo), then generate the React components.

```bash
npm install structured-table
npm install structured-table-cli
```

Used to install React renderer in your project (for Vue project replace `react` to `vue`)

```bash
npx stl-cli add react
```

### 2. Render in Portable Text

Use the generated components within your Portable Text configuration. Here is an example of how to implement the `stlTableBlock`.

```tsx
import * as STLReact from './components/react' // Path to your generated components
import { STL } from 'structured-table'

const myPortableTextComponents = {
  types: {
    stlTableBlock: ({ value }: {
      value: {
        _key: string;
        _type: string;
        stlString: string;
        caption?: string;
      }
    }) => {
      // Parse the STL string
      const parsedSTL = STL.parse(value.stlString);

      // If a caption exists in Sanity, override the STL internal name/caption
      if (value.caption) {
        parsedSTL.caption = value.caption;
      }

      // Render the table
      return <STLReact.Table data={parsedSTL} className='border' />
    }
  }
}

// Usage in your PortableText component
// <PortableText value={data.body} components={myPortableTextComponents} />
```

## 🛠 How it Works

1. **Data Storage**: The table data is stored as a string in the **Structured Table Language (STL)** format. This is a concise, human-readable format designed for table representation.
2. **Input Component**: When editing, the plugin provides a custom `TableInput` interface that allows you to input and edit the STL code directly, with immediate visual feedback.
   - It uses `TableInput` component to handle user interaction.
   - It saves the raw STL string + an optional caption.
3. **Preview**: Inside the Studio, a `TablePreview` component renders the STL string so editors can see exactly what the table looks like without leaving the CMS.
4. **Frontend Rendering**: On your frontend application (e.g., Next.js), you use the `structured-table` package to parse and render this STL string.

## 💡 What is it used for?

Standard Sanity tables are great for simple key-value pairs or basic grids. However, they often struggle with:

- **Merged Cells**: Row spans and column spans.
- **Complex Headers**: Multi-level headers, headers in columns, or non-standard grid layouts.
- **Rich Styling**: Needing specific alignment, button cells, or complex formatting that a simple grid doesn't support.

**Sanity Plugin Structured Table** solves this by leveraging STL, allowing you to define table structures as flexibly as you would in HTML, but with a syntax designed for data entry and maintainability.

## 📄 License

MIT © [Yashraj Yadav](https://github.com/ameghcoder)
