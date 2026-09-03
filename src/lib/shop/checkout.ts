import type { CartLine } from './types'

const SHOP_DOMAIN = 'save-one-person.myshopify.com'

// Shopify donation product variant IDs (from the migrated tax-deductible-donation product)
export const DONATION_VARIANTS: { amount: number; shopifyId: number }[] = [
  { amount: 25, shopifyId: 31654608994389 },
  { amount: 50, shopifyId: 31654609125461 },
  { amount: 75, shopifyId: 31654609715285 },
  { amount: 100, shopifyId: 31654611746901 },
  { amount: 250, shopifyId: 31654612893781 },
  { amount: 500, shopifyId: 31654613155925 },
  { amount: 1000, shopifyId: 31654613352533 },
  { amount: 2500, shopifyId: 31654614761557 },
  { amount: 5000, shopifyId: 31654614958165 },
  { amount: 10000, shopifyId: 31654615285845 },
]

/**
 * Build a Shopify checkout permalink from cart lines. Shopify's secure checkout
 * accepts PayPal, cards, Apple Pay, and Google Pay. Any line missing a Shopify
 * variant id is skipped (shouldn't happen for migrated products).
 * Format: https://{shop}/cart/{variantId}:{qty},{variantId}:{qty}?...
 */
export function shopifyCheckoutUrl(lines: CartLine[]): string | null {
  const parts = lines
    .filter((l) => l.shopifyVariantId)
    .map((l) => `${l.shopifyVariantId}:${l.quantity}`)
  if (parts.length === 0) return null
  return `https://${SHOP_DOMAIN}/cart/${parts.join(',')}`
}

/** Donation checkout: pick the nearest available donation tier at or below the amount. */
export function donationCheckoutUrl(amount: number): string | null {
  if (!amount || amount < 25) return null
  // exact match first, else nearest tier <= amount, else smallest
  const exact = DONATION_VARIANTS.find((v) => v.amount === amount)
  const chosen =
    exact ||
    [...DONATION_VARIANTS].reverse().find((v) => v.amount <= amount) ||
    DONATION_VARIANTS[0]
  return `https://${SHOP_DOMAIN}/cart/${chosen.shopifyId}:1`
}
