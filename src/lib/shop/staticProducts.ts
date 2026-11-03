import type { ShopProduct } from './types'

// Products added in code (made with Printful, sold through Shopify checkout).
const SIZES: [string, number][] = [
  ['XS', 67815534002346], ['S', 67815534035114], ['M', 67815534067882], ['L', 67815534100650], ['XL', 67815534133418],
  ['2XL', 67815534166186], ['3XL', 67815534198954], ['4XL', 67815534231722], ['5XL', 67815534264490],
]

export const STATIC_PRODUCTS: ShopProduct[] = [
  {
    id: 'static-go-bless-yourself-tee',
    handle: 'go-bless-yourself-t-shirt',
    title: 'Go Bless Yourself T-Shirt',
    body_html:
      '<p><strong>GO BLESS YOURSELF</strong> on the front. <strong>BLESS YOU</strong> on the back.</p>' +
      '<p>Wear the message, share the blessing. Every shirt supports Save One Person, helping patients find the living donors they need. Priced at $36, double chai, a blessing of life.</p>' +
      '<ul><li>Soft 100% ring-spun cotton</li><li>Classic unisex fit</li><li>White, sizes XS to 5XL</li><li>Printed just for you when you order</li></ul>',
    description_text:
      'GO BLESS YOURSELF on the front. BLESS YOU on the back. Every shirt supports Save One Person. $36, double chai, a blessing of life.',
    vendor: 'Save One Person',
    product_type: 'Apparel',
    tags: ['tee', 'apparel'],
    options: [{ name: 'Size', values: SIZES.map(([s]) => s) }],
    featured: true,
    position: -1,
    seo_title: 'Go Bless Yourself T-Shirt | Save One Person',
    seo_description: 'White tee: GO BLESS YOURSELF on the front, BLESS YOU on the back. $36, double chai. Every shirt supports Save One Person.',
    variants: SIZES.map(([size, shopifyId], i) => ({
      id: `static-gby-${size.toLowerCase()}`,
      shopify_id: shopifyId,
      title: size,
      option1: size,
      option2: null,
      option3: null,
      sku: null,
      price: 36,
      compare_at_price: null,
      available: true,
      requires_shipping: true,
      taxable: true,
      position: i,
    })),
    images: [
      { id: 'static-gby-front', url: '/images/shop/go-bless-yourself-front.jpg', alt: 'White T-shirt, front: GO BLESS YOURSELF with a red heart', width: 1200, height: 1200, position: 0 },
      { id: 'static-gby-back', url: '/images/shop/go-bless-yourself-back.jpg', alt: 'White T-shirt, back: BLESS YOU, red heart, SAVE ONE PERSON', width: 1200, height: 1200, position: 1 },
    ],
  },
]
