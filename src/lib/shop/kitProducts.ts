// Items sold through Kit checkout (Stripe), not Shopify.
export const MONTHLY_GIFTS = [
  { amount: 10, url: 'https://save-one-person-inc.kit.com/products/miracle-maker-10', impact: 'Shares a patient’s story every month' },
  { amount: 25, url: 'https://save-one-person-inc.kit.com/products/miracle-maker-25', impact: 'Sends stories to news outlets every month' },
  { amount: 50, url: 'https://save-one-person-inc.kit.com/products/miracle-maker-50', impact: 'Helps put a patient on TV or radio' },
]
export const MIRACLE_EBOOK_URL = 'https://save-one-person-inc.kit.com/products/how-to-create-a-miracle-pdf'
export const DONOR_KIT_URL = 'https://save-one-person-inc.kit.com/products/find-a-living-kidney-donor-kit'
export const ANY_AMOUNT_DONATION_URL = 'https://save-one-person-inc.kit.com/products/donate-any-amount'
export const WORKBOOK_URL = 'https://save-one-person-inc.kit.com/products/miracle-workbook'
// Amazon pages for Lauren's books (paperback and Kindle), keyed by shop handle.
export const AMAZON_BOOKS: Record<string, string> = {
  'a-practical-guide-to-turn-the-impossible-possible': 'https://www.amazon.com/dp/B0DHLXRTPG',
  'is-there-a-god-one-womans-fast-track-to-the-divine-from-despair-to-bliss-without-drugs': 'https://www.amazon.com/dp/B0FKN4K9J3',
}
