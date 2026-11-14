# Chief of Staff — weekly playbook for Save One Person

This file is the instruction sheet the Chief of Staff scheduled task follows every Monday, and that the
Wednesday/Friday social-post tasks read. Lauren (the founder) can change any rule here by telling Claude.

## Standing rules (all bots)
- Nothing is posted publicly or emailed without Lauren's OK. Bots draft; Lauren approves.
- Never feature a new person (someone not already on Urgent Requests) until Lauren has confirmed the family agreed.
- Every video/graphic ends with the web address written "Saveonepersonnow.org".
- William Fritts stays pinned first on Urgent Requests until he finds a donor.
- Go Bless Yourself is a separate business: its marketing never uses Save One Person branding.
- Only email people on Lauren's own opted-in list. No cold emails, no scraped addresses.

## Monday — Chief of Staff
1. **Pick the Person of the Week.** Read `ops/person-of-the-week-log.md`. Pick the next person on the live
   Urgent Requests list (https://www.saveonepersonnow.org/api/urgent-requests, in list order) who has not
   been featured in the last 12 weeks. Skip anyone without a photo. If Lauren named someone, use them.
2. **Update the website pop-up.** Edit `src/lib/personOfTheWeek.ts` (new `weekOf` = this Monday's date,
   name, short headline, one-line detail, slug, image). Push to a branch, wait for both Vercel checks to
   pass, then fast-forward `master`. Add a line to `ops/person-of-the-week-log.md`.
3. **Write this week's plan** in `ops/this-week.md`: Person of the Week (name, link, 3 key facts, photo URL),
   and the angle for each post: Monday = meet them, Wednesday = how to help / living donation facts,
   Friday = share-ask / urgency. Commit it with step 2.
4. **Draft the weekly "Save One Alert" email** featuring the Person of the Week (subject, preview text,
   body, button to their story). Send it to Lauren ready to paste into her email tool / Constant Contact.
5. **Draft the Go Bless Yourself email** promoting the T-shirts/hoodies/hats/totes/mugs at
   goblessyourself.org (store: goblessyourself.printful.me). One fresh angle each week. Ready to paste.
6. **Find new people.** Search the web for people who have *publicly* asked for a living kidney donor
   (news stories, public family posts, hospital/NKR appeals) and are not already on the site. Send Lauren
   up to 3 candidates with the public link and a one-line summary, so she can contact the family. Do not
   add them to the site.
7. **Report to Lauren** in one short message: who is Person of the Week, the pop-up is live, the two
   email drafts, the candidates.

## Monday / Wednesday / Friday — Social posts
Read `ops/this-week.md`. Make one post for Instagram, TikTok and X (Twitter) using that day's angle:
a short vertical video or graphic built from the person's photo and story (or a video Lauren uploaded), plus
captions with the story link. Send to Lauren to approve. Post only after she says OK, through the browser
on her computer where she is logged in. If not logged in, ask her to log in.
