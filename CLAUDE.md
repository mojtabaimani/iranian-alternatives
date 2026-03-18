# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Nuxt 4 content-driven website for showcasing Iranian alternatives to international digital services. Built with Vue 3, TypeScript, Nuxt UI 4, and Nuxt Content 3.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript type checking
```

CI runs `lint` and `typecheck` on every push (Node 22, Ubuntu).

## Architecture

### Content-Driven Structure

The site is primarily content-driven using Nuxt Content with YAML config files and Markdown for pages:

- `content/0.index.yml` - Homepage (hero, sections, categories grid, CTA)
- `content/1.docs/` - Documentation pages in Markdown
- `content/5.categories/*.yml` - 52 category YAML files, each with services array

Content schemas are defined with Zod in `content.config.ts`. Three collections: `index` (page), `docs` (page), `categories` (data).

### App Directory

- `app/app.vue` - Root component, sets up Head/SEO, navigation, search
- `app/app.config.ts` - UI theme (primary: green, neutral: slate)
- `app/layouts/` - Layouts: default, docs
- `app/pages/` - Route pages (index, categories, docs)
- `app/components/` - AppHeader, AppFooter
- `app/assets/css/main.css` - Tailwind CSS with custom color theme

### Key Patterns

- UI components come from `@nuxt/ui` (UApp, UHeader, UPage, UPageHero, etc.)
- Docs navigation is auto-generated from the docs content collection
- Categories are queried via `queryCollection('categories')` (Nuxt Content v3)
- Route redirect: `/docs` redirects to `/docs/overview`
- OG images use Iranian flag image
- Search uses Fuse.js integration from Nuxt UI

## Code Style

- 2-space indentation, LF line endings, UTF-8
- ESLint with Nuxt config: no trailing commas (`commaDangle: 'never'`), 1TBS brace style
- TypeScript strict mode throughout

## Environment

- `.env.example` contains `NUXT_PUBLIC_SITE_URL` (used for OG image generation)
- Package manager: pnpm 10 with workspace support
