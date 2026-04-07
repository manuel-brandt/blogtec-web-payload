import { defineType, defineField, defineArrayMember } from "sanity";

export const homepageSchema = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    // ── Announcement Bar ─────────────────────────────────────────────
    defineField({
      name: "announcementBar",
      title: "Announcement Bar",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Text", type: "string" }),
        defineField({ name: "ctaText", title: "CTA Text", type: "string" }),
        defineField({ name: "ctaLink", title: "CTA Link", type: "string" }),
        defineField({ name: "enabled", title: "Enabled", type: "boolean" }),
      ],
    }),

    // ── Hero Section ──────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "subheadline", title: "Subheadline", type: "text" }),
        defineField({ name: "ctaPrimaryText", title: "Primary CTA Text", type: "string" }),
        defineField({ name: "ctaPrimaryLink", title: "Primary CTA Link", type: "string" }),
        defineField({ name: "ctaSecondaryText", title: "Secondary CTA Text", type: "string" }),
        defineField({ name: "ctaSecondaryLink", title: "Secondary CTA Link", type: "string" }),
      ],
    }),

    // ── Stats Bar ─────────────────────────────────────────────────────
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        }),
      ],
    }),

    // ── Logo Bar ──────────────────────────────────────────────────────
    defineField({
      name: "logoBar",
      title: "Logo Bar",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "name", title: "Company Name", type: "string" }),
                defineField({ name: "logo", title: "Logo", type: "image" }),
                defineField({ name: "isCaseStudy", title: "Case Study Badge", type: "boolean" }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ── Services Section ──────────────────────────────────────────────
    defineField({
      name: "services",
      title: "Services Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "tabs",
          title: "Tabs",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", title: "Tab Label", type: "string" }),
                defineField({
                  name: "items",
                  title: "Service Items",
                  type: "array",
                  of: [
                    defineArrayMember({
                      type: "object",
                      fields: [
                        defineField({ name: "title", title: "Title", type: "string" }),
                        defineField({ name: "href", title: "Link", type: "string" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ── Testimonials ──────────────────────────────────────────────────
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "company", title: "Company", type: "string" }),
            defineField({ name: "text", title: "Testimonial Text", type: "text" }),
            defineField({ name: "avatar", title: "Avatar", type: "image" }),
          ],
        }),
      ],
    }),

    // ── Resources Section ─────────────────────────────────────────────
    defineField({
      name: "resources",
      title: "Resources Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "items",
          title: "Resource Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "type", title: "Type (e.g. Case Study, Guide, Video)", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "href", title: "Link", type: "string" }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ── CTA Section ───────────────────────────────────────────────────
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "highlights",
          title: "Bullet Points",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "ctaText", title: "Button Text", type: "string" }),
        defineField({ name: "ctaLink", title: "Button Link", type: "string" }),
      ],
    }),
  ],
});
