import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Tin tức',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Nội dung', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Chuyên mục',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Kiến thức thiết kế', value: 'kien-thuc-thiet-ke' },
          { title: 'Mẹo trang trí', value: 'meo-trang-tri' },
          { title: 'Phong thuỷ', value: 'phong-thuy' },
          { title: 'Xu hướng', value: 'xu-huong' },
          { title: 'Dự án mới', value: 'du-an-moi' },
          { title: 'Khác', value: 'khac' },
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Tóm tắt',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Hiển thị ở card bài viết và share preview',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'coverImage',
      title: 'Ảnh đại diện',
      type: 'image',
      group: 'content',
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
      name: 'publishedAt',
      title: 'Ngày xuất bản',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Nội dung',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Chú thích',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Để trống sẽ dùng tiêu đề bài viết',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Để trống sẽ dùng tóm tắt',
      validation: (rule) => rule.max(160),
    }),
  ],
  orderings: [
    {
      title: 'Mới nhất',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
