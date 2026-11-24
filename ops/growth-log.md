# Growth log — weekly free promotion work (Chief of Staff "growth" task)

Everything done each week, so nothing repeats. Newest week first.

## One-time pages checklist
- [x] (a) Myth vs Fact: Living Kidney Donation — /living-kidney-donation-myths-facts (2026-11-17). Linked from FAQ (top + new Q), footer, /help-william, William blog post.
- [x] (b) Add missing questions to FAQ (1 added 2026-11-17; 7 added 2026-11-24: who pays, can I change my mind, surgery/recovery (→ transplant center + blog), what is the Save One Alert, not a match → Ready to Help, bone marrow & liver, posting a story for someone else)
- [x] (c) "Join the Save One Alert" sign-up: every blog post + Myth vs Fact (How You Can Help box, 2026-11-17); homepage (own band after "Five ways to help"), every patient story page (urgent-requests/[slug]) and /help-william (2026-11-24, component src/components/ui/SaveOneAlertSignup.tsx).
- [ ] (d) NEXT WEEK: "How to share someone's story" page with copy-ready posts
- [ ] (e) Spanish versions (homepage key message, Become a Donor, William's story)

## Blog rotation (one post per week)
| Date | Post | Topic type | Photo |
|---|---|---|---|
| 2026-11-24 | /blog/how-living-kidney-donation-works | How living donation works (donor steps: first call → evaluation → surgery → recovery → follow-up; Thanksgiving angle) | /images/miracles-happen.jpg |
| 2026-11-23 | /blog/how-to-find-a-living-kidney-donor (added by another task) | Patient guide | /images/miracles-light.jpg |
| 2026-11-17 | /blog/william-fritts-3-year-old-needs-a-living-kidney-donor | Patient story (William) | william-banner.jpg (Supabase site-assets) |

Next up: "You don't have to be a match (paired exchange)" → a success story (Bonnie/PIX11 kidney swap, 8 lives) → Lauren's media journey → Health Hacks → William again.

How blog posts are stored: the `blog_posts` Supabase table was empty and this task has no DB access, so posts live in code in `src/lib/blogPosts.ts` (merged with any admin posts on /blog). Add a new object at the top of `STATIC_BLOG_POSTS`. William posts use `show_donate: false` (Lauren: never use William to ask for money).

## SEO (titles/descriptions improved)
- 2026-11-24: /about, /contact, /donate, /partners, /shop (title "Gifts That Give: Shop to Support Our Mission", mission-first), /faq description; canonical URLs on those 5; every patient page now gets a living-donor description + canonical. Sitemap picks up the new post automatically (verified live). Internal links: new post ↔ Myth vs Fact, /become-a-donor, FAQ, Nov 23 guide, /help-william, Karen's page, Bonnie success story.
- 2026-11-17: home (fixed doubled "Save One Person" in title), /faq, /success-stories, /media, /health-hacks, /urgent-requests, /blog, /help-william (doubled title fixed). Sitemap: +/living-kidney-donation-myths-facts, +blog posts in code. Internal links: help-william ↔ blog post ↔ myths page ↔ FAQ ↔ success stories.
- Still to do: /about, /contact, /donate, /partners, /shop, /become-a-donor (ok), /media-alerts (ok), patient pages' descriptions.

## Checkups
- 2026-11-24: 24 main pages 200 (incl. sign-up pages: become-a-donor, contact, media-alerts, ready-to-help, urgent-requests/submit, donate). Crawled 162 internal links + 171 images on 15 main pages: 0 broken. Forms not submitted (rule); only change to the form code is a unique hidden-field id (fixes duplicate ids when two sign-up boxes are on one page).
  - FOUND + FIXED: William's patient page (urgent-requests/help-william-find-a-living-kidney-donor) ended with "Help William Today ... make a donation / Donate Now" (breaks Lauren's rule: never a money ask with William). Now "Become a Living Donor" → /become-a-donor; verified live no donate links in the page body.
  - Local npm ci still fails (registry blocked in sandbox) → Vercel branch build was the build check (both passed, then prod both passed). Mobile: Chrome window can't be resized and iframes are blocked (X-Frame-Options), so mobile checked by design only (clamp() sizes, flex-wrap form, existing .container). Desktop screenshots OK (post, help box, homepage band).
