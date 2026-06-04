import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Trang chủ',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'intro', title: 'Giới thiệu ngắn' },
    { name: 'featured', title: 'Nội dung nổi bật' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Slides Hero',
      type: 'array',
      group: 'hero',
      validation: (rule) => rule.min(1).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Ảnh nền',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Tiêu đề lớn',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'subheading',
              title: 'Tiêu đề phụ',
              type: 'string',
            }),
            defineField({
              name: 'ctaLabel',
              title: 'Chữ trên nút CTA',
              type: 'string',
              description: 'Ví dụ: Xem dự án, Nhận tư vấn',
            }),
            defineField({
              name: 'ctaHref',
              title: 'Link CTA',
              type: 'string',
              description: 'Ví dụ: /du-an hoặc /lien-he',
            }),
          ],
          preview: {
            select: { title: 'heading', subtitle: 'subheading', media: 'image' },
          },
        }),
      ],
    }),
    defineField({
      name: 'introHeading',
      title: 'Tiêu đề đoạn giới thiệu',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'introBody',
      title: 'Nội dung đoạn giới thiệu',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'intro',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Dự án nổi bật',
      type: 'array',
      group: 'featured',
      description: 'Chọn các dự án hiển thị ở section portfolio trên trang chủ',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
      validation: (rule) => rule.unique().max(12),
    }),
    defineField({
      name: 'featuredServices',
      title: 'Dịch vụ nổi bật',
      type: 'array',
      group: 'featured',
      description: 'Thứ tự hiển thị ở section dịch vụ',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'service' }],
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      group: 'seo',
      description: 'Ảnh hiển thị khi share Facebook / Zalo / Twitter',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Trang chủ' }),
  },
})
