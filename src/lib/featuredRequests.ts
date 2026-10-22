// Urgent requests that ship with the site instead of living in Supabase.
// They show on /urgent-requests and their own /urgent-requests/[slug] page
// unless a database row with the same slug exists, which takes precedence.
export const FEATURED_REQUESTS = [
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
