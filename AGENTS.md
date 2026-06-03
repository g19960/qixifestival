# AGENTS.md

## Project Overview

Qixi Festival greeting card — a single-page Next.js app with animated effects, i18n (EN/ZH), and a settings panel for customization.

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** with `@tailwindcss/postcss` plugin (NOT v3 — no `tailwind.config.js`)
- **shadcn/ui** (new-york style, RSC=true) — components in `components/ui/`, config in `components.json`
- **pnpm** as package manager
- **Geist** font, **Lucide** icons, **Vercel Analytics**

## Commands

| Action | Command |
|--------|---------|
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Production start | `pnpm start` |

There is no dedicated `typecheck`, `test`, or `format` script.

## Build Quirks

`next.config.mjs` disables ESLint and TypeScript checking during builds (`ignoreDuringBuilds: true`, `ignoreBuildErrors: true`). Always run `pnpm lint` manually to catch issues. For type checking, run `npx tsc --noEmit` directly.

## Path Aliases

`@/*` maps to project root (e.g., `@/components/ui/button`).

## Architecture

- Single route: `app/page.tsx` — contains all page logic, state, and rendering
- `app/layout.tsx` — root layout with Geist fonts and Vercel Analytics
- `app/globals.css` — Tailwind v4 imports, CSS variables (oklch color space), custom animations (twinkle, fall, float), and envelope styling
- `components/ui/` — 50 shadcn/ui components (managed by shadcn CLI, do not edit manually)
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `hooks/` — `use-mobile.ts`, `use-toast.ts`

## CSS / Tailwind v4 Notes

- Uses `@import "tailwindcss"` and `@import "tw-animate-css"` (not `@tailwind` directives)
- Color tokens use oklch: `--primary: oklch(0.55 0.15 200)` etc.
- Custom keyframe animations (`.star`, `.petal`, `.floating-text`) are defined in `globals.css`, not in Tailwind config
- Envelope card styling uses custom CSS classes: `.envelope-body`, `.envelope-flap`, `.envelope-seal`

## shadcn/ui Convention

When adding new shadcn/ui components, use the CLI:
```
pnpm dlx shadcn@latest add <component>
```
Components land in `components/ui/`. Do not hand-edit generated UI components — they are managed by the CLI.

## Key Features

- EN/ZH language toggle (translations object in `app/page.tsx`)
- Animated starry sky and falling heart petals (CSS animations)
- Custom background image upload with mosaic filter toggle
- Settings panel as a right-side drawer overlay
