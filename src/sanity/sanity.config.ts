import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { blogPostSchema } from "./schemas/blogPost";

export default defineConfig({
  name: "default",
  title: "Blogtec Website",
  projectId: "jp4u2mib",
  dataset: "production",
  plugins: [
    structureTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: "de", title: "Deutsch" },
        { id: "en", title: "English" },
      ],
      schemaTypes: ["blogPost"],
    }),
  ],
  schema: {
    types: [blogPostSchema],
  },
});
