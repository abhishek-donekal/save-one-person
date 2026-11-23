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
    id: 'static-2026-11-23-find-living-kidney-donor',
    slug: 'how-to-find-a-living-kidney-donor',
    title: 'How to Find a Living Kidney Donor: A Step-by-Step Guide for Patients and Families',
    seo_title: 'How to Find a Living Kidney Donor (Step-by-Step Guide)',
    seo_description:
      'Practical steps to find a living kidney donor: talk to your transplant center, choose a donor champion, share your story safely, use paired exchange, and know what donors pay (usually nothing).',
    excerpt:
      'Asking someone for a kidney is the hardest ask there is. These are the steps that work, from your transplant center to your story going public, plus what living donors need to know.',
    featured_image_url: 'https://www.saveonepersonnow.org/images/miracles-light.jpg',
    image_alt: 'A heart surrounded by a phone, newspaper, TV and microphone: sharing a story to find a living donor',
    author: 'Save One Person',
    category: 'Living Donation',
    published_at: '2026-11-23T12:00:00-05:00',
    tags: ['Living kidney donor', 'How to find a donor', 'Donor champion', 'Paired exchange', 'Kidney transplant'],
    share_text: 'Need a living kidney donor, or know someone who does? This step-by-step guide can help:',
    show_donate: true,
    related: [
      { href: '/ready-to-help', label: 'Join the Ready to Help list' },
      { href: '/urgent-requests/submit', label: 'Ask Save One Person to share your story' },
      { href: '/living-kidney-donation-myths-facts', label: 'Myth vs Fact: Living Kidney Donation' },
      { href: '/become-a-donor', label: 'Become a living kidney donor' },
      { href: '/success-stories', label: 'Success stories' },
    ],
    content: `More than 94,000 people in the United States are waiting for a kidney transplant ([HRSA/OPTN data, January 2026](https://hrsa.unos.org/data)). Many will wait years for a kidney from a deceased donor. A **living donor** can change that: a healthy person gives one of their two kidneys, and the patient can get a transplant much sooner. In 2025, [7,237 people became living organ donors](https://unos.org/?p=321603) in the U.S.

But the hardest part is often the ask itself. Some patients say finding a donor is harder than the transplant. Here are the steps that work.

## 1. Start with your transplant center

Before you ask anyone, get evaluated and listed at a transplant center, and ask to meet its **living donor coordinator**. They will tell you:

- What a donor for you would need (for example, blood type and health requirements)
- How potential donors contact the center confidentially
- The center's policy on donors who find you through social media or the news

All testing, matching and medical decisions are made by the transplant center, never by the patient or by Save One Person. That protects both you and your donor.

## 2. Choose a donor champion

Many people never ask a single person, because it feels impossible to ask for yourself. A **donor champion** is a family member or friend who asks for you. They learn the basics of living donation, share your story, answer simple questions, and point people to your transplant center. It is often easier for a champion to say "my friend needs a kidney" than for you to say "I need yours."

## 3. Tell your story, and make it easy to act on

People respond to people, not statistics. A good story includes:

- **Who you are**: your name, a photo, your family, what you love
- **What you need**: a living kidney donor, and your blood type if your center says it helps
- **How to help**: the transplant center's living donor phone number or email. Share the center's contact, not your personal phone number.
- **A link** people can share

Then share it everywhere you belong: Facebook, Instagram, WhatsApp groups, your church or synagogue bulletin, your workplace newsletter, your kids' school, your alumni group. Every share reaches a new circle.

**Be careful:** buying or selling organs is illegal. If anyone offers you a kidney for money, don't engage, and tell your transplant center.

## 4. Take your story to the media

TV, radio and newspapers reach people your social circle never will. When FOX 5 aired our Save One Alert for Elaine DeLeon, a mom in a desperate search for a living kidney donor, hundreds of people called in wanting to help her, so many that the hospital had to turn people away. When a living donor need is shared in the right place, people are ready and willing to help.

Local stations and newspapers look for human stories with a clear way to help. Save One Person was created to do exactly this: [tell us your story](/urgent-requests/submit) and we'll help share it.

## 5. Remember paired exchange

Many willing donors find out they aren't a match. That doesn't have to end it. Through **paired kidney exchange**, your donor gives a kidney to another patient who matches them, and in return you receive a kidney from a donor who matches you. Exchanges can create chains that save several lives. Ask your transplant center about it early.

## 6. What donors should know about cost

Donors often worry they can't afford it. In most cases:

- The **recipient's insurance** covers the donor's medical costs for evaluation and surgery.
- The federal [National Living Donor Assistance Center](https://livingdonorassistance.org/How-to-Apply/How-NLDAC-Helps) can help eligible donors with travel, lost wages and dependent care, up to $6,000.
- Donors who give through the National Kidney Registry's [Donor Shield](https://www.kidneyregistry.org/for-donors/kidney-donation-blog/donor-shield-and-nldac-who-offers-the-most-support-and-protections-for-kidney-donors/) program can get additional lost-wage reimbursement and protections.

Your transplant center's financial counselor can explain exactly what applies.

## Not a match? You can still save a life

If you stepped forward for someone and weren't the match, your kindness still matters. Join Save One Person's [Ready to Help list](/ready-to-help), and we'll reach out when the next patient needs a living donor. Joining never commits you to donate.

At Save One Person, we believe no one should die because their story wasn't told.

This article is for general information and is not medical advice. Always talk with a transplant center about your situation.`,
  },
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
