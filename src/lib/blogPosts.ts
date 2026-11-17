// Blog posts stored in the code (added weekly by the Chief of Staff growth task — see ops/growth-log.md).
// Posts created in the admin (Supabase `blog_posts` table) are shown too; both lists are merged on /blog.
//
// `content` format (same as admin posts): paragraphs separated by a blank line.
// "## " = heading, "### " = sub-heading, lines starting "- " = bullet list, **bold**, [link text](/path).

export interface StaticBlogPost {
  id: string
  slug: string
  title: string
  seo_title: string
  seo_description: string
  excerpt: string
  featured_image_url: string
  image_alt: string
  author: string
  category: string
  published_at: string
  tags: string[]
  /** Page people should share from the "How you can help" box (defaults to the post itself). */
  share_url?: string
  share_text: string
  /** false on posts about William: his ask is a living donor, never money. */
  show_donate: boolean
  /** Related pages linked under the post. */
  related: { href: string; label: string }[]
  content: string
}

export const STATIC_BLOG_POSTS: StaticBlogPost[] = [
  {
    id: 'static-2026-11-17-william',
    slug: 'william-fritts-3-year-old-needs-a-living-kidney-donor',
    title: 'William Is 3 Years Old and Needs a Living Kidney Donor',
    seo_title: '3-Year-Old William Fritts Needs a Living Kidney Donor (Type O)',
    seo_description:
      'William, almost 3, has end-stage kidney disease and does 10 hours of dialysis every night. Learn who could be his living kidney donor and how sharing helps.',
    excerpt:
      'William loves Bluey, bubbles and trips to the park. He also does 10 hours of dialysis every night. His family says a living donor may be his best chance.',
    featured_image_url: 'https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/william-banner.jpg',
    image_alt: 'William Fritts, age 3, who needs a living kidney donor',
    author: 'Save One Person',
    category: 'Urgent Request',
    published_at: '2026-11-17T12:00:00-05:00',
    tags: ['William Fritts', 'Living kidney donor', 'Pediatric kidney transplant', 'Type O donor', 'Paired exchange'],
    share_url: 'https://www.saveonepersonnow.org/help-william',
    share_text: '3-year-old William needs a living kidney donor. Could it be you? Please share:',
    show_donate: false,
    related: [
      { href: '/help-william', label: 'Help William find his donor' },
      { href: '/urgent-requests/help-william-find-a-living-kidney-donor', label: 'William’s full story' },
      { href: '/living-kidney-donation-myths-facts', label: 'Myth vs Fact: Living Kidney Donation' },
      { href: '/become-a-donor', label: 'Join our living kidney donor list' },
      { href: '/success-stories', label: 'Success stories' },
    ],
    content: `William Fritts loves Mickey Mouse and Bluey. He loves stickers, bubbles and trips to the park. He loves reading, eating fries, being outside, and playing with his brothers, his baby sister and the family dog. He is almost 3 years old.

He also has end-stage kidney disease, and he needs a living kidney donor.

## A tiny fighter from day one

William was born at 30 weeks, weighing just 3 pounds, 13 ounces. He arrived alongside his twin brother, Beau. When William was only 3 days old, doctors diagnosed him with a posterior urethral valve (PUV) obstruction. It led to end-stage kidney disease.

Since then, his family has built their days and nights around keeping him well.

## What an ordinary day looks like for William

- **10 hours of dialysis every night.** William receives continuous cycling peritoneal dialysis at home while he sleeps.
- **A G-tube** that helps with his nutrition.
- **10 medications every day.**
- **Three specialists** and many appointments each month.

Through all of it, he is still a little boy who would rather be at the park blowing bubbles.

## Why a living donor matters so much

William has been on the deceased donor waiting list since October 17, 2025. His family was recently told that finding a living donor may be their best chance of getting him the kidney he needs.

A living donor is a healthy person who gives one of their two kidneys while they are alive. Most people can live a full, healthy life with one kidney. The patient's transplant center does all of the testing and makes every medical decision, usually at no cost to the donor, and a potential donor can stop at any time. If you have medical questions, the transplant team is the right place to ask them.

## Could you be William's match?

William's family is looking for a healthy potential donor who has:

- **Type O blood**
- **An age under 55**
- **A BMI below 30**

If that sounds like you, you can ask about match testing by emailing William's living donor team at [kidneylivingdonor@kumc.edu](mailto:kidneylivingdonor@kumc.edu). Asking questions does not commit you to anything.

## You don't have to be a match to help

Not type O? Don't rule yourself out. Through **paired kidney exchange**, a donor who isn't a match for William can still help him get a kidney. You give a kidney to a patient who matches you, and in return a donor who matches William gives to him. Ask the transplant team about paired exchange when you reach out.

Paired exchange can create a chain of transplants. When Bonnie LaRossa saw a Save One Alert on PIX11, she entered a kidney swap program, and [8 lives were saved](/success-stories/bonnie-watches-save-one-alert-on-pix11-and-enters-kidney-swap-program-8-lives-saved).

## A share can be the miracle

Many of our success stories started the same way: someone saw a story on TV, on the radio or online, and reached out. Sara watched TV, [saw a man who needed to be saved, and saved a life](/success-stories/sara-watches-tv-sees-a-man-who-needs-to-be-saved-and-saves-a-life). Tami [read a Save One Alert and saved John's life](/success-stories/john-gets-his-life-saved-by-tami-after-she-reads-save-one-alert).

William's donor might not be you. But it might be your neighbor, your coworker, your cousin, or someone in your church or synagogue. They will only find out about William if someone tells them. Nickelodeon and SNL star Madisyn Shipman is helping share his story. You can watch her message on [William's page](/help-william).

## Easy ways to share William's story

- Post **saveonepersonnow.org/help-william** on Facebook, Instagram, X or WhatsApp.
- Text it to friends and family, especially anyone who knows they have type O blood.
- Ask your church, synagogue, school or workplace to include William in their newsletter.
- Ask your local TV station, radio station or newspaper to cover his story.

At Save One Person, we believe no one should die because their story wasn't told. Please help tell William's.`,
  },
]

export function getStaticBlogPost(slug: string) {
  return STATIC_BLOG_POSTS.find((p) => p.slug === slug)
}
