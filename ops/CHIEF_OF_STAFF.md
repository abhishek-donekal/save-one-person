# Chief of Staff — weekly playbook for Save One Person

This file is the instruction sheet the Chief of Staff scheduled task follows every Monday, and that the
Wednesday/Friday social-post tasks read. Lauren (the founder) can change any rule here by telling Claude.

## Standing rules (all bots)
- Nothing is posted publicly or emailed without Lauren's OK. Bots draft; Lauren approves.
- Never feature a new person (someone not already on Urgent Requests) until Lauren has confirmed the family agreed.
- Every video/graphic ends with the web address written "Saveonepersonnow.org".
- William Fritts stays pinned first on Urgent Requests until he finds a donor.
- Go Bless Yourself is a separate business, but Lauren wants it featured in the weekly Save One Alert email.
- Only email people on Lauren's own opted-in list. No cold emails, no scraped addresses.

## Monday — Chief of Staff
1. **Pick the TWO People of the Week** (Lauren, 2026-11-16). **William Fritts is ALWAYS Person of the Week #1
   until he finds a living kidney donor.** Person #2 rotates: read `ops/person-of-the-week-log.md` and pick the
   next person on the live Urgent Requests list (https://www.saveonepersonnow.org/api/urgent-requests, in list
   order) other than William who has not been featured in the last 12 weeks. Skip anyone without a photo. If
   Lauren named someone, use them as #2.
2. **Update the website pop-up** (keep William as the pop-up while he needs a donor; feature person #2 in the
   posts and email). If the pop-up supports only one person, leave William. Edit `src/lib/personOfTheWeek.ts` (new `weekOf` = this Monday's date,
   name, short headline, one-line detail, slug, image). Push to a branch, wait for both Vercel checks to
   pass, then fast-forward `master`. Add a line to `ops/person-of-the-week-log.md`.
3. **Write this week's plan** in `ops/this-week.md`: Person of the Week (name, link, 3 key facts, photo URL),
   and the angle for each post: Monday = meet them, Wednesday = how to help / living donation facts,
   Friday = share-ask / urgency. Commit it with step 2.
4. **Fill in the weekly "Save One Alert" email** from the template `ops/email/save-one-alert.html`
   (goes to Lauren's list; she wants it sent from Kit's free Newsletter plan, up to 10,000 subscribers, or her Mailchimp friend). Show BOTH People of the Week (William first, then person #2). Replace ONLY the People of the Week section (photo, name,
   story, button link) and the subject/preview lines; keep the Donate, Go Bless Yourself holiday-gift and
   Lauren's two books sections. If Lauren sent information about a person this week, use that person.
   Save it as `ops/email/YYYY-MM-DD.html`, and send Lauren the finished HTML plus subject line, ready to
   paste into Constant Contact (or send through the Constant Contact connector if it's connected — only
   after she says OK).
5. **Go Bless Yourself promo.** Write one short promo caption + one image idea with a fresh angle each
   week (holiday gifts in Nov–Dec), linking goblessyourself.org, for the social posts and the email.
6. **Find new people.** Search the web for people who have *publicly* asked for a living kidney donor
   (news stories, public family posts, hospital/NKR appeals) and are not already on the site. Send Lauren
   up to 3 candidates with the public link and a one-line summary, so she can contact the family. Do not
   add them to the site.
7. **Report to Lauren** in one short message: who is Person of the Week, the pop-up is live, the email
   draft, the Go Bless Yourself promo, the candidates.

## Monday / Wednesday / Friday — Social posts
Three DIFFERENT kinds of posts each week, every one with a picture and "Saveonepersonnow.org" on it:
- Monday: Person of the Week (their photo, story, how to help, link to their story page).
- Wednesday: a Health Hack / health tip (use one of Lauren's Health Hacks videos or a still from it, link to
  saveonepersonnow.org/health-hacks).
- Friday: be creative and rotate: Go Bless Yourself gifts (holiday gifts in Nov-Dec), Lauren's two books,
  a donation ask, a success story, an inspiring quote, a living-donation myth vs fact, a thank-you to supporters.
Send Lauren the picture/video and captions to approve. Post only after she says OK.

## Standing rule: no celebrity outreach
Never contact Andy Garcia, Michael Rapaport, Andrew McCarthy or Madisyn Shipman or their teams: Lauren knows them personally (Nov 17, 2026). Other celebrities only when Lauren approves the list (she approved 9 video requests on Nov 17: Alonzo Mourning, Selena Gomez, George Lopez, Tracy Morgan, Lionel Messi, Gloria Estefan, Pitbull, DJ Khaled, Dwyane Wade).

## Where Lauren lives (Nov 17, 2026)
Lauren now lives in MIAMI. Never call her "a New Yorker" in emails. Say Save One Person started in New York and Lauren is now based in Miami. Prefer Miami/South Florida media and businesses (WPLG Local 10, NBC 6, WSVN 7, CBS News Miami, Miami Herald, local Miami businesses), while NYC outlets that covered her before are still fine.
