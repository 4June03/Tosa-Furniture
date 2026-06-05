'use server'

import { Resend } from 'resend'
import {
  contactSchema,
  PROJECT_TYPE_OPTIONS,
  SERVICE_OPTIONS,
  type ContactInput,
} from './contact-schema'

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

function labelOf<T extends { value: string; label: string }>(
  options: readonly T[],
  value?: string
) {
  return options.find((o) => o.value === value)?.label ?? value ?? ''
}

function formatBody(data: ContactInput) {
  const lines = [
    `Họ tên: ${data.name}`,
    `Điện thoại: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    data.service ? `Dịch vụ quan tâm: ${labelOf(SERVICE_OPTIONS, data.service)}` : null,
    data.projectType ? `Loại công trình: ${labelOf(PROJECT_TYPE_OPTIONS, data.projectType)}` : null,
    data.area ? `Diện tích: ${data.area} m²` : null,
    '',
    data.message ? `Nội dung:\n${data.message}` : 'Không có ghi chú thêm.',
  ].filter(Boolean) as string[]
  return lines.join('\n')
}

// Ghi lead vào Google Sheet qua Apps Script Web App (webhook).
async function deliverToSheet(url: string, data: ContactInput): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email ?? '',
        service: labelOf(SERVICE_OPTIONS, data.service),
        projectType: labelOf(PROJECT_TYPE_OPTIONS, data.projectType),
        area: data.area ?? '',
        message: data.message ?? '',
      }),
      // Apps Script trả 302 redirect sang googleusercontent.com — fetch tự follow.
      redirect: 'follow',
    })
    if (!res.ok) {
      console.error('[contact] Google Sheet webhook lỗi HTTP:', res.status)
      return false
    }
    return true
  } catch (err) {
    console.error('[contact] Google Sheet webhook thất bại:', err)
    return false
  }
}

// Gửi email qua Resend (kênh phụ, chỉ chạy khi đã cấu hình env).
async function deliverEmail(data: ContactInput, body: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !from || !to) return false

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email || undefined,
      subject: `Yêu cầu tư vấn từ ${data.name}`,
      text: body,
    })
    if (result.error) {
      console.error('[contact] Resend error:', result.error)
      return false
    }
    return true
  } catch (err) {
    console.error('[contact] Resend unexpected:', err)
    return false
  }
}

export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Dữ liệu chưa hợp lệ',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const data = parsed.data
  const body = formatBody(data)

  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  const emailConfigured =
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL &&
    process.env.CONTACT_TO_EMAIL

  // Chưa cấu hình kênh nào — chỉ log để kiểm tra luồng.
  if (!sheetUrl && !emailConfigured) {
    console.info('[contact] Chưa cấu hình kênh gửi (Google Sheet/email). Chỉ ghi log:')
    console.info(body)
    return { ok: true }
  }

  const deliveries = await Promise.all([
    sheetUrl ? deliverToSheet(sheetUrl, data) : Promise.resolve(false),
    emailConfigured ? deliverEmail(data, body) : Promise.resolve(false),
  ])

  // Thành công nếu ít nhất một kênh nhận được dữ liệu.
  if (deliveries.some(Boolean)) {
    return { ok: true }
  }

  return { ok: false, error: 'Không gửi được thông tin. Vui lòng thử lại.' }
}
