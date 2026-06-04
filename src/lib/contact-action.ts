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

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !from || !to) {
    // Env not configured — log so user can verify the action flow.
    console.info('[contact] Resend env vars missing. Submission logged only:')
    console.info(body)
    return { ok: true }
  }

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
      return { ok: false, error: 'Không gửi được email. Vui lòng thử lại.' }
    }
    return { ok: true }
  } catch (err) {
    console.error('[contact] unexpected:', err)
    return { ok: false, error: 'Có lỗi xảy ra. Vui lòng thử lại.' }
  }
}
