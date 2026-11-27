# Chief of Staff — weekly playbook for Save One Person

## HARD RULE (Nov 18, 2026, 8:24 PM): Lauren approves EVERYTHING before it goes out
- Outreach letters: drafted as Gmail drafts, shown to Lauren, sent only after her OK. The Nov 17 "send without asking" permission is withdrawn.
- Social media: every post on every account (SOP Instagram/Facebook/TikTok/YouTube/X, the daily Shorts, her personal Facebook) is shown to her by 6:30 AM and published only after her OK. Shorts sit in Metricool as DRAFTS until she approves.
- Newsletter: shown to her Monday morning; sent only after her OK.


## HARD RULE: never email Lauren's personal contacts (Lauren, Nov 18, 2026)
- The names in the "Save One Alert – who gets the newsletter" sheet (https://claude.ai/artifact/NChkt1umtViwYri5GdvVBJ), her AOL contacts, and aol-personal-contacts.csv are personal friends and people who don't like her. NEVER email, newsletter, pitch or import any of them, anywhere (Kit, Mailchimp, Gmail, Constant Contact).
- Outreach goes only to businesses, TV stations and media, one at a time, never to personal contacts.


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

## Facebook personal page (Lauren, Nov 17)
- Business social accounts (Save One Person IG/FB Page/TikTok etc.): post without asking.
- Lauren's PERSONAL Facebook page: share each day's video there ONLY after Lauren says OK that day. Ask at the daily check-in.

## Google Ad Grants website rule (Nov 17, 2026: account deactivated for Website policy)
- The website must be mainly about the mission. Lauren wants Shop kept as a tab in the top menu (Nov 17). Keep merch/books out of homepage sections and site-wide banners. Shop pages must say how purchases support the mission.
- Grant ads only point to mission pages (never /shop, /meaningful-holiday-gifts, product pages).
- STATUS Nov 27, 2026: Ad Grants REACTIVATED. Google Ad Grants support (case 7-9611000041369, Nov 27 7:45am ET) confirmed the account is fully compliant, deactivation lifted, $10,000/month restored. Normal daily Google Ads work resumes (see daily routine). Keep the website rule above so it stays compliant.

## RULE: Claude is the Google Ads expert (Lauren, Nov 27, 2026)
- Lauren: "I don't know anything about Google Ads... we need to protect ourselves and you should be the expert." Make Google Ads decisions yourself. Do NOT ask Lauren about Ads settings, bidding, campaigns or ads. Tell her in plain words afterward, in one line, only if it matters.
- Top priority is protecting the $10,000/month grant: follow every Google Ad Grants rule (working sign-up/conversion tracking; 5% account click rate; at least 2 ad groups per campaign, 2 ads per ad group, 2 sitelinks; ads point only to mission pages, never the shop; answer Google emails quickly).
- Only ONE Claude program changes Google Ads: the daily Google Ads routine. Every other routine (weekly report, social, outreach) only LOOKS. Nov 27 confusion: another Claude program edited the account at 9 AM and the daily check thought it might be Lauren. Log every change in ops/google-ads-log.md with the time.
- Never add a payment method or anything that could cost money (the grant account says "We don't bill you"; keep it that way).
- Still tell Lauren right away (as news, not a question) if Google sends a warning, threatens to suspend the grant, or asks for something only she can give (her login code, a signature).
- Next Ads run, decided by Claude (Nov 27): 1) finish sign-up (conversion) tracking first; 2) then turn "Save One Person- Branded" back on (Maximize conversions, as Google asked). It is the ad people see when they search our name and normally has the best click rate, which helps keep the account above Google's 5% rule.

## Standing: every spot carries the giving ask + link (Lauren, Nov 18, 2026)
- Every video or graphic spot shows a donate banner the WHOLE time, for example "Give a Thanksgiving gift today / saveonepersonnow.org/donate". Do not save it for an end card.
- Every caption carries a clickable https://saveonepersonnow.org/donate link: in the first line of FB, YouTube and X captions; on IG and TikTok, "link in bio", and keep the bio link pointed at /donate.
- Exception: patient (William) spots ask for a living donor, never money. On those, the banner points to /become-a-donor.
- Template: /tmp/ask_banner.png overlay (navy rounded bar, white + yellow Inter text, top of the 1080x1920 frame).

