# Ảnh cần đặt vào đây

Lưu các ảnh đã gửi với ĐÚNG tên file dưới đây (giữ nguyên tên để không phải sửa code):

| Tên file | Ảnh nào | Dùng ở đâu |
|---|---|---|
| `hero-desktop.jpg` | Ảnh phòng khách **NGANG** | Banner hero (màn hình desktop) |
| `hero-mobile.jpg` | Ảnh banner **DỌC** (có chữ Tosa) | Banner hero (điện thoại) |
| `about.jpg` | Ảnh phòng khách / showroom | Section "Về Tosa" (nền tối) |
| `process.png` | Infographic **QUY TRÌNH LÀM VIỆC** (5 bước) | Section quy trình |

## Logo

| Tên file | Mô tả |
|---|---|
| `logo.png` | (Trong thư mục này — `public/images/logo.png`) Logo vuông nền nâu + chữ trắng. Dùng chung cho **cả Nav lẫn Footer**. Code tự bo góc mềm (`rounded-xl`). |

> Đổi đuôi file (vd `.svg`/`.webp`) thì sửa `src` trong `src/components/ui/Logo.tsx`.
> Ảnh hero/about: nếu khác đuôi mặc định, sửa đường dẫn trong
> `src/components/sections/Hero.tsx` và `AboutSnippet.tsx`.
