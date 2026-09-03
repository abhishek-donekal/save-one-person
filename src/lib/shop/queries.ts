import { createClient } from '@/lib/supabase/server'
import type { ShopProduct } from './types'

const PRODUCT_SELECT = `
  id, handle, title, body_html, description_text, vendor, product_type, tags, options,
  featured, position, seo_title, seo_description,
  variants:shop_variants(id, shopify_id, title, option1, option2, option3, sku, price, compare_at_price, available, requires_shipping, taxable, position),
  images:shop_images(id, url, alt, width, height, position)
`

function normalize(rows: unknown[]): ShopProduct[] {
  return (rows as ShopProduct[]).map((p) => ({
    ...p,
    tags: p.tags || [],
    options: Array.isArray(p.options) ? p.options : [],
    variants: [...(p.variants || [])].sort((a, b) => a.position - b.position),
    images: [...(p.images || [])].sort((a, b) => a.position - b.position),
  }))
}

export async function getAllProducts(): Promise<ShopProduct[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('shop_products')
    .select(PRODUCT_SELECT)
    .eq('published', true)
    .order('position', { ascending: true })
  return normalize(data || [])
}

export async function getProductByHandle(handle: string): Promise<ShopProduct | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('shop_products')
    .select(PRODUCT_SELECT)
    .eq('handle', handle)
    .eq('published', true)
    .single()
  if (!data) return null
  return normalize([data])[0]
}

export async function getFeaturedProducts(): Promise<ShopProduct[]> {
  const all = await getAllProducts()
  return all.filter((p) => p.featured)
}

export function productMinPrice(p: ShopProduct): number {
  const prices = p.variants.map((v) => v.price).filter((n) => n > 0)
  return prices.length ? Math.min(...prices) : 0
}

export function productCompareAt(p: ShopProduct): number | null {
  const v = p.variants[0]
  return v?.compare_at_price && v.compare_at_price > v.price ? v.compare_at_price : null
}

export { formatPrice } from './format'
