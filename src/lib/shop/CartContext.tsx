'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { CartLine } from './types'

const STORAGE_KEY = 'sop-cart-v1'

type CartState = {
  lines: CartLine[]
  isOpen: boolean
  add: (line: Omit<CartLine, 'quantity'>, qty?: number) => void
  remove: (variantId: string) => void
  setQty: (variantId: string, qty: number) => void
  clear: () => void
  open: () => void
  close: () => void
  count: number
  subtotal: number
}

const CartCtx = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setLines(JSON.parse(raw))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines)) } catch {}
    }
  }, [lines, hydrated])

  const add = useCallback((line: Omit<CartLine, 'quantity'>, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.variantId === line.variantId)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], quantity: next[i].quantity + qty }
        return next
      }
      return [...prev, { ...line, quantity: qty }]
    })
    setIsOpen(true)
  }, [])

  const remove = useCallback((variantId: string) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId))
  }, [])

  const setQty = useCallback((variantId: string, qty: number) => {
    setLines((prev) =>
      prev.flatMap((l) => {
        if (l.variantId !== variantId) return [l]
        if (qty <= 0) return []
        return [{ ...l, quantity: qty }]
      })
    )
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const count = lines.reduce((s, l) => s + l.quantity, 0)
  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0)

  return (
    <CartCtx.Provider value={{ lines, isOpen, add, remove, setQty, clear, open: () => setIsOpen(true), close: () => setIsOpen(false), count, subtotal }}>
      {children}
    </CartCtx.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
