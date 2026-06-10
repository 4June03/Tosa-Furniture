import Image from 'next/image'
import { Container } from '../ui/Container'

// Ảnh infographic quy trình — đặt tại public/images/process.png
const PROCESS_IMAGE = '/images/process.png'

export function Process() {
  return (
    <section className="border-t border-line bg-cream-warm py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-[0.18em] text-tan">
            Quy trình
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            Một quy trình, năm bước rõ ràng
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
            Tosa kiểm soát công trình theo từng bước, nghiệm thu cùng gia chủ
            trước khi chuyển sang bước tiếp theo.
          </p>
        </div>

        <div className="relative mx-auto mt-12 aspect-[1568/744] w-full max-w-5xl overflow-hidden md:mt-16">
          <Image
            src={PROCESS_IMAGE}
            alt="Quy trình làm việc tại Tosa gồm 5 bước: gặp gỡ và khảo sát, thiết kế 3D, báo giá và bản vẽ 2D, thi công sản xuất, nghiệm thu và bàn giao."
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-contain"
          />
        </div>
      </Container>
    </section>
  )
}
