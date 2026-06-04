import { Container } from '../ui/Container'

const STEPS = [
  {
    title: 'Khảo sát & lên ý tưởng',
    body:
      'Gặp gỡ, đo đạc công trình, lắng nghe nhu cầu sống và phong cách của gia chủ.',
  },
  {
    title: 'Thiết kế chi tiết',
    body:
      'Phối cảnh 3D, bản vẽ kỹ thuật, dự toán vật tư minh bạch, chốt trước khi thi công.',
  },
  {
    title: 'Thi công tại xưởng & công trường',
    body:
      'Sản xuất nội thất tại xưởng riêng, đồng bộ thi công tại công trình theo tiến độ.',
  },
  {
    title: 'Bàn giao & bảo hành',
    body:
      'Nghiệm thu cùng gia chủ, hướng dẫn sử dụng, bảo hành dài hạn theo từng hạng mục.',
  },
]

export function Process() {
  return (
    <section className="border-t border-line bg-cream py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            Một quy trình, bốn nhịp rõ ràng
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
            Tosa Home kiểm soát công trình theo bốn bước. Mỗi bước có nghiệm thu
            cùng gia chủ trước khi chuyển sang bước tiếp theo.
          </p>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-10 md:mt-20 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="font-display text-5xl font-bold leading-none text-tan md:text-6xl">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-5 h-px w-12 bg-ink" aria-hidden />
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink md:text-xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
