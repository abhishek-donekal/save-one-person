# Google Ad Grant log — Save One Person Inc. (684-224-8625)

Free Google Ad Grant ($10,000/month, max ~$329/day). Account time zone: Mountain (GMT-7).
Never touch "Save One Person - Paid" (115-266-7527).

## What's live (as of 2026-11-16 run)

| Campaign | ID | Budget/day | Bidding | Status |
|---|---|---|---|---|
| Help William Find a Kidney Donor | 24463868763 | $120 | Maximize clicks, $2 max CPC | Eligible (Learning) — built 2026-11-16 |
| Holiday Gifts That Give Back | 24463780497 | $100 (was $150) | Maximize clicks, $2 max CPC | Pending — ads still under review |
| Save One Person- Organ Donation | ? | $30 (was $329) | — | Eligible, 6/20 ads disapproved, 0 impressions this month |
| Save One Person- Branded | ? | $15 (was $329) | — | Eligible, 0 impressions this month |
| Campaign_P-Max_save1person | ? | $200 | Max conversions | **Paused 2026-11-16** (P-Max, conversion tracking incomplete, 2 impr/month) |

Total enabled daily budget: **$265/day** (room for ~$64 "Donate to Save a Life").
All other campaigns are Paused / Removed / Ended (old 2020 Spanish campaigns, Target CPA copies, NYC, Blog, Success Stories, Urgent Requests, App).

### William campaign detail (United States, Google Search only, phrase match)
6 ad groups × 2 responsive search ads (15 headlines, 4 descriptions) -> /urgent-requests/help-william-find-a-living-kidney-donor
- Become a Living Kidney Donor — kw: how to become a living donor, become a living donor, living donor for a child, give a kidney to a child, donating a kidney while alive, pediatric living donor…
- Child Needs a Kidney — kw: child needs kidney transplant, toddler needs kidney, pediatric kidney transplant donor, child on dialysis, pediatric kidney failure…
- Kidney Donor Needed — kw: living donor needed, kidney transplant donor needed, need a living donor, find a living donor…
- Am I a Match - Testing — kw: living donor requirements, living donor blood type, who can be a living donor, can i be a living donor, blood type o donor…
- Share William's Story — kw: help a child find a donor, share a donor story, help a sick child, living donor stories, transplant stories…
- Madisyn Shipman Supports William — kw: madisyn shipman, madisyn shipman kidney/william/charity/news (Google accepted)
- 55 keywords total. Sitelinks (campaign level, pending review): How Living Donation Works (/become-a-donor), Donate to Save a Life (/donate), As Seen on TV (/media), Other Urgent Requests (/urgent-requests), Success Stories (/success-stories).
- Added 2026-11-16 run 2: Pediatric Dialysis, Living Donation Facts, Help a Sick Child, Kansas City Living Donor (KU Med) — 4 more ad groups, 8 more RSAs, 26 more kw. **Now 10 ad groups / 20 ads / ~81 keywords.**
- Holiday campaign also got ad group "William - Gift of Life" (8 kw like gift of life christmas, help a sick child this christmas; 2 RSAs -> William page).

### Policy lessons
- Google's "Inappropriate content" policy **blocks keywords containing "kidney donor", "kidney donation", "donate a kidney", "organ donation"** (28 rejected 2026-11-16). Use "living donor", "transplant donor", "kidney transplant", "give a kidney" phrasing instead. Ad text with "Kidney Donor" passed upload (some ads still under review — watch for disapprovals).
- Earlier: "organ donor awareness shirts" rejected (organ + product). Never pair organ/kidney with buy/sell/pay/products.
- Bulk upload (Tools > Bulk actions > Uploads) works: inject a CSV into the hidden `input[type=file][accept^=".csv"]` via JS DataTransfer. New campaign rows need "EU political ads" = No; rows for an existing campaign may need "Campaign ID". Bulk "Campaign Status: Paused" on P-Max did NOT work (paused in UI instead). After Apply, uploads that add ADS show "N verification required": click **Verify** on that row (may trigger "Confirm it's you" → Confirm with a passkey) — only then are the ads created. Campaign negatives via bulk: Criterion Type "Campaign negative phrase" is invalid — add negatives in the UI instead.

## Daily numbers
| Date (acct tz) | Spend | Impr | Clicks | CTR | Notes |
|---|---|---|---|---|---|
| Nov 1–15 MTD | $0.00 | 2 | 0 | — | Holiday ads still in review; William launched late Nov 15 |

