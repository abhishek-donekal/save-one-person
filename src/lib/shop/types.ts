export type ShopVariant = {
  id: string
  shopify_id: number | null
  title: string | null
  option1: string | null
  option2: string | null
  option3: string | null
  sku: string | null
  price: number
  compare_at_price: number | null
  available: boolean
  requires_shipping: boolean
  taxable: boolean
  position: number
}

export type ShopImage = {
  id: string
  url: string
  alt: string | null
  width: number | null
  height: number | null
  position: number
}

export type ShopProduct = {
  id: string
  handle: string
  title: string
  body_html: string | null
  description_text: string | null
  vendor: string | null
  product_type: string | null
  tags: string[]
  options: { name: string; values: string[] }[]
  featured: boolean
  position: number
  seo_title: string | null
  seo_description: string | null
  variants: ShopVariant[]
  images: ShopImage[]
}

export type CartLine = {
  productId: string
  variantId: string
  shopifyVariantId: number | null
  handle: string
  title: string
  variantTitle: string | null
  price: number
  image: string | null
  quantity: number
  requiresShipping: boolean
}
