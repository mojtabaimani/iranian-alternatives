# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Nuxt 4 website showcasing Iranian alternative services to international products, organized by category. All content is file-based (YAML for categories/homepage, Markdown for blog/docs) using `@nuxt/content` v3.

## Commands

```bash
pnpm run dev          # Dev server at localhost:3000
pnpm run build        # Production build (prerendered static output in .output/public)
pnpm run generate     # Static site generation
pnpm run lint         # ESLint (stylistic: no trailing commas, 1tbs braces)
pnpm run typecheck    # Vue/TypeScript type checking (nuxt typecheck)
pnpm run preview      # Preview production build
```

Package manager: **pnpm** (v10.4.0), Node 22 (per CI). No test suite exists.

No license key is required to build. Nuxt UI **v4** includes the components formerly sold as Nuxt UI Pro (`UPage*`, `UBlog*`, `UContent*`, etc.), so the separate `@nuxt/ui-pro` package and its license are gone. The CI workflow still passes a `NUXT_UI_PRO_LICENSE` secret to the build step, but it is now vestigial and can be removed.

## Architecture

- **Framework:** Nuxt **4** (`compatibilityDate` 2026-07-07), so source lives under `app/`. UI from `@nuxt/ui` **v4**.
- **Content:** `@nuxt/content` **v3**. Collections are declared in the root `content.config.ts` (`defineContentConfig` / `defineCollection`) and queried with the v3 API: `queryCollection()`, `queryCollectionNavigation()`, `queryCollectionSearchSections()`, `queryCollectionItemSurroundings()`. Do not reintroduce the v2 API (`queryContent`, `serverQueryContent`, `fetchContentNavigation`); it has been fully removed. Nuxt Studio preview is wired via `content.preview` in `nuxt.config.ts` and the field schema in `nuxt.schema.ts`.
- **Styling:** Tailwind CSS **v4**, configured in CSS at `app/assets/css/main.css` (`@import "tailwindcss"` + `@theme`). There is no `tailwind.config.ts`. DM Sans is loaded by `@nuxt/fonts`; icons come from Lucide, Heroicons, and Simple Icons via Iconify.
- **SEO:** `@nuxtjs/seo` provides sitemap, robots, canonical / `og:url` / absolute `og:image` (seo-utils), OG image generation (nuxt-og-image), and schema.org. It is driven by the single `site` block in `nuxt.config.ts` (`url`, `name`, `description`); change the domain there and canonical, OG, sitemap, and robots all follow.
- **Rendering:** Prerendered / static. `nitro.prerender` seeds `/`, `/categories`, `/blog`, `/robots.txt`, `/sitemap.xml` and crawls links from there (`crawlLinks: true`).
- TypeScript strict mode is **off** (`typescript.strict: false` in nuxt.config.ts).

### Content collections (content.config.ts)

- `landing` (data) from `0.index.yml` (homepage)
- `docs` (page) from `1.docs/**/*.md`
- `blogLanding` (data) from `3.blog.yml`
- `blog` (page) from `3.blog/**/*.md`
- `categories` (page) from `5.categories/*.yml`

Collection schemas are the source of truth for content shapes; page components import UI prop types directly from `@nuxt/ui` (e.g. `ButtonProps`, `BadgeProps`). There is no longer a hand-written `app/types/index.d.ts`.

### Key Directories

- `app/pages/` - Route pages; category and docs detail pages are `[...slug].vue` catch-alls
- `app/components/` - Vue components (AppHeader, AppFooter)
- `app/components/OgImage/OgImageSaas.satori.vue` - Satori OG-image template, rendered via `defineOgImage('Saas', ...)`
- `app/layouts/default.vue` - Builds the combined content navigation and search sections once and `provide`s the navigation; section wrapper pages (`categories.vue`, `docs.vue`) `inject` it for the sidebar
- `app/assets/css/main.css` - Tailwind entry point and theme (font)
- `content/5.categories/` - Category YAML files, one per category (~52)
- `content/0.index.yml` - Homepage content
- `content/3.blog/` + `content/3.blog.yml` - Blog posts (Markdown with frontmatter) and blog landing config
- `content/1.docs/` - Documentation pages (Markdown)
- `public/logo/` and `public/flag/` - Service logos and country flags referenced from YAML

Numeric prefixes on content files/dirs (`0.`, `1.`, `3.`, `5.`) control navigation order and are stripped from URLs.

### Content Model

Category files (`content/5.categories/*.yml`) follow this structure:
```yaml
title: Category Name
description: Description text
icon: i-lucide-icon-name
services:
  - name: Service Name
    description: Service description
    logo: /logo/service-logo.svg
    website: https://example.com
    location: Iran
    flag: /flag/ir.svg
    tags: [tag1, tag2]
```

Adding a service = editing the category YAML and dropping the logo into `public/logo/`. Adding a category = creating a new YAML file in `content/5.categories/`; routing and sidebar navigation pick it up automatically.

Categories with an empty `services: []` are treated as "coming soon": hidden from the homepage grid, shown in `/categories` with a "Coming soon" badge, and their detail page renders an empty-state with a Contribute button. They stay linked from `/categories`, so they remain prerendered and in the sitemap. The relevant logic lives in `app/pages/index.vue`, `app/pages/categories/index.vue`, and `app/pages/categories/[...slug].vue`.

### Routing

- `/` - Homepage
- `/categories` - Category listing
- `/categories/[slug]` - Category detail with service cards
- `/blog` and `/blog/[slug]` - Blog listing and posts
- `/docs/[...slug]` - Documentation; `/docs` redirects to `/docs/overview` (routeRule)

### Patterns

- Data fetching: `queryCollection()` with `useAsyncData()` in page components; detail pages throw a fatal 404 via `createError` when content is missing and use `queryCollectionItemSurroundings()` for prev/next links.
- Navigation and search: `app/layouts/default.vue` (and `app/error.vue`) combine `queryCollectionNavigation()` and `queryCollectionSearchSections()` across the `docs`, `blog`, and `categories` collections; the search UI is `UContentSearch` (client-only). There is no `server/api/search` endpoint anymore.
- SEO: `useSeoMeta()` per page, site-wide defaults in `app/app.vue`; the `site` config plus `@nuxtjs/seo` supply canonical / `og:url` / absolute `og:image`, `sitemap.xml`, and `robots.txt`. Page OG images are generated with `defineOgImage('Saas', ...)`.
- All Nuxt composables, `@nuxt/ui` components, and `@nuxt/content` components are auto-imported.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs `lint`, `typecheck`, and `build` on push/PR to main (Node 22). The build step still sets a now-unused `NUXT_UI_PRO_LICENSE` secret (see above).
