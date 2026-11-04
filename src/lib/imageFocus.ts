// Where to center a cropped photo when the important part (a face) isn't at the top.
const FOCUS: Record<string, string> = {
  'images_girl.jpg': 'center 82%', // Hodaya: her face is near the bottom of the photo
}

export function focusFor(url: string | null | undefined, fallback = 'center top'): string {
  if (!url) return fallback
  const hit = Object.keys(FOCUS).find((k) => url.includes(k))
  return hit ? FOCUS[hit] : fallback
}
