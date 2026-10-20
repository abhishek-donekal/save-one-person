# Save One Person — Project Status

_Last updated: 2026-06-21_

## Overview

Rebuild of the Save One Person nonprofit website from a static single-page clone into a full **Next.js 16 + Supabase CMS** application. The client (non-technical) can manage all content through an admin dashboard without writing code.

---

## Architecture

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16 (App Router, TypeScript, Tailwind) |
| Backend / DB | Supabase (Postgres + Auth + Storage) |
| Hosting | Vercel |
| Shop | Shopify (external link) |

### Key references

- **Supabase project:** `kglvtgohmfulykkspfmj` → https://kglvtgohmfulykkspfmj.supabase.co
- **Vercel project:** `save-one-person` (team `abhsiheks-projects-351d4109`); serves saveonepersonnow.org + www
- **Live URL:** https://www.saveonepersonnow.org
- **Also builds from this repo:** `save-one-person-nextjs` (does not serve saveonepersonnow.org; candidate to disconnect)
- **Admin login:** /admin/login (email: adonekal@gmail.com)
- **GitHub:** abhishek-donekal/save-one-person (master)

---

## DONE

### Infrastructure
- [x] Next.js 16 project scaffolded (App Router, TS, Tailwind, src dir)
- [x] Supabase client/server/admin helpers + middleware (admin route protection)
- [x] Env vars set locally (`.env.local`) and on Vercel production
- [x] Build passing (27 pages compile clean)
- [x] Deployed to Vercel

### Database (schema run in Supabase)
- [x] `success_stories`
- [x] `urgent_requests`
- [x] `blog_posts`
- [x] `media_entries`
- [x] `partners`
- [x] `events`
- [x] RLS policies (public read published / admin full access)
- [x] `updated_at` triggers
- [x] Admin user created in Supabase Auth

### Public pages
- [x] Home (design ported from old site, dynamic stats from DB)
- [x] About
- [x] Success Stories (list + `[slug]` detail)
- [x] Urgent Requests (list + `[slug]` detail, fundraising progress)
- [x] Media (grouped by type)
- [x] Blog (list + `[slug]` detail)
- [x] Partners
- [x] Contact (form → Save1Person@aol.com)
- [x] Donate (Shopify link)

### Admin CMS (`/admin/*`)
- [x] Login (Supabase Auth)
- [x] Dashboard (summary cards)
- [x] Stories — list / new / edit / delete / toggle published+featured
- [x] Urgent Requests — list / new / edit / close
- [x] Blog — list / new / edit / publish
- [x] Media — add/manage entries
- [x] Partners — add/manage

### API routes
- [x] /api/stories, /api/urgent-requests, /api/blog, /api/media, /api/partners (GET public, POST authenticated)

---

## PENDING

| # | Task | Notes |
|---|------|-------|
| 1 | ~~**Move domain**~~ | Done: `saveonepersonnow.org` + `www` are on the `save-one-person` Vercel project (confirmed 2026-10-20). |
| 2 | **Content migration** | DB tables empty. Migrate real content from saveoneperson.org: 57+ patient/urgent posts, 9 named success stories (Hershey Fellig, Torrey Greene, Stuart Zimmer…), media archive (10+ press). |
| 3 | **Supabase Storage** | Set up storage bucket so admin can upload images/videos (currently URL-only fields). |
| 4 | **Confirm Shopify URL** | `https://save-one-person.myshopify.com/2` had a likely typo — confirm correct collection/product URL. |
| 5 | **SEO migration** | sitemap.ts, 301 redirects from old URLs, OG tags, schema markup, canonical URLs. |
| 6 | **End-to-end test** | On live site: admin login → create story → verify it appears on public page. |
| 7 | **Real stats** | Homepage Impact numbers still placeholder until content seeded. |

---

## Notes / Gotchas

- Vercel org `abhsiheks-projects-351d4109` is on **Hobby (free)** plan → Deployment Protection "Require Log In" must stay **OFF** or it 404/blocks public access.
- Next.js 16 uses async `cookies()` and `proxy` (middleware deprecated warning is non-fatal).
- Server components cannot use `onMouseEnter`/`onMouseLeave` — use CSS hover classes (`.hover-lift`, `.hover-border-emerald`, `.hover-bg-secondary` in globals.css).