## Change log
- 2026-11-17 (growth task): In "SOP Grant - Living Kidney Donors" (24477469576) added ad group "Myth vs Fact - Living Donation" (203680808313): 12 phrase kw, 2 RSAs → /living-kidney-donation-myths-facts. Both ads Eligible. Campaign is Max conversions with incomplete conversion tracking → Eligible (Limited), 0 impr. "Save One Person- Organ Donation" now shows Paused (some ads disapproved). Note: keyword with >10 words is rejected by Google.
- 2026-11-15: Built "Holiday Gifts That Give Back" (27 kw, 1 RSA, 4 sitelinks).
- 2026-11-16 (run 2, Lauren asked to run overnight): +4 William ad groups (8 ads). Verified holiday "William - Gift of Life" 2 ads (they had not been created in run 1). Passkey check passed.
- 2026-11-16 (run 1): Built William campaign ($120/day, 6 ad groups, 12 RSAs, 55 kw, 5 sitelinks). Added William ad group to Holiday. Holiday budget $150→$100, Organ Donation $329→$30, Branded $329→$15. Paused P-Max ($200).

## To-do (next runs)
1. Check William + Holiday ads/sitelinks finished review; fix any disapprovals.
2. Holiday campaign has only 2 ad groups now? (main + William) — confirm ≥2 ads per ad group (main group has only 1 RSA → add a 2nd).
3. Build "Donate to Save a Life" (~$64/day) -> /donate, with a William ad group.
4. Investigate why Organ Donation & Branded get 0 impressions; fix 6 disapproved ads or pause.
5. Build "Urgent Requests (other patients)" and "Lauren's books" campaigns (rebalance budget).
6. Conversion tracking (Donate click, Shop purchase, Share William, sign-up) then consider Maximize conversions.
7. Add William campaign negatives in UI (blood drive, plasma, red cross, for sale, black market, price, jobs).
8. Daily: search terms, negatives, CTR ≥5%, pause QS 1–2 keywords.

