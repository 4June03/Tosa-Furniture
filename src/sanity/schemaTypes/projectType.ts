import { DocumentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Dự án',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tên dự án',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Loại công trình',
      type: 'string',
      options: {
        list: [
          { title: 'Biệt thự', value: 'biet-thu' },
          { title: 'Nhà phố', value: 'nha-pho' },
          { title: 'Chung cư', value: 'chung-cu' },
          { title: 'Văn phòng', value: 'van-phong' },
          { title: 'Showroom / Cửa hàng', value: 'showroom' },
          { title: 'Khác', value: 'khac' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'area',
      title: 'Diện tích (m²)',
      type: 'number',
      description: 'Hiển thị trên card dự án',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'location',
      title: 'Địa điểm',
      type: 'string',
      description: 'Ví dụ: Hà Nội, TP.HCM',
    }),
    defineField({
      name: 'completedAt',
      title: 'Ngày hoàn thành',
      type: 'date',
    }),
    defineField({
      name: 'coverImage',
      title: 'Ảnh đại diện',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Mô tả ảnh — quan trọng cho SEO và accessibility',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Thư viện ảnh',
      type: 'array',
      of: [
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
          ],
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'body',
      title: 'Nội dung chi tiết',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'featured',
      title: 'Nổi bật trên trang chủ?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Mới nhất',
      name: 'completedAtDesc',
      by: [{ field: 'completedAt', direction: 'desc' }],
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
