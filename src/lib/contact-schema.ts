import { z } from 'zod'

const VN_PHONE_REGEX = /^(?:\+?84|0)(?:[3|5|7|8|9])(?:\d{8})$/

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Vui lòng nhập họ tên')
    .max(80, 'Tên quá dài'),
  phone: z
    .string()
    .regex(VN_PHONE_REGEX, 'Số điện thoại không hợp lệ'),
  email: z
    .string()
    .email('Email không hợp lệ')
    .optional()
    .or(z.literal('')),
  service: z
    .enum([
      'thiet-ke-kien-truc',
      'thiet-ke-noi-that',
      'xay-nha-tron-goi',
      'thi-cong-noi-that',
      'giam-sat-xay-dung',
      'chua-xac-dinh',
    ])
    .optional()
    .or(z.literal('')),
  projectType: z
    .enum(['biet-thu', 'nha-pho', 'chung-cu', 'van-phong', 'showroom', 'khac'])
    .optional()
    .or(z.literal('')),
  area: z
    .string()
    .regex(/^\d*$/, 'Diện tích chỉ chứa số')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .max(1500, 'Nội dung quá dài')
    .optional()
    .or(z.literal('')),
})

export type ContactInput = z.infer<typeof contactSchema>

export const SERVICE_OPTIONS = [
  { value: 'thiet-ke-kien-truc', label: 'Thiết kế kiến trúc' },
  { value: 'thiet-ke-noi-that', label: 'Thiết kế nội thất' },
  { value: 'xay-nha-tron-goi', label: 'Xây nhà trọn gói' },
  { value: 'thi-cong-noi-that', label: 'Thi công nội thất' },
  { value: 'giam-sat-xay-dung', label: 'Giám sát xây dựng' },
  { value: 'chua-xac-dinh', label: 'Chưa xác định' },
] as const

export const PROJECT_TYPE_OPTIONS = [
  { value: 'biet-thu', label: 'Biệt thự' },
  { value: 'nha-pho', label: 'Nhà phố' },
  { value: 'chung-cu', label: 'Chung cư' },
  { value: 'van-phong', label: 'Văn phòng' },
  { value: 'showroom', label: 'Showroom / Cửa hàng' },
  { value: 'khac', label: 'Khác' },
] as const