- 2026-11-17: all main pages 200 (home, urgent requests, become a donor, donate, contact, newsletter/media alerts, shop, health hacks, FAQ, help-william, success stories, media, about, video, future, partners, privacy, sitemap). Crawled 154 internal links + 173 images on main pages.
  - FOUND: Vercel image optimization returns **402** for any image size not already cached (quota used up) → new images showed broken. FIX: `images.unoptimized: true` in next.config.ts.
  - FOUND: 7 patient photos point at the retired WordPress host (saveoneperson.org/wp-content/... — Cristian Butler, Justin Lepri, Sofia De La Lastra, Hailey Simms, Captain DJ Pavasaris, Tristan Allen, Cleto Rodriguez; set in src/lib/featuredRequests.ts). Images are gone. FIX: `liveImage()` hides them (card uses no-photo layout) instead of a broken image. **TODO: get new photos for these 7 (ask Lauren / families) and put them in public/images/urgent/.**
  - /blog used to redirect to /success-stories (no posts) — redirect removed now that there is a post.
  - Forms not submitted on live site (rule). Newsletter form posts to /api/subscribe (unchanged code).
  - Live check after deploy: blog post, Myth vs Fact page, /blog list load; all images on the post load (Supabase direct). Desktop looks right. Mobile: could not resize Lauren's Chrome window (it stays 1536px) and pop-ups/iframes are blocked, so mobile was checked by design only (flex-wrap buttons, clamp() sizes, existing container classes). Re-check on a phone next week.
  - Local `npm ci` failed (npm registry unreachable from the sandbox: ENOTFOUND), so the Vercel build on the branch was the build check.

## Google Ads (Save One Person Inc., 684-224-8625 — campaign "SOP Grant - Living Kidney Donors")
(see also ops/google-ads-log.md)
- 2026-11-24: SKIPPED. Account still deactivated/read-only (ops/google-ads-log.md, checked today by the daily task; Lauren's team emailed Google 3x today). Per CHIEF_OF_STAFF rule, no Ads changes until Google reactivates. When it's back: ad group "How Living Donation Works" → /blog/how-living-kidney-donation-works (keyword ideas: how does kidney donation work, living kidney donor process, kidney donor evaluation, kidney donor recovery time, donating a kidney to a stranger, what happens when you donate a kidney, living donor surgery).
- 2026-11-17: campaign "SOP Grant - Living Kidney Donors" (ID 24477469576, $329/day, Maximize conversions) → NEW ad group "Myth vs Fact - Living Donation" (ID 203680808313) → /living-kidney-donation-myths-facts. 12 phrase keywords: living donor myths, living donor facts, can you live with one kidney, living with one kidney, is living donation safe, paired kidney exchange, kidney swap program, not a match can i still donate, giving a kidney to a stranger, living donor costs, who pays for living donor surgery, how does living donation work (3 marked "low search volume"). 2 RSAs (13 + 15 headlines, 4 descriptions each), both Eligible, Google said "no policy issues". No budget/billing/settings changes.
  - NOTE: this campaign shows "Eligible (Limited) – conversion tracking setup is incomplete" and 0 impressions this month: with Maximize conversions and no working conversions it may not spend. Consider switching it to Maximize clicks (needs Lauren's OK / a separate ads task).
- Next week: ad group for next week's blog post (don't repeat Myth vs Fact).

- 2026-11-17 late: another session added a site-wide DonateCallout to blog posts; hid it on posts with `show_donate: false` (William) so William's post never asks for money.

## Grants
- 2026-11-24: +7 funders (#16-22) in grants-list.md, 12 more ruled out. Draft ready: ops/grants/peacock-foundation.md (Peacock Foundation, Coral Gables; Miami-Dade health; no deadline, mailed letter; ~$25K median per 990 data). Reminder: Awesome Foundation NYC ($1,000), Pollination Project, Walmart Spark Good all close Nov 30.
- 2026-11-17: first research pass → ops/grants/grants-list.md (12 funders + 13 ruled out). Drafts ready: ops/grants/sanofi-us-healthcare-contributions.md (rolling; needs financial statements), ops/grants/awesome-foundation-nyc.md ($1,000, due Nov 30; proposes a Myth vs Fact video/print project Lauren must OK).
