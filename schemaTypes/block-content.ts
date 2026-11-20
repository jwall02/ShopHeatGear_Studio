import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Article body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      marks: {
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                validation: (r) => r.uri({ scheme: ["http", "https"] }),
              }),
              // Drives rel="sponsored nofollow" on outbound affiliate links.
              defineField({ name: "isAffiliate", type: "boolean", initialValue: false }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "image", options: { hotspot: true } }),
    defineArrayMember({
      name: "productCard",
      type: "object",
      fields: [
        defineField({
          name: "product",
          type: "reference",
          to: [{ type: "product" }],
          validation: (r) => r.required(),
        }),
        defineField({ name: "verdict", type: "text", rows: 3 }),
      ],
      preview: { select: { title: "product.name", subtitle: "verdict" } },
    }),
    defineArrayMember({
      name: "comparisonTable",
      type: "object",
      fields: [
        defineField({ name: "caption", type: "string" }),
        defineField({
          name: "products",
          type: "array",
          of: [{ type: "reference", to: [{ type: "product" }] }],
          validation: (r) => r.min(2),
        }),
        defineField({
          name: "specLabels",
          description: "Spec labels to show as columns; values come from each product.",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
      preview: { select: { title: "caption" } },
    }),
  ],
});
