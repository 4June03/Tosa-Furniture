import { UsersIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Giới thiệu',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'story', title: 'Câu chuyện' },
    { name: 'highlights', title: 'Con số nổi bật' },
    { name: 'team', title: 'Đội ngũ & xưởng' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Tiêu đề trang',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Mô tả ngắn dưới tiêu đề',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Ảnh hero',
      type: 'image',
      group: 'hero',
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
    defineField({
      name: 'foundedYear',
      title: 'Năm thành lập',
      type: 'number',
      group: 'highlights',
      description: 'Dùng để tính "X năm kinh nghiệm" tự động',
      validation: (rule) => rule.min(1900).max(2100),
    }),
    defineField({
      name: 'highlights',
      title: 'Con số / Cam kết nổi bật',
      type: 'array',
      group: 'highlights',
      description: 'Ví dụ: 200+ Dự án, 12 Năm kinh nghiệm, 50+ Khách hàng',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Số / Giá trị',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Nhãn',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'storyHeading',
      title: 'Tiêu đề câu chuyện',
      type: 'string',
      group: 'story',
    }),
    defineField({
      name: 'storyBody',
      title: 'Nội dung câu chuyện',
      type: 'array',
      group: 'story',
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
          ],
        }),
      ],
    }),
    defineField({
      name: 'missionStatement',
      title: 'Sứ mệnh / Giá trị cốt lõi',
      type: 'text',
      rows: 4,
      group: 'story',
    }),
    defineField({
      name: 'teamPhoto',
      title: 'Ảnh đội ngũ',
      type: 'image',
      group: 'team',
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
    defineField({
      name: 'workshopGallery',
      title: 'Ảnh xưởng / Showroom',
      type: 'array',
      group: 'team',
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
  ],
  preview: {
    prepare: () => ({ title: 'Giới thiệu' }),
  },
})
