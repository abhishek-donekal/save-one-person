import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

type IncomingItem = {
  productId?: string
  variantId?: string
  title: string
  variantTitle?: string | null
  price: number
  quantity: number
  image?: string | null
  sku?: string | null
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const email = String(body.email || '').trim().toLowerCase()
  const name = String(body.name || '').trim()
  const items: IncomingItem[] = Array.isArray(body.items) ? body.items : []

  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 })
  if (items.length === 0) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })

  const subtotal = items.reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0)
  const donation = Number(body.donation) || 0
  const discount = Number(body.discount) || 0
  const shipping = Number(body.shipping) || 0
  const tax = Number(body.tax) || 0
  const total = Math.max(0, subtotal - discount) + donation + shipping + tax

  const supabase = createAdminClient()
  const { data: order, error } = await supabase
    .from('shop_orders')
    .insert({
      email,
      customer_name: name,
      status: 'pending',
      subtotal,
      shipping,
      tax,
      discount,
      donation,
      total,
      coupon_code: body.coupon || null,
      shipping_address: body.shippingAddress || null,
      billing_address: body.billingAddress || body.shippingAddress || null,
      payment_provider: body.paymentProvider || 'paypal',
      payment_id: body.paymentId || null,
      notes: body.notes || null,
    })
    .select('id, order_number')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const itemRows = items.map((i) => ({
    order_id: order.id,
    product_id: i.productId || null,
    variant_id: i.variantId || null,
    title: i.title,
    variant_title: i.variantTitle || null,
    sku: i.sku || null,
    price: Number(i.price) || 0,
    quantity: Number(i.quantity) || 1,
    image_url: i.image || null,
  }))
  await supabase.from('shop_order_items').insert(itemRows)

  return NextResponse.json({ ok: true, orderId: order.id, orderNumber: order.order_number }, { status: 201 })
}