## Standing: Gifts That Give promotion (Lauren approved Nov 17, 2026) — NOT through Google Ad Grants
- NEWSLETTER (Monday task): every Monday Save One Alert includes a "Gifts That Give" section with pictures of the Go Bless Yourself tees and Lauren's two books, linking to https://www.saveonepersonnow.org/shop (say proceeds go to Save One Person). Keep the main story the mission. Frequency: once a week; only one extra short email allowed on special days (Giving Tuesday Dec 1). Never more than 2 emails a week.
- DAILY OUTREACH (any weekday, through Dec 18): in addition to the day's theme, up to 5 extra pitches per day split between:
  (a) GROUP ORDERS: churches, schools, offices, sports teams, nurses' associations, hospital staff groups: bulk Go Bless Yourself tees for holiday gifts at group pricing (orders to save1person1@gmail.com), proceeds support Save One Person;
  (b) GIFT GUIDES: Miami/South Florida and New York magazines, blogs and newspapers' holiday gift guides: "holiday gifts that help save lives" (tees + Lauren's books);
  (c) BOOKS (Wednesdays, with the podcast theme): book bloggers/podcasts for Lauren's books "Is There a God?" and "How to Create a Miracle".
  Public business contacts only, check all logs to never repeat, log in ops/tee-promo-log.md.
