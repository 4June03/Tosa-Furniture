# Gửi form liên hệ về Google Sheet

Form liên hệ (popup + trang `/lien-he`) gửi dữ liệu lên một **Google Apps Script Web App**,
script này ghi mỗi lead thành 1 dòng trong Google Sheet. Không cần API key Google,
không cần service account.

## Bước 1 — Tạo Google Sheet

1. Tạo một Google Sheet mới (ví dụ tên **Tosa Home — Leads**).
2. Để trống, không cần tự tạo tiêu đề cột (script sẽ tự tạo ở lần ghi đầu).

## Bước 2 — Thêm Apps Script

1. Trong Sheet đó: menu **Extensions → Apps Script**.
2. Xóa code mẫu, dán đoạn dưới đây vào, rồi **Save**:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(e.postData.contents);

    // Tạo dòng tiêu đề nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời gian', 'Họ tên', 'Điện thoại', 'Email',
        'Dịch vụ', 'Loại công trình', 'Diện tích (m²)', 'Ghi chú',
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.service || '',
      data.projectType || '',
      data.area || '',
      data.message || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## Bước 3 — Deploy thành Web App

1. Góc phải trên: **Deploy → New deployment**.
2. Bấm bánh răng → chọn **Web app**.
3. Cấu hình:
   - **Execute as**: *Me* (chính bạn)
   - **Who has access**: *Anyone* ← bắt buộc, để server gọi được
4. Bấm **Deploy**, cấp quyền (chọn tài khoản → Advanced → Allow).
5. Copy **Web app URL** (dạng `https://script.google.com/macros/s/XXXX/exec`).

## Bước 4 — Khai báo URL cho website

Dán URL vừa copy vào `.env.local`:

```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
```

Trên production (Vercel...) thêm biến `GOOGLE_SHEET_WEBHOOK_URL` y hệt trong phần
Environment Variables, rồi redeploy.

## Lưu ý

- Mỗi khi **sửa code** Apps Script, phải **Deploy → Manage deployments → Edit (bút chì)
  → Version: New version → Deploy** thì thay đổi mới có hiệu lực (URL giữ nguyên).
- Nếu chưa đặt `GOOGLE_SHEET_WEBHOOK_URL`, form vẫn báo thành công nhưng dữ liệu chỉ
  được ghi ra console server (chế độ chưa cấu hình) — xem [contact-action.ts](../src/lib/contact-action.ts).
- Có thể bật song song cả email (Resend) lẫn Google Sheet; chỉ cần một kênh nhận được
  là form coi như gửi thành công.
