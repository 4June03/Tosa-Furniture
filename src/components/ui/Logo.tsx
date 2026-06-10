type LogoProps = {
  className?: string;
  alt?: string;
};

// Logo là ảnh vuông nền nâu + chữ trắng (đặt tại public/images/logo.png).
// Vì có sẵn nền nâu nên dùng được trên cả nền sáng (Nav) lẫn nền tối (Footer).
// Dùng <img> thường vì file do người dùng cung cấp (kích thước chưa biết trước).
export function Logo({
  className = "h-12 w-auto rounded-xl md:h-14",
  alt = "Tosa Interior",
}: LogoProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/logo.png" alt={alt} className={className} />;
}
