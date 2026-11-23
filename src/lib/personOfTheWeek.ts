// The "Person of the Week" pop-up shown on every public page (src/components/ui/PersonOfTheWeekPopup.tsx).
// Updated every Monday by the Chief of Staff scheduled task — see ops/CHIEF_OF_STAFF.md.
// To change who is featured: edit these fields. `weekOf` must change each week so visitors see the new pop-up.
// Set `enabled: false` to turn the pop-up off.
export const PERSON_OF_THE_WEEK = {
  enabled: true,
  weekOf: '2026-11-23',
  name: 'William Fritts',
  headline: '3-year-old William needs a living kidney donor.',
  detail: 'End-stage kidney disease. One person could give him his childhood back.',
  slug: 'help-william-find-a-living-kidney-donor',
  image: 'https://kglvtgohmfulykkspfmj.supabase.co/storage/v1/object/public/site-assets/william-banner.jpg',
}
