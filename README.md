# 七夕贺卡 | Qixi Greeting Card

[中文](#中文) | [English](#english)

---

## 中文

制作一份浪漫的七夕电子贺卡，通过链接或图片分享给 TA。

### 功能

- **深度定制** — 收件人/发件人名字、祝福语、副标题、颜色主题、字体风格、头像
- **6 套颜色主题** — 星空蓝、桃花粉、月光金、极光绿、晚霞紫、樱桃红
- **3 种字体** — 衬线体、圆体、手写体（Dancing Script）
- **开信封动画** — 点击信封 → 闪烁 → 星空绽放 → 卡片浮现 → 打字效果
- **视觉效果** — 星空粒子、飘落心形花瓣，可独立开关
- **自定义背景** — 上传图片，支持模糊效果
- **URL 分享** — pako 压缩 + Base64url 编码，纯前端无后端
- **图片导出** — html-to-image 截取卡片，保存为 PNG
- **中英文** — 自动检测语言，手动切换
- **传播闭环** — 收件页底部「我也要送一份」按钮

### 技术栈

- Next.js 15（App Router）+ React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- pako（压缩）、html-to-image（截图）、Lucide（图标）

### 开发

```bash
pnpm install
pnpm dev        # 开发服务器 http://localhost:3000
pnpm build      # 生产构建
pnpm start      # 启动生产版本
```

### 项目结构

```
app/
  page.tsx          # 制作页 (/)
  c/page.tsx        # 收件页 (/c#<encoded>)
  layout.tsx        # 根布局
  globals.css       # 全局样式 + 自定义动画
components/
  envelope-card.tsx # 信封卡片组件
  share-dialog.tsx  # 分享弹窗
  starry-sky.tsx    # 星空效果
  falling-petals.tsx# 花瓣效果
  type-writer.tsx   # 打字机效果
  ui/               # shadcn/ui 组件
lib/
  codec.ts          # URL 编码/解码
  types.ts          # CardData 类型定义
  themes.ts         # 颜色主题定义
  utils.ts          # cn() 工具函数
```

### 分享机制

1. 制作页填写内容，点击「分享」
2. 复制链接或保存图片
3. 对方打开链接 → 点击信封 → 看到动画贺卡
4. 底部「我也要送一份」→ 跳回制作页

所有数据编码在 URL hash 中（`/c#<pako-deflated-base64url>`），无需后端。

---

## English

Create a romantic Qixi Festival e-card and share it via link or image.

### Features

- **Deep customization** — recipient/sender names, greeting, subtitle, color theme, font style, avatar
- **6 color themes** — Starry Blue, Peach Blossom, Moonlight Gold, Aurora Green, Sunset Purple, Cherry Red
- **3 fonts** — Serif, Rounded, Handwritten (Dancing Script)
- **Envelope animation** — tap envelope → sparkle → stars bloom → card floats in → typewriter effect
- **Visual effects** — starry sky particles, falling heart petals, independently toggleable
- **Custom background** — upload images with blur effect
- **URL sharing** — pako deflate + Base64url encoding, pure frontend, no backend
- **Image export** — html-to-image captures card as PNG
- **Bilingual** — auto-detects language, manual switch
- **Viral loop** — "I want to make one too" button on the receiver page

### Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- pako (compression), html-to-image (screenshot), Lucide (icons)

### Development

```bash
pnpm install
pnpm dev        # Dev server at http://localhost:3000
pnpm build      # Production build
pnpm start      # Start production server
```

### Project Structure

```
app/
  page.tsx          # Create page (/)
  c/page.tsx        # Receive page (/c#<encoded>)
  layout.tsx        # Root layout
  globals.css       # Global styles + custom animations
components/
  envelope-card.tsx # Envelope card component
  share-dialog.tsx  # Share dialog
  starry-sky.tsx    # Starry sky effect
  falling-petals.tsx# Falling petals effect
  type-writer.tsx   # Typewriter effect
  ui/               # shadcn/ui components
lib/
  codec.ts          # URL encode/decode
  types.ts          # CardData type definitions
  themes.ts         # Color theme definitions
  utils.ts          # cn() utility
```

### How Sharing Works

1. Fill in content on the create page, tap "Share"
2. Copy the link or save as image
3. Recipient opens the link → taps the envelope → sees the animated card
4. "I want to make one too" button → jumps back to create page

All data is encoded in the URL hash (`/c#<pako-deflated-base64url>`), no backend needed.
