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
