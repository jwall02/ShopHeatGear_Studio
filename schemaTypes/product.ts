import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "brand", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["cooling-vest", "neck-fan", "cooling-towel", "portable-ac", "hydration", "other"],
      },
    }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "priceUsd", title: "Price (USD)", type: "number" }),
    defineField({
      name: "affiliateLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "affiliateLink",
          fields: [
            defineField({
              name: "merchant",
              type: "string",
              options: { list: ["amazon", "brand-direct", "other"] },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (r) => r.required().uri({ scheme: ["https"] }),
            }),
          ],
          preview: { select: { title: "merchant", subtitle: "url" } },
        }),
      ],
    }),
    defineField({ name: "pros", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "cons", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "specs",
      description: "Verified against the manufacturer's published specs.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "spec",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    // Plan Step 6: unverifiable products must be excluded, so the flag is explicit.
    defineField({
      name: "claimsVerified",
      type: "boolean",
      initialValue: false,
      description: "Only true once every claim is checked against manufacturer specs.",
    }),
    defineField({ name: "verifiedAt", type: "date" }),
  ],
  preview: { select: { title: "name", subtitle: "brand", media: "image" } },
});
