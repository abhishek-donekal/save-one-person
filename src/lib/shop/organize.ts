import type { ShopProduct } from './types'

// Shorter, clearer names for products imported with sentence-style titles.
const RENAME: Record<string, string> = {
  'tax-deductible donation to save a life.': 'Donate to Save a Life',
  'protecting your assets and legacy.': 'Asset & Legacy Protection',
  'coverage for long-term medical care': 'Long-Term Care Coverage',
  'mark jenkins — celebrity trainer & health coach.': 'Training with Mark Jenkins',
  'sara yardeni — integrative healer': 'Healing with Sara Yardeni',
  'tasty gummies loaded with nutrients.': 'Nutrient Gummies',
  'daily nutrition from 30 fruits, veggies & omegas.': 'Daily Whole-Food Nutrition',
  'nutrition counseling with our expert rdn doctor.': 'Nutrition Counseling with an RDN',
  'theta healing: transform beliefs to heal fully.': 'Theta Healing Session',
  'publicize your life-saving need- find your miracle match': 'Publicize Your Need: Find Your Miracle Match',
  "is there a god? one woman's fast track to the divine: from despair to bliss without drugs": "Is There a God? One Woman's Fast Track to the Divine",
}

export const SECTIONS = ['Give', 'Wear', 'Read', 'Healing & Wellness', 'Planning & Services'] as const
export type Section = (typeof SECTIONS)[number]

export function sectionOf(p: Pick<ShopProduct, 'title' | 'product_type' | 'tags'>): Section {
  const t = `${p.title} ${p.product_type || ''} ${(p.tags || []).join(' ')}`.toLowerCase()
  if (/donat/.test(t)) return 'Give'
  if (/apparel|t-shirt|tee\b/.test(t)) return 'Wear'
  if (/\bbook\b|brochure|guide|save me, save the world|is there a god/.test(t)) return 'Read'
  if (/publiciz|asset|legacy|long-term care|coverage|insurance/.test(t)) return 'Planning & Services'
  return 'Healing & Wellness'
}

export function renameTitle(title: string): string {
  return RENAME[title.trim().toLowerCase()] ?? title
}

/** Very high-priced programs stay reachable by link but are kept off the main shop list. */
export function hiddenFromList(p: ShopProduct): boolean {
  return p.variants.length > 0 && p.variants.every((v) => v.price >= 10000)
}