## 2026-11-17: ACCOUNT DEACTIVATED (Website policy) — reactivation requested
- 3:16pm ET Google email: Ad Grants account 684-224-8625 deactivated for not complying with the Website policy. Account is now READ-ONLY (can't edit campaigns).
- Likely cause: homepage had big Go Bless Yourself tee + book sale sections, Shop in top nav, and the "Holiday Gifts That Give Back" campaign pointed to the gifts page.
- Website fixes (live): removed tee/book sections from homepage; Shop tab renamed "Gifts That Give" (Lauren wants it in the top menu); shop page now has "How the shop supports our mission" (proceeds go to Save One Person, confirmed by Lauren). Broken-link check: 142 sitemap pages + 163 internal links, none broken. Google tag AW-599305263 verified loading on live site.
- 4:46pm ET: submitted "Request to reactivate a Google Ad Grant account" (support.google.com/nonprofits/contact/Request_for_reactivation_cases_2) with Lauren's OK, and ticked (with her OK) the one-time approval for the Ad Grants team to make compliance changes within 5 business days. Contact: save1person1@gmail.com.
- Until Google replies: DO NOT edit the account (changes may be lost while Google specialists work). Never point grant ads to /shop, /meaningful-holiday-gifts or product pages again. When reactivated: pause/remove "Holiday Gifts That Give Back", then build "Donate to Save a Life" -> /donate, CTR work, fix disapprovals.

## 2026-11-18: Google Ad Grants support replied (case 7-9611000041369)
- 8:57am ET email from googlegrants-support@google.com (agent "Taqdees"): account 684-224-8625 is deactivated for the **Account management policy** (support.google.com/nonprofits/answer/117827) — not only Website policy. Tip: start with Maximize clicks, switch to Maximize conversions once there's conversion data.
- Google's ask: **"Once the account is compliant with the policies, please reply back to this email"** — then they'll restore the $329/day limit. So Google is NOT fixing it for us; we must fix, then reply on that thread.
- Ads UI check (read only): red banner still "deactivated for not complying with Google Ad Grants' Website policy"; diagnostics "Account is suspended". Nov 1–18: 2 impr, 0 clicks, $0. Second notice: "Improve account security" (not touched).
- No changes made. Asked Lauren for OK to (1) fix the account to Account-management rules and (2) then send the reply to Google.
- Fix list (when OK'd): pause "Holiday Gifts That Give Back" (points to gifts/shop); pause "SOP Grant - Living Kidney Donors" or switch to Maximize clicks (Max conversions without working conversion tracking); pause "Save One Person- Organ Donation" (disapprovals) if not fixable; make sure every enabled campaign has ≥2 ad groups × ≥2 ads, ≥2 sitelinks, US geo targeting; no single-word keywords; pause QS 1–2 keywords; add negatives (blood drive, plasma, red cross, for sale, black market, price, jobs); confirm conversion tracking (Google tag AW-599305263) has ≥1 working conversion action (Donate click); confirm the annual Ad Grants program survey is done.

## 2026-11-18 1:02pm ET: replied to Google (case 7-9611000041369, thread 1a1eb797572a012e), Lauren OK'd the text
- Found: account is READ-ONLY. Banner says "deactivated for not complying with Website policy"; Taqdees's email says "Account management policy". Can't edit campaigns until Google restores access.
- Reply: committed to Maximize clicks, remove the 2020 campaigns, ≥2 ad groups × 2 ads + sitelinks, no single-word or QS 1–2 keywords, negatives and CTR >5%, conversion tracking; website meets policy. Asked them to restore edit access.
- NEXT: when Google replies or edit access returns, do all of the above at once, then reply "done".

## 2026-11-19 daily check (read only)
- Gmail: no new reply from Google Ad Grants support on case 7-9611000041369 (last message is our Nov 18 1:02pm reply). No new Google Ads/Ad Grants emails.
- Ads UI (684-224-8625): red banner still "Your account is deactivated for not complying with Google Ad Grants' Website policy". Nov 1–19: 0 clicks, 2 impr, $0.00.
- No changes made. Still waiting on Google.

## 2026-11-19 (Giving Tuesday task) read-only check
- Ads UI banner for 684-224-8625 still: "Your account is deactivated for not complying with Google Ad Grants' Website policy". No new Google email. Giving Tuesday ad group NOT added (on hold until reactivated).

## 2026-11-20 daily check (read only)
- Gmail: no new reply from Google Ad Grants support on case 7-9611000041369 (latest message is still our Nov 18 reply). No new Google Ads/Ad Grants emails.
- Ads UI (684-224-8625): red banner still "Your account is deactivated for not complying with Google Ad Grants' Website policy". Nov 1–20: 0 clicks, 2 impr, $0.00.
- No changes made. Still waiting on Google.

## 2026-11-21 daily check (read only)
- Gmail: no new reply from Google Ad Grants support on case 7-9611000041369 (latest message is still our Nov 18 reply). No new Google Ads/Ad Grants emails.
- Ads UI (684-224-8625): red banner still "Your account is deactivated for not complying with Google Ad Grants' Website policy". Nov 1–21: 0 clicks, 2 impr, $0.00.
- No changes made. Still waiting on Google (3 business days since our reply; consider a polite follow-up on the thread if nothing by Nov 25, with Lauren's OK).

## 2026-11-22 daily check (read only)
- Gmail: no new reply from Google Ad Grants support on case 7-9611000041369 (latest message is still our Nov 18 reply). No new Google Ads/Ad Grants emails.
- Ads UI (684-224-8625): banner still "Your account is deactivated for not complying with Google Ad Grants' Website policy"; "New campaign" greyed out. Nov 1–22: 0 clicks, 2 impr, $0.00.
- No changes made. Still waiting on Google (follow-up on the thread suggested if nothing by Nov 25, with Lauren's OK).

## 2026-11-23 daily check (read only)
- Gmail: on Nov 22 11:59am ET a follow-up was sent on case 7-9611000041369 (thread 1a1eb797572a012e) asking Google to restore edit access or make the changes themselves.
- Nov 23 6:36am ET Google (Taqdees) replied with the SAME canned text as Nov 18: account deactivated for Account management policy; "Once the account is compliant with the policies, please reply back to this email" and they'll restore $329/day. No answer on edit access. Catch-22: they want fixes, the account is read-only.
- Ads UI (684-224-8625): banner still "Your account is deactivated for not complying with Google Ad Grants' Website policy". Nov 1–23: 0 clicks, 2 impr, $0.00.
- No changes made. Told Lauren and drafted a short, specific reply for her OK (asks Google to confirm whether we may edit while deactivated, or to turn editing on / make the changes, and to say which policy applies, since banner says Website and email says Account management). Not sent.

## 2026-11-24 daily check (read only)
- Gmail: no new answer from Ad Grants support. Only new message: Nov 24 6:48am ET no-reply@google.com feedback survey on case 7-9611000041369 ("How'd that go?") — Google may treat the case as closed. Yesterday's drafted reply (asking whether we may edit while deactivated / to turn editing on) has NOT been sent; still waiting on Lauren's OK.
- Ads UI (684-224-8625): banner still "Your account is deactivated for not complying with Google Ad Grants' Website policy"; "New campaign" greyed out. Nov 1–24: 0 clicks, 2 impr, $0.00.
- No changes made.

## 2026-11-24 11:20 AM reply sent (Lauren OK)
- Replied on case 7-9611000041369 (thread 1a1eb797572a012e, msg 1a20e5a0ce3e1482): GA G-8W5DN2825L + Ads tag AW-599305263 now on every page; asked Google to restore edit access or make the fixes; asked which policy applies (Website vs Account management). Backup plan if no help by ~Dec 1: new Ad Grants application via Google for Nonprofits.
- 11:21 AM second email sent (Lauren asked): "we have now written you four times", asked for edit access / changes or escalation (msg 1a20e5bcc0f5fb03).
- 11:22 AM third email sent (Lauren asked): "you keep saying fix the problems while we cannot; please respond to what we are actually asking" + 3 numbered questions (msg 1a20e5d05010035a).

## 2026-11-25 daily check (read only)
- Gmail: Nov 25 9:13am ET Google (Taqdees) replied on case 7-9611000041369 (thread 1a1eb797572a012e, msg 1a2130e44b9e4f2f), first specific ask: "the bid strategy has not yet been updated". Change **Save One Person- Branded** and **Save One Person- Organ Donation** to "Maximize Conversions" or "Maximize Conversion Value", status "Enabled", then notify them.
- Also Nov 24 11:09pm ET: "Ads disapproved (1)" for campaign Save One Person- Blog (Misleading content / unreliable claims).
- Ads UI (684-224-8625): banner still "deactivated for not complying with Google Ad Grants' Website policy"; page says "You have read-only access to this account", so we CANNOT make Google's change. Nov 1-25: 2 impr, $0.
- Current state: Save One Person- Branded = Eligible, Maximize clicks, $15/day. Save One Person- Organ Donation = Paused, Maximize clicks, $30/day, some ads disapproved. Still Eligible: SOP Grant - Living Kidney Donors (Max conv), Help William Find a Kidney Donor, Holiday Gifts That Give Back (must be paused when editable). Old 2020 campaigns + 2 "Algorithm" campaigns now show Removed.
- No changes made. Sent Lauren Google's ask + a draft reply (asks Google to restore edit access or make the bid change themselves). Not sent to Google; waiting for her OK. Note: Google's ask overrides our "keep Maximize clicks" plan for these 2 campaigns; Lauren told.

## 2026-11-26 daily check: account REACTIVATED in Google Ads (Ad Grants not yet restored)
- Gmail: 6:07am ET ads-account-noreply@google.com "Your Google Ads account has been reactivated" (generic; account is editable again).
- 6:11am ET new case 4-0316000041441 (agent Rajani): grant still "deactivated for Website Policy"; "We cannot approve ... saveonepersonnow.org since it does not comply with Ad Grants Website policy." Asks us to tell them once the domain is compliant (or remove ads to that domain), then reply so they restore $329/day.
- 10:10am ET case 7-9611000041369 (Taqdees): same ask again — change **Save One Person- Branded** to Maximize Conversions (or Max Conv. Value), status Enabled, then reply.
- Ads UI: red deactivation banner GONE; "New campaign" active; edit menus work. Billing: "We don't bill you" (no cost risk). Nov 1–26: 2 impr, 0 clicks, $0.
- CHANGE: paused **Holiday Gifts That Give Back** (pointed to gifts/shop pages) — "Your change has been saved".
- Still enabled: Save One Person- Branded (Eligible, Max clicks, $15/day), Help William Find a Kidney Donor (Max clicks, $120/day), SOP Grant - Living Kidney Donors (Max conv, $329/day).
- NOT done, waiting on Lauren: switching Branded to Maximize Conversions (Google's ask; on the "tell Lauren first" list); replies to both Google cases (draft sent to Lauren). Bigger work (Donate campaign, CTR, sitelinks) on hold until Google confirms grant restored.

## 2026-11-26 6:14 PM ET: Branded bid strategy changed (Lauren OK in chat)
- Found Save One Person- Branded still on Maximize clicks although the 1:33 PM reply to Taqdees said it was switched. With Lauren's explicit OK, changed Bidding to Maximize conversions and saved. Campaign now "Eligible (Learning)", $15/day.
- Organ Donation ($30/day) still Paused, Max clicks, some ads disapproved. Help William ($120/day) Max clicks. Living Kidney Donors ($329/day) Max conversions.
- Shop cleanup today (removed $19,995 program, $499 membership, 3 free referral items) not yet reported to Rajani (case 4-0316000041441); draft pending Lauren's OK.

## 2026-11-26 10:30 PM ET: follow-up sent to Rajani (Lauren OK)
- Replied on case 4-0316000041441 (thread 1a21459e9e899206, msg 1a21b0d2d3edac7a): shop cleanup (removed $19,995 program, $499 membership, 3 free referral items), proceeds statement, dedicated donate page, Branded now Maximize conversions. Asked for re-review. Expect reply within ~5 business days.

## 2026-11-27 daily check: AD GRANTS RESTORED
- Gmail: Nov 27 7:45am ET googlegrants-support@google.com on case 7-9611000041369 (thread 1a1eb797572a012e, msg 1a21d0a2f7e3eaa1): "fully compliant", deactivation lifted, spending limit back to $10,000/month. No new message on case 4-0316000041441.
- Ads UI (684-224-8625): no deactivation banner; editable. Nov 1–27: 2 impr, 0 clicks, $0.
- Change history shows manual edits TODAY by save1person1@gmail.com (not by this routine): 9:03 AM ET Save One Person- Branded PAUSED; 9:04 AM ET Help William campaign changed (now Maximize conversions); 9:19–9:20 AM ET Branded ads edited and several old ads removed. Asked Lauren to confirm these were hers.
- Campaign state now: Enabled = SOP Grant - Living Kidney Donors ($329/day, Max conv, Eligible (Limited)) and Help William Find a Kidney Donor ($120/day, Max conv, Eligible (Limited)). Paused: Branded ($15), Organ Donation ($30, some ads disapproved), Holiday Gifts That Give Back ($100), P-Max and old Target CPA campaigns. Enabled daily budgets add up to $449 (LKD $329 + HW $120). Google caps grant spend at $329/day so no cost risk; did not raise anything.
- Problem: every campaign shows "Conversion tracking setup is incomplete". Ad Grants requires valid conversion tracking, and Max-conversions campaigns with no working conversions tend to get almost no impressions (explains 0 traffic).
- No changes made by this routine today (someone was editing the account this morning; avoided overlapping edits). Next run: confirm with Lauren, then fix conversion tracking, enforce 2 ad groups/2 ads/2 sitelinks + CTR rules, and build "Donate to Save a Life" -> /donate.
- CHIEF_OF_STAFF.md status line updated to "reactivated".

## 2026-11-27 afternoon: who made the 9 AM edits (answered) + new Rajani email
- The 9:03–9:20 AM ET edits were made by another Claude session (session_01QWtLC4b23LASfZ97zDFarp) in Lauren's signed-in browser on her laptop, which is why change history shows save1person1@gmail.com. Lauren's messages in that session: 9:03 "Switch william to maximize conversions"; 9:17 "clear out the old ads?"; 9:18 "Yes to 3". The 2x-daily checkup task says Branded was paused because its ads pointed to the old domain saveoneperson.org and said "save up to 8 lives". Lauren didn't recognize the edits when asked later in a different chat; no sign of an outside login.
- Unrelated item to check: Nov 25 3:05 PM ET "Your Google Account was recovered successfully" (no-reply@accounts.google.com). Ask Lauren if she did this recovery; if not, secure the account.
- Nov 27 1:27 PM ET Rajani (case 4-0316000041441) sent the same Website-policy text again ("cannot approve saveonepersonnow.org"), although Taqdees (case 7-9611000041369) confirmed full reactivation at 7:45 AM. Probably a stale second case; check the Ads UI before acting.
- Nov 27 afternoon: Lauren OK'd switching Help William + SOP Grant - Living Kidney Donors from Maximize conversions to Maximize clicks (0 clicks MTD; no conversion data yet; Google's own tip says start with Max clicks). Sent to the laptop session (session_01QWtLC4b23LASfZ97zDFarp) to do in the Ads UI. Plan: switch back to Max conversions once a few conversions are recorded. Tracking already live: AW-599305263 + form-submit conversion (src/lib/adsConversion.ts) on 5 forms since Nov 25. Next: weekly "Person of the Week" ad group → that person's story page with the video spot (Lauren's idea).
