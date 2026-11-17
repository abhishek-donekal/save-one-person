// Where to center a cropped photo when the important part (a face) isn't at the top.
const FOCUS: Record<string, string> = {
  'images_girl.jpg': 'center 38%', // Hodaya: her face is near the bottom of the photo
}

export function focusFor(url: string | null | undefined, fallback = 'center top'): string {
  if (!url) return fallback
  const hit = Object.keys(FOCUS).find((k) => url.includes(k))
  return hit ? FOCUS[hit] : fallback
}

// The old WordPress site (saveoneperson.org/wp-content/...) no longer serves images, so
// photos still pointing there show up broken. Treat them as "no photo" until they are
// re-uploaded in the admin (the card then uses its no-photo layout instead of a broken image).
export function liveImage(url: string | null | undefined): string | null {
  if (!url) return null
  if (/^https?:\/\/(www\.)?saveoneperson\.org\/wp-content\//i.test(url)) return null
  return url
}
