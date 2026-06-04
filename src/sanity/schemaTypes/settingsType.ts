import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Cài đặt',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Tên website',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Câu giới thiệu ngắn, hiển thị ở footer và meta description',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'showroom',
      title: 'Thông tin showroom',
      type: 'object',
      fields: [
        defineField({ name: 'addressLine', title: 'Địa chỉ', type: 'string' }),
        defineField({ name: 'city', title: 'Thành phố', type: 'string' }),
        defineField({
          name: 'mapEmbedUrl',
          title: 'Google Maps embed URL',
          type: 'url',
          description: 'Lấy từ Google Maps → Share → Embed a map → src của iframe',
        }),
        defineField({
          name: 'openingHours',
          title: 'Giờ mở cửa',
          type: 'string',
          description: 'Ví dụ: T2–CN, 8:00–20:00',
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Thông tin liên hệ',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Số điện thoại',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (rule) => rule.email(),
        }),
        defineField({
          name: 'zalo',
          title: 'Số Zalo',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Mạng xã hội',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Nền tảng',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Pinterest', value: 'pinterest' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Cài đặt website' }),
  },
})
