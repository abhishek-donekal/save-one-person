import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "stalwart-puffpuff-744c94.netlify.app" },
      { protocol: "https", hostname: "saveoneperson.org" },
      { protocol: "https", hostname: "www.saveoneperson.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.supabase.in" },
      { protocol: "https", hostname: "saveonepersonnow.org" },
      { protocol: "https", hostname: "www.saveonepersonnow.org" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      // ---- Static WordPress pages -> new IA ----
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/ambassadors", destination: "/", permanent: false }, // Ambassadors page taken down
      { source: "/mission", destination: "/about", permanent: true },
      { source: "/medical-miracles-needed", destination: "/about", permanent: true },
      { source: "/organ-donation", destination: "/success-stories", permanent: true },
      { source: "/inspirational-stories", destination: "/success-stories", permanent: true },
      { source: "/succes-stories", destination: "/success-stories", permanent: true }, // old misspelling
      { source: "/volunteer-details", destination: "/", permanent: false },
      { source: "/volunteers", destination: "/contact", permanent: true },
      { source: "/media-articles", destination: "/media", permanent: true },
      { source: "/in-the-media", destination: "/media", permanent: true },
      { source: "/press", destination: "/media", permanent: true },
      { source: "/get-involved", destination: "/contact", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/blog", destination: "/success-stories", permanent: false }, // temp: blog_posts empty; /blog notFound()s otherwise
      { source: "/news", destination: "/success-stories", permanent: true },

      // ---- Urgent request patient posts (old root slug -> /urgent-requests/:slug) ----
      { source: "/10-year-old-from-wi-needs-a-living-kidney-donor", destination: "/urgent-requests/10-year-old-from-wi-needs-a-living-kidney-donor", permanent: true },
      { source: "/10-year-old-rachel-needs-a-bone-marrow-match", destination: "/urgent-requests/10-year-old-rachel-needs-a-bone-marrow-match", permanent: true },
      { source: "/18-month-old-from-ne-needs-a-living-kidney-donor", destination: "/urgent-requests/18-month-old-from-ne-needs-a-living-kidney-donor", permanent: true },
      { source: "/25-year-old-lauren-from-ny-needs-a-living-kidney-donor", destination: "/urgent-requests/25-year-old-lauren-from-ny-needs-a-living-kidney-donor", permanent: true },
      { source: "/5-year-old-girl-needs-a-living-organ-donor", destination: "/urgent-requests/5-year-old-girl-needs-a-living-organ-donor", permanent: true },
      { source: "/amrit-from-england-needs-a-living-kidney-donor", destination: "/urgent-requests/amrit-from-england-needs-a-living-kidney-donor", permanent: true },
      { source: "/arizona-man-needs-a-living-kidney-donor", destination: "/urgent-requests/arizona-man-needs-a-living-kidney-donor", permanent: true },
      { source: "/austin", destination: "/urgent-requests/austin", permanent: true },
      { source: "/baby-oliver-has-cardiac-fibroma", destination: "/urgent-requests/baby-oliver-has-cardiac-fibroma", permanent: true },
      { source: "/baby-only-has-2-months-to-live-unless", destination: "/urgent-requests/baby-only-has-2-months-to-live-unless", permanent: true },
      { source: "/bluegrass-star-bradley-walker-needs-a-living-kidney-donor", destination: "/urgent-requests/bluegrass-star-bradley-walker-needs-a-living-kidney-donor", permanent: true },
      { source: "/brie-needs-a-living-kidney-donor", destination: "/urgent-requests/brie-needs-a-living-kidney-donor", permanent: true },
      { source: "/canadian-woman-needs-liver-donor", destination: "/urgent-requests/canadian-woman-needs-liver-donor", permanent: true },
      { source: "/cheryl-from-il-needs-a-living-kidney-donor", destination: "/urgent-requests/cheryl-from-il-needs-a-living-kidney-donor", permanent: true },
      { source: "/christopher-needs-a-living-kidney-donor", destination: "/urgent-requests/christopher-needs-a-living-kidney-donor", permanent: true },
      { source: "/christy-from-the-uk-needs-a-living-kidney-donor", destination: "/urgent-requests/christy-from-the-uk-needs-a-living-kidney-donor", permanent: true },
      { source: "/chuck-mcraney-from-mi-needs-a-living-liver-donor", destination: "/urgent-requests/chuck-mcraney-from-mi-needs-a-living-liver-donor", permanent: true },
      { source: "/colorado-man-needs-living-kidney-donor", destination: "/urgent-requests/colorado-man-needs-living-kidney-donor", permanent: true },
      { source: "/dave-eiffert-needs-a-living-kidney-donor", destination: "/urgent-requests/dave-eiffert-needs-a-living-kidney-donor", permanent: true },
      { source: "/double-tragedy-mother-and-son-in-law-from-ca-need-a-living-kidney-donor", destination: "/urgent-requests/double-tragedy-mother-and-son-in-law-from-ca-need-a-living-kidney-donor", permanent: true },
      { source: "/dwight-hesman-needs-a-living-kidney-donor", destination: "/urgent-requests/dwight-hesman-needs-a-living-kidney-donor", permanent: true },
      { source: "/emily-from-ny-needs-a-living-kidney-donor", destination: "/urgent-requests/emily-from-ny-needs-a-living-kidney-donor", permanent: true },
      { source: "/eric-from-ny-needs-living-kidney-donor", destination: "/urgent-requests/eric-from-ny-needs-living-kidney-donor", permanent: true },
      { source: "/former-football-star-needs-living-kidney-donor", destination: "/urgent-requests/former-football-star-needs-living-kidney-donor", permanent: true },
      { source: "/gabby-from-mi-needs-a-living-kidney-donor", destination: "/urgent-requests/gabby-from-mi-needs-a-living-kidney-donor", permanent: true },
      { source: "/haley-from-nc-needs-a-living-kidney-donor", destination: "/urgent-requests/haley-from-nc-needs-a-living-kidney-donor", permanent: true },
      { source: "/hara-needs-living-liver-donor", destination: "/urgent-requests/hara-needs-living-liver-donor", permanent: true },
      { source: "/help-love-survive", destination: "/urgent-requests/help-love-survive", permanent: true },
      { source: "/jo-needs-a-living-kidney-donor", destination: "/urgent-requests/jo-needs-a-living-kidney-donor", permanent: true },
      { source: "/joanna-from-florida-needs-a-living-kidney-donor", destination: "/urgent-requests/joanna-from-florida-needs-a-living-kidney-donor", permanent: true },
      { source: "/joseph-beverly-from-md-needs-a-living-kidney-donor", destination: "/urgent-requests/joseph-beverly-from-md-needs-a-living-kidney-donor", permanent: true },
      { source: "/kathie-from-wi-needs-a-living-kidney-donor", destination: "/urgent-requests/kathie-from-wi-needs-a-living-kidney-donor", permanent: true },
      { source: "/katie-brown-needs-a-living-kindey-donor", destination: "/urgent-requests/katie-brown-needs-a-living-kindey-donor", permanent: true },
      { source: "/kellie-from-in-needs-a-living-kidney-donor", destination: "/urgent-requests/kellie-from-in-needs-a-living-kidney-donor", permanent: true },
      { source: "/leah-from-ohio-needs-a-living-kidney-donor", destination: "/urgent-requests/leah-from-ohio-needs-a-living-kidney-donor", permanent: true },
      { source: "/lexi-from-wi-needs-a-living-kidney-donor", destination: "/urgent-requests/lexi-from-wi-needs-a-living-kidney-donor", permanent: true },
      { source: "/man-turns-his-vehicle-into-plea-for-survival", destination: "/urgent-requests/man-turns-his-vehicle-into-plea-for-survival", permanent: true },
      { source: "/marc-from-ny-needs-a-living-kidney-donor", destination: "/urgent-requests/marc-from-ny-needs-a-living-kidney-donor", permanent: true },
      { source: "/mark-from-maryland-needs-a-living-kidney-donor", destination: "/urgent-requests/mark-from-maryland-needs-a-living-kidney-donor", permanent: true },
      { source: "/mary-from-ga-needs-living-kidney-donor", destination: "/urgent-requests/mary-from-ga-needs-living-kidney-donor", permanent: true },
      { source: "/maryann-needs-a-living-kidney-donor", destination: "/urgent-requests/maryann-needs-a-living-kidney-donor", permanent: true },
      { source: "/max-from-indiana-needs-a-living-kidney-donor", destination: "/urgent-requests/max-from-indiana-needs-a-living-kidney-donor", permanent: true },
      { source: "/mom-of-two-needs-a-living-liver-donor", destination: "/urgent-requests/mom-of-two-needs-a-living-liver-donor", permanent: true },
      { source: "/montana-man-needs-living-kidney-donor", destination: "/urgent-requests/montana-man-needs-living-kidney-donor", permanent: true },
      { source: "/my-daughter-needs-a-living-kidney-donor", destination: "/urgent-requests/my-daughter-needs-a-living-kidney-donor", permanent: true },
      { source: "/new-orleans-teenager-needs-living-kidney-donor", destination: "/urgent-requests/new-orleans-teenager-needs-living-kidney-donor", permanent: true },
      { source: "/nj-man-needs-living-kidney-donor", destination: "/urgent-requests/nj-man-needs-living-kidney-donor", permanent: true },
      { source: "/pioneer-pig-transplant-recipient-needs-a-living-kidneyd-donor", destination: "/urgent-requests/pioneer-pig-transplant-recipient-needs-a-living-kidneyd-donor", permanent: true },
      { source: "/rachael-needs-a-living-kidney-donor", destination: "/urgent-requests/rachael-needs-a-living-kidney-donor", permanent: true },
      { source: "/rena-from-tn-needs-a-living-kidney-donor", destination: "/urgent-requests/rena-from-tn-needs-a-living-kidney-donor", permanent: true },
      { source: "/rick-from-colorado-needs-a-living-kidney-donor", destination: "/urgent-requests/rick-from-colorado-needs-a-living-kidney-donor", permanent: true },
      { source: "/sal-from-ct-needs-a-living-kidney-donor", destination: "/urgent-requests/sal-from-ct-needs-a-living-kidney-donor", permanent: true },
      { source: "/samantha-has-ehlers-danos-syndrome", destination: "/urgent-requests/samantha-has-ehlers-danos-syndrome", permanent: true },
      { source: "/sharon-from-ri-needs-a-living-kidney-donor", destination: "/urgent-requests/sharon-from-ri-needs-a-living-kidney-donor", permanent: true },
      { source: "/takara-from-virginia-needs-a-living-kidney-donor", destination: "/urgent-requests/takara-from-virginia-needs-a-living-kidney-donor", permanent: true },
      { source: "/teen-from-nj-needs-a-living-kidney-donor", destination: "/urgent-requests/teen-from-nj-needs-a-living-kidney-donor", permanent: true },
      { source: "/texas-woman-needs-living-kidney-donor", destination: "/urgent-requests/texas-woman-needs-living-kidney-donor", permanent: true },
      { source: "/virginia-man-needs-a-living-kidney-donor", destination: "/urgent-requests/virginia-man-needs-a-living-kidney-donor", permanent: true },

      // ---- Success story posts (old root slug -> /success-stories/:slug) ----
      { source: "/1010-wins-radio-picks-up-save-one-alert-and-stuart-gets-a-kidney", destination: "/success-stories/1010-wins-radio-picks-up-save-one-alert-and-stuart-gets-a-kidney", permanent: true },
      { source: "/adam-saved-seven-lives", destination: "/success-stories/adam-saved-seven-lives", permanent: true },
      { source: "/bonnie-larossa-saved-8-lives-kidney-swap", destination: "/success-stories/bonnie-larossa-saved-8-lives-kidney-swap", permanent: true },
      { source: "/bonnie-watches-save-one-alert-on-pix11-and-enters-kidney-swap-program-8-lives-saved", destination: "/success-stories/bonnie-watches-save-one-alert-on-pix11-and-enters-kidney-swap-program-8-lives-saved", permanent: true },
      { source: "/donor-match-for-dr-ronald-richman-md", destination: "/success-stories/donor-match-for-dr-ronald-richman-md", permanent: true },
      { source: "/father-gets-his-baby-support-through-pix-11-picking-up-save-one-alert", destination: "/success-stories/father-gets-his-baby-support-through-pix-11-picking-up-save-one-alert", permanent: true },
      { source: "/frank-found-an-organ-donor", destination: "/success-stories/frank-found-an-organ-donor", permanent: true },
      { source: "/jersey-boy-saves-his-own-life-then-many-others", destination: "/success-stories/jersey-boy-saves-his-own-life-then-many-others", permanent: true },
      { source: "/john-gets-his-life-saved-by-tami-after-she-reads-save-one-alert", destination: "/success-stories/john-gets-his-life-saved-by-tami-after-she-reads-save-one-alert", permanent: true },
      { source: "/marisa-gives-kidney-to-a-stranger", destination: "/success-stories/marisa-gives-kidney-to-a-stranger", permanent: true },
      { source: "/noah-gets-a-liver", destination: "/success-stories/noah-gets-a-liver", permanent: true },
      { source: "/pix-11-save-one-alert-will-living-liver-donor", destination: "/success-stories/pix-11-save-one-alert-will-living-liver-donor", permanent: true },
      { source: "/rebeccas-legacy-bone-marrow-kits-dmv", destination: "/success-stories/rebeccas-legacy-bone-marrow-kits-dmv", permanent: true },
      { source: "/sara-toffoli-gave-kidney-to-torrey-greene", destination: "/success-stories/sara-toffoli-gave-kidney-to-torrey-greene", permanent: true },
      { source: "/sara-watches-tv-sees-a-man-who-needs-to-be-saved-and-saves-a-life", destination: "/success-stories/sara-watches-tv-sees-a-man-who-needs-to-be-saved-and-saves-a-life", permanent: true },
      { source: "/save-one-alert-saves-another-child", destination: "/success-stories/save-one-alert-saves-another-child", permanent: true },
      { source: "/shlomo-got-his-miracle-a-liver", destination: "/success-stories/shlomo-got-his-miracle-a-liver", permanent: true },
      { source: "/this-doctor-saved-lives-now-someone-saved-his-life", destination: "/success-stories/this-doctor-saved-lives-now-someone-saved-his-life", permanent: true },
      { source: "/torrey-greene-life-saved-by-stranger-kidney", destination: "/success-stories/torrey-greene-life-saved-by-stranger-kidney", permanent: true },
      { source: "/torrey-receives-a-living-kidney-donor-from-a-complete-stranger", destination: "/success-stories/torrey-receives-a-living-kidney-donor-from-a-complete-stranger", permanent: true },

      // ---- Numeric WordPress junk slugs (e.g. /17083-2, /17079-2) -> home ----
      { source: "/:junk(\\d+-\\d+)", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
