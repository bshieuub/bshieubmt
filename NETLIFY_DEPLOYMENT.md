# Hướng dẫn triển khai lên Netlify

## 🚀 Các bước triển khai

### 1. Chuẩn bị repository
```bash
# Commit tất cả thay đổi
git add .
git commit -m "Fix Netlify deployment issues"
git push origin main
```

### 2. Cấu hình Netlify

#### Cách 1: Deploy từ GitHub
1. Đăng nhập vào [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Chọn GitHub và repository của bạn
4. Cấu hình build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

#### Cách 2: Deploy thủ công
1. Build project: `npm run build`
2. Upload thư mục `dist` lên Netlify

### 3. Cấu hình Environment Variables

Trong Netlify Dashboard:
1. Vào **Site settings** > **Environment variables**
2. Thêm các biến môi trường:

```
VITE_GEMINI_API_KEY=your_actual_gemini_api_key
```

### 4. Cấu hình Redirects

File `_redirects` đã được tạo trong `public/` để xử lý SPA routing.

### 5. Kiểm tra deployment

Sau khi deploy, kiểm tra:
- [ ] Website load được không
- [ ] Navigation hoạt động
- [ ] Blog section hiển thị
- [ ] AI features hoạt động (nếu có API key)

## 🔧 Troubleshooting

### Lỗi trang trắng
1. **Kiểm tra Console**: Mở Developer Tools > Console để xem lỗi
2. **Kiểm tra Network**: Xem có request nào fail không
3. **Kiểm tra Environment Variables**: Đảm bảo API key được cấu hình đúng

### Lỗi 404 khi refresh
- File `_redirects` đã được cấu hình để xử lý SPA routing
- Đảm bảo file này có trong thư mục `public/`

### Lỗi AI không hoạt động
- Kiểm tra API key trong Environment Variables
- Nếu không có API key, website vẫn hoạt động nhưng AI features sẽ bị disable

### Lỗi build
- Kiểm tra Node version (nên dùng 18)
- Chạy `npm install` trước khi build
- Kiểm tra log build trong Netlify dashboard

## 📁 Cấu trúc files quan trọng

```
├── public/
│   └── _redirects          # Netlify redirects cho SPA
├── netlify.toml            # Netlify configuration
├── .env.example            # Template cho environment variables
├── vite.config.ts          # Vite configuration
└── components/
    └── ErrorBoundary.tsx   # Error handling
```

## 🎯 Sau khi deploy thành công

1. **Test tất cả tính năng**:
   - Navigation menu
   - Blog section
   - Admin mode
   - AI features (nếu có API key)

2. **Cấu hình domain** (tùy chọn):
   - Vào Site settings > Domain management
   - Thêm custom domain nếu có

3. **Monitor performance**:
   - Sử dụng Netlify Analytics
   - Kiểm tra Core Web Vitals

## ⚠️ Lưu ý quan trọng

- **API Key**: Cần cấu hình `VITE_GEMINI_API_KEY` để AI features hoạt động
- **Build Command**: Phải là `npm run build`
- **Publish Directory**: Phải là `dist`
- **Node Version**: Nên dùng 18.x
- **Environment Variables**: Phải có prefix `VITE_` để Vite có thể access được

## 🆘 Nếu vẫn gặp lỗi

1. Kiểm tra build logs trong Netlify dashboard
2. Test build local: `npm run build && npm run preview`
3. Kiểm tra console errors trong browser
4. Đảm bảo tất cả dependencies được install đúng