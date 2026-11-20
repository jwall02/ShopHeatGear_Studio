import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "persona",
      title: "Persona cluster",
      type: "string",
      options: { list: ["worker", "outdoor", "resident"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "searchIntent",
      type: "string",
      options: { list: ["comparison", "how-to", "buying-guide"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isPillar",
      title: "Cornerstone guide",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "pillar",
      title: "Links back to pillar",
      type: "reference",
      to: [{ type: "article" }],
      options: { filter: "isPillar == true" },
      hidden: ({ document }) => document?.isPillar === true,
    }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.max(300) }),
    defineField({
      name: "seoTitle",
      type: "string",
      validation: (r) => r.max(60).warning("Keep under 60 characters"),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      rows: 2,
      validation: (r) => r.max(160).warning("Keep under 160 characters"),
    }),
    defineField({ name: "mainImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "updatedAt", type: "datetime" }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({
      name: "methodology",
      title: "How we evaluated",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "faq",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            defineField({ name: "question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "persona", media: "mainImage" } },
});
