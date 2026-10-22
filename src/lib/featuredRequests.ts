// Urgent requests that ship with the site instead of living in Supabase.
// They show on /urgent-requests and their own /urgent-requests/[slug] page
// unless a database row with the same slug exists, which takes precedence.
export const FEATURED_REQUESTS = [
  {
    id: 'featured-john-jj-gillen',
    slug: 'john-jj-gillen',
    patient_name: 'John “JJ” Gillen',
    title: 'After 40+ Years of Saving Others, Former Wantagh Fire Chief JJ Gillen Needs a Kidney Hero',
    medical_condition: 'Kidney Failure (Type O)',
    story_text: `For more than 40 years, John “JJ” Gillen devoted himself to protecting and serving his community. He served as a longtime Wantagh volunteer firefighter, rising to positions including chief and commissioner, while also spending decades with the NYPD, eventually retiring as a sergeant and commanding officer of the 110th Precinct.

Now, the man who spent his life answering calls for help is facing an emergency of his own. JJ urgently needs a living kidney donor, and his family is hoping that sharing his story will help find the person who can give him a second chance.

A hero who now needs a hero: JJ spent more than four decades volunteering with the Wantagh Fire Department. He joined the NYPD in 1982, served in Queens, and rose to sergeant and commanding officer. He and his wife, Karen, have been married for 44 years and raised two daughters, and today JJ is a grandfather to three granddaughters and one grandson.

Following a quadruple bypass last November, his kidney function initially appeared to improve but later deteriorated. Recent family updates put his kidney function at approximately 15%, and his family says dialysis would become necessary if it falls to around 10%. The family is now urgently searching for a living Type-O kidney donor.

“It's his turn for somebody to help him.” JJ's family says helping others has always been part of who he is. Now, after decades of serving his community, his loved ones are asking the community to stand behind him.

How to explore living kidney donation for JJ: if you are a healthy adult and want to learn whether you could become a living kidney donor for John “JJ” Gillen, contact the NYU Langone Health Living Kidney Donor Program. Call the living donor team at 212-263-3621 or email NYUTrLivingDonor@NYULangone.org, and explain that you are interested in being evaluated as a potential living donor for John “JJ” Gillen.

Potential donors undergo a confidential medical evaluation. You don't have to be a family member: healthy people can donate to relatives, friends, coworkers, or even strangers, and paired kidney exchange can provide another option when a donor and recipient aren't directly compatible.

Can't donate? You can still help. Share JJ's story with friends, family, coworkers, and community groups. The right donor could be someone outside JJ's immediate circle. #KidneyForJJ

For more than four decades, JJ Gillen answered the call when other people needed help. Now the call is for him.`,
    image_url: '/images/urgent/jj-gillen.jpg',
    contact_email: 'NYUTrLivingDonor@NYULangone.org',
    contact_phone: '212-263-3621',
    donation_goal: null,
    donation_raised: 0,
    urgent: true,
    published: true,
    status: 'open',
  },
  {
    id: 'featured-jeffrey-sorrell',
    slug: 'jeffrey-sorrell',
    patient_name: 'Jeffrey Sorrell',
    title: 'Jeffrey Desperately Needs a Living Kidney Donor',
    medical_condition: 'Kidney Disease',
    story_text: `Jeffrey is a loving husband, son, brother, and friend. He is kind, generous, and always there for others. Now he is the one who needs help.

A living kidney donor can give him the gift of life and many more tomorrows with his family.

You could be the miracle that saves his life. To learn more or to see if you can donate, please visit nkr.org/WAF939.

No one should die because their story wasn't told.`,
    image_url: '/images/urgent/jeffrey.jpg',
    social_other: 'https://nkr.org/WAF939',
    donation_goal: null,
    donation_raised: 0,
    urgent: true,
    published: true,
    status: 'open',
  },
]

export function getFeaturedRequest(slug: string) {
  return FEATURED_REQUESTS.find((r) => r.slug === slug) ?? null
}
