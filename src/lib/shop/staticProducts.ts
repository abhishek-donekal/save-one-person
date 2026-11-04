import type { ShopProduct, ShopVariant, ShopImage } from './types'

// "Go Bless Yourself" collection, made by Printful and sold through Shopify checkout.
// shopify ids are the Shopify variant ids shown in Printful.

function variants(key: string, price: number, list: [string, number][]): ShopVariant[] {
  return list.map(([title, shopifyId], i) => ({
    id: `static-${key}-${title.toLowerCase().replace(/\s+/g, '-')}`,
    shopify_id: shopifyId,
    title,
    option1: title,
    option2: null,
    option3: null,
    sku: null,
    price,
    compare_at_price: null,
    available: true,
    requires_shipping: true,
    taxable: true,
    position: i,
  }))
}

function images(key: string, list: [string, string][]): ShopImage[] {
  return list.map(([url, alt], i) => ({ id: `static-${key}-img-${i}`, url, alt, width: 1200, height: 1200, position: i }))
}

const MISSION = 'Every purchase supports Save One Person, helping patients find the living donors they need.'

function product(p: {
  key: string; handle: string; title: string; position: number; optionName: string
  lead: string; bullets: string[]; v: ShopVariant[]; img: ShopImage[]
}): ShopProduct {
  return {
    id: `static-${p.key}`,
    handle: p.handle,
    title: p.title,
    body_html: `<p>${p.lead}</p><p>${MISSION}</p><ul>${p.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`,
    description_text: `${p.lead.replace(/<[^>]+>/g, '')} ${MISSION}`,
    vendor: 'Save One Person',
    product_type: 'Apparel',
    tags: ['go bless yourself', 'apparel'],
    options: [{ name: p.optionName, values: p.v.map((x) => x.title || '') }],
    featured: p.key === 'tee',
    position: p.position,
    seo_title: `${p.title} | Save One Person`,
    seo_description: `${p.lead.replace(/<[^>]+>/g, '')} ${MISSION}`,
    variants: p.v,
    images: p.img,
  }
}

export const STATIC_PRODUCTS: ShopProduct[] = [
  product({
    key: 'tee', handle: 'go-bless-yourself-t-shirt', title: 'Go Bless Yourself T-Shirt', position: -5, optionName: 'Size',
    lead: '<strong>GO BLESS YOURSELF</strong> on the front. Our blessing hand and <strong>BLESS YOU TOO</strong> on the back.',
    bullets: ['Soft 100% ring-spun cotton', 'Classic unisex fit', 'White, sizes XS to 5XL', 'Printed just for you when you order'],
    v: variants('gby', 42, [
      ['XS', 67815534002346], ['S', 67815534035114], ['M', 67815534067882], ['L', 67815534100650], ['XL', 67815534133418],
      ['2XL', 67815534166186], ['3XL', 67815534198954], ['4XL', 67815534231722], ['5XL', 67815534264490],
    ]),
    img: images('gby', [
      ['/images/shop/go-bless-yourself-front.jpg', 'White T-shirt, front: GO BLESS YOURSELF with a red heart'],
      ['/images/shop/go-bless-yourself-back.jpg', 'White T-shirt, back: blessing hand with a red heart, BLESS YOU TOO, SAVE ONE PERSON'],
    ]),
  }),
  product({
    key: 'hoodie', handle: 'go-bless-yourself-hoodie', title: 'Go Bless Yourself Hoodie', position: -4, optionName: 'Size',
    lead: '<strong>GO BLESS YOURSELF</strong> on the front. Our blessing hand and <strong>BLESS YOU TOO</strong> on the back.',
    bullets: ['Soft cotton-poly fleece', 'Front pouch pocket and roomy hood', 'White, sizes S to 5XL', 'Printed just for you when you order'],
    v: variants('hoodie', 58, [
      ['S', 67815643709610], ['M', 67815643742378], ['L', 67815643775146], ['XL', 67815643807914],
      ['2XL', 67815643840682], ['3XL', 67815643873450], ['4XL', 67815643906218], ['5XL', 67815643938986],
    ]),
    img: images('hoodie', [
      ['/images/shop/hoodie-front.jpg', 'White hoodie, front: GO BLESS YOURSELF with a red heart'],
      ['/images/shop/hoodie-back.jpg', 'White hoodie, back: blessing hand with a red heart, BLESS YOU TOO, SAVE ONE PERSON'],
    ]),
  }),
  product({
    key: 'hat', handle: 'go-bless-yourself-hat', title: 'Go Bless Yourself Hat', position: -3, optionName: 'Size',
    lead: '<strong>GO BLESS YOURSELF</strong>, embroidered in navy on a white dad hat, with our blessing hand stitched on the back.',
    bullets: ['100% cotton twill, soft and unstructured', 'Adjustable strap, one size fits most', 'Embroidered just for you when you order'],
    v: variants('hat', 36, [['One size', 67815635255466]]),
    img: images('hat', [['/images/shop/hat.jpg', 'White dad hat embroidered GO BLESS YOURSELF in navy'], ['/images/shop/hat-back.jpg', 'Back of the hat: embroidered blessing hand']]),
  }),
  product({
    key: 'tote', handle: 'go-bless-yourself-tote-bag', title: 'Go Bless Yourself Tote Bag', position: -2, optionName: 'Size',
    lead: '<strong>GO BLESS YOURSELF</strong> on the front of a natural organic cotton tote. Our blessing hand and <strong>BLESS YOU TOO</strong> on the back.',
    bullets: ['100% organic cotton', 'Roomy enough for groceries, books and more', 'Printed just for you when you order'],
    v: variants('tote', 36, [['One size', 67815638991018]]),
    img: images('tote', [['/images/shop/tote.jpg', 'Natural cotton tote bag printed GO BLESS YOURSELF'], ['/images/shop/tote-back.jpg', 'Back of the tote: blessing hand and BLESS YOU TOO']]),
  }),
  product({
    key: 'mug', handle: 'go-bless-yourself-mug', title: 'Go Bless Yourself Mug', position: -1, optionName: 'Size',
    lead: '<strong>GO BLESS YOURSELF</strong> on one side. Our blessing hand and <strong>BLESS YOU TOO</strong> on the other.',
    bullets: ['11 oz ceramic, glossy finish', 'Dishwasher and microwave safe', 'Printed just for you when you order'],
    v: variants('mug', 20, [['11 oz', 67820996067498]]),
    img: images('mug', [['/images/shop/mug.jpg', 'White mug printed GO BLESS YOURSELF'], ['/images/shop/mug-back.jpg', 'Other side of the mug: blessing hand and BLESS YOU TOO']]),
  }),
]
