export function formatPrice(n: number): string {
  if (n === 0) return 'Free'
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
  })
}
