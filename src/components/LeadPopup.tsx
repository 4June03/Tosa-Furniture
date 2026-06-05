'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, WarningCircle, PaperPlaneTilt, X } from '@phosphor-icons/react'
import { contactSchema, SERVICE_OPTIONS, type ContactInput } from '@/lib/contact-schema'
import { submitContact } from '@/lib/contact-action'

const STORAGE_KEY = 'tosa-lead-popup-seen'
const DELAY_MS = 10_000
const POPUP_IMAGE = 'https://picsum.photos/seed/tosa-home-popup/900/1200'
const POPUP_IMAGE_ALT = 'Không gian nội thất Tosa Home'

const leadSchema = contactSchema.pick({ name: true, phone: true, service: true })
type LeadInput = Pick<ContactInput, 'name' | 'phone' | 'service'>

const fieldBase =
  'mt-2 block w-full border border-line bg-paper px-4 py-3 text-base text-ink ' +
  'placeholder:text-ink-muted/70 transition-colors ' +
  'focus:border-ink focus:outline-none focus:ring-2 focus:ring-tan/40'
const labelBase = 'block text-sm font-medium text-ink'
const errorBase = 'mt-1.5 text-xs text-red-700'

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; message: string }

export function LeadPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: 'onTouched',
    defaultValues: { name: '', phone: '', service: '' } as LeadInput,
  })

  // Schedule the popup 10s after the first visit (skip Studio).
  useEffect(() => {
    if (pathname?.startsWith('/studio')) return
    if (typeof window === 'undefined') return
    if (window.localStorage.getItem(STORAGE_KEY)) return

    const timer = window.setTimeout(() => setOpen(true), DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [pathname])

  // Trigger the enter transition + lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => setVisible(true))
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  function markSeen() {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore storage failures (private mode etc.)
    }
  }

  function close() {
    markSeen()
    setVisible(false)
    window.setTimeout(() => setOpen(false), 250)
  }

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus({ state: 'submitting' })
    const result = await submitContact(values)
    if (result.ok) {
      markSeen()
      setStatus({ state: 'success' })
      return
    }
    if (result.fieldErrors) {
      for (const [field, messages] of Object.entries(result.fieldErrors)) {
        const msg = messages?.[0]
        if (msg && field in values) {
          form.setError(field as keyof LeadInput, { message: msg })
        }
      }
    }
    setStatus({ state: 'error', message: result.error })
  })

  if (!open) return null

  const errors = form.formState.errors
  const submitting = status.state === 'submitting'
  const success = status.state === 'success'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Đóng"
        onClick={close}
        className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Card */}
      <div
        className={`relative flex w-full max-w-3xl overflow-hidden border border-line bg-cream shadow-2xl transition-all duration-300 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Left: invitation-style image */}
        <div className="relative hidden w-2/5 shrink-0 bg-line md:block">
          <Image
            src={POPUP_IMAGE}
            alt={POPUP_IMAGE_ALT}
            fill
            sizes="40vw"
            className="object-cover"
          />
          {/* Wedding-card inset frame */}
          <div className="pointer-events-none absolute inset-4 border border-cream/60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="font-display text-lg font-semibold leading-snug text-cream">
              Tosa Home
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/80">
              Thiết kế &amp; thi công nội thất
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div className="relative min-w-0 flex-1">
          <div className="h-1 w-full bg-tan" />

          <button
            type="button"
            onClick={close}
            aria-label="Đóng"
            className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center text-ink-muted transition-colors hover:text-ink"
          >
            <X size={20} />
          </button>

          <div className="p-6 md:p-8">
          {success ? (
            <div className="flex items-start gap-4">
              <CheckCircle size={32} weight="fill" className="shrink-0 text-tan" />
              <div>
                <h3
                  id="lead-popup-title"
                  className="font-display text-xl font-semibold text-ink"
                >
                  Cảm ơn bạn!
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Tosa Home sẽ liên hệ tư vấn trong vòng 24 giờ làm việc.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-5 inline-flex text-sm text-ink underline underline-offset-4 hover:text-tan-dark"
                >
                  Đóng
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-tan-dark">
                Nhận tư vấn miễn phí
              </p>
              <h3
                id="lead-popup-title"
                className="mt-2 font-display text-2xl font-semibold leading-snug text-ink"
              >
                Để lại thông tin, Tosa Home gọi lại cho bạn
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Tư vấn thiết kế &amp; thi công nội thất trọn gói — hoàn toàn miễn
                phí, không ràng buộc.
              </p>

              <form onSubmit={onSubmit} noValidate className="mt-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="lp-name" className={labelBase}>
                      Họ và tên <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="lp-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Nguyễn Văn A"
                      className={fieldBase}
                      {...form.register('name')}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name ? (
                      <p className={errorBase}>{errors.name.message}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="lp-phone" className={labelBase}>
                      Số điện thoại <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="lp-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="0912 345 678"
                      className={fieldBase}
                      {...form.register('phone')}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone ? (
                      <p className={errorBase}>{errors.phone.message}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="lp-service" className={labelBase}>
                      Dịch vụ quan tâm
                    </label>
                    <select
                      id="lp-service"
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
                </div>

                {status.state === 'error' ? (
                  <div className="mt-4 flex items-start gap-3 border border-red-700/30 bg-red-700/5 p-3 text-sm text-red-800">
                    <WarningCircle size={18} className="mt-0.5 shrink-0" />
                    <span>{status.message}</span>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-[transform,background-color] duration-200 active:translate-y-[1px] hover:bg-tan hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
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

                <p className="mt-3 text-center text-xs text-ink-muted">
                  Thông tin của bạn được bảo mật tuyệt đối.
                </p>
              </form>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
