// Keeps Google titles short enough not to be cut off in search results (~70 characters).
// Short titles get the usual " | Save One Person" ending from the site layout.
// Longer ones drop that ending, and very long ones are trimmed at a word break.
const SUFFIX = ' | Save One Person'
const MAX = 70

export function seoTitle(raw: string | null | undefined, fallback = 'Save One Person') {
  const t = (raw || fallback).replace(/\s+/g, ' ').trim()
  if (t.length + SUFFIX.length <= MAX) return t
  if (t.length <= MAX) return { absolute: t }
  let cut = t.slice(0, MAX + 1)
  const breakAt = Math.max(cut.lastIndexOf(' '), cut.lastIndexOf(':'), cut.lastIndexOf(','))
  cut = (breakAt > 40 ? cut.slice(0, breakAt) : t.slice(0, MAX)).replace(/[\s,:;\-–—|&]+$/, '')
  return { absolute: cut }
}
