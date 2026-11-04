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

// Every tier is a multiple of $25, so any multiple of $25 can be charged exactly
// by combining tiers in one checkout.
export const DONATION_STEP = 25

/** The amount a donation is charged at: the entered amount rounded to the nearest $25 (at least $25). */
export function donationChargeAmount(amount: number): number {
  return Math.max(DONATION_STEP, Math.round(amount / DONATION_STEP) * DONATION_STEP)
}

/** Donation checkout for the charged amount, built from as few tier lines as possible. */
export function donationCheckoutUrl(amount: number): string | null {
  if (!amount || amount < DONATION_STEP) return null
  let remaining = donationChargeAmount(amount)
  const parts: string[] = []
  for (const v of [...DONATION_VARIANTS].sort((a, b) => b.amount - a.amount)) {
    const qty = Math.floor(remaining / v.amount)
    if (qty > 0) {
      parts.push(`${v.shopifyId}:${qty}`)
      remaining -= qty * v.amount
    }
  }
  return `https://${SHOP_DOMAIN}/cart/${parts.join(',')}`
}
