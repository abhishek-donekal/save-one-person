# Growth log — weekly free promotion work (Chief of Staff "growth" task)

Everything done each week, so nothing repeats. Newest week first.

## One-time pages checklist
- [x] (a) Myth vs Fact: Living Kidney Donation — /living-kidney-donation-myths-facts (2026-11-17). Linked from FAQ (top + new Q), footer, /help-william, William blog post.
- [ ] (b) Add missing questions to FAQ (1 added 2026-11-17: "Do I have to be a family member or a perfect match?"; still to do: who pays / costs, can I change my mind, recovery questions → point to transplant center, how Save One Alert works, bone marrow vs kidney, how to post a story for someone else)
- [~] (c) "Join the Save One Alert" sign-up: now on every blog post + Myth vs Fact page (inside the How You Can Help box). Still to do: homepage + every patient story page (urgent-requests/[slug]).
- [ ] (d) "How to share someone's story" page with copy-ready posts
- [ ] (e) Spanish versions (homepage key message, Become a Donor, William's story)

## Blog rotation (one post per week)
| Date | Post | Topic type | Photo |
|---|---|---|---|
| 2026-11-17 | /blog/william-fritts-3-year-old-needs-a-living-kidney-donor | Patient story (William) | william-banner.jpg (Supabase site-assets) |

Next up: "How living donation works" → "You don't have to be a match (paired exchange)" → a success story (Bonnie/PIX11 kidney swap, 8 lives) → Lauren's media journey → Health Hacks → William again.

How blog posts are stored: the `blog_posts` Supabase table was empty and this task has no DB access, so posts live in code in `src/lib/blogPosts.ts` (merged with any admin posts on /blog). Add a new object at the top of `STATIC_BLOG_POSTS`. William posts use `show_donate: false` (Lauren: never use William to ask for money).

## SEO (titles/descriptions improved)
- 2026-11-17: home (fixed doubled "Save One Person" in title), /faq, /success-stories, /media, /health-hacks, /urgent-requests, /blog, /help-william (doubled title fixed). Sitemap: +/living-kidney-donation-myths-facts, +blog posts in code. Internal links: help-william ↔ blog post ↔ myths page ↔ FAQ ↔ success stories.
- Still to do: /about, /contact, /donate, /partners, /shop, /become-a-donor (ok), /media-alerts (ok), patient pages' descriptions.

## Checkups
- 2026-11-17: all main pages 200 (home, urgent requests, become a donor, donate, contact, newsletter/media alerts, shop, health hacks, FAQ, help-william, success stories, media, about, video, future, partners, privacy, sitemap). Crawled 154 internal links + 173 images on main pages.
  - FOUND: Vercel image optimization returns **402** for any image size not already cached (quota used up) → new images showed broken. FIX: `images.unoptimized: true` in next.config.ts.
  - FOUND: 7 patient photos point at the retired WordPress host (saveoneperson.org/wp-content/... — Cristian Butler, Justin Lepri, Sofia De La Lastra, Hailey Simms, Captain DJ Pavasaris, Tristan Allen, Cleto Rodriguez; set in src/lib/featuredRequests.ts). Images are gone. FIX: `liveImage()` hides them (card uses no-photo layout) instead of a broken image. **TODO: get new photos for these 7 (ask Lauren / families) and put them in public/images/urgent/.**
  - /blog used to redirect to /success-stories (no posts) — redirect removed now that there is a post.
  - Forms not submitted on live site (rule). Newsletter form posts to /api/subscribe (unchanged code).
  - Live check after deploy: blog post, Myth vs Fact page, /blog list load; all images on the post load (Supabase direct). Desktop looks right. Mobile: could not resize Lauren's Chrome window (it stays 1536px) and pop-ups/iframes are blocked, so mobile was checked by design only (flex-wrap buttons, clamp() sizes, existing container classes). Re-check on a phone next week.
  - Local `npm ci` failed (npm registry unreachable from the sandbox: ENOTFOUND), so the Vercel build on the branch was the build check.

## Google Ads (Save One Person Inc., 684-224-8625 — campaign "SOP Grant - Living Kidney Donors")
(see also ops/google-ads-log.md)
- 2026-11-17: campaign "SOP Grant - Living Kidney Donors" (ID 24477469576, $329/day, Maximize conversions) → NEW ad group "Myth vs Fact - Living Donation" (ID 203680808313) → /living-kidney-donation-myths-facts. 12 phrase keywords: living donor myths, living donor facts, can you live with one kidney, living with one kidney, is living donation safe, paired kidney exchange, kidney swap program, not a match can i still donate, giving a kidney to a stranger, living donor costs, who pays for living donor surgery, how does living donation work (3 marked "low search volume"). 2 RSAs (13 + 15 headlines, 4 descriptions each), both Eligible, Google said "no policy issues". No budget/billing/settings changes.
  - NOTE: this campaign shows "Eligible (Limited) – conversion tracking setup is incomplete" and 0 impressions this month: with Maximize conversions and no working conversions it may not spend. Consider switching it to Maximize clicks (needs Lauren's OK / a separate ads task).
- Next week: ad group for next week's blog post (don't repeat Myth vs Fact).

- 2026-11-17 late: another session added a site-wide DonateCallout to blog posts; hid it on posts with `show_donate: false` (William) so William's post never asks for money.

## Grants
- 2026-11-17: first research pass → ops/grants/grants-list.md (12 funders + 13 ruled out). Drafts ready: ops/grants/sanofi-us-healthcare-contributions.md (rolling; needs financial statements), ops/grants/awesome-foundation-nyc.md ($1,000, due Nov 30; proposes a Myth vs Fact video/print project Lauren must OK).
