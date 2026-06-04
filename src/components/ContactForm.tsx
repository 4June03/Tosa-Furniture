'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, WarningCircle, PaperPlaneTilt } from '@phosphor-icons/react'
import {
  contactSchema,
  PROJECT_TYPE_OPTIONS,
  SERVICE_OPTIONS,
  type ContactInput,
} from '@/lib/contact-schema'
import { submitContact } from '@/lib/contact-action'

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; message: string }

const fieldBase =
  'mt-2 block w-full border border-line bg-paper px-4 py-3 text-base text-ink ' +
  'placeholder:text-ink-muted/70 transition-colors ' +
  'focus:border-ink focus:outline-none focus:ring-2 focus:ring-tan/40'

const labelBase = 'block text-sm font-medium text-ink'
const errorBase = 'mt-1.5 text-xs text-red-700'

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: '',
      projectType: '',
      area: '',
      message: '',
    } as ContactInput,
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus({ state: 'submitting' })
    const result = await submitContact(values)
    if (result.ok) {
      setStatus({ state: 'success' })
      form.reset()
      return
    }
    if (result.fieldErrors) {
      for (const [field, messages] of Object.entries(result.fieldErrors)) {
        const msg = messages?.[0]
        if (msg) form.setError(field as keyof ContactInput, { message: msg })
      }
    }
    setStatus({ state: 'error', message: result.error })
  })

  if (status.state === 'success') {
    return (
      <div className="border border-line bg-paper p-8 md:p-10">
        <div className="flex items-start gap-4">
          <CheckCircle size={32} weight="fill" className="shrink-0 text-tan" />
          <div>
            <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
              Đã nhận yêu cầu của bạn
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft md:text-base">
              Tosa Home sẽ liên hệ lại trong vòng 24 giờ làm việc. Nếu cần trao
              đổi gấp, bạn có thể gọi trực tiếp hotline.
            </p>
            <button
              onClick={() => setStatus({ state: 'idle' })}
              className="mt-5 inline-flex text-sm text-ink underline underline-offset-4 hover:text-tan-dark"
            >
              Gửi yêu cầu khác
            </button>
          </div>
        </div>
      </div>
    )
  }

  const errors = form.formState.errors
  const submitting = status.state === 'submitting'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border border-line bg-paper p-6 md:p-10"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <div>
          <label htmlFor="name" className={labelBase}>
            Họ và tên <span className="text-red-700">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            className={fieldBase}
            {...form.register('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-err' : undefined}
          />
          {errors.name ? (
            <p id="name-err" className={errorBase}>
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className={labelBase}>
            Số điện thoại <span className="text-red-700">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="0912 345 678"
            className={fieldBase}
            {...form.register('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-err' : undefined}
          />
          {errors.phone ? (
            <p id="phone-err" className={errorBase}>
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email" className={labelBase}>
            Email{' '}
            <span className="font-normal text-ink-muted">(không bắt buộc)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="email@example.com"
            className={fieldBase}
            {...form.register('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-err' : undefined}
          />
          {errors.email ? (
            <p id="email-err" className={errorBase}>
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="service" className={labelBase}>
            Dịch vụ quan tâm
          </label>
          <select
            id="service"
            className={fieldBase}
            defaultValue=""
            {...form.register('service')}
          >
            <option value="">— Chọn dịch vụ —</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="projectType" className={labelBase}>
            Loại công trình
          </label>
          <select
            id="projectType"
            className={fieldBase}
            defaultValue=""
            {...form.register('projectType')}
          >
            <option value="">— Chọn loại —</option>
            {PROJECT_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="area" className={labelBase}>
            Diện tích (m²)
          </label>
          <input
            id="area"
            type="number"
            inputMode="numeric"
            min={1}
            placeholder="Ví dụ: 120"
            className={fieldBase}
            {...form.register('area')}
            aria-invalid={!!errors.area}
            aria-describedby={errors.area ? 'area-err' : undefined}
          />
          {errors.area ? (
            <p id="area-err" className={errorBase}>
              {errors.area.message}
            </p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className={labelBase}>
            Mô tả công trình / ghi chú
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Khu vực, ngân sách dự kiến, phong cách bạn thích..."
            className={fieldBase}
            {...form.register('message')}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-err' : undefined}
          />
          {errors.message ? (
            <p id="message-err" className={errorBase}>
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      {status.state === 'error' ? (
        <div className="mt-6 flex items-start gap-3 border border-red-700/30 bg-red-700/5 p-4 text-sm text-red-800">
          <WarningCircle size={20} className="mt-0.5 shrink-0" />
          <span>{status.message}</span>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-ink-muted">
          Bằng việc gửi yêu cầu, bạn đồng ý để Tosa Home liên hệ tư vấn.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-[transform,background-color] duration-200 active:translate-y-[1px] hover:bg-tan hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            'Đang gửi…'
          ) : (
            <>
              Gửi yêu cầu
              <PaperPlaneTilt size={16} weight="fill" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
