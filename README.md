# Save One Person

Website for **Save One Person**, a nonprofit that uses media and storytelling to help patients find living organ donors and bone marrow matches.

**Live site:** https://www.saveonepersonnow.org

- Urgent requests: https://www.saveonepersonnow.org/urgent-requests
- Donate: https://www.saveonepersonnow.org/donate
- Admin (content management): https://www.saveonepersonnow.org/admin

## About Save One Person

*Empowering people, creating miracles.*

Save One Person is a 501(c)(3) nonprofit that uses media, storytelling, and human connection to help patients find living organ donors, bone marrow matches, and other life-saving support.

Founder & CEO **Lauren Finkelstein** started it to close a gap she saw firsthand: there are people who would step forward to save a life if they only knew someone needed them. Her conviction is simple: media is the most powerful tool we have. One story can reach millions. One introduction can save a life.

### How it works

1. **Tell the story.** We identify patients in urgent need and craft their story for maximum reach.
2. **Reach millions.** Through media partnerships across television, radio, podcasts, print, and social media, each patient is put in front of the audiences most likely to include a compatible donor.
3. **Make the match.** We connect patients directly with donors, media, and supporters, and follow each story through to its outcome.

### The team

- **Lauren Finkelstein**, Founder & CEO
- **Rabbi Simon Jacobson**, Advisor & Mentor, author of *Toward a Meaningful Life* and founder of The Meaningful Life Center
- **Loren Lahav**, Global Outreach Strategist, best-selling author and founder of TRUE LLC
- **Abhishek Donekal**, Chief Technology Officer, who leads the website and the digital platform

### Get involved

- Read and share the patients in [Urgent Requests](https://www.saveonepersonnow.org/urgent-requests). Sharing a story is how a match gets found.
- [Donate](https://www.saveonepersonnow.org/donate) to support the work.
- Contact: [Save1Person@aol.com](mailto:Save1Person@aol.com) · 917-572-6385

*No one should die because their story wasn't told.*

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