- Social: keep the Go Bless Yourself tee videos in the weekday rotation (Thursday video #2 already planned).
- The Tee Promoter task (Tue/Thu) already covers group orders and gift guides; both tasks check ops/tee-promo-log.md so nobody is contacted twice.

## Mon Nov 23, 2026 newsletter + social: THANKSGIVING tee spot (Lauren asked Nov 17)
- Video (Lauren's idea, Nov 17): two babies in Manhattan; a guy walks by and says 'go [bleep] yourself', the babies repeat it (bleeped), then a Thanksgiving turkey drops down: 'GO BLESS YOURSELF', 'tee shirts to gobble up for the holidays' -> https://www.saveonepersonnow.org/social/tee-videos/2026-11-23-thanksgiving-babies.mp4 (not yet posted). Spare Thanksgiving video for another tee day: /social/tee-videos/2026-11-23-thanksgiving.mp4 (aunt/parade/pie/train).
- NEWSLETTER Nov 23: feature it in the "Gifts That Give" section as a clickable thumbnail (email clients can't play video): image https://www.saveonepersonnow.org/newsletter/thanksgiving-tee-video-thumb.jpg linking to the MP4 above, caption "This Thanksgiving, go bless yourself... and others", plus a button to https://www.saveonepersonnow.org/shop. Every week's newsletter shows the newest tee video the same way.
- SOCIAL: post this video on Tue Nov 24 (tee day) as the video itself; personal Facebook share only after Lauren's OK that day.


## Standing: Shorts schedule (Lauren, 2026-11-18)
The Shorts go out every day on all SOP accounts: YouTube (all 55 pre-scheduled), the SOP FB page, IG and TikTok (scheduled one day ahead by the daily scheduled task trig_01NCXvWB4PauWznrF2kzr8mq, 12:31 PM ET). Lauren's PERSONAL FB gets the Short only twice a week, Mondays and Thursdays, as a share of the SOP page reel so the post is the video itself. Any other post on her personal page still needs her OK that day.

## RULE (Nov 19, 7:00 AM): every outreach/sponsor letter with an ASK
- Lauren: "it needs our logo and you need to explain how it would benefit the companies not just asking for 25k" / "for all the asks write how it would benefit their company to be associated with us".
- Every letter that asks for money, a partnership or a favor MUST have:
  1. The Save One Person heart logo at the top, embedded inline (Gmail drafts strip outside image links). Use ops/email/save-one-person-logo-300.jpg (base64 in ops/email/save-one-person-logo-300.b64) as an inline attachment, with <img src="cid:att0" width="220"> at the top of the HTML.
  2. A section "What <Company> gains by partnering with us" BEFORE the ask, tailored to that company (brand next to life-saving stories, local goodwill, earned media: named in press releases/pitches to our ~16,000 media contacts, ready-made co-branded content and employee pride, year-end impact report).
  3. Then the ask and what's included.
- Do NOT claim "10,000 newsletter subscribers" (not true). Say "our weekly Save One Alert email" with no number.
- Signature: name, 917-572-6385, Save1Person@aol.com, site, plus 3 press links (FOX 5, Tony Robbins Podcast, 1010 WINS).
- Model letter: Gmail draft to Memorial (kcarbo@mhs.net), Nov 19.

## Giving Tuesday 2026 (Tue Dec 1) — countdown plan (Lauren approved the plan Nov 18-19, 2026)
EVERY post and email below is a DRAFT shown to Lauren first. Nothing is posted or sent until she says OK (HARD RULE above).
- Landing page: https://saveonepersonnow.org/giving-tuesday (branch `giving-tuesday`; goes live only after Lauren's OK). Small Giving Tuesday link on the homepage and /donate hides itself after Dec 2.
- Every Giving Tuesday post/email links https://saveonepersonnow.org/giving-tuesday and asks for gifts to SAVE ONE PERSON the organization. Never tie money to a patient. William Fritts appears only as "needs a living kidney donor" -> /help-william, kept apart from the money ask.
- Every graphic/video ends with "Saveonepersonnow.org"; captions follow the "giving ask + link" rule above.

### Daily social-post task: add these (draft for Lauren's OK, all SOP accounts)
- Mon Nov 23: "Giving Tuesday is next week" (Tue Dec 1). Save the date + link.
- Fri Nov 27: "4 days until Giving Tuesday."
- Mon Nov 30: "Giving Tuesday is TOMORROW."
- Tue Dec 1, 3 posts: MORNING "It's Giving Tuesday: help us save one more life"; NOON "What your gift does" (media outreach + TV pitches, storytelling, website/Save One Alert, education, patient support: the list on /donate, no invented numbers); EVENING "Last hours of Giving Tuesday."
- Wed Dec 2: thank-you post to everyone who gave or shared.
- These are in addition to the normal day's posts; if it's too many for one day, ask Lauren which to drop.

### Monday newsletter task (Save One Alert) — draft for Lauren's OK
- Mon Nov 30 issue = THE Giving Tuesday issue: lead with "Tomorrow is Giving Tuesday", big button to /giving-tuesday, what a gift does, 501(c)(3) EIN 84-4214447 line. William section stays a donor ask only.
- Tue Dec 1: one short extra email "It's Giving Tuesday today" (the one allowed extra email; never more than 2 emails that week). Draft it Nov 30 so Lauren can OK it the night before or early Dec 1.
- Mon Dec 7 issue: a thank-you to Giving Tuesday donors and sharers.

### Matching gift (only Lauren can ask)
- The single biggest boost is a donor or company willing to MATCH gifts on Dec 1 ("every gift doubled up to $X"). Only Lauren asks them. If she lands one, add "Gifts matched" to the page and every post (with her OK).

## AI drama videos (Lauren, Nov 25, 2026)
- Free only: Meta AI (meta.ai, signed in as lauren.finkelstein1; free daily limit resets each day; do NOT pay). Kling free credits as backup.
- Every drama shows SAVE ONE ALERT, saveonepersonnow.org, "Dramatization" (small). Org spots end with Donate; patient spots end with "Could YOU be <Name>'s living kidney donor?" and NO money ask.
- Weekly: Person of the Week in a newsroom (breaking-news style with their real photo), Monday.
- Weekly: a family watches a SAVE ONE ALERT on air and says "Let's save a life" (new family each week), Wednesday 5 PM, starting Dec 2.
- Weekly: after the Person of the Week airs, a newsroom collects a list of people who want to be a living kidney donor for them but are NOT a match, or want a paired exchange, and hands it to hospitals and organizations, Thursday 5 PM, starting Dec 3.
- Weekly: "Brands That Save Lives" (MADE-UP brands carrying a SAVE ONE ALERT on cups, trucks, cereal boxes, apps), Tuesday 5 PM, starting Dec 8. Also use in sponsor outreach.
- Weekly: a FICTIONAL rockstar at a stadium tells the crowd about a real person from Urgent Requests (real photo on the jumbotron, no money ask), Saturday 5 PM, starting Nov 28.
- Weekly: "Stars read a Save One Alert" — INVENTED celebrities around the world (never real people or look-alikes) read a REAL Save One Alert (real Urgent Requests person, real photo, no money ask) to their fans, Sunday 5 PM, starting Nov 29.
- EVERY drama/spot ends with the website address saveonepersonnow.org on screen (Lauren, Nov 25).
- Billionaire series ("starts Save One stations across the globe"): Fridays, ep 1 Nov 27, ep 2 Dec 4, ep 3 Dec 11, ep 4 Dec 18. Swear word bleeped/masked.
- At most ~2 posts per account per day (daily Short + one other).
