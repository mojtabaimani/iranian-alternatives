# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Nuxt 4 content-driven website for showcasing Iranian alternatives to international services. Built with Vue 3, TypeScript, Nuxt UI 4, and Nuxt Content 3.

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

- `content/0.index.yml` - Homepage (hero, features, testimonials, CTA)
- `content/1.docs/` - Documentation pages in Markdown
- `content/2.pricing.yml` - Pricing plans and FAQ
- `content/3.blog.yml` + `content/3.blog/` - Blog config and Markdown posts
- `content/4.changelog.yml` + `content/4.changelog/` - Changelog versions

Content schemas are defined with Zod in `content.config.ts`.

### App Directory

- `app/app.vue` - Root component, sets up Head/SEO, navigation, search
- `app/app.config.ts` - UI theme (primary: blue, neutral: slate)
- `app/layouts/` - Layouts: default, docs, auth
- `app/pages/` - Route pages (index, pricing, blog, docs, changelog, login, signup)
- `app/components/` - Shared UI components
- `app/components/content/` - Components available inside Markdown content
- `app/assets/css/main.css` - Tailwind CSS with custom color theme

### Key Patterns

- UI components come from `@nuxt/ui` (UApp, UHeader, UPage, UPageHero, etc.)
- Docs navigation is auto-generated from the docs content collection
- Route redirect: `/docs` redirects to `/docs/getting-started`
- OG images are auto-generated via `nuxt-og-image`
- Search uses Fuse.js integration from Nuxt UI

## Code Style

- 2-space indentation, LF line endings, UTF-8
- ESLint with Nuxt config: no trailing commas (`commaDangle: 'never'`), 1TBS brace style
- TypeScript strict mode throughout
- Custom types in `app/types/index.d.ts`

## Environment

- `.env.example` contains `NUXT_PUBLIC_SITE_URL` (used for OG image generation)
- Package manager: pnpm 10 with workspace support
