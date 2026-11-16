// Google Ads (Ad Grant account AW-599305263) conversion:
// "Website form submitted (all sign-up forms)" — a Submit lead form goal.
// Call trackFormConversion() only after a form has been submitted successfully.

const SEND_TO = 'AW-599305263/a4R7CJGSybkdEK_Y4p0C'

type Gtag = (...args: unknown[]) => void

export function trackFormConversion(form: string) {
  if (typeof window === 'undefined') return
  try {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { send_to: SEND_TO, event_label: form })
    }
  } catch {
    // Never let tracking break a form.
  }
}
