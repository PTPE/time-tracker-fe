# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**fe-time-tracker** is a Next.js 16 time tracking application built with React 19, TypeScript, and Tailwind CSS. The app helps users track time across projects with a timer, project management, history, and settings pages.

## Stack

- **Framework**: Next.js 16.0.1 (app router with turbopack)
- **Language**: TypeScript (strict mode)
- **UI**: React 19.2.0, Tailwind CSS 4
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: @tanstack/react-query (React Query)
- **HTTP**: Axios
- **Styling**: Tailwind CSS with Prettier plugin for class sorting
- **SVGs**: @svgr/webpack (SVG files loaded as React components)
- **Theme**: next-themes for theme switching support
- **Linting**: ESLint 9 with Next.js + TypeScript configs

## Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## Architecture

### App Router Structure

```
app/
├── layout.tsx              # Root layout (metadata, fonts, globals)
├── login/
│   └── page.tsx           # Login page (public)
├── (protected-route)/      # Route group for authenticated pages
│   ├── layout.tsx         # Adds Navigator component
│   ├── timer/page.tsx     # Timer feature
│   ├── projects/page.tsx  # Project management
│   ├── history/page.tsx   # Time history
│   └── settings/page.tsx  # Settings
└── globals.css            # Tailwind directives

components/
├── Navigator/             # Main navigation component
│   ├── index.ts          # Barrel export
│   └── Navigator.tsx     # Navigation with active route styling

assets/                    # SVG icons (imported as components)
```

### Authentication & Routing

**middleware** (proxy.ts):
- Uses Next.js middleware to protect routes
- Checks for `access_token` or `refresh_token` cookies
- Public paths: `/login`
- Root path (`/`) redirects to `/timer` (authenticated) or `/login`
- Protected routes require valid tokens

**Protected Routes**:
- All routes under `(protected-route)/` are protected by middleware
- When protected routes accessed without auth, redirected to `/login`
- Authenticated users accessing `/login` are redirected to `/timer`

### Key Architectural Patterns

- **Client Components**: Navigator and form-based components use `"use client"` directive
- **SVG Handling**: SVGs in `assets/` are imported as React components via @svgr/webpack
- **Path Aliases**: `@/*` maps to root directory (e.g., `@/components`, `@/assets`)
- **Tailwind Colors**: Uses custom color tokens (e.g., `bg-surface`, `bg-teal`, `text-text-primary`)

## Code Style

- **Formatting**: Prettier with Tailwind plugin (auto-sorts utility classes)
- **Linting**: ESLint extends Next.js core-web-vitals and TypeScript configs
- **Imports**: Use path alias `@/` for all local imports
- **TypeScript**: Strict mode enabled; use proper types for all components and functions

## Common Tasks

### Adding a New Page

1. Create file under `app/(protected-route)/[feature]/page.tsx`
2. File is automatically a route; no routing config needed
3. Use layout.tsx in parent to add shared UI (e.g., Navigator)

### Adding a Component

1. Create in `components/[ComponentName]/ComponentName.tsx`
2. Export from `index.ts` in same directory (barrel export)
3. Import: `import ComponentName from "@/components/ComponentName"`

### Adding Styling

- Use Tailwind CSS utility classes only
- Custom colors defined in Tailwind config (colors like `teal`, `surface`, `text-primary`)
- Prettier will auto-sort classes when running `npm run format`

### Form Handling

- Use React Hook Form + Zod for validation
- Create schema with Zod
- Use `useForm` hook with `zodResolver` for validation
- Examples in Navigator show controlled link styling based on pathname

## Important Notes

- Next.js 16 has breaking changes; refer to docs in `node_modules/next/dist/docs/` before using new APIs
- Turbopack is configured for SVG handling
- Middleware (proxy.ts) handles all route protection—don't add route-level auth checks
- All color values are tokenized through Tailwind config, not hardcoded
- SVG icons use @svgr/webpack; import directly as components
