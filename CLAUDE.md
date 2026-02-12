# CLAUDE.md

This file
provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TravelTools — a tourism booking platform built as a frontend-only SPA. Users browse travel packages and book via WhatsApp. Admins manage packages through a client-side dashboard. No backend API or database; all data persists in localStorage.

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

No test framework is configured.

## Tech Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, oklch color model, CSS variables)
- **shadcn/ui** (new-york style, 57+ Radix-based components in `components/ui/`)
- **React Hook Form + Zod** for form handling/validation
- **next-themes** for dark/light mode
- **Vercel Analytics** for page tracking

## Architecture

### Routing (App Router)

All routes live in `app/`. Pages are either Server Components (static content like `/about`, `/privacy`, `/terms`) or Client Components (interactive pages like `/packages`, `/admin`, `/contact`).

### Data Flow

There is no backend. The admin dashboard (`components/admin/`) writes packages to `localStorage` as JSON. The packages page reads from `localStorage` and listens for `storage` events to sync across tabs in real-time.

Key localStorage keys: `travelPackages`, `adminLoggedIn`, `adminWhatsappNumber`.

### Component Organization

- `components/layout/` — Header (responsive nav with mobile hamburger) and Footer
- `components/admin/` — Admin login, dashboard, package CRUD form, settings panel
- `components/packages/` — PackageCard display component
- `components/ui/` — shadcn/ui primitives (do not edit manually; managed by shadcn CLI)
- `components/theme-provider.tsx` — next-themes wrapper

### Types

`types/package.ts` defines the `Package` interface (id, title, destination, duration, price, highlights, image, isLimited).

### Styling

Tailwind v4 with CSS custom properties defined in `app/globals.css` and `styles/globals.css`. Uses oklch color space. Primary color is orange/amber. Dark mode is class-based via next-themes.

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`). Use `@/components/ui/button` style imports.

### WhatsApp Booking

Bookings go through `wa.me` links with pre-filled messages containing package details. The admin WhatsApp number is configurable via the admin settings panel.

## Build Notes

- `next.config.mjs` ignores TypeScript build errors and disables image optimization
- shadcn config is in `components.json` (RSC enabled, lucide icons)
