// Emails Lauren a copy of each sign-up, via FormSubmit (free, no account).
// The first message ever sent asks save1person1@gmail.com to click "Activate";
// after that every sign-up arrives as an email. Runs in the visitor's browser
// after the sign-up has already been saved, so a failure here never loses data.
export const NOTIFY_EMAIL = 'save1person1@gmail.com'

export function emailLauren(subject: string, fields: Record<string, string>) {
  try {
    void fetch(`https://formsubmit.co/ajax/${NOTIFY_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, _template: 'table', _captcha: 'false', ...fields }),
    }).catch(() => {})
  } catch {
    /* ignore */
  }
}
