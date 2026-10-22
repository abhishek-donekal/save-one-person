# Save One Person

Website for **Save One Person**, a nonprofit that uses media and storytelling to help patients find living organ donors and bone marrow matches.

**Live site:** https://www.saveonepersonnow.org

- Urgent requests: https://www.saveonepersonnow.org/urgent-requests
- Donate: https://www.saveonepersonnow.org/donate
- Admin (content management): https://www.saveonepersonnow.org/admin

## Stack

- Next.js (App Router, TypeScript, Tailwind)
- Supabase (database, auth, image storage)
- Vercel hosting: project `save-one-person` serves `saveonepersonnow.org` and `www.saveonepersonnow.org`
- Shop: Shopify

Page content (urgent requests, stories, blog, media, partners) lives in Supabase and is edited from `/admin`, so content changes go live without a deploy.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Supabase keys go in `.env.local`.

## Deploying

Pushes to `master` deploy to production on Vercel. The Vercel team is on the Hobby plan with a private repo, so a push is only deployed when Vercel can match the commit author to the account owner; otherwise the deployment shows as "Blocked". If that happens, deploy from your machine with `npx vercel --prod`.

See `PROJECT_STATUS.md` for current status and open tasks.
