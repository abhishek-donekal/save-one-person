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
    id: 'static-2026-11-25-how-to-pray-for-a-miracle',
    slug: 'how-to-pray-for-a-miracle',
    title: 'How to Pray for a Miracle: 5 Simple Steps From Someone Who Has Seen Them Happen',
    seo_title: 'How to Pray for a Miracle: 5 Simple Steps',
    seo_description:
      'Need a miracle? Here is a simple, practical way to pray for one, from Lauren Finkelstein, founder of Save One Person, who has watched strangers become living kidney donors.',
    excerpt:
      'You don’t need special words or a special place to pray for a miracle. Here are five simple steps, and the true story of a prayer that found a living kidney donor.',
    featured_image_url: 'https://www.saveonepersonnow.org/images/miracles-light.jpg',
    image_alt: 'Warm light shining through, a symbol of hope and miracles',
    author: 'Lauren Finkelstein',
    category: 'Miracles',
    published_at: '2026-11-25T12:00:00-05:00',
    tags: ['Prayer', 'Miracles', 'Faith', 'Hope', 'How to Create a Miracle'],
    share_text: 'Need a miracle? This simple way to pray for one might help someone you love:',
    show_donate: true,
    related: [
      { href: '/miracle-course/free-lesson', label: 'Free lesson: Day 1 of How to Create a Miracle' },
      { href: '/miracle-course', label: 'The 12-day online course: How to Create a Miracle' },
      { href: '/success-stories', label: 'Real miracles from Save One Person' },
      { href: '/urgent-requests', label: 'People who need a miracle right now' },
    ],
    content: `Most of us start praying for a miracle the same way: late at night, scared, asking for everything at once. That's human. But over years of helping people find living kidney donors through the media, I've noticed that the people who receive miracles often pray in a particular way: clearly, honestly, and with their sleeves rolled up.

Here is a simple way to pray for a miracle, whatever your faith or tradition.

## 1. Say exactly what you need

A miracle starts with a clear request. Instead of "please let things get better," finish this sentence: **"Please help me with..."** Keep rewriting it until it's one specific sentence. When you name what you need, you stop drifting and start moving toward it.

## 2. Speak honestly, the way you'd talk to someone who loves you

You don't need special words or a special place. Speak to G-d, to the universe, or to whatever you feel is bigger than you. Say what scares you. Say what you want. Prayer isn't a performance; it's a conversation.

## 3. Add a promise: "And I will do my part by..."

Heshy Fellig needed a living kidney donor and couldn't find one. He flew to the Holy Land to pray at the graves of righteous souls. Then he kept doing his part. Soon after, a Save One Person alert about him ran in an email called Joke of the Day, and a Catholic woman from Alabama who had never met a Jew became his living kidney donor.

Prayer and action aren't opposites. They are two hands clapping. Write down one thing you will do this week, then do it.

## 4. Hand over what you can't control

Part of prayer is letting go. You give the part you can't control to something bigger, so you can put your full energy into the part you can. Many people describe a calm that arrives before anything outside them changes. That calm is the ground you stand on while you wait.

## 5. Pray for someone else's miracle too

The surest way to find a miracle is to be one for someone else. Pick one person who is struggling and pray for them by name. Tell them you're praying for them. Better yet, ask what they need.

## A simple practice for the next 12 days

- Sit quietly for three minutes with a hand on your heart.
- Say your one-sentence request out loud.
- Add: "And I will do my part by..."
- Do one small action before bed.

This is Day 1 of my 12-day online course, **How to Create a Miracle**. You can [try the Day 1 lesson free](/miracle-course/free-lesson), or [see the full course](/miracle-course).

## If you know someone who needs a miracle

Save One Person shares the stories of people who need a living organ donor or a medical miracle, so the person who can save them finds out. [Read this week's urgent requests](/urgent-requests) and share one story with three people. That's a prayer with legs.`,
  },
  {
    id: 'static-2026-11-25-how-to-keep-hope',
    slug: 'how-to-keep-hope-when-someone-you-love-is-sick',
    title: 'How to Keep Hope When Someone You Love Is Sick',
    seo_title: 'How to Keep Hope When Someone You Love Is Sick',
    seo_description:
      'When someone you love is seriously ill, hope can feel impossible. Here are gentle, practical ways to hold on to hope, from the founder of Save One Person.',
    excerpt:
      'When someone you love is seriously ill, hope can feel foolish. It isn’t. Here are practical ways to hold on to it, and why sometimes hope is the most realistic thing you have.',
    featured_image_url: 'https://www.saveonepersonnow.org/images/og-miracles.jpg',
    image_alt: 'Save One Person: miracles happen when one story is shared',
    author: 'Lauren Finkelstein',
    category: 'Miracles',
    published_at: '2026-11-25T12:00:00-05:00',
    tags: ['Hope', 'Caregivers', 'Faith', 'Miracles', 'Living donors'],
    share_text: 'For anyone with a loved one who is sick right now, this is worth reading:',
    show_donate: true,
    related: [
      { href: '/miracle-course/free-lesson', label: 'Free lesson: Day 1 of How to Create a Miracle' },
      { href: '/miracle-course', label: 'The 12-day online course: How to Create a Miracle' },
      { href: '/urgent-requests/submit', label: 'Does your loved one need a living donor? Tell us their story' },
      { href: '/blog/how-to-find-a-living-kidney-donor', label: 'How to find a living kidney donor' },
    ],
    content: `When someone you love is seriously ill, the days get long and the news can be hard. People may tell you to "be realistic." Some may even tell you to stop hoping.

A doctor once told me that families of patients in a coma should stop hoping and let go. A week later, the woman translating a class for me hugged her seven-year-old son and said, "He was in a coma for several months, and now he's back with me. He's my miracle child." I've never forgotten it.

Hope isn't the same as denial. You can listen carefully to the doctors, make hard decisions, and still hold on to hope. Here are some ways that help.

## Feed your hope on purpose

Fear and hope are both stories about a future that hasn't happened yet. Since you're telling yourself a story either way, choose one that gives you strength. Collect true stories of people who recovered or received a miracle, and read them when doubt creeps in. Limit the scary late-night searching.

## Do one thing, then the next thing

Looking at the whole mountain is overwhelming. Look at the next step instead: one phone call, one question for the medical team, one person to ask for help. Small actions turn helpless waiting into hopeful doing.

## Use your voice

Ask the extra question. Ask for a second opinion if you want one. If your loved one needs a living kidney donor, tell their story. Many living donors are found because someone was willing to share. Save One Person can help: [tell us their story](/urgent-requests/submit).

## Let yourself have a moment of joy

It can feel wrong to laugh when someone you love is sick. But joy refuels you so you can keep going. One song, one funny show, one walk outside. You're allowed.

## Don't do it alone

Ask friends to take on specific jobs: meals, rides, sharing a story online, sitting with you in the waiting room. People want to help; they're waiting to be asked.

## Notice the miracles you already have

Even in the hardest seasons, there are small miracles: a kind nurse, a good day, a stranger who offers to help. Write three down each night. Gratitude doesn't replace hope; it keeps you steady while you hope.

## A 12-day path for hard times

I put everything I've learned about miracles into a 12-day online course, **How to Create a Miracle**: a short lesson, a practice and a few journal questions each day. [Try Day 1 free](/miracle-course/free-lesson), or [see the full course](/miracle-course).

*If you or someone you love is struggling emotionally, please reach out to a doctor, counselor or someone you trust. You don't have to carry this alone.*`,
  },
  {
    id: 'static-2026-11-24-how-living-donation-works',
    slug: 'how-living-kidney-donation-works',
    title: 'How Living Kidney Donation Works: From the First Phone Call to Recovery',
    seo_title: 'How Living Kidney Donation Works: Steps, Surgery, Recovery',
    seo_description:
      'Thinking about donating a kidney? Here is how living kidney donation works, step by step: the first call, the donor evaluation, surgery, recovery, costs and follow-up.',
    excerpt:
      'What actually happens when you offer to donate a kidney? A plain-language walk through every step, from your first call to a transplant center to life after donation.',
    featured_image_url: 'https://www.saveonepersonnow.org/images/miracles-happen.jpg',
    image_alt: 'Two people joined by a glowing heart with wings: one story shared, one living donor found, one life saved',
    author: 'Save One Person',
    category: 'Living Donation',
    published_at: '2026-11-24T12:00:00-05:00',
    tags: ['Living kidney donation', 'Kidney donor evaluation', 'Donor surgery', 'Donor recovery', 'Paired exchange'],
    share_text: 'Ever wondered how living kidney donation actually works? This simple step-by-step guide explains it:',
    show_donate: true,
    related: [
      { href: '/become-a-donor', label: 'Join our living kidney donor list' },
      { href: '/living-kidney-donation-myths-facts', label: 'Myth vs Fact: Living Kidney Donation' },
      { href: '/blog/how-to-find-a-living-kidney-donor', label: 'How to find a living kidney donor' },
      { href: '/help-william', label: 'Could you be 3-year-old William’s donor?' },
      { href: '/faq', label: 'Living donor FAQ' },
    ],
    content: `This Thanksgiving, many of us will sit around a table and give thanks for the people we love. For thousands of families, there is one more thing they are hoping for: a kidney. More than 94,000 people in the United States are waiting for a kidney transplant, and a **living donor** is often their fastest path to one.

Most people have never been asked to think about living donation, so it can feel mysterious or scary. Here is what really happens, step by step, in plain language.

## Step 1: The first call (no commitment)

It starts with a phone call or an online form. You contact the **transplant center** where the patient is listed (or, if you want to give to anyone who needs it, a transplant center near you). Usually you answer a confidential health history questionnaire first.

Making that first call does **not** commit you to anything. As NewYork-Presbyterian puts it, going through the evaluation "doesn't mean potential donors are committing to donate." You can stop at any point.

## Step 2: The donor evaluation

If the questionnaire looks good, the center invites you for a full evaluation. According to the [National Kidney Foundation](https://www.kidney.org/kidney-topics/living-kidney-donor-evaluation), most living donor evaluations take about two days. It usually includes:

- **Blood and urine tests** to check your kidney function, blood type and overall health
- **Imaging**, such as a CT scan, so the surgeons can see your kidneys
- **Heart and lung checks**, such as an EKG and a chest X-ray
- **Meetings with the team**: a nurse coordinator, a kidney doctor, a surgeon, a social worker and a financial coordinator

You will also meet an **Independent Living Donor Advocate**. This person is on **your** side, not the patient's. Their job is to make sure your rights as a donor are protected and that your decision is truly yours.

Then a selection committee reviews everything and decides whether donating is safe for you. That decision protects you first.

## Step 3: Not a match? You can still help

Many willing donors learn they are not a match for the person they wanted to help. That is not the end of the story. Through **paired kidney exchange**, you donate to a stranger who matches you, and a donor who matches your loved one gives to them. These swaps can form chains that save several lives.

When Bonnie LaRossa saw a Save One Alert on PIX11, she entered a kidney swap program, and [8 lives were saved](/success-stories/bonnie-watches-save-one-alert-on-pix11-and-enters-kidney-swap-program-8-lives-saved).

## Step 4: The surgery

Almost every living kidney donor today has a **laparoscopic nephrectomy**, a surgery done through small incisions. [University of Utah Health](https://healthcare.utah.edu/transplant/living-donor/kidney/surgery) says the operation usually lasts three to five hours, and most donors stay in the hospital for one to three days.

## Step 5: Recovery

Recovery is different for everyone, and your own surgeon will give you instructions. University of Utah Health tells donors to take it easy for two to three weeks after they go home, and says full recovery usually takes up to four weeks. Most people live full, healthy lives with one kidney.

## Step 6: Follow-up care

Transplant centers check on donors after surgery, typically with visits at about six months, one year and two years. After that, you keep seeing your own doctor every year, like anyone else.

## What about the cost?

Donors often worry about money. In most cases the **recipient's insurance** pays for the donor's evaluation, surgery and hospital stay. The [National Living Donor Assistance Center](https://livingdonorassistance.org/How-to-Apply/How-NLDAC-Helps) can help eligible donors with travel, lost wages and dependent care. Ask the center's financial coordinator what applies to you.

Remember: buying or selling organs is illegal. Living donation is always a gift.

## Who is waiting right now

Three-year-old [William Fritts](/help-william) does 10 hours of dialysis every night and needs a living kidney donor with type O blood. [Karen Zabriskie](/urgent-requests/karen-zabriskie), 56, has lived with polycystic kidney disease since she was 17 and is also hoping for a living donor. You can read their stories and many more on our [Urgent Requests](/urgent-requests) page.

## A conversation worth having at the table

You don't have to decide anything today. But this Thanksgiving, you could talk about it. Ask your family if they've ever thought about living donation. Share this article. One conversation, one share, could reach the person who becomes someone's miracle.

At Save One Person, we believe no one should die because their story wasn't told.

This article is for general information and is not medical advice. Every transplant center has its own rules, so always talk with a transplant center about your situation.`,
  },
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
      { href: '/blog/how-living-kidney-donation-works', label: 'How living kidney donation works, step by step' },
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
