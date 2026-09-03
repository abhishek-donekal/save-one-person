import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = (searchParams.get('code') || '').trim().toUpperCase()
  if (!code) return NextResponse.json({ valid: false, error: 'No code provided' }, { status: 400 })

  const supabase = await createClient()
  const { data } = await supabase
    .from('shop_coupons')
    .select('code, discount_type, amount, active, expires_at')
    .ilike('code', code)
    .eq('active', true)
    .maybeSingle()

  if (!data) return NextResponse.json({ valid: false, error: 'Invalid or expired code.' })
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, error: 'This code has expired.' })
  }
  return NextResponse.json({ valid: true, code: data.code, discount_type: data.discount_type, amount: Number(data.amount) })
}
